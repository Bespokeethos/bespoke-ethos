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
  // Cadence feature images - candid founders
  {
    id: "cadence-feature-voice",
    prompt:
      "Candid photo for a SaaS landing page section about brand voice mastery. Small-business founder in a studio or workshop, mid-conversation and laughing with a customer just off-frame. Natural light, slightly messy workspace, apron or casual clothes, no visible text or logos, 3:2 aspect ratio suitable for a product feature card.",
  },
  {
    id: "cadence-feature-story",
    prompt:
      "Candid photo for a product storytelling feature. Small-business owner in a cozy shop carefully arranging products on a shelf, warm golden-hour window light, depth of field with products in soft focus, no visible watermarks, 3:2 aspect ratio for web.",
  },
  {
    id: "cadence-feature-workflow",
    prompt:
      "Candid photo for a workflow integration feature. Founder or operations lead at a laptop in a small office, smiling while reviewing a simple dashboard, sticky notes and notebook nearby, soft natural and screen light, no watermarks, 3:2 aspect ratio for a feature card.",
  },
  // Blog hero images - candid small business owners
  {
    id: "blog-cleveland-ai-automation",
    prompt:
      "Hero image for a blog post titled 'Cleveland Small Business Guide to AI Automation.' Candid documentary-style photo of a small business owner in Cleveland standing at a shop counter, laptop open to a simple automation dashboard. Warm natural light through a window, hints of the Cleveland skyline or brick storefronts outside. Calm, hopeful mood, shallow depth of field, 16:9, no text or logos.",
  },
  {
    id: "blog-what-to-automate-first",
    prompt:
      "Hero image for a blog post titled 'What to Automate First in Your Small Business.' Over-the-shoulder candid shot of a founder in a small studio or office prioritizing tasks on a whiteboard covered with sticky notes and arrows. Focus on the founder thinking, soft bokeh background, warm neutral tones, 16:9, no text or logos.",
  },
  {
    id: "blog-redbridging-zapier-rescue",
    prompt:
      "Hero image for a blog post about rescuing broken Zapier or Make automations. Candid photo of an operations lead and a consultant at a laptop, reviewing error logs together in a small office. Expressions focused but calm, monitors showing abstract charts or graphs (no readable text). Mixed warm and cool lighting, 16:9, no logos or UI screenshots.",
  },
  {
    id: "blog-on-brand-ai-chatbots",
    prompt:
      "Hero image for a blog post comparing on-brand AI chatbots to generic bots. Candid photo of a small business owner in a cozy shop smiling while looking at a laptop displaying a chat interface. Ambient warm lighting, subtle teal accent light from the screen, shelves or products softly out of focus behind them. 16:9, no visible text or logos.",
  },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generateWithOpenAI({ id, prompt }, client) {
  const filename = `${id}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`Skipping ${filename} (already exists)`);
    return filepath;
  }

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

  for (const variant of VARIANTS) {
    try {
      await generateWithOpenAI(variant, client);
    } catch (err) {
      throw err;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

