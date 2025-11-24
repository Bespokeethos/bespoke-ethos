# Image Generation Workflow

This guide captures how we generate AI-driven marketing art while keeping cost, quality, and process transparent.

## When requesting images

1. **Confirm quality vs. cost first.** The operator (Codex) should ask which model/size combo you want *before* kicking off generation (see comparison table below).  
2. **Log prompts and intent** so we can trace updates later. Include whether the asset is for production, a concept sketch, or internal experimentation.
3. **Decide between single vs. batch.** If you need several variations, list all prompts up front so the batch helper can run them together.

## Quick model comparison

| Model | Best for | Size options | Approx cost | Notes |
| --- | --- | --- | --- | --- |
| `gpt-image-1` | Highest fidelity hero images, photoreal detail | 1024×1024 (custom aspect via `width`/`height`) | ~$2 per image | Best quality; also supports background removal. |
| `dall-e-3` | High quality with prompt rewriting assistance | 1024×1024, 1792×1024 | Slightly higher | Good mix of realism + flexible framing. |
| `dall-e-2` | Concept batches, iconography | 256×256 → 1024×1024 | Lower | Faster/cheaper for iterations. |

Always confirm which tier you want before we spend credits.

## Minimal Node.js script

```ts
#!/usr/bin/env node
import dotenv from "dotenv";
import fs from "fs";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage(prompt: string, opts?: { model?: string; size?: string }) {
  const { model = "gpt-image-1", size = "1024x1024" } = opts ?? {};

  const response = await openai.images.generate({
    model,
    prompt,
    n: 1,
    size,
    response_format: "b64_json",
  });

  const outputDir = "public/images/generated";
  fs.mkdirSync(outputDir, { recursive: true });

  const { b64_json: b64, revised_prompt: promptUsed } = response.data[0];
  const buffer = Buffer.from(b64!, "base64");
  const filename = `${Date.now()}.png`;
  fs.writeFileSync(`${outputDir}/${filename}`, buffer);

  return { filename, promptUsed };
}

async function run() {
  const prompts = process.argv.slice(2);
  if (prompts.length === 0) {
    console.error("Usage: node scripts/generate-image.js \"hero prompt\"");
    process.exit(1);
  }

  for (const prompt of prompts) {
    const result = await generateImage(prompt);
    console.log(`Generated ${result.filename} (prompt: ${result.promptUsed ?? prompt})`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

> Save as `scripts/generate-image.ts` (or `.js`), install `openai` + `dotenv`, and run with `pnpm exec tsx scripts/generate-image.ts "prompt here"`.

## Batch generation helper

```ts
const prompts = [
  "Hero background, abstract light trails in bespoke ethos palette",
  "Product feature highlight, split layout, tech dashboard",
  "Customer testimonial backdrop, warm studio lighting",
];

const results = await Promise.all(prompts.map((p) => generateImage(p)));
console.table(results);
```

Batching keeps the cost transparent. Confirm total projected spend before launching e.g. 5+ prompts.

## Cost hygiene checklist

- ✅ Verify `OPENAI_API_KEY` is loaded from `.env.local` (never hardcode keys).
- ✅ Ask “Which model/size do you want, and what’s the budget?” before generating.
- ✅ Store outputs under `public/images/generated` and reference via `/images/generated/<filename>.png`.
- ✅ Track usage (prompt, model, size, purpose) in PR notes or docs if assets ship to production.
- ❌ Do not run large batches without explicit go-ahead; confirm cost first.

Following the above means Codex will always check in about price/quality and keep the workflow consistent across deployments.
