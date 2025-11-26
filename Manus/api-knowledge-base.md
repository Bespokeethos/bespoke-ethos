# Bespoke Ethos API Knowledge Base (Draft 1)

This file summarizes how the site talks to each external API, what env vars it expects, and the main usage patterns. Treat this as the “operational map” for future agents.

---

## 1. Resend (Email)

**Purpose**

- Send notification emails for contact form submissions.

**Where used**

- `src/app/api/contact/route.ts`

**Env vars**

- `RESEND_API_KEY` – private API key from Resend dashboard.

**Runtime behavior**

- On valid `POST /api/contact`:
  - Always logs the submission (structured JSON) to server logs.
  - If `RESEND_API_KEY` is set:
    - `const resend = new Resend(RESEND_API_KEY);`
    - `await resend.emails.send({...})` with:
      - `from`: currently `Bespoke Ethos Contact Form <onboarding@resend.dev>` (should be moved to a verified domain address like `contact@bespokeethos.com`).
      - `to`: `contact@bespokeethos.com`
      - `subject`: `New Contact: ${name || email}`
      - `html`: rich body including fields and request metadata.
    - Logs success/failure; email failures do **not** break the user flow.
  - If `RESEND_API_KEY` is **missing**:
    - Logs a warning and skips the email step; request still succeeds.

**Operational notes**

- To make production email work:
  1. Verify a sending domain in Resend (DNS records at Porkbun).
  2. Switch `from` in `contact/route.ts` to that domain:
     - e.g. `from: "Bespoke Ethos <contact@bespokeethos.com>",`
  3. Ensure `RESEND_API_KEY` is populated in Vercel env and local `.env.local`.
- No Resend webhooks are currently used.

---

## 2. Airtable (Contact + Newsletter)

**Purpose**

- Persist contact submissions and newsletter signups into Airtable.

**Where used**

- Contact API: `src/app/api/contact/route.ts`
- Newsletter API: `src/app/api/newsletter/route.ts`

**Env vars**

- Shared:
  - `AIRTABLE_TOKEN`
  - `AIRTABLE_BASE_ID`
- Contact table:
  - `AIRTABLE_CONTACT_TABLE_ID`
- Newsletter table:
  - `AIRTABLE_NEWSLETTER_TABLE_ID`

**Endpoints**

- `POST https://api.airtable.com/v0/{BASE_ID}/{TABLE_ID}`
  - Headers:
    - `Authorization: Bearer ${AIRTABLE_TOKEN}`
    - `Content-Type: application/json`

### 2.1 Contact form → Airtable

- When credentials are present:
  - Builds a `messageLines` array with:
    - Message, company, use case, budget, timeline, consent, IP, user agent.
  - Sends:
    - `fields`:
      - `"Full Name"`: name or `(not provided)`
      - `"Email Address"`: email (required)
      - `"Message Content"`: `messageLines.join("\n")`
      - `"Submission Date"`: `YYYY-MM-DD`
      - `Status`: `"New"`
  - Logs non-200 responses and continues without failing the user.
- If any of `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_CONTACT_TABLE_ID` are missing:
  - Logs a warning and **skips** Airtable; user still sees success.

### 2.2 Newsletter → Airtable

- `POST /api/newsletter` expects JSON `{ email }`.
- Validates basic `email.includes("@")`.
- When credentials are present:
  - Sends:
    - `"Full Name"`: local-part of email or `"Newsletter Subscriber"`
    - `"Email Address"`: email
    - `"Signup Date"`: full ISO timestamp
    - `"Lead Source"`: `"Website"`
    - `Status`: `"Subscribed"`
    - `Notes`: `"Newsletter opt-in from website footer"`
  - On Airtable errors:
    - Logs details and returns `{ ok: true, offline: true }` so UX never blocks.
- When credentials missing:
  - Returns `{ ok: true, offline: true }` immediately.

**Operational notes**

- All Airtable integration is “fail-open”: user-facing flows never break if Airtable is unavailable or misconfigured.
- No reads are currently performed; this is write-only from the site side.

---

## 3. Sanity (CMS)

**Purpose**

- Provide content for the changelog and as a fallback search source.

**Where used**

- `src/lib/sanity/client.ts`
- `src/lib/sanity/queries.ts`
- `src/app/changelog/*`
- `src/app/api/search/internal/route.ts` (fallback search)

**Env vars**

- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION` (default `2025-02-01`)
- `SANITY_API_TOKEN` (optional; enables authenticated reads)
- `SKIP_REMOTE_DATA`:
  - `"1"` → disables all Sanity calls and uses local fallbacks.

**Runtime behavior**

- Client:
  - If `SANITY_PROJECT_ID` and `SANITY_DATASET` are present **and** `SKIP_REMOTE_DATA !== "1"`:
    - `sanityClient = createClient({ projectId, dataset, apiVersion, useCdn, token })`
  - Else: `sanityClient = null`; callers get `null` and must handle it.
- Queries (GROQ):
  - `changelogListQuery` - returns:
    - `header` (title, subtitle, social links) from `siteSettings`.
    - `posts` from `changelogPost` documents with image metadata and authors.
  - `changelogPostQuery` - single post by slug with image + `nextPost`.
  - `changelogSlugsQuery` - slugs for static generation.
  - `searchChangelogQuery` - text search in `title`, `excerpt`, `summary`, `body`.
- Search API:
  - If vectors/Pinecone fail or are disabled, `searchWithSanity` uses `searchChangelogQuery` to return up to 10 posts as `SearchResult[]`.

**HTTP API reference (if bypassing `@sanity/client`)**

- Base pattern (from Sanity docs):
  - `https://{projectId}.api.sanity.io/v{apiVersion}/data/query/{dataset}?query=...` – run GROQ queries.
  - `https://{projectId}.api.sanity.io/v{apiVersion}/data/mutate/{dataset}` – create/update/delete documents.
  - `https://{projectId}.api.sanity.io/v{apiVersion}/assets/images/{dataset}` – upload images.
  - `https://{projectId}.api.sanity.io/v{apiVersion}/assets/files/{dataset}` – upload files.
- Auth:
  - `Authorization: Bearer {SANITY_API_TOKEN}` header is required for non-public datasets and **all mutating** requests.
  - Tokens should be server-side only and scoped (e.g. read vs write) via Sanity’s API token settings.
- Our current usage:
  - Only **read** operations through `@sanity/client.fetch`.
  - No HTTP mutations or asset uploads from this app; all content is expected to be managed through Sanity Studio or external tooling.

**Operational notes**

- Sanity Studio/schema is not part of this repo; another agent must ensure:
  - A singleton `siteSettings` doc with changelog fields and social links.
  - A `changelogPost` document type with fields referenced in queries.
- `SKIP_REMOTE_DATA=1` is the main kill-switch for working completely offline.

---

## 4. Pinecone + OpenAI (Search)

**Purpose**

- Vector search across brand docs; fallback to Sanity when not available.

**Where used**

- `src/app/api/search/internal/route.ts`

**Env vars**

- Pinecone:
  - `PINECONE_API_KEY`
  - `PINECONE_HOST` (full serverless index URL; `/query` gets appended)
  - `PINECONE_NAMESPACE` (defaults to `"production"`)
- OpenAI:
  - `OPENAI_API_KEY`
  - `EMBEDDING_MODEL` (e.g. `text-embedding-3-small`)
- Global:
  - `SKIP_REMOTE_DATA` – when `"1"`, Pinecone/OpenAI are **not** used; search falls back to Sanity.

**Runtime behavior**

- Embedding call:
  - `POST https://api.openai.com/v1/embeddings`
  - Body: `{ model: EMBEDDING_MODEL, input: query }`
  - Expects `data[0].embedding` array.
- Pinecone query:
  - `POST ${PINECONE_HOST}/query`
  - Body: `{ vector, topK: 10, includeMetadata: true, namespace }`
  - Maps `matches[].metadata` into:
    - `title`, `snippet`, `type`, and `tags` array.
- If Pinecone or OpenAI creds are missing/invalid:
  - Returns `null` and the handler falls back to Sanity search.
- Response shape:
  - `{ query, source: "pinecone" | "sanity" | "disabled" | "error-fallback", mode: "vector" | "fallback" | "disabled" | "error", results: SearchResult[] }`

**OpenAI usage elsewhere (images, tools)**

- Image generation scripts:
  - `scripts/generate-images.cjs`:
    - Uses the official `openai` Node client (`new OpenAI({ apiKey: OPENAI_API_KEY })`).
    - Calls `client.images.generate({ model: "gpt-image-1", prompt, size: "1536x1024" })` to produce raw PNGs saved under `public/images/raw`, which are then optimized into `public/assets/generated` by the image pipeline.
    - Requires `OPENAI_API_KEY` in the environment before running `pnpm run generate:images`.
