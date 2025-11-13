#!/usr/bin/env node
// Generate thin and square, web-optimized PNG/WebP variants for trust badges
// Inputs: existing SVGs in public/assets
// Outputs: PNG + WebP in public/assets/generated/trust

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const ROOT = process.cwd();
const ASSETS = path.resolve('public/assets');
const OUT_DIR = path.resolve('public/assets/generated/trust');

/**
 * Spec for a badge rendering job.
 * type: 'thin' | 'square'
 * width/height: canvas size
 * pad: pixels of padding around inner image
 */
const SPECS = {
  thin: { width: 120, height: 24, pad: 8 },
  square: { width: 64, height: 64, pad: 6 },
};

const SOURCES = [
  // NGLCC
  { name: 'nglcc-badge-light.svg', outBase: 'nglcc', theme: 'light' },
  { name: 'nglcc-badge-dark.svg', outBase: 'nglcc', theme: 'dark' },
  // Catalant
  { name: 'catalant-badge-light.svg', outBase: 'catalant', theme: 'light' },
  { name: 'catalant-badge-dark.svg', outBase: 'catalant', theme: 'dark' },
  // Experience (we already created SVGs for text, use those as source)
  { name: 'experience-5yrs-thin-light.svg', outBase: 'experience-5yrs-thin', theme: 'light', passthrough: true },
  { name: 'experience-5yrs-thin-dark.svg', outBase: 'experience-5yrs-thin', theme: 'dark', passthrough: true },
  { name: 'experience-5yrs-square-light.svg', outBase: 'experience-5yrs-square', theme: 'light', passthrough: true },
  { name: 'experience-5yrs-square-dark.svg', outBase: 'experience-5yrs-square', theme: 'dark', passthrough: true },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function renderIntoCanvas(srcBuf, spec) {
  // Render the source SVG to fit within canvas minus padding
  const innerW = spec.width - spec.pad * 2;
  const innerH = spec.height - spec.pad * 2;
  const rendered = await sharp(srcBuf).resize({ width: innerW, height: innerH, fit: 'inside' }).toBuffer();
  // Create canvas and composite centered
  const canvas = sharp({
    create: {
      width: spec.width,
      height: spec.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });
  const meta = await sharp(rendered).metadata();
  const left = Math.round((spec.width - meta.width) / 2);
  const top = Math.round((spec.height - meta.height) / 2);
  return canvas.composite([{ input: rendered, left, top }]);
}

async function generateOne(src, specKey) {
  const spec = SPECS[specKey];
  const srcPath = path.join(ASSETS, src.name);
  if (!fs.existsSync(srcPath)) {
    console.warn(`[badges] skip missing ${srcPath}`);
    return;
  }
  const buf = await fs.promises.readFile(srcPath);

  // If passthrough is set and the source already matches spec sizing (experience variants),
  // we still render into the spec canvas to normalize final dimensions.
  const canvas = await renderIntoCanvas(buf, spec);

  const outBase = `${src.outBase}-${specKey}-${src.theme}`;
  const outPng = path.join(OUT_DIR, `${outBase}.png`);
  const outWebp = path.join(OUT_DIR, `${outBase}.webp`);

  await canvas.png({ compressionLevel: 9 }).toFile(outPng);
  await canvas.webp({ quality: 85 }).toFile(outWebp);
  console.log(`[badges] wrote ${path.relative(ROOT, outPng)} and .webp`);
}

async function main() {
  await ensureDir(OUT_DIR);
  // thin variants for NGLCC + Catalant + experience
  for (const src of SOURCES) {
    if (src.name.includes('thin')) {
      await generateOne(src, 'thin');
    }
    if (src.name.includes('square') || src.outBase === 'nglcc' || src.outBase === 'catalant') {
      // generate square for all badge brands + explicit square experience
      await generateOne(src, 'square');
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

