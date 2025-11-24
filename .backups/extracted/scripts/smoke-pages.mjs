#!/usr/bin/env node
// Lightweight filesystem-based smoke checks (no dev server):
// - Ensure canonical is configured
// - Ensure JSON-LD components exist
// - Ensure header uses logo light/dark
// - Ensure routes files exist

import fs from 'fs';

const log = (m) => process.stdout.write(`[smoke] ${m}\n`);
const fail = (m) => { process.stderr.write(`[smoke][fail] ${m}\n`); process.exit(1); };

function mustExist(p) {
  if (!fs.existsSync(p)) fail(`Missing file: ${p}`);
}

// 1) Canonical in layout
mustExist('src/app/layout.tsx');
const layout = fs.readFileSync('src/app/layout.tsx','utf8');
if (!layout.includes('https://www.bespokeethos.com')) fail('Canonical default missing in layout');
log('Layout canonical OK');

// 2) JSON-LD components present
mustExist('src/app/_components/seo/organization-jsonld.tsx');
mustExist('src/app/_components/seo/website-jsonld.tsx');
const org = fs.readFileSync('src/app/_components/seo/organization-jsonld.tsx','utf8');
if (!org.includes('/assets/logo-light.png')) fail('Organization JSON-LD logo should reference /assets/logo-light.png');
log('JSON-LD components OK');

// 3) Header logos + nav links
mustExist('src/app/_components/header/index.tsx');
const header = fs.readFileSync('src/app/_components/header/index.tsx','utf8');
if (!header.match(/logo-(dark|light)\.png/)) fail('Header should reference logo-dark.png/light.png');
['/solutions','/pricing','/blog'].forEach(href => {
  if (!header.includes(href)) fail(`Header link missing: ${href}`);
});
if (!header.includes('/changelog')) {
  console.warn('[smoke][warn] Header link missing: /changelog (optional)');
}
log('Header links/logos OK');

// 4) Hero slideshow present
mustExist('src/app/_sections/hero/index.tsx');
mustExist('src/app/_sections/hero/slideshow.tsx');
const slide = fs.readFileSync('src/app/_sections/hero/slideshow.tsx','utf8');
if (!/prefers-reduced-motion/.test(slide)) fail('Slideshow should handle reduced motion');
if (!/useEmblaCarousel|embla/.test(slide)) fail('Slideshow should use Embla or equivalent carousel');
if (!/onMouseEnter\s*=\s*{\s*\([^)]*\)\s*=>\s*setPaused\(true\)/.test(slide)) fail('Slideshow should pause on hover');
log('Hero slideshow behavior OK');

// 5) Sitemap + robots exist
mustExist('src/app/sitemap.ts');
if (!fs.existsSync('src/app/robots.ts') && !fs.existsSync('public/robots.txt')) {
  // Allow either dynamic robots or static robots.txt
  fail('robots not found (src/app/robots.ts or public/robots.txt)');
}
log('Sitemap/robots presence OK');

// 6) Trust badges present
['public/assets/nglcc-badge-light.svg','public/assets/nglcc-badge-dark.svg','public/assets/catalant-badge-light.svg','public/assets/catalant-badge-dark.svg']
  .forEach(p => mustExist(p));
log('Trust badges OK');

log('Smoke checks passed');
