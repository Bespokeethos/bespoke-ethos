#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const log = (m) => process.stdout.write(`[preflight] ${m}\n`);
const warn = (m) => process.stdout.write(`[preflight][warn] ${m}\n`);
const fail = (m) => { process.stderr.write(`[preflight][fail] ${m}\n`); process.exit(1); };

// 1) Node version
const nodeMajor = Number(process.versions.node.split('.')[0]);
if (Number.isNaN(nodeMajor)) fail('Cannot parse Node version.');
if (nodeMajor < 18) fail(`Node ${process.versions.node} too old. Require >= 18.x (20.x for prod).`);
if (nodeMajor < 20) warn(`Node ${process.versions.node} < 20.x. OK locally; prod requires 20.x.`);
log(`Node OK: ${process.versions.node}`);

// 2) Vercel project link
let projectId;
try {
  const raw = fs.readFileSync('.vercel/project.json', 'utf8');
  const pj = JSON.parse(raw);
  projectId = pj.projectId;
  if (!projectId) fail('Missing projectId in .vercel/project.json');
  if (projectId !== 'prj_8cbai6JzE169NUytyFtCpSohZVka') fail(`Wrong projectId ${projectId}`);
  log(`Vercel project OK: ${projectId}`);
} catch (e) {
  fail(`Cannot read .vercel/project.json: ${e.message}`);
}

// 3) Canonical URL env
const canonical = process.env.NEXT_PUBLIC_SITE_URL || '';
if (!canonical) warn('NEXT_PUBLIC_SITE_URL not set (OK locally). Set to https://www.bespokeethos.com in prod.');
else if (canonical !== 'https://www.bespokeethos.com') fail(`NEXT_PUBLIC_SITE_URL mismatch: ${canonical}`);
else log('Canonical URL OK');

// 4) BASEHUB_TOKEN (legacy)
if (process.env.BASEHUB_TOKEN) {
  warn('BASEHUB_TOKEN is set but BaseHub has been removed; consider deleting this env var.');
} else {
  log('BASEHUB_TOKEN not set (expected post-migration).');
}

// 5) Required assets (allow either responsive webp set OR new hero pngs)
const requiredLogos = [
  'public/assets/logo-dark.png',
  'public/assets/logo-light.png',
];
for (const p of requiredLogos) if (!fs.existsSync(p)) fail(`Missing logo asset: ${p}`);

const webpSet = [
  'public/assets/generated/hero-flowstack-desktop.webp',
  'public/assets/generated/hero-flowstack-tablet.webp',
  'public/assets/generated/hero-flowstack-mobile.webp',
  'public/assets/generated/hero-chatbots-desktop.webp',
  'public/assets/generated/hero-chatbots-tablet.webp',
  'public/assets/generated/hero-chatbots-mobile.webp',
  'public/assets/generated/hero-consensus-desktop.webp',
  'public/assets/generated/hero-consensus-tablet.webp',
  'public/assets/generated/hero-consensus-mobile.webp',
  'public/assets/generated/hero-redbridging-desktop.webp',
  'public/assets/generated/hero-redbridging-tablet.webp',
  'public/assets/generated/hero-redbridging-mobile.webp',
];
const pngSet = [
  'public/assets/generated/flowstack-hero.png',
  // Chatbots file may be singular (chatbot-hero.png) or plural (chatbots-hero.png)
  ['public/assets/generated/chatbots-hero.png','public/assets/generated/chatbot-hero.png'],
  'public/assets/generated/consensus-hero.png',
  'public/assets/generated/redbridging-hero.png',
];

const hasAllWebp = webpSet.every((p)=>fs.existsSync(p));
const hasAllPng = pngSet.every((p)=>Array.isArray(p) ? p.some(x=>fs.existsSync(x)) : fs.existsSync(p));
if (!hasAllWebp && !hasAllPng) {
  const missingWebp = webpSet.filter(p=>!fs.existsSync(p));
  const missingPng = pngSet
    .map(p=>Array.isArray(p)?(p.some(x=>fs.existsSync(x))?null:p.join(' | ')):(fs.existsSync(p)?null:p))
    .filter(Boolean);
  fail(`Missing hero assets. Provide either full webp set OR png set.\n- Missing webp: ${missingWebp.join(', ')}\n- Missing png: ${missingPng.join(', ')}`);
}
log(`Hero assets OK (${hasAllWebp ? 'webp' : 'png'} set detected)`);

// 6) Key files exist
const keyFiles = [
  'src/app/_components/header/index.tsx',
  'src/app/_sections/hero/index.tsx',
  'src/app/_sections/hero/slideshow.tsx',
  'src/app/_components/seo/organization-jsonld.tsx',
  'src/proxy.ts',
  'src/app/layout.tsx',
  'src/app/sitemap.ts',
];
for (const p of keyFiles) {
  if (!fs.existsSync(p)) fail(`Missing key file: ${p}`);
}
log('Key files present');

log('Preflight passed');
