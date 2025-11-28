import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';
import { z } from 'zod';

// -----------------------------------------------------------------------------
// THE ARCHITECT'S ARSENAL
// -----------------------------------------------------------------------------
// We own who we are: A serverless-first, model-agnostic intelligence hub.
// -----------------------------------------------------------------------------

// 1. VISION & MULTIMODAL (Vertex AI / Gemini)
// The "Eyes" of Brutus. Best for analyzing images, screenshots, and visual data.
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const visionModel = google('models/gemini-1.5-pro-latest');

// 2. CODING & REASONING (OpenAI / GPT-4o)
// The "Hands" of Brutus. Best for complex code generation and architectural logic.
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const codingModel = openai('gpt-4o');

// 3. OPEN SOURCE / LOCAL (Ollama / Llama 3)
// The "Soul" of the Open Web. Private, uncensored, and locally controllable.
// Optional: Only available when Ollama is running locally
let openModel: any = null;
try {
  const { createOllama } = require('ollama-ai-provider');
  const ollama = createOllama();
  openModel = ollama('llama3');
} catch {
  // Ollama not available - this is expected in cloud deployments
  console.log('ℹ️  Ollama not available (local/on-prem only)');
}

export { openModel };

// -----------------------------------------------------------------------------
// CAPABILITIES
// -----------------------------------------------------------------------------

/**
 * Analyze an image using Computer Vision.
 */
export async function analyzeImage(imageBase64: string, prompt: string) {
  const { text } = await generateText({
    model: visionModel,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image', image: imageBase64 },
        ],
      },
    ],
  });
  return text;
}

/**
 * Generate production-ready code.
 */
export async function generateCode(requirement: string) {
  const { text } = await generateText({
    model: codingModel,
    system: 'You are Brutus, a senior full-stack engineer. Write clean, production-ready Next.js code.',
    prompt: requirement,
  });
  return text;
}

/**
 * Run a task using an open-source model.
 * Only available when Ollama is installed locally.
 */
export async function runOpenTask(task: string) {
  if (!openModel) {
    throw new Error('Ollama not available. This feature requires local installation.');
  }
  
  const { text } = await generateText({
    model: openModel,
    prompt: task,
  });
  return text;
}

// -----------------------------------------------------------------------------
// TOOL DEFINITIONS (For Agentic Workflows)
// -----------------------------------------------------------------------------

export const tools = {
  analyze_visuals: {
    description: 'Analyze images or UI screenshots using Computer Vision',
    parameters: z.object({
      imageData: z.string().describe('Base64 encoded image data'),
      query: z.string().describe('What to look for in the image'),
    }),
    execute: async ({ imageData, query }: { imageData: string; query: string }) => analyzeImage(imageData, query),
  },
  generate_component: {
    description: 'Generate a React/Next.js component',
    parameters: z.object({
      spec: z.string().describe('Detailed component specification'),
    }),
    execute: async ({ spec }: { spec: string }) => generateCode(spec),
  },
};
