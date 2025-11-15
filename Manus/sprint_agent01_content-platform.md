Agent 1 – Content Platform Integrator
=====================================
Mandate
-------
Stand up and evolve the Sanity <-> Next.js editorial stack so editors get instant feedback while engineers retain type safety and image controls. (Sources: quick1.txt, sanity_schema.txt, sanity_display.txt, sanity_preview.txt, sanity_live_api.txt, sanity_image.txt)

Implementation Pillars
----------------------
1. Studio bootstrapping and access  
   - Create a clean Studio locally with `npm create sanity@latest -- --dataset production --template clean --typescript --output-path studio-hello-world` and run it via `npm run dev` at http://localhost:3333 for authentication parity with the CLI (quick1.txt).  
   - Version-control the resulting `studio-hello-world` folder and document any custom `sanity.config.ts` overrides that editors will rely on.
2. Schema governance  
   - Register document types inside `schemaTypes/index.ts` and colocated modules (for example `postType.ts` that declares title, slug, publishedAt, image, and Portable Text `body`) using `defineType`/`defineField` to enforce required validations (sanity_schema.txt).  
   - Adopt incremental schema deploys so Studio auto-reloads when schema arrays change.
3. Next.js content delivery  
   - Follow Sanity’s “Displaying content in Next.js” recipe: scaffold a Next 15 App Router project, add `@sanity/client`/`next-sanity`, load `projectId`, `dataset`, `apiVersion`, and `useCdn` from env, and hydrate server components via GROQ-powered helpers (sanity_display.txt).  
   - Use `generateStaticParams` plus Sanity queries for SSG paths and fall back to `force-dynamic` for author previews.
4. Visual Editing & draft mode  
   - Store Studio + Presentation URLs and viewer tokens in `.env`; enable draft mode through a dedicated route handler, disable it via a server action + `<DisableDraftMode>` component, and wrap the root layout with `<VisualEditing>` so stega overlays jump editors back into Studio (sanity_preview.txt).  
   - Guard preview endpoints with Viewer-role tokens and route groups so the embedded Studio stays isolated.
5. Live updates  
   - When real-time fidelity is required, swap `client.fetch` for `sanityFetch` produced by `defineLive`, supply viewer tokens as `browserToken`/`serverToken`, and let the Live Content API stream mutations (sanity_live_api.txt).  
   - Scope live regions (home hero, trading floor tickers, etc.) while the rest of the route stays statically rendered to control usage quotas.
6. Asset and image policy  
   - Serve Sanity-hosted images through the CDN base URL (`https://cdn.sanity.io/images/<project>/<dataset>/<asset>-<w>x<h>.<ext>`) plus URL params such as `?w=1200&h=630&fit=crop&auto=format` to resize, crop, pad, blur, or request JSON metadata (sanity_image.txt).  
   - Clamp small assets with `fit=max`, define crop rectangles via `rect=left,top,width,height`, and predeclare responsive widths that line up with Next’s `<Image>` component.

Operational Risks & Follow-ups
------------------------------
- Verify that all draft/live env variables (projectId, dataset, live tokens, Presentation URLs) are mirrored in Vercel once Agent 3 finalizes the secrets strategy.  
- Coordinate with Agent 2 on cache tags so `revalidateTag('sanity:post:<id>')` is fired whenever mutations arrive through the Live Content API.  
- Capture image CDN parameter presets in a shared helper to avoid ad-hoc URL strings.
