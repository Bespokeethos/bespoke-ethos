#!/usr/bin/env python
"""
Personal MCP bootstrapper.

This script wires a single Agent from the OpenAI Agents SDK to a hosted MCP server
so you can issue ad-hoc prompts with the same tool surface area that ChatGPT can reach.

Relevant MCP guidance:
- Hosted MCP tools are configured through HostedMCPTool objects and run entirely inside OpenAI's
  infrastructure (OpenAI agents SDK docs: docs/mcp.md, “Hosted MCP server tools” section).
- Approval policies (always/never/per-tool) can be enforced by passing `require_approval` values
  inside the tool_config (docs/mcp.md, “Optional approval flows”).
- Streaming works by calling Runner.run_streamed and iterating over result.stream_events()
  (docs/mcp.md, “Streaming hosted MCP results”).

Usage:
    pnpm exec python scripts/mcp_self.py \\
        --server-label gitmcp \\
        --server-url https://gitmcp.io/openai/codex \\
        --prompt "Which language is this repository written in?"

Environment:
    OPENAI_API_KEY must be set (exported) before running.

Install requirements (outside this repo):
    pip install --upgrade "openai-agents>=0.1.0"
"""

from __future__ import annotations

import argparse
import asyncio
import os
from typing import Any, Dict

from dotenv import load_dotenv
from agents import (
    Agent,
    CodeInterpreterTool,
    FileSearchTool,
    HostedMCPTool,
    Runner,
    WebSearchTool,
)


load_dotenv()
load_dotenv(".env.local")


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run a personal MCP-enabled agent session.")
    parser.add_argument(
        "--server-label",
        required=True,
        help="Label of the hosted MCP server (per MCP docs).",
    )
    parser.add_argument(
        "--server-url",
        required=True,
        help="Public HTTPS endpoint for the hosted server.",
    )
    parser.add_argument(
        "--prompt",
        required=True,
        help="User request routed through the hosted MCP tools.",
    )
    parser.add_argument(
        "--instructions",
        default="You are a pragmatic assistant. Use the hosted MCP tool whenever it helps.",
        help="System-level instructions for the agent.",
    )
    parser.add_argument(
        "--approval-policy",
        choices=["always", "never"],
        default="never",
        help="High-level approval policy passed to `require_approval` (docs/mcp.md).",
    )
    parser.add_argument(
        "--require-approval-tool",
        action="append",
        default=[],
        metavar="TOOL_NAME",
        help="Optional list of tool names that should be forced to require approval.",
    )
    parser.add_argument(
        "--stream",
        action="store_true",
        help="Stream incremental MCP output (docs/mcp.md streaming example).",
    )
    parser.add_argument(
        "--agent-name",
        default="Personal Assistant",
        help="Logical name for the Agent instance.",
    )
    return parser


def build_tool_config(args: argparse.Namespace) -> Dict[str, Any]:
    tool_config: Dict[str, Any] = {
        "type": "mcp",
        "server_label": args.server_label,
        "server_url": args.server_url,
    }

    if args.require_approval_tool:
        tool_config["require_approval"] = {
            tool_name: "always" for tool_name in args.require_approval_tool
        }
    else:
        tool_config["require_approval"] = args.approval_policy

    return tool_config


async def run_agent(args: argparse.Namespace) -> None:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY must be set before running the MCP scripts.")

    tool = HostedMCPTool(tool_config=build_tool_config(args))

    tools = [tool]

    if os.environ.get("MCP_ENABLE_CODE_INTERPRETER", "1") == "1":
        tools.append(
            CodeInterpreterTool(
                tool_config={
                    "type": "code_interpreter",
                    "container": {"type": "auto"},
                }
            )
        )

    file_search_ids = os.environ.get("MCP_FILE_SEARCH_VECTOR_STORE_IDS", "").strip()
    if file_search_ids:
        vector_store_ids = [item.strip() for item in file_search_ids.split(",") if item.strip()]
        if vector_store_ids:
            max_results_raw = os.environ.get("MCP_FILE_SEARCH_MAX_RESULTS", "").strip()
            max_results = int(max_results_raw) if max_results_raw.isdigit() else None
            include_results = os.environ.get("MCP_FILE_SEARCH_INCLUDE_RESULTS", "0") == "1"
            tools.append(
                FileSearchTool(
                    vector_store_ids=vector_store_ids,
                    max_num_results=max_results,
                    include_search_results=include_results,
                )
            )

    if os.environ.get("MCP_ENABLE_WEB_SEARCH", "1") == "1":
        tools.append(WebSearchTool())

    agent = Agent(
        name=args.agent_name,
        instructions=args.instructions,
        tools=tools,
    )

    if args.stream:
        result = Runner.run_streamed(agent, args.prompt)
        async for event in result.stream_events():
            if event.type == "run_item_stream_event":
                print(f"[stream] {event.item}")
        print(result.final_output)
    else:
        result = await Runner.run(agent, args.prompt)
        print(result.final_output)


def main() -> None:
    parser = build_arg_parser()
    args = parser.parse_args()
    asyncio.run(run_agent(args))


if __name__ == "__main__":
    main()
