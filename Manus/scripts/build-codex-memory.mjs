import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

const MANUS_ROOT = path.resolve("Manus");
const OUTPUT_PATH = path.resolve("Manus/codex-memory-index.json");

const VALID_EXTENSIONS = new Set([".md", ".txt", ".html"]);

function collectTextFiles(rootDir) {
  /** @type {{ file: string; rel: string }[]} */
  const files = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (VALID_EXTENSIONS.has(ext)) {
          const rel = path.relative(rootDir, abs).replace(/\\/g, "/");
          files.push({ file: abs, rel });
        }
      }
    }
  }

  walk(rootDir);
  return files;
}

function chunkText(text, maxChars = 2000) {
  /** @type {string[]} */
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(text.length, start + maxChars);
    chunks.push(text.slice(start, end));
    start = end;
  }
  return chunks;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set in the environment.");
    process.exit(1);
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  if (!fs.existsSync(MANUS_ROOT)) {
    console.error(`Manus root not found at ${MANUS_ROOT}`);
    process.exit(1);
  }

  const files = collectTextFiles(MANUS_ROOT);
  if (files.length === 0) {
    console.error("No text files found in Manus/ to index.");
    process.exit(1);
  }

  /** @type {{ id: string; file: string; rel: string; chunkIndex: number; text: string }[]} */
  const entries = [];

  for (const { file, rel } of files) {
    const raw = fs.readFileSync(file, "utf8");
    const chunks = chunkText(raw);
    chunks.forEach((chunk, idx) => {
      entries.push({
        id: `mem-${rel}-${idx}`,
        file,
        rel,
        chunkIndex: idx,
        text: chunk,
      });
    });
  }

  const texts = entries.map((e) => e.text);

  console.log(`Indexing ${entries.length} chunks from ${files.length} files...`);

  const { data } = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  const index = entries.map((e, i) => ({
    id: e.id,
    file: e.file,
    rel: e.rel,
    chunkIndex: e.chunkIndex,
    embedding: data[i].embedding,
  }));

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(
      {
        model: "text-embedding-3-small",
        count: index.length,
        createdAt: new Date().toISOString(),
        entries: index,
      },
      null,
      2,
    ),
  );

  console.log(`Wrote ${index.length} vectors to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

