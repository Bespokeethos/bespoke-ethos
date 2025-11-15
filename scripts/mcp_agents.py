#!/usr/bin/env python
"""
Shared MCP server activator for multiple agents.

This script provisions a single MCP transport (hosted, stdio, streamable HTTP, or SSE)
and attaches it to every Agent defined in a JSON config file. It mirrors the patterns in
OpenAI's MCP documentation (see docs/mcp.md sections:
  - “Hosted MCP server tools”
  - “Streamable HTTP MCP servers”
  - “HTTP with SSE MCP servers”
  - “stdio MCP servers”
  - “Tool filtering”)

Config file format (JSON):
[
  {
    "name": "Docs Assistant",
    "instructions": "Answer developer workflow questions.",
    "prompt": "Summarize the MCP options we support."
  },
  {
    "name": "Code Reviewer",
    "instructions": "Review backend changes."
  }
]

Example usage:
    pnpm exec python scripts/mcp_agents.py \\
        --mode hosted \\
        --config agents.json \\
        --server-label gitmcp \\
        --server-url https://gitmcp.io/openai/codex

    pnpm exec python scripts/mcp_agents.py \\
        --mode stdio \\
        --config agents.json \\
        --server-name local-files \\
        --server-params '{\"command\": \"npx\", \"args\": [\"-y\", \"@modelcontextprotocol/server-filesystem\", \"./data\"]}'

Notes:
- Requires OPENAI_API_KEY in the environment.
- Requires `openai-agents` Python package: `pip install --upgrade "openai-agents>=0.1.0"`.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import random
import urllib.request
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

from dotenv import load_dotenv
from agents import Agent, HostedMCPTool, Runner
from agents.mcp import MCPServerSse, MCPServerStreamableHttp, MCPServerStdio


load_dotenv()
load_dotenv(".env.local")

MAX_TURNS = int(os.environ.get("MCP_MAX_TURNS", "25"))
MAX_AGENT_ATTEMPTS = int(os.environ.get("MCP_AGENT_MAX_ATTEMPTS", "3"))
BASE_BACKOFF_SECONDS = float(os.environ.get("MCP_AGENT_BASE_BACKOFF", "1.5"))
STATUS_URL = os.environ.get("OPENAI_STATUS_URL", "https://status.openai.com/api/v2/status.json")

try:
    from openai import (
        APIConnectionError,
        APIError,
        APITimeoutError,
        APIStatusError,
        RateLimitError,
    )
except ImportError:  # pragma: no cover
    APIConnectionError = APIError = APITimeoutError = APIStatusError = RateLimitError = None

RETRYABLE_ERROR_TYPES = tuple(
    err
    for err in (
        APIError,
        APIConnectionError,
        APITimeoutError,
        APIStatusError,
        RateLimitError,
        asyncio.TimeoutError,
    )
    if err is not None
)


def safe_print(text: str) -> None:
    """Print text without crashing on unsupported console encodings."""
    import sys

    encoding = sys.stdout.encoding or "utf-8"
    safe = text.encode(encoding, errors="replace").decode(encoding, errors="replace")
    print(safe)


def parse_args() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Attach shared MCP tooling to multiple agents.")
    subparsers = parser.add_subparsers(dest="mode", required=True, help="MCP transport mode.")

    hosted = subparsers.add_parser("hosted", help="Configure HostedMCPTool for every agent.")
    hosted.add_argument("--server-label", required=True)
    hosted.add_argument("--server-url", required=True)
    hosted.add_argument(
        "--approval-policy",
        choices=["always", "never"],
        default="never",
        help="Optional approval policy (docs/mcp.md).",
    )

    for mode in ("stdio", "streamable-http", "sse"):
        sub = subparsers.add_parser(mode, help=f"Configure {mode} MCP server for all agents.")
        sub.add_argument(
            "--server-name",
            default=f"{mode}-server",
            help="Logical server name reported to tracing/logs.",
        )
        sub.add_argument(
            "--server-params",
            required=True,
            help="JSON blob forwarded to the MCP server constructor (docs/mcp.md).",
        )
        sub.add_argument(
            "--cache-tools",
            action="store_true",
            help="Enable MCP tool list caching (docs/mcp.md Caching section).",
        )

    parser.add_argument(
        "--config",
        required=True,
        help="Path to JSON file describing agents (see module docstring).",
    )
    parser.add_argument(
        "--default-prompt",
        default="List the tools available to you.",
        help="Fallback prompt if an agent entry omits one.",
    )
    parser.add_argument(
        "--tool-allow",
        action="append",
        default=[],
        metavar="TOOL",
        help="Optional allow-list applied when supported (docs/mcp.md Tool filtering).",
    )
    parser.add_argument(
        "--tool-block",
        action="append",
        default=[],
        metavar="TOOL",
        help="Optional block-list applied when supported.",
    )
    return parser


def load_agent_specs(path: str) -> List[Dict[str, Any]]:
    config_path = Path(path)
    data = json.loads(config_path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("Agent config must be a list of objects.")
    return data


def ensure_api_key() -> None:
    if not os.environ.get("OPENAI_API_KEY"):
        raise RuntimeError("OPENAI_API_KEY must be configured to use MCP tooling.")


def report_openai_status() -> None:
    """Fetch OpenAI status once so operators know about active incidents."""
    try:
        with urllib.request.urlopen(STATUS_URL, timeout=5) as resp:
            payload = json.load(resp)
    except Exception as exc:  # pragma: no cover - network hiccups just emit warning
        print(
            f"!!  Unable to fetch OpenAI status ({exc}). Continuing without status hint."
        )
        return

    status = payload.get("status", {})
    description = status.get("description") or "Unknown"
    indicator = (status.get("indicator") or "none").lower()

    if indicator != "none":
        print(f"!!  OpenAI status: {description}")
    else:
        print(f"OpenAI status: {description}")


def is_retryable_exception(exc: Exception) -> bool:
    if not RETRYABLE_ERROR_TYPES:
        return False

    if not isinstance(exc, RETRYABLE_ERROR_TYPES):
        return False

    status_code = getattr(exc, "status_code", None) or getattr(exc, "status", None)
    if status_code and 400 <= int(status_code) < 500 and status_code not in (408, 429):
        return False
    return True


async def run_agent_with_retry(agent: Agent, prompt: str):
    attempt = 0
    while True:
        attempt += 1
        try:
            return await Runner.run(agent, prompt, max_turns=MAX_TURNS)
        except Exception as exc:  # noqa: PERF203 - we want to intercept all relevant errors
            if attempt >= MAX_AGENT_ATTEMPTS or not is_retryable_exception(exc):
                raise

            delay = BASE_BACKOFF_SECONDS * (2 ** (attempt - 1))
            jitter = random.uniform(0, delay * 0.35)
            delay += jitter
            name = getattr(agent, "name", "agent")
            print(
                f"!!  {name} hit {exc.__class__.__name__}: {exc}. Retrying in {delay:.1f}s (attempt {attempt+1}/{MAX_AGENT_ATTEMPTS})"
            )
            await asyncio.sleep(delay)


async def run_with_hosted(args: argparse.Namespace, specs: Iterable[Dict[str, Any]]) -> None:
    tool = HostedMCPTool(
        tool_config={
            "type": "mcp",
            "server_label": args.server_label,
            "server_url": args.server_url,
            "require_approval": args.approval_policy,
        }
    )

    for spec in specs:
        agent = Agent(
            name=spec["name"],
            instructions=spec.get("instructions", "Use MCP tools responsibly."),
            tools=[tool],
        )
        prompt = spec.get("prompt", args.default_prompt)
        print(f"\n=== Running {agent.name} ===")
        result = await run_agent_with_retry(agent, prompt)
        safe_print(result.final_output)


async def run_with_server(
    args: argparse.Namespace,
    specs: Iterable[Dict[str, Any]],
    server_factory,
) -> None:
    params = json.loads(args.server_params)
    tool_filter = build_tool_filter(args)

    async with server_factory(
        name=args.server_name,
        params=params,
        cache_tools_list=args.cache_tools,
        tool_filter=tool_filter,
    ) as server:
        for spec in specs:
            agent = Agent(
                name=spec["name"],
                instructions=spec.get("instructions", "Use MCP tools responsibly."),
                mcp_servers=[server],
            )
            prompt = spec.get("prompt", args.default_prompt)
            print(f"\n=== Running {agent.name} ===")
            result = await run_agent_with_retry(agent, prompt)
            safe_print(result.final_output)


def build_tool_filter(args: argparse.Namespace):
    if not args.tool_allow and not args.tool_block:
        return None

    allow = set(args.tool_allow or [])
    block = set(args.tool_block or [])

    async def _filter(context, tool) -> bool:
        if allow and tool.name not in allow:
            return False
        if block and tool.name in block:
            return False
        return True

    return _filter


async def main() -> None:
    parser = parse_args()
    args = parser.parse_args()
    ensure_api_key()
    specs = load_agent_specs(args.config)
    report_openai_status()

    if args.mode == "hosted":
        await run_with_hosted(args, specs)
        return

    server_cls_map = {
        "stdio": MCPServerStdio,
        "streamable-http": MCPServerStreamableHttp,
        "sse": MCPServerSse,
    }
    server_cls = server_cls_map[args.mode]
    await run_with_server(args, specs, server_cls)


if __name__ == "__main__":
    asyncio.run(main())
