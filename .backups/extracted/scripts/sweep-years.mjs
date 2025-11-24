#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build', '.vercel', '.vscode']);
const ALLOW_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css', '.scss', '.md', '.mdx', '.txt']);

/**
 * Replace various "5 years" phrasings with "5 years" while preserving common title casing.
 */
function replaceYears(text) {
  let out = text;
  // Exact title-case heading style
  out = out.replace(/\b10\s+Years\b/g, '5 Years');
  // Lowercase common copy
  out = out.replace(/\b10\s+years\b/g, '5 years');
  // Variants with plus or extra spaces
  out = out.replace(/\b10\+?\s*years\b/gi, (m) => {
    return /Years/.test(m) ? '5 Years' : '5 years';
  });
  // Spelled-out variant
  out = out.replace(/\bten\s+years\b/gi, (m) => {
    // Preserve capitalization of "years"
    const years = /Years/.test(m) ? 'Years' : 'years';
    // Capitalize Five if original Ten was capitalized
    const five = /^[A-Z]/.test(m) ? 'Five' : 'five';
    return `${five} ${years}`;
  });
  return out;
}

async function* walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      const ext = path.extname(entry.name);
      if (ALLOW_EXT.has(ext)) yield full;
    }
  }
}

async function main() {
  let changed = 0;
  for await (const file of walk(ROOT)) {
    const before = await fs.promises.readFile(file, 'utf8');
    const after = replaceYears(before);
    if (after !== before) {
      await fs.promises.writeFile(file, after, 'utf8');
      changed++;
      console.log(`Updated: ${path.relative(ROOT, file)}`);
    }
  }
  console.log(`Done. Files changed: ${changed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

