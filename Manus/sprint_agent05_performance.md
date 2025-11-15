Agent 5 – Performance & UX Reliability
======================================
Mandate
-------
Guard Core Web Vitals and surface-level UX so the marketing site feels instant even as rich media and live content arrives. (Sources: webdev_cls.txt, webdev_lcp.txt)

Key Findings & Tasks
--------------------
1. Cumulative Layout Shift (CLS)  
   - CLS must stay <=0.1 for 75% of visits (webdev_cls.txt). Major culprits: missing width/height on Sanity-sourced images, ads/embeds injected without reserved space, and late-loading web fonts.  
   - Mitigations: flow all Sanity image metadata through Next `<Image>` so intrinsic sizes are known, reserve static height for embeds/ads, and use `font-display: swap` or preloaded font files to prevent FOIT-induced shifts.  
   - Monitor both lab (Lighthouse user flows) and field (CrUX) data because user interactions outside initial load can still trigger CLS when lazy-loaded components push content.
2. Largest Contentful Paint (LCP)  
   - Target <=2.5s at p75 (webdev_lcp.txt). Break LCP into server response, resource load, and render phases so we can pinpoint bottlenecks.  
   - Ensure hero images use optimized formats (WebP/AVIF) via Sanity’s image pipeline, preconnect to Sanity/Vercel image domains, and inline critical CSS.  
   - Use RUM to capture real-user LCP; DevTools Performance panel overlays CrUX data so developers can compare local traces with the field baseline.
3. Operational Checklist  
   - Align with Agent 1 so the Live Content API only powers “islands” and doesn’t re-render entire routes unnecessarily (helps Router Cache hit rate and CLS).  
   - Document a regression workflow: run `lighthouse` user flows per release, double-check p75 numbers in CrUX/PageSpeed Insights, and flag anything trending towards the “needs improvement” bands (CLS >0.1, LCP >2.5s).  
   - Funnel Web Vitals into analytics dashboards so non-engineering stakeholders see the impact of design/content changes.
