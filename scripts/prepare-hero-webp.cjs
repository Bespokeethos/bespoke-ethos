const fs = require("node:fs");
const path = require("node:path");
let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.warn("[images] sharp not available; skipping WebP generation.");
  // Provide a no-op to keep script from failing builds
  process.exit(0);
}

// Convert existing PNG hero images in public/assets/generated into
// compressed WebP variants that the Hero section prefers.
// Output names follow the pattern expected by src/app/_sections/hero/index.tsx
// e.g. hero-flowstack-desktop.webp

const DIR = path.resolve("public/assets/generated");

const SOURCES = [
  { png: "cadence-hero.png", base: "hero-cadence" },
  { png: "flowstack-hero.png", base: "hero-flowstack" },
  { png: "chatbots-hero.png", base: "hero-chatbots" },
  { png: "chatbot-hero.png", base: "hero-chatbots" }, // alias
  { png: "consensus-hero.png", base: "hero-consensus" },
  { png: "redbridging-hero.png", base: "hero-redbridging" },
];

const VARIANTS = [
  { suffix: "desktop", width: 1920 },
  { suffix: "tablet", width: 1280 },
  { suffix: "mobile", width: 768 },
];
const SQUARE = { suffix: "square", size: 1200 };

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function convertOne(srcPng, baseName) {
  for (const v of VARIANTS) {
    const out = path.join(DIR, `${baseName}-${v.suffix}.webp`);
    try {
      await sharp(srcPng).resize({ width: v.width }).webp({ quality: 82 }).toFile(out);
      console.log(`Wrote ${out}`);
    } catch (e) {
      console.warn(`Skip ${out}: ${e.message}`);
    }
  }

  // Also produce square variant used by feature cards when present
  try {
    const squareOut = path.join(DIR, `${baseName}-${SQUARE.suffix}.webp`);
    await sharp(srcPng)
      .resize({ width: SQUARE.size, height: SQUARE.size, fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toFile(squareOut);
    console.log(`Wrote ${squareOut}`);
  } catch (e) {
    console.warn(`Skip square for ${baseName}: ${e.message}`);
  }
}

async function main() {
  await ensureDir(DIR);

  for (const entry of SOURCES) {
    const src = path.join(DIR, entry.png);
    if (fs.existsSync(src)) {
      await convertOne(src, entry.base);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
