# Manus Execution Handoff

_Prepared in High Inference mode · November 13, 2025_

This document bridges Sprint 1 verification with the upcoming Sprint 2 “Final Gloss” redesign. It captures every correction applied to recover prior agent work and outlines the next queued tasks for Manus or downstream Codex agents.

---

## 1. Sprint 1 Recovery (✅ complete in high inference)

| Task | Outcome |
| --- | --- |
| Reinstall deps, lint, typecheck, build | All pass (`pnpm install`, `pnpm run lint`, `pnpm run typecheck`, `pnpm run build`). |
| Document verification status | `docs/sprint1-verification.md` refreshed with checklist + gaps. |
| Update environment scaffold | `.env.example` mirrors Bespoke Ethos project ID and includes Airtable + Resend placeholders. |
| Prevent BaseHub metadata drift | `SKIP_REMOTE_DATA` defaults to `1`; layout fallbacks rely on Bespoke Ethos copy. |
| Contact form persistence | `/api/contact` now targets Airtable (Contact Form Submissions table). |
| Newsletter flow | `/api/newsletter` edge route writes to Airtable (Leads table). |
| Newsletter UI | Footer form now client-side with loading/success/error feedback. |

**Artifacts:** `docs/sprint1-verification.md`, `.env.example`, `src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`, `src/app/_sections/newsletter/index.tsx`, `src/app/layout.tsx`

---

## 2. Sprint 1 Outstanding Checklist

1. **Environment Parity**
   - [x] Update `.env.local` with Airtable IDs and `RESEND_API_KEY`.
   - [ ] Mirror the same secrets in the Bespoke Ethos Vercel project.

2. **Live Airtable Validation**
   - [ ] Submit a real contact form (Turnstile challenge) and log resulting record ID in Airtable + verification doc.
   - [ ] Submit the newsletter form twice; confirm Airtable dedupes (record ID + timestamp in log).

3. **Email Notification**
   - [ ] After enabling `RESEND_API_KEY` on Vercel, ensure an email lands in `contact@bespokeethos.com`.

4. **Production Deploy**
   - [ ] Run `pnpm dlx vercel deploy --prod` after secrets are mirrored and live tests pass.

Each checkbox should be initialed in `docs/sprint1-verification.md` before we green-light Sprint 2.

---

## 3. Sprint 2 “Final Gloss” Backlog (ready once above is green)

### Hero & Above-the-Fold
- Swap hero asset with `Guides/hero_mockup-styleguide.png` (export responsive variants into `/public/assets/generated/`).
- Refresh copy + CTAs:
  - Headline: keep `NO RESOURCES. NO PROBLEM. JUST YOU AND AI.`
  - Sub-headline: `Unlock your potential. Partner with AI designed for founders, by a founder.`
  - Primary CTA button: `Start Your Free Assessment`
  - Secondary CTA link: `See Pricing`
- Move trust badges (NGLCC, Catalant, LGBTQ+ discount) under the CTA cluster.

### Social Proof & Empathy
- Add `Trusted by Founders Like You` testimonial strip immediately after hero.
- Introduce `Does This Sound Familiar?` checklist of founder pain points.

### Product Cards & Pricing Visibility
- Surface `Cadence`, `Flowstack`, and `Free Assessment` cards using helpers in `src/config/pricing.ts`.
- Add `The Founder-Friendly Advantage` comparison table.
- Conclude page with `Ready to Reclaim Your Time?` CTA block.

### Metadata & SEO
- With `SKIP_REMOTE_DATA=1`, confirm each page title/description reflects Bespoke Ethos voice.
- Point OG/Twitter images to new hero asset; double-check favicon/app icon references.
- Regenerate sitemap/robots if URL structure shifts.

### QA & Reporting
- Capture Lighthouse (mobile + desktop).
- Quick accessibility pass (keyboard focus, aria labels, contrast).
- Update `SITE_AUDIT.md` / `AUDIT_ISSUES.md` with resolved vs open items.

---

## 4. Handoff Notes

- **Mode:** Remain in high inference; treat previous automated output as untrusted until revalidated.
- **Branching:** Work directly on `main`; keep commits logically grouped (Sprint 1 fixes vs Sprint 2 redesign).
- **Testing mantra:** Always run `pnpm run lint`, `pnpm run typecheck`, `pnpm run build` before pushing. Manual Airtable/Resend checks are mandatory for Sprint 1 sign-off.
- **Deployment:** Use Bespoke Ethos Vercel identity; ensure git author stays `Upton Rand <contact@bespokeethos.com>` when pushing.

Once the Sprint 1 checklist is fully initialed in the verification log, we can execute the Sprint 2 backlog above.
