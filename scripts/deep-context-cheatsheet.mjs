#!/usr/bin/env node
import fs from "fs";
import path from "path";

const deepContextDir = path.resolve("Deep-Context");

const summaries = {
  "backstory.txt": "Founder voice memo: origin story, services, discounts, human-in-loop philosophy.",
  "bespoke-source.txt": "HTML head snapshot of bespokeethos.com: SEO, OG/Twitter, JSON-LD, Framer bundles.",
  "BespokeEthos_Positioning_Index.md":
    "Master positioning index: identity angles, offers, trust signals, geo/local angles, neurodivergent platform angles, copy blocks, Vertex AI prompt architecture.",
  "gfounderapp.txt": "Narrative polish log for application 'Why Me' section using torrent/padlocks imagery and APOE/Alzheimer’s anchor.",
  "Past-Instance-Addl-Context-.txt":
    "Canonical bio dossier: founder identity (Upton Rand), sobriety, neurodivergence, schedule, discount rules, philosophy, goals, ops rhythms, kink identity, AI partner protocol.",
  "The Vertex Architect_ Structuring Gemini Prompts for Seamless, Low-Maintenance Digital Acceleration.txt":
    "Vertex AI/Antigravity blueprint: system vs task prompt hierarchy, artifact mandates, Framer/Figma static-site flow, chatbot persona/narrative/data strategy, MLOps governance.",
  "Upton-Rand-Edge-User.txt":
    "Cognitive Resonance white paper: neurodivergent AI use-cases, trauma processing, pattern recognition, platform comparisons, sovereign stack guidance, ethics."
};

const asJson = process.argv.includes("--json");

function safeStat(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}

function formatEntry(name) {
  const fullPath = path.join(deepContextDir, name);
  const stat = safeStat(fullPath);
  return {
    name,
    path: fullPath,
    bytes: stat ? stat.size : null,
    description: summaries[name] || "No summary available."
  };
}

function main() {
  if (!fs.existsSync(deepContextDir)) {
    console.error(`Deep-Context directory not found at ${deepContextDir}`);
    process.exit(1);
  }

  const entries = fs
    .readdirSync(deepContextDir)
    .filter((name) => !name.startsWith("."))
    .map(formatEntry);

  if (asJson) {
    console.log(JSON.stringify({ entries }, null, 2));
    return;
  }

  console.log("Deep-Context quick map\n");
  for (const entry of entries) {
    const size = entry.bytes !== null ? `${entry.bytes} bytes` : "size unknown";
    console.log(`- ${entry.name} (${size})`);
    console.log(`  ${entry.description}`);
  }
}

main();
