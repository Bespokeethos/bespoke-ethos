# Current Project State

**Date:** November 14, 2025  
**Project:** bespoke-ethos  
**Status:** Deployed but showing runtime error

---

## MCP Readiness Snapshot (Nov 14, 2025 - Pre-Wipe)

- **Working connectors:** GitMCP (`https://gitmcp.io/openai/codex`) and Filesystem MCP (`npx -y @modelcontextprotocol/server-filesystem .`).  
- **Blocked connectors:** Sentry MCP (`401 Unauthorized`) and Vercel MCP (`424 Failed Dependency`). Both are explicitly disabled inside `scripts/mcp_agents_config.json`; agents must not attempt them until fresh credentials exist.
- **Operator keying:** Set `$env:OPENAI_API_KEY` to the service key ending in `...UfAA` inside the active shell plus `$env:PYTHONIOENCODING='utf-8'`. Do **not** commit or echo the raw value; only set it temporarily before launching agents.
- **Environment alignment:**  
  - Sanity -> `SANITY_PROJECT_ID=3zm8j5u6`, dataset `production`, API token already in `.env.local` and Vercel.  
  - Airtable -> `AIRTABLE_BASE_ID=appDG8eZQE9oG8gPY`, `AIRTABLE_CONTACT_TABLE_ID=tblIWtgkqJd2mhWj6`, `AIRTABLE_NEWSLETTER_TABLE_ID=tbllMAx256vCwKVFq`.  
  - Pinecone -> host `https://bespoke-ethos-o0ibx7b.svc.aped-4627-b74a.pinecone.io`, namespace `production`, embedding model `text-embedding-3-small`. Brand canon docs (`founders-bible.txt`, `guides/Bespoke Ethos_ The Founder-Focused Conversion Attack Plan.md`, `guides/BESPOKE ETHOS MARKET RESEARCH & CONVERSION ANALYSIS.md`) were chunked + upserted via `scripts/ingest-brand-docs.mjs` (Nov 14 2025 run) using `text-embedding-3-small` => 11 total vectors. Re-run the script whenever these docs change.  
  - Guardrails present locally & on Vercel: `SKIP_REMOTE_DATA=1` (until Sanity swap), `NEXT_PUBLIC_SITE_URL=https://bespokeethos.com`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, `REQUIRED_VERCEL_PROJECT_ID=prj_8cbai6JzE169NUytyFtCpSohZVka`.
- **Agent orchestration:** `scripts/mcp_agents_config.json` now defines six roles (Runtime Purge Engineer, Types & UI Refactorist, Sanity & Search Architect, Env & Secrets Steward, Docs & MCP Orchestrator, QA & Release Sentinel). Every instruction block reiterates the Sentry/Vercel ban so runs do not stall.
- **Launch macro (single paste):**
  ```
  $env:OPENAI_API_KEY='<service key ending in UfAA>'
  $env:PYTHONIOENCODING='utf-8'
  pnpm exec python scripts/mcp_agents.py --config scripts/mcp_agents_config.json hosted --server-label gitmcp --server-url https://gitmcp.io/openai/codex
  pnpm exec python scripts/mcp_agents.py stdio --config scripts/mcp_agents_config.json --server-name local-files --server-params '{"command":"npx","args":["-y","@modelcontextprotocol/server-filesystem","."]}'
  ```
  (Skip Sentry/Vercel hosted runs until auth is restored.)
- **Layout Guardian findings (GitMCP run, see operator notes 2025-11-14):** hero CTA misalignment on desktop, mobile nav toggle overlapping CTA, contact form labels missing `for` attributes, solutions section mosaic inconsistent vs market research brief. No other agents have run yet.
- **Next operator priorities:** (1) Launch the remaining six agents using the above commands. (2) Implement Sanity client + GROQ migration for `src/app/changelog/*`. (3) Stand up Pinecone search API/UI with a graceful SKIP fallback. (4) Update Manus docs + READ_THIS after agents report back.

---

## Deployment Status

### Live URLs
- **Production:** https://www.bespokeethos.com
- **Alternate:** https://bespokeethos.com
- **Vercel URL:** https://bespoke-ethos-upton-rands-projects.vercel.app

### Current Error
```
Application error: a server-side exception has occurred while loading www.bespokeethos.com
Digest: 2611423346
```

### Latest Deployment
- **ID:** `dpl_7C6jKZK9m72ZfVLX8MPSoM8MWJfU`
- **Status:** READY (but runtime error)
- **Commit:** `011ed00416cbf8a08b99fab773a5e2a853e4a54a`
- **Message:** "fix: add SKIP_REMOTE_DATA guards to changelog pages"
- **Build Time:** ~82 seconds
- **Deployed At:** November 14, 2025

