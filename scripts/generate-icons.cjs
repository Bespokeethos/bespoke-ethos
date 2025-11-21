const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const OpenAI = require("openai");

const envPaths = [".env.local", ".env"];
for (const envPath of envPaths) {
  const absolute = path.resolve(envPath);
  if (fs.existsSync(absolute)) {
    dotenv.config({ path: absolute, override: false });
  }
}

const OUTPUT_DIR = path.resolve("public/assets/icons");

const ICON_VARIANTS = [
  {
    id: "clarice-icon",
    filename: "clarice.png",
    prompt:
      "Flat 2D icon of an open notebook with a single speech bubble above one page, soft teal and warm cream colors, rounded corners, no text, no faces, high-contrast on a transparent-style background, gentle drop shadow, friendly and non-threatening, square composition.",
  },
  {
    id: "brutus-icon",
    filename: "brutus.png",
    prompt:
      "Flat 2D icon of a small stacked bar chart next to a tidy coin stack, muted navy and soft gold colors, rounded shapes, no text, no people, high-contrast on a transparent-style background, gentle drop shadow, friendly and non-threatening, square composition.",
  },
  {
    id: "astrid-icon",
    filename: "astrid.png",
    prompt:
      "Flat 2D icon of balanced scales in front of a light document outline, lavender and soft blue-gray colors, rounded lines, no text, no people, high-contrast on a transparent-style background, gentle drop shadow, friendly and non-threatening, square composition.",
  },
  {
    id: "ember-icon",
    filename: "ember.png",
    prompt:
      "Flat 2D icon of a smooth rising curve with a small glowing spark above it, warm coral and soft orange colors, rounded shapes, no text, no people, high-contrast on a transparent-style background, gentle drop shadow, friendly and non-threatening, square composition.",
  },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generateIcon({ filename, prompt }, client) {
  const filepath = path.join(OUTPUT_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`Skipping ${filename} (already exists)`);
    return filepath;
  }

  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });

  const image = response.data?.[0];
  if (!image?.b64_json) {
    throw new Error(`Icon generation failed for ${filename}`);
  }

  const buffer = Buffer.from(image.b64_json, "base64");
  await fs.promises.writeFile(filepath, buffer);
  console.log(`Generated ${filename}`);
  return filepath;
}

async function main() {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
  }

  const client = new OpenAI({ apiKey: openaiKey });
  await ensureDir(OUTPUT_DIR);

  for (const variant of ICON_VARIANTS) {
    await generateIcon(variant, client);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
