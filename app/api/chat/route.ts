import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    prompt: prompt,
    apiKey: process.env.AI_GATEWAY_API_KEY,
  });

  return result.toTextStreamResponse();
}
