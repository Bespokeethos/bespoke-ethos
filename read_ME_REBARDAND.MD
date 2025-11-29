# Bespoke Ethos Rebrand / Positioning Implementation Plan

> Constraint: Keep the public-facing brand name as **“Bespoke Ethos”** everywhere for now. Use **“Gaymensfieldguide DBA Bespoke Ethos”** only as the legal line (e.g., footer). A full rename to a new business name will happen later as a separate project.

---

## 1) Map Context → Site Surfaces

- Inventory key context docs:
  - `Deep-Context/` (Positioning Index, market research, “new homepage” TSX, etc.).
  - `Manus/guides/Upton Rand Background/` (founder identity, Cognitive Resonance, market research & conversion analysis).
  - `Guides/Product offerings/` (Cadence, Flowstack, Chatbots, Consensus, Redbridging, etc.).
- Build a mapping (even simple checklist) of:
  - Positioning & messaging → which pages/sections (home hero, About, FAQ, Solutions, Pricing, Blog intros).
  - Product definitions & pricing → `/solutions/*`, `/pricing`.
  - Founder story & identity angles → `/about`, `/help`, “founder” CTAs.
  - Legal/credibility (NGLCC, Catalant, discounts) → header, footer, trust ribbons, FAQ.
- Mark each planned change as:
  - Copy-only, layout/structure, or code-level behavior.

**Status:** Not started (this doc is the initial skeleton).

---

## 2) Homepage Overhaul (Market Research + New Layout)

- Compare current homepage to:
  - `Deep-Context/new_homepage.tsx`
  - `Deep-Context/Fix_for_gemini.tsx`
- Decide final homepage structure:
  - Hero: “anti‑enterprise” + “cognitive prosthetic for overwhelmed founders.”
  - Core outcomes: busywork reduction, reliability, human‑in‑the‑loop, Cleveland/Rust Belt angle.
  - Product strip: Cadence / Flowstack / Chatbots / Consensus / Redbridging.
  - Social proof: NGLCC, Catalant, Cleveland-specific.
  - Founder block that hints at identity without oversharing on the top level.
- Implement in `src/app/page.tsx` (and shared sections):
  - Bring copy in line with Positioning Index.
  - Keep brand name as “Bespoke Ethos” in headings/taglines.

**Status:** In progress (homepage FAQs + metadata updated to reflect “Anti-Enterprise Play” and product lineup).

---

## 3) Product / Solutions Pages Alignment

- Use market research + `Guides/Product offerings/*.txt` to lock product taxonomy:
  - Names, who-it’s-for, outcomes, timelines.
  - Pricing bands where appropriate.
- For each solutions page (`/solutions`, `/solutions/*`):
  - Normalize product names and tags (e.g., “Workflow Automation Setupᵀ”, “AI Research Assistantᵀ”).
  - Update benefits/pain language:
    - Anti‑McKinsey, small‑founder focus.
    - Reliability, human‑in‑the‑loop, “automation rescue.”
  - Ensure each card/section clearly states:
    - Target user, outcome, price range, timeline.
- Keep footer “Offerings” quick links in sync with finalized product list and labels.

**Status:** Partially started (homepage messaging and SEO now aligned with Positioning Index; individual product pages not yet updated).

---

## 4) Pricing & Offers

- Reconcile pricing numbers from market research with `/pricing`:
  - Entry-level offers.
  - Productized consulting packages.
  - Retainers / ongoing support.
- Implement LGBTQ+ founder discount and similar offers:
  - Clear copy on `/pricing` and `/lgbtq-discount`.
  - Short note in footer or trust section.
  - Ensure % discounts and eligibility are consistent site-wide.
- Confirm CTAs and forms (buttons, labels, success text) align with the updated offer structure.

**Status:** In progress (LocalBusiness and Organization JSON-LD updated for SEO; LocalBusiness now omits full street address while including city, region, ZIP, country, and email contact details; Organization schema includes founder Person for Upton Rand; Consensus Calendar branding and routes wired into `/calendar` and SEO routes.)

---

## 5) Founder Story, Identity & Trust

- Use identity angles from Positioning Index:
  - Cognitive Prosthetic Founder, Recovery Founder, Blue‑Collar AI Expert, Human‑in‑the‑Loop Veteran, Alignment Specialist, Neurodivergent Advocate.
- Rewrite:
  - `/about`: coherent narrative with clear boundaries (trauma‑informed, not overwhelming).
  - Any “founder note” or story on `/help`, homepage, or other sections.
- Make trust signals explicit and consistent:
  - NGLCC, Catalant, LGBTQ+ discount, past Microsoft backing, published author.
  - Use a reasonable density: hero ribbon, mid‑page trust strip, footer badges.
