Agent 2 – Next.js Runtime & API Specialist
==========================================
Mandate
-------
Architect how the App Router fetches, caches, and serves content/APIs so that editorial updates flow predictably while performance budgets stay intact. (Sources: next_fetch.txt, next_caching.txt, next_route_handlers.txt, next_metadata.txt)

Runtime & Data Strategy
-----------------------
1. Data fetching controls  
   - `fetch` is cached by default inside Server Components; annotate calls with `cache: 'no-store'` for per-request freshness or `next: { revalidate: 60, tags: ['posts'] }` for ISR with manual `revalidateTag/revalidatePath` hooks (next_fetch.txt).  
   - Consolidate shared fetches via Request Memoization so repeated calls in a render tree reuse results inside a single request lifecycle.  
   - When streaming UI, pair `React.cache` helpers with route-level async components to avoid duplicate upstream hits.
2. Cache layers and invalidation  
   - Understand the four layers (Request Memoization, Data Cache, Full Route Cache, Router Cache) and decide per route whether it should stay static, be ISR’d, or opt into dynamic rendering (next_caching.txt).  
   - Expose `export const revalidate = 0` or `export const dynamic = 'force-dynamic'` for preview routes where Sanity draft mode must bypass caches.  
   - Group related fetches with cache tags so Agent 1 can blast only the content that changed instead of global revalidations.
3. Route Handlers as backend surface area  
   - Implement REST-ish endpoints inside `app/api/**/route.ts` files that export HTTP verb functions (e.g., `export async function POST(request: Request)`), leverage the standard Web `Request/Response` plus `NextResponse`, and stream bodies when needed (next_route_handlers.txt).  
   - Support dynamic segments (`app/api/posts/[slug]/route.ts`), configure per-handler caching/ISR with the same segment config, and add custom headers/CORS either inline or via `next.config.js`.  
   - Use Route Handlers for non-UI artifacts (Open Graph images, `robots.txt`, `sitemap.xml`) unless Metadata File conventions already cover them.
4. Metadata governance  
   - Define default page metadata via `export const metadata: Metadata = { title, description, openGraph, twitter, robots, icons, metadataBase }` in Server Components, and switch to `export async function generateMetadata(props)` when values depend on fetched Sanity content (next_metadata.txt).  
   - Because metadata streams separately, ensure fetches inside `generateMetadata` respect the same cache rules/tagging as the page content to avoid stale titles.  
   - Register image/OG generators via the dedicated Metadata File conventions so marketing has programmatic control over preview assets.

Action Items
------------
- Produce a cache/tag matrix for every `app/` segment (static vs ISR vs dynamic) before integration starts.  
- Build a shared `lib/fetcher.ts` that wraps `fetch` with logging of `cache`/`next` options to keep behavior transparent.  
- Pair with Agent 1 to expose helper utilities (`getPost`, `getLivePost`) that encapsulate revalidation tags and error boundaries.
