# Deep Context Index (Local)
Quick map of the most important guidance already in this repo so you don’t burn time hunting for it again.

- **Pricing & offers**: `src/config/pricing.ts` drives Flowstack, Cadence, Chatbots, Consensus Engine, Redbridging numbers. Rendered on `src/app/pricing/page.tsx` and referenced across solutions/products pages.
- **Site pages & copy**: Primary Next.js routes in `src/app/` (home, solutions, products, pricing, testimonials, FAQ, contact, about). Components and section shells live in `src/app/_components` and `src/app/_sections`. Shared layout/CTA helpers in `src/common/`.
- **Brand/voice/briefs**: Deep strategy and positioning in `Manus/guides/Upton Rand Background/` (market research, agent guidance, backstory). Additional motives/context in `Manus/guides/Upton Rand Background/additionalo-motives/`. Top-level deep narrative in `Deep-Context/`.
- **Assets**: Logos/badges in `public/assets/` (e.g., `public/assets/logos/*`, `badge-nglcc.png`). Hero images and generated art under `public/assets/generated/`.
- **Forms & lead flow**: Contact page and Jotform embed at `src/app/contact/page.tsx`; API handler `src/app/api/contact/route.ts` if used. Pill/hero shells and rail/ghost cards styled in `src/app/globals.css`.
- **Navigation/SEO**: Breadcrumbs in `src/app/_components/seo/breadcrumbs.tsx`; sitemap/robots in `src/app/sitemap.ts` and `src/app/robots.ts`. Metadata per page defined in each route file.
- **Testing**: Playwright smoke tests in `tests/e2e/` with snapshots; configs in `playwright.config.ts`.
- **Utilities & scripts**: Helper scripts in `scripts/` (browse-task, deep-context-cheatsheet, save/query learnings). Library helpers in `src/lib/` and `src/utils/`.

Use this as your quick-start map before edits: check pricing in config, copy in page components, and deeper voice/positioning in the Manus/Upton Rand Background folder.*** End Patchراء**"}"} )};
