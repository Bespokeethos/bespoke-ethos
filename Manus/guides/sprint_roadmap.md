# Sprint Roadmap: BaseHub to Sanity Migration

**Objective:** Completely remove BaseHub from the bespoke-ethos project and replace it with Sanity as the headless CMS. This will resolve the ongoing build and runtime errors and provide a more stable, user-friendly content management experience.

**Recommended CMS:** Sanity.io

**Estimated Time:** 4-6 hours

---

## Pre-Flight: MCP Agent Swarm Setup (Blocking)

1. **OpenAI service key:** Set `$env:OPENAI_API_KEY` to the service key ending in `...UfAA` (temporary shell only) plus `$env:PYTHONIOENCODING='utf-8'`. Never commit the raw value.
2. **Connector matrix:** GitMCP + Filesystem MCP = OK. Sentry MCP (401) + Vercel MCP (424) = Blocked. All agent instructions explicitly say to skip the blocked connectors until new credentials land.
3. **Seven-agent config:** `scripts/mcp_agents_config.json` now includes Layout Guardian, SEO & Pricing Sentinel, Asset & Effects Finisher, Build & Env Sentinel, Content & Vector Orchestrator, Pinecone QA Ranger, and Docs & Sprint Archivist. Each role references Manus guides plus the troubleshooting rule.
4. **Launch commands:**  
   ```
   pnpm exec python scripts/mcp_agents.py --config scripts/mcp_agents_config.json hosted --server-label gitmcp --server-url https://gitmcp.io/openai/codex
   pnpm exec python scripts/mcp_agents.py stdio --config scripts/mcp_agents_config.json --server-name local-files --server-params '{"command":"npx","args":["-y","@modelcontextprotocol/server-filesystem","."]}'
   ```
5. **Outstanding agent work:** Only Layout Guardian has reported (hero CTA, mobile nav, contact form issues). Remaining six agents must run before we proceed with code edits, ensuring findings are logged under `.backups/agent-*.log` and summarized in Manus.

---

## Sprint 1: Sanity Setup & Initial Integration (2-3 hours)

**Goal:** Get a basic Sanity project up and running and connected to the Next.js application.

| Task | Description | Est. Time |
|---|---|---|
| **1.1: Create Sanity Project** | Create a new Sanity project and dataset. | 30 mins |
| **1.2: Define Sanity Schema** | Define the schema for the changelog posts in Sanity Studio. | 1 hour |
| **1.3: Install Sanity Client** | Install the Sanity client in the Next.js project. | 15 mins |
| **1.4: Connect to Sanity** | Connect the Next.js application to the Sanity project using the Sanity client. | 30 mins |
| **1.5: Fetch Changelog Data** | Fetch the changelog data from Sanity and display it on the changelog page. | 45 mins |

---

## Sprint 2: Full Migration & BaseHub Removal (2-3 hours)

**Goal:** Migrate all content from BaseHub to Sanity and completely remove BaseHub from the codebase.

| Task | Description | Est. Time |
|---|---|---|
| **2.1: Migrate Content** | Manually migrate the changelog posts from BaseHub to Sanity. | 1 hour |
| **2.2: Update Changelog Page** | Update the changelog page to use the Sanity data and remove all BaseHub-related code. | 45 mins |
| **2.3: Update Changelog Slug Page** | Update the changelog slug page to use the Sanity data and remove all BaseHub-related code. | 45 mins |
| **2.4: Remove BaseHub Dependencies** | Remove all BaseHub packages from `package.json` and run `pnpm install`. | 15 mins |
| **2.5: Final Testing** | Thoroughly test the changelog pages to ensure they are working correctly with Sanity. | 30 mins |

---

## Post-Sprint: Cleanup & Optimization

- **Remove `SKIP_REMOTE_DATA`**: Remove the `SKIP_REMOTE_DATA` environment variable and all related code, as it will no longer be needed.
- **Update Documentation**: Update the `README.md` and `DEPLOYMENT.md` files to reflect the new Sanity integration.
- **Vercel Environment Variables**: Ensure the `SANITY_PROJECT_ID` and `SANITY_DATASET` environment variables are set in Vercel.
- **Agent sign-off loop:** After code changes, re-run Layout Guardian, SEO & Pricing Sentinel, Asset & Effects Finisher, Pinecone QA Ranger, and Docs & Sprint Archivist to confirm layout/SEO/assets/docs align with Manus guidance before deployment.
