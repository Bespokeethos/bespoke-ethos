# Operational Guardrails

This project runs as a single-production-branch deployment on Vercel. To keep the codebase stable and prevent file sprawl, follow the rules below.

## Branching & Deployment

- **Main is production.** All commits land on `main`; do not create long-lived branches.
- **Ship through CI.** Every push to `main` must pass the workflow at `.github/workflows/ci.yml` before it can be deployed.
- **Deploy on merge.** Vercel is configured to deploy the latest `main` build only; preview deployments are disabled.
- **Image generation workflow.** Confirm desired model/size and projected cost with the requester before running scripts (see `docs/image-generation.md`).

## Change Workflow

1. Verify locally with `pnpm run check` (type-safety and lint).
2. Run `pnpm run dev` to spot regressions in the hero slideshow and navigation.
3. Push to `main`; GitHub Actions will lint, type-check, and execute the build.
4. Only trigger a manual Vercel redeploy once CI succeeds.
5. Treat the Vogue product cards as design-locked elements—do **not** alter their layout, copy, or assets without explicit approval documented in sprint notes.

## Repository Layout

| Path | Purpose | Rules |
| --- | --- | --- |
| `src/app` | App Router pages | Each route gets a folder. Shared sections live under `_sections`. |
| `src/common` | Reusable UI primitives | Prefer colocated components over new top-level folders. |
| `src/config` | Runtime-safe config objects (feature flags, metadata) | Config must be pure (no side effects) and exported as functions. |
| `src/context` | React contexts/providers | Keep providers client-only unless they wrap server components. |
| `src/hooks` | Hook exports | One file per hook, re-export types alongside helpers. |
| `public` | Static assets | Store brand assets under `public/assets`. No ad-hoc folders. |

## Feature Flags

- Default flags live in `src/config/feature-flags.ts`.
- Server-side overrides use `FEATURE_FLAGS='{"flagName":true}'`.
- Browser overrides use `NEXT_PUBLIC_FEATURE_FLAGS` for targeted experiments.
- Consume flags through `useFeatureFlag("flagName")`.

## Testing & Quality Gates

- `pnpm lint` - ESLint (Next.js config).
- `pnpm typecheck` - strict TypeScript compilation.
- `pnpm run check` - combined lint + typecheck (what CI uses).

> If you need a disposable experiment, guard it with a feature flag instead of adding permanent files.

## Asset Management

- Optimized logos, badges, favicons live in `Guides/` for reference; copy to `public/assets` when used.
- Prefer SVG where possible. When adding media, also update the manifest in `public`.

## Incident Response

- Revert via commit (no `git reset --hard`). Every revert must ship with a follow-up bug card.
- Tag the commit in GitHub (`release-YYYYMMDDHHMM`) once deployed.

Adhering to these guardrails keeps `main` releasable while still allowing rapid iteration behind feature flags.