---

## Recent Changes

### Commits Made During This Session
1. **f54917c** - "fix: remove inline use server directive from client component"
2. **011ed00** - "fix: add SKIP_REMOTE_DATA guards to changelog pages"

### Files Modified
- `src/app/_sections/newsletter/index.tsx` - Removed inline "use server"
- `src/app/changelog/page.tsx` - Added SKIP_REMOTE_DATA guards
- `src/app/changelog/[slug]/page.tsx` - Added SKIP_REMOTE_DATA guards

---

## The BaseHub Problem

### What Happened
1. BaseHub CMS integration was causing build failures
2. Error: "Failed to resolve ref: Unauthorized"
3. Added `BASEHUB_TOKEN` to Vercel, but still failed
4. Added `SKIP_REMOTE_DATA` guards to skip BaseHub calls
5. Build succeeded, but site now shows runtime error

### Why BaseHub Needs to Go
- Unreliable authentication
- Poor error messages
- Difficult to debug
- Not worth the complexity for a simple changelog

---

## Project Structure

### Key Directories
```
bespoke-ethos/
├── src/
│   ├── app/
│   │   ├── changelog/          # Changelog pages (uses BaseHub)
│   │   ├── _sections/          # Page sections
│   │   └── _components/        # Shared components
│   ├── lib/
│   │   └── basehub/            # BaseHub integration (to be removed)
│   └── utils/
├── scripts/                     # Build scripts
├── public/                      # Static assets
└── package.json                 # Dependencies
```

### Key Files
- `basehub.config.ts` - BaseHub configuration (to be removed)
- `src/app/changelog/page.tsx` - Main changelog page
- `src/app/changelog/[slug]/page.tsx` - Individual changelog post
- `.env.example` - Environment variable template

---

## Dependencies

### Current BaseHub Dependencies (to be removed)
```json
"basehub": "9.5.2"
```

### Keep These Dependencies
- `next`: "16.0.0"
- `react`: "19.2.0"
- `@radix-ui/*`: Various UI components
- `tailwindcss`: Styling
- `openai`: "6.8.1" (for future AI features)

---

## Environment Variables

### Current (Vercel)
- `BASEHUB_TOKEN` - (Will be removed)
- `SKIP_REMOTE_DATA` - Set to "1" (Will be removed)
- `RESEND_API_KEY` - Email service
- `AIRTABLE_TOKEN` - CRM integration
- `AIRTABLE_BASE_ID` - Airtable base
- `AIRTABLE_CONTACT_TABLE_ID` - Contact form submissions
- `AIRTABLE_NEWSLETTER_TABLE_ID` - Newsletter signups
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Spam protection
- `TURNSTILE_SECRET` - Spam protection
- `NEXT_PUBLIC_SITE_URL` - "https://www.bespokeethos.com"
- `NEXT_PUBLIC_SITE_NAME` - "Bespoke Ethos"
- `REQUIRED_VERCEL_PROJECT_ID` - "prj_8cbai6JzE169NUytyFtCpSohZVka"

### To Add (Sanity)
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_TOKEN`

---

## Airtable Integration

### Current Setup
The site uses Airtable for:
- **Contact Form:** Submissions go to `AIRTABLE_CONTACT_TABLE_ID`
- **Newsletter:** Signups go to `AIRTABLE_NEWSLETTER_TABLE_ID`

### Status
✅ Working correctly (not affected by BaseHub issues)

---

## MCP Integrations Available

Your agent has access to these MCP servers:
- **Vercel:** Deploy, manage environment variables, view logs
- **GitHub:** Clone, commit, push, manage repository
- **Airtable:** Read/write data, manage tables
- **Cloudflare:** Workers, R2, KV, D1
- **Stripe:** Payments (if needed in future)
- **Playwright:** Browser automation
- **Sentry:** Error monitoring
- **Canva:** Design assets
- **Gmail:** Email notifications

---

## Next Steps

1. **Immediate:** Replace BaseHub with Sanity
2. **Short-term:** Test contact form end-to-end
3. **Long-term:** Add more content to changelog via Sanity

---

## Resources Spent

- **Previous Agent:** ~3000 credits debugging BaseHub
- **Remaining Budget:** ~200 credits for migration
- **Estimated Migration Time:** 4-6 hours

---

## Success Criteria

The migration is complete when:
1. ✅ Site loads without errors
2. ✅ Changelog displays content from Sanity
3. ✅ All BaseHub code is removed
4. ✅ Vercel builds succeed
5. ✅ Contact form still works
6. ✅ Documentation is updated
