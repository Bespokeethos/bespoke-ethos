import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

const INDEX_PATH = path.resolve("Manus/codex-memory-index.json");

function dot(a, b) {
  let s = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) s += a[i] * b[i];
  return s;
}

async function main() {
  const query = process.argv.slice(2).join(" ").trim();
  if (!query) {
    console.error("Usage: node Manus/scripts/query-codex-memory.mjs \"your question or keywords\"");
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set in the environment.");
    process.exit(1);
  }

  if (!fs.existsSync(INDEX_PATH)) {
    console.error(`Index not found at ${INDEX_PATH}. Run build-codex-memory.mjs first.`);
    process.exit(1);
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const indexData = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  const entries = indexData.entries ?? [];
  if (!entries.length) {
    console.error("Index contains no entries.");
    process.exit(1);
  }

  const { data } = await client.embeddings.create({
    model: indexData.model || "text-embedding-3-small",
    input: query,
  });

  const q = data[0].embedding;

  const scored = entries.map((e) => ({
    ...e,
    score: dot(q, e.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 5);

  console.log(`Query: ${query}`);
  console.log("Top matches:");
  for (const m of top) {
    console.log(
      `- ${m.rel} [chunk ${m.chunkIndex}] score=${m.score.toFixed(4)}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