- MCP / tooling scripts:
  - `scripts/ingest-brand-docs.mjs`, `scripts/test-pinecone.mjs`, and the MCP helpers (`scripts/mcp_*.py`) also depend on `OPENAI_API_KEY` for embeddings and agent-style tooling.
  - These are development/operator tools, never invoked at runtime from the web app.

**High-level OpenAI capabilities (for future use)**

- The current site only uses:
  - `embeddings` (for search → Pinecone).
  - `images.generate` (for hero/header/footer artwork).
- The OpenAI platform also exposes (per docs):
  - Responses / chat-style completions (`/responses` or `/chat/completions` via client libraries).
  - Assistants, fine-tuned models, and audio/speech endpoints.
- None of those additional capabilities are wired into the production app yet; if future agents add them, they should be documented here with:
  - Endpoint path, models used, env vars, and any privacy/PII considerations.

---

## 5. Cloudflare Turnstile (Anti-spam)

**Purpose**

- Protect the contact form from bots.

**Where used**

- Server: `src/app/api/contact/route.ts`
- Client: `src/app/contact/page.tsx` (loads Turnstile script and renders widget).

**Env vars**

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET`

**Runtime behavior (server)**

- Reads `cf-turnstile-response` from the form/JSON (`captchaToken`).
- If `TURNSTILE_SECRET` and token are present:
  - `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`
  - Body: `secret=${TURNSTILE_SECRET}&response=${captchaToken}`
  - If `success !== true`, returns `{ error: "Captcha failed" }` (400).
- If Turnstile env is missing:
  - **Skips** verification and continues (fail-open).

---

## 6. Other External Touchpoints

**Vercel / Hosting**

- No direct Vercel API usage; deployment is Git → Vercel.
- `middleware.ts` enforces canonical host (`www.bespokeethos.com`).

**Open Graph / Social**

- `src/app/layout.tsx` sets global `openGraph` and `twitter` metadata.
- `public/assets/generated/og-image.png` is the primary OG image; image pipeline keeps it in sync.

---

## 7. Future Work for Agents

1. **Resend**
   - Move `from` to a verified domain and document the exact sending identity.
   - Optionally add a second recipient or BCC for logging (e.g. internal archive).

2. **Airtable**
   - Document the Airtable base schema explicitly:
     - Field types for `Full Name`, `Email Address`, `Message Content`, `Status`, etc.
   - Consider idempotency keys or deduping strategy for repeat signups.

3. **Sanity**
   - Add a parallel `sanity_schema.md` describing required document types & fields, plus example HTTP queries/mutations for each.
   - Decide whether any other pages (solutions, blog) should pull from Sanity in the future.

4. **Pinecone / OpenAI**
   - Document the expected vector store schema (metadata fields like `title`, `type`, `tags`, `snippet`).
   - Define a re-indexing process (scripts or external tooling).

5. **Perplexity (potential)**
   - If Perplexity’s API is added (per their `chat/completions` docs), standardize on:
     - Env var: `PERPLEXITY_API_KEY`.
     - Base URL: `https://api.perplexity.ai/chat/completions`.
     - Models (e.g. `sonar-small-online`, `sonar-medium-online`) and whether live web access is required for each call.
   - Capture patterns for:
     - Research-style queries (multi-step tool use) vs. simple Q&A.
     - Any constraints around sending PII or proprietary data.
   - When implemented, add a dedicated section above (like the Resend/Airtable/OpenAI sections) with concrete endpoints and request/response examples.

6. **Canva Connect (potential)**
   - If Canva Connect is integrated (per `https://www.canva.dev/docs/connect/`), standardize on:
     - Env vars such as `CANVA_CLIENT_ID`, `CANVA_CLIENT_SECRET`, and `CANVA_REDIRECT_URI` for OAuth-style flows.
     - Whether we pull finished assets **from** Canva into our image pipeline, or push brand templates **to** Canva for users.
   - Document:
     - Any webhook endpoints Canva calls back (e.g., when a design is exported).
     - File formats and sizes we expect (PNG/WebP, aspect ratios) so they align with our existing `public/assets/generated` conventions.
   - When implemented, add a dedicated section above with concrete auth + import/export examples.

7. **Centralizing env docs**
   - Cross-link this file with `docs/DEPENDENCIES.md` and `.env.example` so any new agent can see:
     - What each service does
     - Which env vars are required
     - What failure modes look like
