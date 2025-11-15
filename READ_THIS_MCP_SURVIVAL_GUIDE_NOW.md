# READ THIS MCP SURVIVAL GUIDE NOW

_Updated: November 14, 2025 -- keep this open during the API key & server-side env sprint._

## TL;DR
- Activate the MCP helpers in `docs/mcp-tooling.md` before touching secrets. No key work happens without `OPENAI_API_KEY`, `.venv`, and `openai-agents`.
- Every connector listed below must be exercised (Vercel, GitHub, Airtable, Cloudflare, Stripe, Playwright, Sentry, Canva, Gmail, and the local filesystem server). Skip one and you will miss a secret.
- Follow the validation playbook exactly: inventory -> verify -> exercise -> log -> re-run `pnpm run check`.

---

## 1. Boot Sequence (do not improvise)
1. `python -m venv .venv && .venv\Scripts\activate` (skip only if `.venv/` already exists and is fresh).
2. `pip install --upgrade pip "openai-agents>=0.1.0"` inside the venv.
3. `setx OPENAI_API_KEY "sk-..."` (or `set OPENAI_API_KEY=...` in the current shell). No MCP helper runs without it.
4. Personal session ->  
   `pnpm exec python scripts/mcp_self.py --server-label gitmcp --server-url https://gitmcp.io/openai/codex --prompt "Which env files changed today?"`
5. Multi-agent session (layout/SEO/asset triad) ->  
   `pnpm exec python scripts/mcp_agents.py hosted --config scripts/mcp_agents_config.json --server-label gitmcp --server-url https://gitmcp.io/openai/codex`
6. Local filesystem server (stdio) when you need raw `.env` snapshots ->  
   `pnpm exec python scripts/mcp_agents.py stdio --config scripts/mcp_agents_config.json --server-name local-files --server-params '{"command":"npx","args":["-y","@modelcontextprotocol/server-filesystem","."]}'`

---

## 2. Connector Catalog (use every single MCP)
| MCP | Access Mode | Primary Jobs in this Sprint |
| --- | --- | --- |
| Vercel | Hosted (`server-label vercel`) | List env vars, confirm `prj_8cbai6JzE169NUytyFtCpSohZVka`, inspect build + runtime logs, toggle SKUs after key swaps. |
| GitHub (gitmcp) | Hosted | Diff `.env*`, find secret usage, confirm BaseHub removal, review Sanity wiring before merge. |
| Airtable | Hosted | Validate API key/base/table IDs, run test inserts for contact & newsletter forms, confirm schema. |
| Cloudflare | Hosted | Check Workers/R2/KV bindings for outdated tokens (e.g., Turnstile), ensure no shadow copies of secrets. |
| Stripe | Hosted | (Future pricing flows) ensure live/test keys separated, document if unset to avoid runtime errors. |
| Playwright | Hosted | Run smoke flows after each env edit (contact form submit, newsletter opt-in, Turnstile challenge). |
| Sentry | Hosted | Verify DSN + environment tags still route; look for auth failures after key rotation. |
| Canva | Hosted | Asset refresh tasks (hero/pricing imagery) when env toggles require updated public assets. |
| Gmail | Hosted | Confirm transactional email fallbacks and OAuth creds if RESEND keys fail; send test ping. |
| Filesystem (`@modelcontextprotocol/server-filesystem`) | stdio | Snapshot `.env.example`, `.env.local`, `.env.production`, and compare against Vercel-managed values. |
| Pinecone test script | CLI (`pnpm run test:pinecone`) | Verify Pinecone/OpenAI env vars, index configuration, embedding generation, and a full upsert/fetch flow before enabling vector-backed features. |

> If a connector fails to load, stop and fix it--running partial tooling invalidates the audit.

---

