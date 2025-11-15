# Playwright Test Plan – Bespoke Ethos Sitewide QA

This plan is for using Playwright (locally or via the Playwright MCP server) to visually and functionally QA the Bespoke Ethos site once backend logic is stable.

The focus is:
- Visual/layout correctness across breakpoints.
- Critical flows (nav, search, forms, changelog).
- Regression-safety for Manus-driven design and copy changes.

Use this alongside `Manus/playwright_research.md`.

---

## 1. Global Setup & Conventions

- **Targets**
  - Production: `https://www.bespokeethos.com`
  - Preview/local: `http://localhost:3000` (Next dev/build)
- **Viewports (projects)**
  - `desktop`: 1280×720 or 1440×900
  - `mobile`: 390×844 (iPhone-ish)
- **Runs**
  - Smoke: run on every significant change (hero, nav, forms, search).
  - Full: run before release or when Manus changes layout/typography.
- **Assertions**
  - Functional first (route loads, key selectors present, forms submit).
  - Visual second (screenshots/snapshots where layout stability matters).
  - Use strict, data‑stable selectors (`data-testid`, role/text combos), not brittle CSS chains.

---

## 2. Route Coverage Matrix

### 2.1 Core marketing pages

1. `/` (Home)
   - Hero:
     - H1 visible on load (no scroll).
     - Primary CTA visible and clickable.
   - Nav:
     - Logo click → `/`.
     - Top links: `/solutions`, `/pricing`, `/faq`, `/contact`, `/blog`.
   - Trust badges:
     - NGLCC + Catalant badges visible.
   - Footer:
     - LinkedIn social link works.
   - Visual:
     - Screenshot of above-the-fold (desktop + mobile) for regression.

2. `/solutions`
   - Page loads with section heading.
   - Cards for key offers (Flowstack, Consensus Engine, Redbridging, Chatbots) present.
   - CTAs link to the appropriate solution detail routes.
   - Optional: screenshot of solutions grid.

3. `/solutions/{flowstack, chatbots, consensus-engine, redbridging, essentials, a-la-carte}`
   - H1 matches Manus copy per page.
   - Hero image present and not distorted at both breakpoints.
   - Pricing snippets and “who it’s for” bullets visible.
   - Primary CTA(s) visible and clickable.

4. `/pricing`
   - Pricing tiers visible and legible.
   - Mobile pricing comparison accordion:
     - Select dropdown works to change active plan.
     - Accordion expands/collapses categories smoothly.

5. `/faq`
   - FAQ accordion:
     - First question open by default (optional).
     - Clicking a question toggles its answer.
   - Page title and intro copy match Manus expectations.

6. `/testimonials`
   - Testimonials grid visible.
   - At least N cards (based on current config) with name, role, quote.

7. `/about`
   - Founder-focused copy present.
   - At least one “why us”/trust region visible and readable.

8. `/blog`
   - Blog index page loads (even if content is static).
   - Changelog link(s) or cross‑links present if applicable.

---

## 3. Changelog & Search

### 3.1 `/changelog`

- With `SKIP_REMOTE_DATA=1`:
  - Page renders fallback “Content is being migrated to Sanity.” heading and copy (no runtime error).
- With remote data enabled (Sanity configured):
  - List of posts appears.
  - Each entry shows title, date, excerpt.
  - Clicking a post navigates to `/changelog/[slug]`.
- Visual:
  - Snapshot of list view (desktop).

### 3.2 `/changelog/[slug]`

- With `SKIP_REMOTE_DATA=1`:
  - Fallback page renders (heading and explanation text for slug).
- With remote data enabled:
  - Title, date, hero image (if present), and portable text body render with correct typography.
  - Author block appears when authors are present.
  - “Back to changelog” link returns to `/changelog`.
  - If `nextPost` is present, “Next entry” CTA links correctly.

### 3.3 Header search (UI + API)

1. Input behavior (`SearchContent` in header)
   - Typing a short query shows:
     - Loading state (“Searching…”).
     - Results dropdown when matches are found.
     - Graceful “No matches yet” state.
   - Escape key closes the dropdown.

