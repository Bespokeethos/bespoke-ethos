# MCP Tooling Playbook

This repo now includes two Python helpers that wrap the [OpenAI Agents SDK MCP guide](https://openai.github.io/openai-agents-python/mcp/) so we can attach the same tool surfaces that ChatGPT uses directly to our local agents without writing glue code.

## Prerequisites

- Python 3.11+ and `pip`.
- Install the SDK inside a virtual environment (already set up as `.venv/` locally):

  ```bash
  python -m venv .venv
  .venv\Scripts\activate           # PowerShell / Command Prompt
  pip install --upgrade pip openai-agents
  ```

- Export `OPENAI_API_KEY` before running any MCP helper:

  ```pwsh
  $env:OPENAI_API_KEY="sk-..."
  ```

The scripts call into `agents.Agent`, `HostedMCPTool`, `Runner`, and the transport-specific server helpers documented under “Hosted MCP server tools”, “Streamable HTTP MCP servers”, “HTTP with SSE MCP servers”, and “stdio MCP servers” in the official guide.

## Personal MCP session (`scripts/mcp_self.py`)

Run this when you want a single assistant wired to a hosted MCP server (OpenAI-run connector):

```bash
pnpm exec python scripts/mcp_self.py \
  --server-label gitmcp \
  --server-url https://gitmcp.io/openai/codex \
  --prompt "Which files changed in HEAD?"
```

- `--instructions` overrides the system prompt.
- `--approval-policy` (`always` / `never`) or `--require-approval-tool` mirrors the “Optional approval flows” section of the MCP docs.
- Add `--stream` to mirror the “Streaming hosted MCP results” example and print incremental events.

## Multi-agent activator (`scripts/mcp_agents.py`)

Use this script to spin up three or more agents that share the same MCP tooling. The included `scripts/mcp_agents_config.json` defines a default trio (`Docs Navigator`, `Code Reviewer`, `QA Verifier`) so you can run the full setup immediately:

```bash
pnpm exec python scripts/mcp_agents.py \
  --mode hosted \
  --config scripts/mcp_agents_config.json \
  --server-label gitmcp \
  --server-url https://gitmcp.io/openai/codex
```

Transport options map directly to the OpenAI guide:

- `--mode hosted` attaches a `HostedMCPTool`.
- `--mode stdio`, `--mode streamable-http`, and `--mode sse` spin up `MCPServerStdio`, `MCPServerStreamableHttp`, or `MCPServerSse` respectively. Pass `--server-params '{"command":"npx","args":["-y","@modelcontextprotocol/server-filesystem","."]}'` (or similar) to mirror the doc examples.
- Optional `--tool-allow/--tool-block` flags enable the “Tool filtering” flow; `--cache-tools` mirrors the caching guidance in the same doc.

Each agent entry may define `instructions` and a kickoff `prompt`; otherwise the script falls back to `--default-prompt`.

## Activation checklist

1. `pnpm install` (already synced) to ensure Node deps stay aligned with `pnpm-lock.yaml`.
2. `python -m venv .venv && .venv\Scripts\activate` (skip if `.venv/` already exists).
3. `pip install --upgrade pip openai-agents`.
4. `export OPENAI_API_KEY=...` (PowerShell example above).
5. Run either helper:
   - Personal: `pnpm exec python scripts/mcp_self.py ...`.
   - Multi-agent: `pnpm exec python scripts/mcp_agents.py --config scripts/mcp_agents_config.json ...`.
6. Capture the outputs and, per `docs/system-guardrails.md`, run `pnpm run check` before pushing any code that depends on MCP outputs.

Following these steps keeps our local automation aligned with the upstream-held “law” copy while still letting us prototype MCP flows safely.
