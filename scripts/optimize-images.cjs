const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const RAW_DIR = path.resolve("public/images/raw");
const OUTPUT_DIR = path.resolve("public/assets/generated");

const variants = [
  { suffix: "desktop", width: 1920 },
  { suffix: "tablet", width: 1280 },
  { suffix: "mobile", width: 768 },
];
// Optional square variant for cards/left hero (1:1, center crop)
const squareVariant = { suffix: "square", size: 1200 };

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function optimize(file) {
  const src = path.join(RAW_DIR, file);
  const parsed = path.parse(file);

  for (const variant of variants) {
    const dest = path.join(OUTPUT_DIR, `${parsed.name}-${variant.suffix}.webp`);
    await sharp(src)
      .resize({ width: variant.width })
      .webp({ quality: 82 })
      .toFile(dest);
    console.log(`Optimized ${dest}`);
  }

  // Produce a square crop as well for card backgrounds if source is large enough
  try {
    const squareDest = path.join(OUTPUT_DIR, `${parsed.name}-${squareVariant.suffix}.webp`);
    await sharp(src)
      .resize({ width: squareVariant.size, height: squareVariant.size, fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toFile(squareDest);
    console.log(`Optimized ${squareDest}`);
  } catch (e) {
    console.warn(`Skip square variant for ${file}: ${e.message}`);
  }
}

async function main() {
  await ensureDir(RAW_DIR);
  await ensureDir(OUTPUT_DIR);

  const files = await fs.promises.readdir(RAW_DIR);
  const pngs = files.filter((file) => path.extname(file).toLowerCase() === ".png");
  if (!pngs.length) {
    console.log("No raw PNGs found.");
    return;
  }

  for (const file of pngs) {
    await optimize(file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
