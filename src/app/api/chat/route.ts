import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const useGateway =
  (process.env.AI_GATEWAY_URL ?? "").trim() &&
  (process.env.AI_GATEWAY_API_KEY ?? "").trim();

const openai = createOpenAI({
  baseURL: useGateway ? process.env.AI_GATEWAY_URL : undefined,
  apiKey: useGateway ? process.env.AI_GATEWAY_API_KEY : process.env.OPENAI_API_KEY,
  headers: {
    "x-prompt-id": "pmpt_6917f65a884c8197b3dbde116161d7690be2e9c70148404b",
  },
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai("gpt-4.1"),
    prompt,
  });

  return result.toTextStreamResponse();
}