2. API wiring (`/api/search/internal`)
   - With Pinecone + OpenAI configured:
     - Results include `source: "pinecone"` and `mode: "vector"` in API response.
     - UI meta line mentions “semantic (Pinecone + embeddings)”.
   - With Pinecone disabled or missing env:
     - API falls back to Sanity and returns `source: "sanity"` and `mode: "fallback"`.
     - UI meta line reflects fallback.

3. Navigation from results
   - Clicking a result with `slug` navigates to `/changelog/[slug]`.
   - Result panel closes after navigation (or on next user action).

---

## 4. Forms & Integrations

### 4.1 `/contact`

- Form layout:
  - Labels are associated with inputs (`for`/`id`) for accessibility.
  - Required fields visually indicated.
- Turnstile:
  - Widget renders; Playwright may need a special mode or bypass (use test keys or environment flag when running in CI).
- Submission:
  - Submitting with valid data:
    - Returns success state (UI message or redirect with `sent=1` flag).
    - Does not display raw error responses.
  - Submitting missing required fields:
    - Shows validation feedback without network errors.
  - Negative/edge:
    - Rate limit surfaces user‑friendly error if triggered (429 path).

### 4.2 Newsletter form

- Form presence in the newsletter section.
- Successful submission shows success state; duplicate or invalid email shows appropriate error.
- Backend (Airtable) is already validated separately; here the focus is UX/feedback.

---

## 5. Navigation, Header, Footer & Trust

### 5.1 Header (all routes)

- Desktop:
  - Logo click → `/`.
  - All primary nav links present:
    - `/solutions`, `/pricing`, `/faq`, `/contact`, `/blog`, plus any other configured links.
  - Right-side CTAs present and clickable (`/book`, Calendly link).
  - Hover states: solutions menu opens on hover, with previews for Flowstack, Chatbots, Consensus, Redbridging, etc.

- Mobile:
  - Hamburger button toggles the menu overlay.
  - Tapping top-level items with sublinks expands/collapses them.
  - CTAs visible in the mobile panel.
  - Trust badges (NGLCC/Catalant) visible in mobile nav panel as designed.

### 5.2 Footer

- Logo(s) visible and not distorted.
- Footer navigation links for Home, Products, Cadence, Contact.
- LinkedIn icon link present and opens external profile.
- “Offerings” details element expands to show solution links.

---

## 6. Example Playwright Scenarios (Pseudo-code)

### 6.1 Home hero smoke (desktop)

- `test("home hero & nav", async ({ page }) => {`
  - `await page.goto(baseUrl + "/");`
  - Assert H1 contains “Bespoke Ethos”.
  - Assert primary CTA visible and has href `/book` (or configured route).
  - Assert header contains links to `/solutions`, `/pricing`, `/faq`, `/contact`, `/blog`.
  - Take screenshot for regression.

### 6.2 Search behavior

- `test("header search returns changelog hits", async ({ page }) => {`
  - `await page.goto(baseUrl + "/");`
  - Fill header search with query (e.g., “Cadence”).
  - Wait for dropdown, assert at least one result.
  - Click first result and assert we navigate to `/changelog/...`.

### 6.3 Contact form happy path (Playwright MCP or special env)

- `test("contact form submit", async ({ page }) => {`
  - `await page.goto(baseUrl + "/contact");`
  - Fill name, email, message.
  - Handle Turnstile test mode appropriately.
  - Submit and assert success UI (or redirect with `sent=1`).

---

## 7. How QA Agents Should Use This

- **QA & Release Sentinel**:
  - Treat this file as the canonical sitewide Playwright plan.
  - Implement/maintain tests for all sections above, with at least:
    - One desktop and one mobile project.
    - Visual snapshots for key pages (home hero, solutions grid, pricing, changelog list/detail).
  - After any major UI/layout change, re-run full Playwright suite and include summary in readiness report.

- **Layout/Design-focused agents**:
  - Use Playwright Inspector and Trace Viewer (see `Manus/playwright_research.md`) when iterating on layout-heavy changes (hero, pricing, testimonials, nav).
  - Update selectors or assertions here if new components/sections are added.

