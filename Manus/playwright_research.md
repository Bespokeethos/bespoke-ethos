# Playwright Research – Visual Design, Debugging, & Workflow

Collected links and notes for future agents when using Playwright (locally or via MCP) for visual QA, layout polishing, and debugging.

---

## 1. Site Design, Visual & Layout Testing (3 links)

1. **Next.js Playwright guide (App Router)**  
   `https://nextjs.org/docs/app/guides/testing/playwright`  
   - Official Next.js guide for integrating Playwright with the App Router.  
   - Covers project setup, useful test patterns, and how to structure tests around routes (good baseline for sitewide smoke + layout tests).

2. **Playwright visual comparisons / snapshots**  
   `https://playwright.dev/docs/test-snapshots`  
   - Shows how to create screenshot-based tests and compare them over time.  
   - Ideal for locking in layout, typography, and component states (hero sections, pricing tables, nav) to catch visual regressions.

3. **Playwright trace + video for UX flows**  
   `https://playwright.dev/docs/trace-viewer`  
   - Explains how to record traces (network, console, screenshots) and replay them in a rich UI.  
   - Very useful when iterating on “site design” UX flows (e.g., multi-step forms, nav menus, search interactions) and checking subtle layout issues.

---

## 2. Debugging & Inspecting Failing Tests (3 links)

1. **Playwright debugging guide**  
   `https://playwright.dev/docs/debug`  
   - Central doc for stepping through tests, pausing execution, and using debug mode.  
   - Helps agents understand how to quickly inspect flaky selectors, timing issues, or layout-dependent bugs.

2. **Playwright Inspector**  
   `https://playwright.dev/docs/inspector`  
   - Interactive tool to record, step, and inspect tests while seeing the browser.  
   - Perfect for “visual debugging” when refining selectors or understanding why an element isn’t visible/clickable.

3. **Playwright Trace Viewer (deep dive)**  
   `https://playwright.dev/docs/trace-viewer`  
   - Deepens the visual debugging story: timeline view, snapshots, console, and network panel per test run.  
   - Especially useful after CI/hosted MCP runs where you need a precise replay of what broke.

---

## 3. Other High‑Value Topics (3 links)

1. **Best practices for stable tests**  
   `https://playwright.dev/docs/best-practices`  
   - Guidance on selectors, waiting strategies, test isolation, and resilience.  
   - Should inform how our sitewide tests are written so they’re robust across content tweaks (e.g., hero copy changes from Manus) and layout shifts.

2. **Test configuration & projects**  
   `https://playwright.dev/docs/test-configuration`  
   - Shows how to configure multiple “projects” (e.g., desktop vs mobile, different viewports, or experimental flags).  
   - Key for running the same site design tests across breakpoints and ensuring responsive layouts meet Manus criteria.

3. **Assertions & expectations**  
   `https://playwright.dev/docs/test-assertions`  
   - Catalog of built-in assertions with examples (visibility, text, attributes, screenshots).  
   - Useful to express layout and UX expectations clearly in tests (e.g., hero CTA visible above the fold, trust badges present, search results appearing within a time window).

---

## How to Use This Later

- When building **sitewide Playwright suites**, start with the Next.js testing guide, then layer on visual snapshots for key pages and flows.  
- For **bug hunts and flaky tests**, lean on the debugging, inspector, and trace viewer docs.  
- For **maintainable long‑running suites** (MCP + CI), follow best practices + configuration guidance so tests stay stable as Manus-driven design and content evolve.