- Legal/business naming:
  - Keep structured data `name` / `legalName` as “Bespoke Ethos” for now.
  - Use “Gaymensfieldguide DBA Bespoke Ethos” only where the legal line belongs (footer).

**Status:** Partially started (footer legal line + homepage positioning updated).

---

## 6) FAQ / Help / Education Content

- Pull objections and questions from Market Research & Conversion docs:
  - “I’m overwhelmed / no time / no team.”
  - “I broke Zapier/Make automations.”
  - “Enterprise AI is too expensive/complex.”
  - “I need AI but don’t know where to start.”
- Update `/faq` and `/help`:
  - Group questions around feasibility, pricing transparency, data & AI safety, and “human‑in‑the‑loop.”
  - Add a small “How we work” section (process overview, free assessment call).

**Status:** In progress (Pricing page updated to reflect productized offerings and OfferCatalog JSON-LD now covers Workflow Automation SetupT, Chatbots, AI Research AssistantT Decision Briefs, AI Strategy Sprint chat concierge, and Automation RescueT. Solutions overview metadata and hero now aligned with anti-enterprise/productized consulting positioning.)

---

## 7) Blog / Changelog Positioning Pass

- For existing blog posts and changelog entries:
  - Align intros/outros with the new positioning:
    - AI as cognitive prosthetic for small founders.
    - Cleveland / Rust Belt focus where relevant.
  - Update internal links to point to updated products/pricing pages.
- Optionally add 1–2 new posts derived from:
  - Cognitive Resonance whitepaper.
  - Market Research & Conversion Analysis.

**Status:** Not started.

---

## 8) SEO & Structured Data Updates

- Audit SEO config:
  - `src/lib/seo/routes.ts`
  - `src/app/_components/seo/website-jsonld.tsx`
  - `src/app/_components/seo/localbusiness-jsonld.tsx`
  - `src/app/_components/seo/organization-jsonld.tsx`
- Update:
  - Meta titles/descriptions to match Positioning Index and target queries (Cleveland AI automation, workflow rescue, AI strategy sprint, etc.).
  - JSON‑LD `description` fields to reflect:
    - Busywork reduction.
    - Reliable, human‑in‑the‑loop AI.
    - NGLCC/LGBTQ+ and Catalant trust.
- Keep `"name"` and `"legalName"` as “Bespoke Ethos” until a dedicated rename project.
- Verify:
  - OG images.
  - `public/site.webmanifest`.
  - Calendar and embedded experiences referencing “Bespoke Ethos” correctly.

**Status:** Not started.

---

## 9) Visual / Brand System Touches

- If context files define new visual patterns:
  - Decide which are “current brand” vs “post‑rename” assets.
  - Update header/footer logos and alt text only for current Bespoke Ethos brand (keep future‑name assets staged but unused).
- Light-touch style updates only:
  - Colors, typography, spacing adjustments that support the new positioning.
  - Avoid a full design upheaval unless explicitly required.

**Status:** Partially aligned; logos already in place for Bespoke Ethos.

---

## 10) Forms, Flows, and Integrations

- Ensure contact/newsletter flows reflect updated messaging:
  - Form labels, helper text, thank‑you messages.
  - Any inline trust or reassurance copy.
- Confirm Airtable, Sanity, Pinecone, and other backends remain unaffected by copy/layout changes.
- If market research suggests refined intake questions:
  - Update frontend fields.
  - Align `/api/contact` payload and validation.

**Status:** Not started.

---

## 11) QA, Accessibility, and Regression Checks

- Manual QA on desktop + mobile:
  - Homepage.
  - `/solutions` and each product page.
  - `/pricing`, `/about`, `/faq`, `/contact`, `/lgbtq-discount`.
- Check:
  - Heading hierarchy, link text clarity.
  - Alt text and color contrast for any new elements.
- Run existing tests:
  - Smoke and e2e where relevant.
  - Update snapshots only for intentional visual changes.

**Status:** Not started for rebrand scope (existing tests are baseline).

---

## 12) Launch & Follow-Up

- Ship changes in logical batches:
  - Batch 1: Homepage + footer (partially done).
  - Batch 2: Solutions + pricing.
  - Batch 3: About + FAQ/help.
  - Batch 4: SEO/structured data + blog tuning.
- After each deploy:
  - Verify production pages against this plan and source docs.
  - Confirm Vercel builds are green and performance/SEO are acceptable.
  - Capture any follow‑up tasks (e.g., full rename to new business name) as separate, clearly scoped projects.

**Status:** Footer legal line already updated to:
- Figcaption: `Gaymensfieldguide DBA Bespoke Ethos`.
- Copyright:
  - `"c 2025 Gaymensfieldguide DBA Bespoke Ethos. All rights reserved."`

This file should be updated as each section is implemented (marking statuses as In Progress / Completed, and adding any key decisions or deviations from the original plan).
