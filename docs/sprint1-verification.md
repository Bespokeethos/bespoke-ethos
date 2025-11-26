# Sprint 1 Verification Log

_Last updated: 2025-11-13 (late PM)_

This log recreates every "done" item from prior agent work and flags the gaps that still block Manus' Sprint 2 "Final Gloss" redesign. All checks were rerun in a fresh high-inference session on `C:\vercel` with Node 20.9 / pnpm 10.18.2.

---

## 1. Repository & Tooling Snapshot

- `git status --short` shows only local research artifacts and the updated `scripts/mcp_agents_config.json`.
- Latest commit on `main`: `5d11b4a fix: satisfy heading children for consensus page`.
- `pnpm install`, `pnpm run lint`, `pnpm run typecheck` all pass.
- `pnpm run build` succeeds (case-sensitivity warnings persist from upstream Next.js modules).

✅ **Tooling baseline is valid.**

---

## 2. Environment Variables

| Variable | Local `.env.local` | Required for Sprint 1? | Notes |
| --- | --- | --- | --- |
| `BASEHUB_TOKEN` | ✅ | Optional | Legacy content source retained for backwards compatibility. |
| `RESEND_API_KEY` | ✅ | **Yes** | Present locally; confirm mirrors Vercel dashboard before live email test. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET` | ✅ | Yes | Verified in `.env.local`; still needs browser challenge to exercise. |
| `AIRTABLE_TOKEN` | ✅ | **Yes** | Derived from PAT `Airtable_API` (renamed for clarity). |
| `AIRTABLE_BASE_ID` | ✅ (`appDG8eZQE9oG8gPY`) | **Yes** | Points to "Client Engagement Hub". |
| `AIRTABLE_CONTACT_TABLE_ID` | ✅ (`tblIWtgkqJd2mhWj6`) | **Yes** | "Contact Form Submissions". |
| `AIRTABLE_NEWSLETTER_TABLE_ID` | ✅ (`tbllMAx256vCwKVFq`) | **Yes** | "Leads" table used for newsletter opt-ins. |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Yes | Updated to `https://www.bespokeethos.com`. |
| `SKIP_REMOTE_DATA` | ✅ | Yes | Defaults to `1` locally to avoid BaseHub fetch churn. |

✅ **Result**: `.env.local` + `.env.example` are in sync with the new Vercel project (`prj_8cbai6JzE169NUytyFtCpSohZVka`). Pending manual confirmation that the same keys live in Vercel's Environment Variables UI.

---

## 3. Contact Form - `/api/contact`

| Check | Result |
| --- | --- |
| Turnstile validation | Implemented; still requires on-device challenge (not feasible via CLI). |
| Resend email notification | Key restored; needs live submission to ensure `contact@bespokeethos.com` receives mail. |
| Airtable persistence | ✅ CLI smoke mirrored endpoint payload (record `recs1msT4xj3Brrsx`, created/deleted 2025-11-13 23:11 ET). |
| BaseHub persistence | Still runs when `CONTACT_EVENTS_INGEST_KEY` is present (backwards compatible). |
| Success/failure redirects | Covered by existing implementation; to be reconfirmed in browser pass. |

✅ **Status**: Contact route now writes to Airtable’s “Contact Form Submissions” table using field names that exist today (`Full Name`, `Email Address`, `Message Content`, `Submission Date`, `Status`). Manual browser test still needed to validate Turnstile + Resend end-to-end.

---

## 4. Newsletter Form - `Newsletter` section

- Edge route posts into Airtable `Leads` table using `Lead Source = Website`, `Status = Subscribed`.
- CLI smoke (direct Airtable POST) produced record `recPuMDNWLjcHrhmU` on 2025-11-13 23:18 ET (deleted after verification).
- UI component shows loading/success/error states; duplicates prevented by Airtable primary key.

✅ **Status**: Newsletter pathway ready for in-browser validation once the production deploy is refreshed.

---

## 5. Metadata & Branding

- Production HTML still renders "Acme Site" titles/OG tags fetched from BaseHub.
- `FALLBACK_METADATA` in `layout.tsx` is correct, but remote BaseHub content overrides it.
- Favicons and manifest links exist but need validation after metadata fixes.

⚠️ **Action**: Hard-set the Bespoke Ethos metadata until BaseHub content is refreshed, or provide a local JSON config with the authoritative copy.

---

## 6. Pricing & Social Proof

- `src/config/pricing.ts` contains current prices (e.g., `consensusEngine.monthly = 299.99`) but the homepage does not surface them.
- Testimonials/social proof blocks are buried mid-page.

⚠️ **Action** (Sprint 2 prep): expose pricing and testimonials per Manus' layout instructions.

---

## 7. Deliverables for Handoff

1. Update Vercel environment settings with the Airtable + Resend variables (mirror `.env.local`).
2. Replace BaseHub dependencies in contact/newsletter flows with Airtable + local feedback (ready for Manus to polish UX copy).
3. Freeze metadata to Bespoke Ethos-branded values (remove "Acme Site" artifacts).
4. Document every change in `docs/manus-sprint-plan.md` to unlock the Sprint 2 "Final Gloss".

With these blockers removed or documented, Manus can proceed once live-form tests confirm Turnstile + Resend delivery.
