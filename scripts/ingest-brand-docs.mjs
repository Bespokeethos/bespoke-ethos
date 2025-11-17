#!/usr/bin/env node

import path from "node:path";
import { readFile } from "node:fs/promises";
import crypto from "node:crypto";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const REQUIRED_ENV_VARS = [
  "OPENAI_API_KEY",
  "PINECONE_API_KEY",
  "PINECONE_HOST",
  "EMBEDDING_MODEL",
];

const env = {};
const missing = [];

for (const name of REQUIRED_ENV_VARS) {
  const value = process.env[name];
  env[name] = value ? value.trim() : "";
  if (!env[name]) missing.push(name);
}

if (missing.length > 0) {
  console.error(
    `Missing environment variables: ${missing.join(
      ", ",
    )}. Load them in .env.local or the current shell.`,
  );
  process.exit(1);
}

const DOCS = [
  {
    id: "founders-bible",
    title: "Founders Bible",
    file: path.join("Manus", "founders_bible.txt"),
  },
  {
    id: "vercel-ai-gateway",
    title: "Vercel AI Gateway Docs",
    file: path.join("Manus", "vercel_ai_gateway.html"),
  },
  {
    id: "conversion-attack-plan",
    title: "Founder-Focused Conversion Attack Plan",
    file: path.join(
      "Manus",
      "guides",
      "Bespoke Ethos_ The Founder-Focused Conversion Attack Plan.md",
    ),
  },
  {
    id: "market-research",
    title: "Market Research & Conversion Analysis",
    file: path.join(
      "Manus",
      "guides",
      "BESPOKE ETHOS MARKET RESEARCH & CONVERSION ANALYSIS.md",
    ),
  },
];

const CHUNK_SIZE = 3000;
const CHUNK_OVERLAP = 250;
const namespace = process.env.PINECONE_NAMESPACE || "production";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function embed(text) {
  const body = {
    input: text,
    model: env.EMBEDDING_MODEL,
  };

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(
      `OpenAI embedding request failed (${res.status}): ${errBody}`,
    );
  }

  const data = await res.json();
  return data.data?.[0]?.embedding;
}

async function upsertVector(vector) {
  const payload = {
    vectors: [vector],
    namespace,
  };

  const res = await fetch(`${env.PINECONE_HOST}/vectors/upsert`, {
    method: "POST",
    headers: {
      "Api-Key": env.PINECONE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(
      `Pinecone upsert failed (${res.status}): ${errBody.slice(0, 400)}`,
    );
  }
}

function chunkText(text) {
  const chunks = [];
  let index = 0;
  while (index < text.length) {
    const chunk = text.slice(index, index + CHUNK_SIZE);
    if (chunk.trim()) {
      chunks.push(chunk.trim());
    }
    index += CHUNK_SIZE - CHUNK_OVERLAP;
  }
  return chunks;
}

async function ingestDoc(doc) {
  const absolutePath = path.resolve(process.cwd(), doc.file);
  const contents = await readFile(absolutePath, "utf-8");
  const chunks = chunkText(contents);
  const inserted = [];

  console.log(`\nProcessing "${doc.title}" (${chunks.length} chunks)...`);

  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i];
    const embedding = await embed(chunk);
    if (!embedding || !Array.isArray(embedding)) {
      throw new Error(`No embedding returned for chunk ${i + 1}`);
    }

    const id = `${doc.id}-${String(i + 1).padStart(3, "0")}-${crypto
      .randomBytes(4)
      .toString("hex")}`;

    const metadata = {
      project: "bespoke-ethos",
      source: doc.id,
      title: doc.title,
      chunk_index: i + 1,
      total_chunks: chunks.length,
      file: doc.file,
    };

    await upsertVector({
      id,
      values: embedding,
      metadata,
    });

    inserted.push(id);

    if ((i + 1) % 5 === 0) {
      await delay(500);
    }
  }

  console.log(
    `Finished "${doc.title}" -> ${inserted.length} vectors (namespace: ${namespace}).`,
  );

  return {
    doc: doc.id,
    count: inserted.length,
    ids: inserted,
  };
}

async function main() {
  const results = [];
  for (const doc of DOCS) {
    try {
      const result = await ingestDoc(doc);
      results.push(result);
    } catch (error) {
      console.error(`Failed ingesting ${doc.title}: ${error.message}`);
      process.exit(1);
    }
  }

  console.log("\n=== Ingestion Summary ===");
  for (const result of results) {
    console.log(
      `• ${result.doc}: ${result.count} chunks upserted (example id: ${result.ids[0]})`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
