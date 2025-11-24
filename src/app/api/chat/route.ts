import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

function buildOpenAIClient() {
  const gatewayUrl = (process.env.AI_GATEWAY_URL ?? "").trim();
  const gatewayKey = (process.env.AI_GATEWAY_API_KEY ?? "").trim();
  const directKey = (process.env.OPENAI_API_KEY ?? "").trim();

  const useGateway = Boolean(gatewayUrl && gatewayKey);
  const apiKey = useGateway ? gatewayKey : directKey;

  if (!apiKey) {
    throw new Error("No OpenAI or AI Gateway API key configured.");
  }

  return createOpenAI({
    apiKey,
    baseURL: useGateway ? gatewayUrl : undefined,
    headers: {
      "x-prompt-id": "pmpt_6917f65a884c8197b3dbde116161d7690be2e9c70148404b",
    },
  });
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body.", { status: 400 });
  }

  const prompt =
    typeof (body as any)?.prompt === "string" ? (body as any).prompt : "";
  const image =
    typeof (body as any)?.image === "string" ? (body as any).image : "";
  const password =
    typeof (body as any)?.password === "string" ? (body as any).password : "";

  const expectedPassword = (process.env.BRUTUS_PASSWORD ?? "").trim();

  if (!expectedPassword) {
    return new Response("Brutus password not configured.", { status: 500 });
  }

  if (!password || password !== expectedPassword) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!prompt.trim()) {
    return new Response("Prompt is required.", { status: 400 });
  }

  const content: any[] = [{ type: "text", text: prompt }];

  if (image) {
    content.push({ type: "image", image });
  }

  let openai;
  try {
    openai = buildOpenAIClient();
  } catch (error) {
    console.error("[CHAT] Configuration error:", error);
    return new Response("AI Gateway/OpenAI configuration is missing.", {
      status: 500,
    });
  }

  const result = streamText({
    model: openai("gpt-4.1"),
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });

  return result.toTextStreamResponse();
}
