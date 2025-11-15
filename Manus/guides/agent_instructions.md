# Agent Instructions: Sprint – Sanity Platform & Stack Hardening

**Objective:**  
Coordinate six agents to finish the Sanity migration, retire BaseHub, and harden the supporting stack (Next.js runtime, env/secrets, integrations, performance, and GTM research).

### Power Grep Snapshot (2025‑11‑14)

- `rg -n basehub src scripts` still reports >40 active imports (`src/app/_sections/*`, `_components/*`, `[[...slug]]/page.tsx`, `scripts/maybe-basehub.cjs`, `scripts/preflight.mjs`). These are the targets for the remaining migration work.  
- `rg -n BASEHUB_TOKEN --glob '!node_modules/**'` shows env files (`.env.example`, `.env.local`), build scripts, and docs still describing BaseHub.  
- `rg -n sanityFetch src/app/changelog` confirms the changelog already uses Sanity (`sanityFetch`, `changelogListQuery`) with a `SKIP_REMOTE_DATA` fallback.  
- `rg -n --glob '!node_modules/**' 'Sentry'` only hits docs/instructions; runtime code and `package.json` no longer import `@sentry/*`, so the guardrail is simply “do not reintroduce it.”  
- `rg -n pinecone --glob '!node_modules/**'` is limited to `scripts/test-pinecone.mjs` and Manus docs; no application routes are querying the vector index yet.

Keep this snapshot handy while editing—every PR should shrink the BaseHub footprint without reviving Sentry.

---

## Global Guardrails (All Agents)

- **BaseHub sunset in-progress:**  
  - No new `basehub`, `BaseHubImage`, `fragmentOn`, `Pump`, `GeneralEvents`, or `sendEvent` imports. Only touch the existing ones listed above and replace them with Sanity/GROQ + local React helpers.  
  - When removing BaseHub code, preserve UI fidelity by introducing equivalent Sanity schemas or hard-coded fallbacks; SKIP_REMOTE_DATA must still render meaningful placeholders.

- **Sentry stays retired:**  
  - Runtime code already compiles without `@sentry/*`. Do not add it back. If docs reference Sentry, either mark it legacy or remove it once the environment docs are updated.

- **Integrations require approval:**  
  - Airtable schema, Pinecone index definition, and OpenAI deployment are fixed unless the operator explicitly signs off. You may write code that calls them, but do not mutate schemas or indexes.  
  - Resend, Cloudflare Turnstile, and Sanity env vars may be read/created locally; secrets should only be stored in `.env.local` or Vercel.

- **Tool access:**  
  - Use `gitmcp` and the filesystem MCP for repo edits and `rg` runs.  
  - Use HTTP only for reading public documentation (Sanity, Next.js, Pinecone, Airtable, web UX research).  
  - Sentry/Vercel MCP connectors remain blocked unless the user says otherwise.

- **Escalation rule:**  
  - After two failed attempts (build failure, schema mismatch, Pinecone 4xx, etc.) run up to five focused web searches, summarize the URLs + insights, then pause for operator guidance.

---

## Research Anchors

**Core project / live site** – `https://www.bespokeethos.com`, `https://bespokeethos.com`

**Next.js runtime** – `https://nextjs.org/docs/app/building-your-application/data-fetching/fetching`, `https://nextjs.org/docs/app/building-your-application/caching`, `https://nextjs.org/docs/app/building-your-application/optimizing/metadata`, `https://nextjs.org/docs/app/building-your-application/routing/route-handlers`

**Sanity** – quickstart/setup (`quick1.txt`, `sanity_schema.txt`, `sanity_display.txt`), Visual Editing & Live Content (`sanity_preview.txt`, `sanity_live_api.txt`), image CDN (`sanity_image.txt`)

**Integrations** – Airtable auth & records (`airtable_pat.txt`, `airtable_create.txt`), Resend send-email (`resend_send.txt`), Cloudflare Turnstile client/server (`turnstile_client.txt`, `turnstile_server.txt`)