## 3. Env Variable Coverage Map
| Service | Variables | Validation Notes |
| --- | --- | --- |
| Branding / URLs | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME` | Ensure public URL matches production, no staging leakage. |
| Vercel Guardrail | `REQUIRED_VERCEL_PROJECT_ID` | Confirm matches `prj_8cbai6JzE169NUytyFtCpSohZVka`; Vercel MCP should warn if not. |
| Resend | `RESEND_API_KEY` | Send a test notification (Gmail MCP fallback) and verify Sentry logs show success. |
| Cloudflare Turnstile | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET` | Exercise via Playwright to ensure challenges pass. |
| Airtable CRM | `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_CONTACT_TABLE_ID`, `AIRTABLE_NEWSLETTER_TABLE_ID` | Use Airtable MCP to confirm schemas + insert/delete test rows. |
| Remote data toggle | `SKIP_REMOTE_DATA` | Keep `1` until Sanity rollout is complete; document rationale when flipping. |
| Legacy CMS | `BASEHUB_TOKEN` | Should stay unset post-migration; GitHub MCP greps help ensure no code path requires it. |
| Event ingest | `CONTACT_EVENTS_INGEST_KEY` | Decide whether we still stream analytics; remove unused listeners. |
| Upcoming Sanity | `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` | Add to `.env.example`, Vercel, and secrets manager simultaneously; verify via GitHub + Vercel MCPs. |

Keep the table updated as new secrets appear; stale docs are as risky as stale keys.

---

## 4. Validation Playbook
1. **Inventory**
   - `rg -n "process.env"` and `rg -n "env."` to locate every consumption site.
   - Fetch `.env.example` + Vercel env via filesystem + Vercel MCP; diff them.
2. **Verify Ownership**
   - For each service, confirm who owns rotation, when it last changed, and where it is stored.
   - Record findings in `Manus/current_state.md` so the next agent sees real data.
3. **Exercise Secrets**
   - Use Airtable MCP to write test rows, Vercel MCP to trigger preview deploys, Playwright MCP for live form submits.
   - Watch Sentry MCP for new errors immediately after each test.
4. **Remediate**
   - Update `.env.example`, `.env.local`, and Vercel Dashboard together.
   - Remove dead keys (e.g., `BASEHUB_TOKEN`) in the same PR so drift cannot creep back.
5. **Re-test & Log**
   - `pnpm run check` + targeted smoke scripts (`pnpm run smoke:images`, `pnpm run smoke:pages`).
   - Paste MCP outputs + decisions into sprint notes (or `docs/mcp-tooling.md`) before closing the task.

---

## 5. Quick Reference Snippets
- **List Vercel envs (hosted MCP):** `{"type":"mcp","server_label":"vercel","server_url":"https://vercel.com/openai/mcp"}`
- **GitHub diff helper:** `pnpm exec python scripts/mcp_self.py --server-label gitmcp --server-url https://gitmcp.io/openai/codex --prompt "Show changes to .env.example since HEAD~3"`
- **Airtable schema probe:** `... --prompt "Describe fields in AIRTABLE_CONTACT_TABLE_ID and insert a test row tagged MCP_AUDIT"`
- **Filesystem snapshot:** `pnpm exec python scripts/mcp_self.py stdio --server-params '{"command":"npx","args":["-y","@modelcontextprotocol/server-filesystem","."]}' --prompt "cat .env.local"`

Copy these commands into your shell history so you can rerun them whenever secrets change.

---

## 6. When Things Go Wrong
- **Connector fails to authenticate:** regenerate tokens, then document the fix here.
- **Env mismatch between GitHub and Vercel:** fix Vercel first (it is the source of truth for production), then backfill local files.
- **Playwright smoke fails:** inspect TURNSTILE + Airtable credentials first; 90% of regressions stem from those pairs.
- **Need human approval:** follow the approval policy in `docs/system-guardrails.md` and record the request ID next to the env change.

Stay disciplined--this file is your warning siren. If you can read it, you have zero excuses for shipping broken secrets.
