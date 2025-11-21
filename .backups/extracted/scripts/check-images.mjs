#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.warn('[images][warn] sharp not available, will skip dimension checks.');
}

const dir = 'public/assets/generated';
const log = (m) => process.stdout.write(`[images] ${m}\n`);
const fail = (m) => { process.stderr.write(`[images][fail] ${m}\n`); process.exit(1); };

if (!fs.existsSync(dir)) fail(`${dir} missing`);

const files = fs.readdirSync(dir).filter(f => /\.(webp|png|jpe?g)$/i.test(f));
if (!files.length) fail('No image files found in generated');

const isSlide = (name) => /hero-(flowstack|chatbots|consensus|redbridging)-(desktop|tablet|mobile)\.webp$/i.test(name);
const isHeroPng = (name) => /(flowstack|chatbots|chatbot|consensus|redbridging)-hero\.png$/i.test(name);
const isSquareWebp = (name) => /hero-(flowstack|chatbots|consensus|redbridging)-square\.webp$/i.test(name);

const maxSizeBytes = 250 * 1024; // 250KB budget per hero asset
let errors = [];
let warnings = [];

function near(a, b, tol = 0.03) { // 3% tolerance
  return Math.abs(a - b) / b <= tol;
}

await Promise.all(files.map(async (f) => {
  try {
    const p = path.join(dir, f);
    const buf = fs.readFileSync(p);
    if (!sharp) {
      const sz = fs.statSync(p).size;
      // Perform size checks even without dimension metadata
      if (isSlide(f) || isHeroPng(f)) {
        if (sz > maxSizeBytes) {
          const msg = `${f}: ${Math.round(sz/1024)}KB exceeds 250KB`;
          // PNG heroes exceeding budget are warnings unless STRICT_IMAGE_BUDGET=1
          if (!process.env.STRICT_IMAGE_BUDGET && isHeroPng(f)) warnings.push(msg);
          else errors.push(msg);
        }
      }
      log(`${f}\t?x?\t${Math.round(sz/1024)}KB`);
      return;
    }
    const { width, height } = await sharp(buf).metadata();

    if (!width || !height) {
      errors.push(`${f}: unknown dimensions`);
      return;
    }

    const ratio = width / height;
    const sz = fs.statSync(p).size;

    if (isSlide(f)) {
      if (!near(ratio, 16/9)) errors.push(`${f}: ratio ${ratio.toFixed(3)} not ~16:9`);
      if (sz > maxSizeBytes) errors.push(`${f}: ${Math.round(sz/1024)}KB exceeds 250KB`);
    } else if (isHeroPng(f)) {
      if (sz > maxSizeBytes) {
        const msg = `${f}: ${Math.round(sz/1024)}KB exceeds 250KB`;
        if (!process.env.STRICT_IMAGE_BUDGET) warnings.push(msg); else errors.push(msg);
      }
    } else if (isSquareWebp(f)) {
      // Square card variants should stay lean
      if (sz > maxSizeBytes) errors.push(`${f}: ${Math.round(sz/1024)}KB exceeds 250KB`);
    }

    log(`${f}\t${width}x${height}\t${Math.round(sz/1024)}KB`);
  } catch (e) {
    errors.push(`${f}: ${e.message}`);
  }
}));

if (warnings.length) {
  warnings.forEach(w => console.warn(`[images][warn] ${w}`));
}
if (errors.length) {
  fail(`Found issues:\n - ${errors.join('\n - ')}`);
}

log('All generated images look good.');
