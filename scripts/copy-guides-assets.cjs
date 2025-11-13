// Copies helpful brand assets from Guides/ into public/ so they are served in production
// Safe to run multiple times; skips when files are missing.
const fs = require("node:fs");
const path = require("node:path");

const COPIES = [
  { src: "Guides/googlelogo.png", dest: "public/assets/googlelogo.png" },
  { src: "Guides/og-image.png", dest: "public/og-image.png" },
  { src: "Guides/nglcc_trust_badge.png", dest: "public/assets/nglcc_trust_badge.png" },
  // iOS/manifest convenience copies (best-effort; real projects should provide sized assets)
  { src: "Guides/googlelogo.png", dest: "public/apple-touch-icon.png" },
  { src: "Guides/googlelogo.png", dest: "public/icons/icon-192.png" },
  { src: "Guides/googlelogo.png", dest: "public/icons/icon-512.png" },
];

for (const { src, dest } of COPIES) {
  try {
    const absSrc = path.resolve(src);
    if (!fs.existsSync(absSrc)) continue;
    const absDest = path.resolve(dest);
    fs.mkdirSync(path.dirname(absDest), { recursive: true });
    const srcStat = fs.statSync(absSrc);
    let doCopy = true;
    if (fs.existsSync(absDest)) {
      const destStat = fs.statSync(absDest);
      doCopy = srcStat.mtimeMs > destStat.mtimeMs || srcStat.size !== destStat.size;
    }
    if (doCopy) {
      fs.copyFileSync(absSrc, absDest);
      console.log(`[assets] Copied ${src} -> ${dest}`);
    }
  } catch (e) {
    console.warn(`[assets] Skipped ${src}:`, e.message);
  }
}
