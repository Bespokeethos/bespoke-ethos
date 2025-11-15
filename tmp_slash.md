## Slash Commands

### What are slash commands?

Slash commands are special commands you can type that start with `/`.

---

### Built-in slash commands

Control Codex’s behavior during an interactive session with slash commands.

| Command      | Purpose                                                     |
| ------------ | ----------------------------------------------------------- |
| `/model`     | choose what model and reasoning effort to use               |
| `/approvals` | choose what Codex can do without approval                   |
| `/review`    | review my current changes and find issues                   |
| `/new`       | start a new chat during a conversation                      |
| `/init`      | create an AGENTS.md file with instructions for Codex        |
| `/compact`   | summarize conversation to prevent hitting the context limit |
| `/undo`      | ask Codex to undo a turn                                    |
| `/diff`      | show git diff (including untracked files)                   |
| `/mention`   | mention a file                                              |
| `/status`    | show current session configuration and token usage          |
| `/mcp`       | list configured MCP tools                                   |
| `/logout`    | log out of Codex                                            |
| `/quit`      | exit Codex                                                  |
| `/exit`      | exit Codex                                                  |
| `/feedback`  | send logs to maintainers                                    |

Codex populates `/model` with the standard subscriber stack: `gpt-5.1` (default), `gpt-4.1`, and `gpt-4o`. Switches apply mid-inference, so you can confirm you're on the normal configuration or drop to a fallback without touching `config.toml`.

---