**Environment/Vercel** – Next env docs (`next_env.txt`), Vercel env mgmt (`vercel_env_vars.txt`)

**Performance & UX** – Core Web Vitals (`webdev_cls.txt`, `webdev_lcp.txt`), landing-page research (`wordstream_landing.txt`, `shopify_landing.txt`, `cxl_b2b.txt`, `backlinko_onpage.txt`, `nng_homepage.txt`, `smashing_form_validation.txt`)

---

## Agent Roster & Sprint Briefs

Each agent owns the responsibilities below. Detailed playbooks live alongside this file inside `Manus/`.

### 1. Content Platform Integrator (`Manus/sprint_agent01_content-platform.md`)
- Finish replacing BaseHub with Sanity Studio schemas + GROQ queries beyond the changelog (hero, testimonials, navigation, pricing, FAQs, etc.).  
- Wire Visual Editing / draft mode, Live Content API helpers, and Sanity image URL builder utilities so editors get live previews without reloading.  
- Provide consistent asset helpers (image crops, overlays, responsive presets) to unblock the runtime and performance agents.

### 2. Next.js Runtime & API Specialist (`Manus/sprint_agent02_next-runtime.md`)
- Enforce caching & revalidation strategy (Request Memoization vs Data Cache vs Full Route Cache) per route segment, especially for Sanity-powered sections.  
- Replace BaseHub-driven Route Handlers with Sanity-aware equivalents and ensure metadata is generated via `generateMetadata`.  
- Establish shared fetch utilities (tags, cache options) and document when to opt into dynamic vs static routes.

### 3. Environment & Delivery Ops (`Manus/sprint_agent03_env-ops.md`)
- Remove or mark `BASEHUB_TOKEN`/Sentry env vars as legacy in `.env.example`, `.env.local`, docs, and `scripts/preflight.mjs`.  
- Ensure Sanity, Airtable, Resend, Turnstile, OpenAI, and Pinecone env vars stay aligned across local + Vercel.  
- Run `pnpm run test:pinecone` once envs are in sync, and record results plus any intentional `.env.example` vs `.env.local` differences in `Manus/guides/current_state.md`.

### 4. Integrations & Automation Lead (`Manus/sprint_agent04_integrations.md`)
- Harden the Airtable contact/newsletter handlers (rate limits, retries) and verify they align with the documented schema.  
- Wrap Resend send-email payloads with idempotency and safety rails; surface logging hooks (no Sentry).  
- Finalize Cloudflare Turnstile client/server validation flows and ensure API routes consume the tokens correctly.

### 5. Performance & UX Reliability Analyst (`Manus/sprint_agent05_performance.md`)
- Guard CLS (≤0.1) by enforcing intrinsic image sizes and reserving layout space when BaseHub sections are rewritten in Sanity.  
- Improve LCP (≤2.5 s p75) through optimized hero assets, preconnects, and staged rendering.  
- Instrument a repeatable regression workflow (Lighthouse user flows + CrUX dashboards) so every deployment shows vitals and navigation UX remain healthy.

### 6. Marketing Research & Conversion Partner (`Manus/sprint_agent06_market-cx.md`)
- Translate WordStream/Shopify/CXL/Backlinko/NN/g research into actionable requirements for the hero, pricing, CTA copy, and form validation.  
- Maintain the messaging map so each acquisition channel has a dedicated landing variant with aligned copy and analytics tracking.  
- Feed credibility requirements (trust badges, cookie notice) into the platform work so the final Sanity content model supports them.

---

## Final Note

Sentry is gone, the changelog already runs on Sanity, and BaseHub now only powers the legacy marketing sections. Every PR this sprint should (1) shrink `rg basehub` output, (2) keep Airtable/Resend/Pinecone envs accurate, and (3) document the change so the next operator can follow along. When unsure, prefer Sanity-driven data + documented fallbacks over lingering BaseHub helpers. Keep progress logs in Manus and celebrate each directory you delete from `src/lib/basehub/`.
