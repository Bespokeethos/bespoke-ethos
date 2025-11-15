# Bespoke Ethos Marketing Site

Custom Next.js 16 + Tailwind CSS marketing site scaffolded for Bespoke Ethos. The project runs on a single production branch (`main`) with feature flags and CI guardrails to keep releases stable.

## Prerequisites

- **Node**: Use Node 20 LTS or newer. This project is tested on Node 20 and Node 24. If you use `nvm`, run `nvm use` to select `20.x` (matches CI); Node 24 also works locally.
- **pnpm**: `>= 8`. The repo ships with a `pnpm-lock.yaml`.
- **Sharp**: v0.34 uses prebuilt binaries via `@img/sharp-*` so installs are quick (no native compile). If you see a Node version mismatch from `sharp`, ensure your shell is on Node ≥ 20 (e.g., `nvm use`) and retry the install.

## Getting Started

```bash
pnpm install
pnpm dev
```

Local development uses static/Sanity-backed content and does not require any BaseHub configuration.

- To force all routes to skip external CMS/search calls (recommended for CI or when env keys are missing), set `SKIP_REMOTE_DATA=1`.

## Operational Guardrails

1. **No branches.** Work directly on `main`. Guardrails are documented in `docs/system-guardrails.md`.
2. **Run checks locally.**
   ```bash
   pnpm run check # lint + typecheck
   ```
3. **CI pipeline.** Every push to `main` triggers `.github/workflows/ci.yml` which installs dependencies, lints, type-checks, and executes a smoke `next build`.
4. **Deploy on green.** Vercel production deploys only from `main` after CI succeeds.

## Feature Flags

Feature toggles allow new UI to ship dark while sharing the same branch.

- Defaults live in `src/config/feature-flags.ts`.
- Server overrides: `FEATURE_FLAGS='{"heroSlideshow":false}' pnpm dev`
- Client overrides: `NEXT_PUBLIC_FEATURE_FLAGS='{"blogHighlights":false}'`
- Consume with the hook:
  ```tsx
  import { useFeatureFlag } from "@/hooks/use-feature-flag";

  const showSlideshow = useFeatureFlag("heroSlideshow");
  ```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run Next.js in dev mode. |
| `pnpm build` | Production build. |
| `pnpm start` | Serve the built site. |
| `pnpm lint` | ESLint with Next.js config. |
| `pnpm typecheck` | TypeScript `--noEmit` check. |
| `pnpm run check` | Combined lint + typecheck (used in CI). |
| `pnpm run generate:images` | Generate hero/header/footer art with OpenAI (requires `OPENAI_API_KEY`). |
| `pnpm run optimize:images` | Resize + convert raw PNGs in `public/images/raw` into WebP variants. |

## MCP Tooling

- `scripts/mcp_self.py` boots a single hosted MCP-enabled agent (see `docs/mcp-tooling.md` for usage).
- `scripts/mcp_agents.py` + `scripts/mcp_agents_config.json` spin up the three shared agents described in the MCP playbook and can be pointed at hosted, stdio, SSE, or streamable HTTP servers per the OpenAI Agents SDK guide.

## Directory Layout

- `src/app` – App Router routes and layout.
- `src/common` – Reusable UI primitives.
- `src/config` – Runtime configuration (feature flags, metadata).
- `src/context` – React providers and contexts.
- `src/hooks` – React hook exports.
- `Guides/` – Reference content, copy, and optimized media from the design handoff.
- `docs/` – Process documentation and operational guardrails.

## Environment Variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `FEATURE_FLAGS` | Server | JSON payload overriding feature defaults. |
| `NEXT_PUBLIC_FEATURE_FLAGS` | Client | JSON payload for browser-controlled toggles. |
| `SKIP_REMOTE_DATA` | Server | When `1`, skips remote CMS/search calls and uses local fallbacks. |
| `OPENAI_API_KEY` | Server/CLI | Required for the image generation scripts (`pnpm run generate:images`). |

## Deployment

- GitHub repo: [Uptonr3421/bespoke-ethos](https://github.com/Uptonr3421/bespoke-ethos)
- Vercel project: [vercel.com/upton-rands-projects/bespoke-ethos](https://vercel.com/upton-rands-projects/bespoke-ethos)
- Branch policy: **single branch**. Always `git pull origin main` before work and `git push origin main` after commits. No feature branches.
- Vercel project deploys automatically from `main`.
- Preview deployments are disabled; run `pnpm dev` locally for QA.
- Tag production releases after deploy: `git tag release-YYYYMMDDHHMM && git push --tags`.

## Asset workflow

Illustrations for the hero, header accent, and footer wave are generated on demand:

1. `pnpm run generate:images` – hits the OpenAI Images API (`gpt-image-1`) and writes raw PNGs to `public/images/raw`.
2. `pnpm run optimize:images` – uses `sharp` to produce WebP variants at desktop/tablet/mobile breakpoints in `public/assets/generated`.
3. Fallback homepage/header/footer import the generated assets. When BaseHub is available, these assets serve as safe defaults if remote content is missing.

> **Note:** OpenAI image generation requires an organization with verified payment. If the CLI returns `403 Your organization must be verified`, verify the org from the OpenAI dashboard or supply pre-generated assets (stored under `public/assets/generated/` as SVG fallbacks).

## Contact Submissions

The `/contact` page submits to `src/app/api/contact/route.ts`.

- Mode: accept-and-log + BaseHub persistence (no email provider)
- Spam protection: Cloudflare Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`)

What happens on submit
- Verifies Turnstile when secrets are set.
- Logs a loud line tagged `CONTACT_FORM_SUBMISSION` and a single-line JSON payload.
- Persists the submission to BaseHub in a collection named `Submissions`.

Logged/persisted fields
- `name`, `email`, `company`, `useCase`, `timeline`, `budget`, `message`
- `timestamp` (ISO), `ip`, `userAgent`

Where to view
- BaseHub: Content → `Submissions`
- Vercel: Deployments → Runtime Logs → filter `CONTACT_FORM_SUBMISSION`

Env
- Required: `BASEHUB_TOKEN`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`
- Optional: `CONTACT_EVENTS_INGEST_KEY` (BaseHub events ingest key if you want persistence)

## Next Steps

The provided `Guides/` folder includes the full sitemap, copy blocks, pricing, and asset references for finishing the bespoke marketing experience. Build new sections behind feature flags, land on `main`, and enable toggles once validated in production.
