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

// 5) Required assets
const requiredLogos = [
  'public/assets/logo-dark.png',
  'public/assets/logo-light.png',
];
for (const p of requiredLogos) if (!fs.existsSync(p)) fail(`Missing logo asset: ${p}`);

const heroCadenceSet = [
  'public/assets/generated/hero-cadence-desktop.webp',
  'public/assets/generated/hero-cadence-tablet.webp',
  'public/assets/generated/hero-cadence-mobile.webp',
];
const missingCadence = heroCadenceSet.filter((p) => !fs.existsSync(p));
if (missingCadence.length) fail(`Missing ConversionOptimizedHero assets: ${missingCadence.join(', ')}`);
log('Hero Cadence assets OK');

// 6) Key files exist
const keyFiles = [
  'src/app/_components/header/index.tsx',
  'src/components/conversion-optimized-hero.tsx',
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
