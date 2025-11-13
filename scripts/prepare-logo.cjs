#!/usr/bin/env node
// Trim transparent borders and produce zoomed header + square variants
const fs = require('node:fs');
const path = require('node:path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.warn('[images] sharp not available; skipping logo preparation.');
  process.exit(0);
}

const SRC_DIR = path.resolve('public/assets');
const OUT_DIR = path.resolve('public/assets/generated');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function produce(srcName, outHeaderName, outSquareName) {
  const srcPath = path.join(SRC_DIR, srcName);
  if (!fs.existsSync(srcPath)) {
    console.warn(`[images] skip ${srcName} (missing)`);
    return;
  }

  // Trim transparent borders aggressively to remove negative space
  // threshold ~32 for tighter crop while avoiding glyph erosion
  const img = sharp(srcPath).trim({ threshold: 32 });

  // Add a small transparent safety padding so edges don't clip when scaled
  const padded = await img
    .extend({ top: 4, bottom: 4, left: 8, right: 8, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  // Header variant: target around 120px height for crisp downscaling
  const headerOut = path.join(OUT_DIR, outHeaderName);
  await sharp(padded).resize({ height: 180 }).png({ compressionLevel: 9, palette: true }).toFile(headerOut);
  console.log(`[images] wrote ${headerOut}`);

  // Square variant: fit into transparent square (512x512)
  const squareOut = path.join(OUT_DIR, outSquareName);
  await sharp({ create: { width: 512, height: 512, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      {
        input: await sharp(padded)
          .resize({ height: 440, width: 440, fit: 'inside', withoutEnlargement: true })
          .png({ palette: true })
          .toBuffer(),
        gravity: 'center',
      },
    ])
    .png({ compressionLevel: 9, palette: true })
    .toFile(squareOut);
  console.log(`[images] wrote ${squareOut}`);
}

async function main() {
  await ensureDir(OUT_DIR);
  // Prefer explicitly provided header logo if present
  if (fs.existsSync(path.join(SRC_DIR, 'logo_light2.png'))) {
    await produce('logo_light2.png', 'logo-header-light.png', 'logo-square-light.png');
  } else {
    await produce('logo-light.png', 'logo-header-light.png', 'logo-square-light.png');
  }
  await produce('logo-dark.png', 'logo-header-dark.png', 'logo-square-dark.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(0); // do not fail the build
});
