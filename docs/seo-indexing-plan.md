# SEO Indexing Plan for BespokeEthos.com

This playbook tackles the visibility crisis called out in the latest market report. The steps are ordered by impact and speed to restore crawlability and prove indexing to Google.

## 1) Confirm the site is reachable everywhere
- Test https://www.bespokeethos.com and https://bespokeethos.vercel.app from multiple networks (mobile hotspot, VPN, residential ISP).
- Run `dig bespokeethos.com` and `dig www.bespokeethos.com` against 1.1.1.1 and 8.8.8.8 to confirm DNS is returning the Vercel IPs. If either host fails, add the missing A/AAAA records in the registrar.
- From an external machine, fetch `https://www.bespokeethos.com/robots.txt` and `https://www.bespokeethos.com/sitemap.xml` to ensure they return 200s.

## 2) Remove crawler blockers
- Verify `robots.txt` allows crawling and points to the canonical sitemap (updated in this repo).
- Confirm no `x-robots-tag: noindex` headers are being set by middleware, proxies, or Vercel.
- Spot-check pages in devtools → Network to ensure no `<meta name="robots" content="noindex">` is being injected.

## 3) Establish canonical signals
- Set `NEXT_PUBLIC_SITE_URL=https://www.bespokeethos.com` in Vercel → Environment Variables so all metadata routes emit the correct domain.
- After deploy, load the homepage source and confirm `<link rel="canonical" href="https://www.bespokeethos.com/">` appears (Next.js generates this from `metadataBase`).
- Add 301 redirects in Vercel to force `bespokeethos.com` → `www.bespokeethos.com` and `http` → `https` to avoid duplicate hosts.

## 4) Prove ownership and request indexing
- Add the site to Google Search Console using **domain** verification; add the TXT record at the registrar.
- Submit `https://www.bespokeethos.com/sitemap.xml` and request indexing for the homepage, `/solutions`, `/pricing`, and `/contact`.
- Check Coverage → Crawled pages to confirm the sitemap is being read and no blocking errors exist.

## 5) Health-check the sitemap pipeline
- Hit `/sitemap.xml` after deploy and verify it lists key URLs (homepage, solutions, pricing, contact, about, blog index, blog posts) with recent `lastmod` timestamps.
- If the sitemap is empty, ensure `SKIP_REMOTE_DATA` is not stripping blog data in production.
- Revalidate the sitemap in Search Console after fixes.

## 6) Harden content for fast wins
- Add a short “We’re based in Cleveland, OH” paragraph on the homepage hero or footer to strengthen local relevance.
- Publish a 500-800 word post targeting “Cleveland AI consulting” and link it from the homepage.
- Add internal links from `/pricing` and `/about` to `/contact` and `/solutions` to reinforce crawl paths.

## 7) Monitor and iterate
- Track impressions and clicks daily in Search Console for the first two weeks after fixes.
- If indexing stalls, fetch as Google (URL Inspection → Test Live URL) to see rendered HTML and potential blocking errors.
- Re-check DNS and SSL expiry dates monthly to avoid accidental downtime.

Following this order addresses the root visibility issue before refining offers or messaging. Once Google confirms pages are indexed, move on to the copy and packaging recommendations from the market report.
