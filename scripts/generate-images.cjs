const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const os = require("node:os");

const envPaths = [".env.local", ".env"];
for (const envPath of envPaths) {
  const absolute = path.resolve(envPath);
  if (fs.existsSync(absolute)) {
    dotenv.config({ path: absolute, override: false });
  }
}

// Raw PNGs written here; optimizer emits WebP variants into public/assets/generated
const OUTPUT_DIR = path.resolve("public/images/raw");

const VARIANTS = [
  // Header/Footer accents
  {
    id: "header-accent",
    prompt:
      "Horizontal header accent for a modern automation brand. Abstract luminous data streams and particles sweeping left-to-right, teal-to-charcoal gradient with soft highlights, generous negative space for navigation overlays, subtle depth for premium feel. Ultra-clean, 16:9, no text or logos.",
  },
  {
    id: "footer-wave",
    prompt:
      "Footer wave background with layered flowing curves that suggest stability and forward motion. Teal, midnight charcoal, and softly glowing aquamarine accents, gentle lighting, wide negative space for content. Minimalist enterprise styling, 16:9, no text or logos.",
  },
  // Hero slides (deterministic IDs)
  {
    id: "hero-flowstack",
    prompt:
      "Hero splash for Flowstack (TM) automation service. Split scene before-and-after small business desk: left side cluttered with invoices, sticky notes, browser tabs; right side calm workspace with one elegant automation flow diagram glowing in teal and deep blue. Warm natural light on owner looking relieved, contemporary studio photography blended with soft 3D UI elements. Keep focal subject offset to leave negative space for hero copy. Enterprise SaaS aesthetic, gentle gradients, 16:9 composition, absolutely no visible text or logos.",
  },
  {
    id: "hero-chatbots",
    prompt:
      "Hero splash for Flowstack Chatbots (TM). Close-up of a modern smartphone floating over a dark-to-teal gradient, screen showing luminous friendly chat bubbles that answer common customer questions like hours and pricing without rendering actual text. Include subtle icons for handoffs and lead capture, soft rim lighting, approachable yet premium. Leave generous negative space for overlay copy. Enterprise marketing photography vibe with light UI stylization, 16:9, no readable text or logos.",
  },
  {
    id: "hero-consensus",
    prompt:
      "Hero splash for Consensus Engine (TM) strategic clarity service. Abstract visualization of four distinct luminous ribbons (teal, cobalt, amber, violet) representing expert perspectives, converging into one bright decision beam terminating in a crisp checkmark glyph made of light. Convey sense of analysis, clarity, and confidence; layered depth with conic gradients and faint data grids. Preserve negative space for headline placement. Sleek enterprise data visualization aesthetic, 16:9, no literal text or logos.",
  },
  {
    id: "hero-redbridging",
    prompt:
      "Hero splash for RedBridging (TM) incident response. Stylized bridge constructed from luminous circuit traces spanning from a chaotic warm orange side (depicting incident) to a calm cool teal side (restored stability). Include a discreet shield-and-lock light icon guarding the midpoint, hinting at secure monitoring. Use cinematic depth, volumetric light, and ample negative space so hero copy remains legible. Clean reliable SaaS aesthetic, 16:9, no textual elements or logos.",
  },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generateWithOpenAI({ id, prompt }, client) {
  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1536x1024",
  });

  const image = response.data?.[0];
  if (!image?.b64_json) {
    throw new Error(`Image generation failed for ${id}`);
  }

  const buffer = Buffer.from(image.b64_json, "base64");
  const filename = `${id}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);
  await fs.promises.writeFile(filepath, buffer);
  console.log(`Generated ${filename}`);
  return filepath;
}

async function generateWithStability({ id, prompt }, apiKey) {
  const endpoint = "https://api.stability.ai/v2beta/stable-image/generate/core";
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("aspect_ratio", "3:2"); // ~1536x1024
  form.append("output_format", "png");
  // Keep imagery brand-safe and text-free
  form.append("safety", "true");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "image/*",
    },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Stability generation failed for ${id}: ${res.status} ${res.statusText} ${text}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = `${id}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);
  await fs.promises.writeFile(filepath, buffer);
  console.log(`Generated ${filename} (Stability)`);
  return filepath;
}

async function main() {
  const openaiKey = process.env.OPENAI_API_KEY;
  const stabilityKey = process.env.STABILITY_API_KEY || process.env.STABILTY_API_KEY; // handle common typo
  const preferStability = Boolean(stabilityKey);

  const client = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;
  await ensureDir(OUTPUT_DIR);

  for (const variant of VARIANTS) {
    // Prefer Stability if available
    if (preferStability) {
      await generateWithStability(variant, stabilityKey);
      continue;
    }

    if (!client) {
      throw new Error("No provider available: set STABILITY_API_KEY or OPENAI_API_KEY");
    }

    try {
      await generateWithOpenAI(variant, client);
    } catch (err) {
      const msg = String(err && err.message || err);
      // Fallback to Stability on OpenAI org gate or permission errors
      const canFallback = stabilityKey && /403|must be verified|permission/i.test(msg);
      if (canFallback) {
        console.warn(`OpenAI blocked (${msg}). Falling back to Stability for ${variant.id}.`);
        await generateWithStability(variant, stabilityKey);
      } else {
        throw err;
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

