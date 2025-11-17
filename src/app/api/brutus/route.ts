import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

function buildClient() {
  const gatewayUrl = (process.env.AI_GATEWAY_URL ?? "").trim();
  const gatewayKey = (process.env.AI_GATEWAY_API_KEY ?? "").trim();
  const directKey = (process.env.OPENAI_API_KEY ?? "").trim();

  const useGateway = Boolean(gatewayUrl && gatewayKey);

  const apiKey = useGateway ? gatewayKey : directKey;
  if (!apiKey) {
    throw new Error("No OpenAI or AI Gateway API key configured.");
  }

  const baseURL = useGateway ? gatewayUrl : undefined;

  return new OpenAI({
    apiKey,
    baseURL,
  });
}

function getSystemPrompt(): string {
  const explicit = (process.env.BRUTUS_SYSTEM_PROMPT ?? "").trim();
  if (explicit) return explicit;

  // Fallback that still anchors to your designed prompt ID.
  return [
    "You are Brutus, a senior automation and full-stack engineer working on the Bespoke Ethos codebase.",
    "You live on the server side (Next.js 16 / React 19 on Vercel) and prioritize small, production-ready changes.",
    "Your canonical instructions are stored in prompt `pmpt_6917f65a884c8197b3dbde116161d7690be2e9c70148404b` in the OpenAI UI.",
    "Even if you cannot access that prompt directly here, behave consistently with it: act as a pragmatic coding partner,",
    "focusing on refactors, API integrations, and debugging across Airtable, Resend, Sanity, Pinecone, and Vercel.",
  ].join(" ");
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const prompt = typeof (body as any)?.prompt === "string" ? (body as any).prompt : "";
  const messagesInput = Array.isArray((body as any)?.messages)
    ? ((body as any).messages as Array<{ role: string; content: string }>)
    : [];

  if (!prompt.trim() && messagesInput.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Provide either `prompt` or `messages`." },
      { status: 400 },
    );
  }

  const model =
    typeof (body as any)?.model === "string" && (body as any).model.trim().length > 0
      ? (body as any).model
      : "gpt-4.1-mini";
  const temperature =
    typeof (body as any)?.temperature === "number" ? (body as any).temperature : 0.2;

  const systemPrompt = getSystemPrompt();

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
  ];

  if (messagesInput.length > 0) {
    for (const msg of messagesInput) {
      if (
        msg &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string"
      ) {
        messages.push({ role: msg.role as "user" | "assistant", content: msg.content });
      }
    }
  } else if (prompt.trim()) {
    messages.push({ role: "user", content: prompt });
  }

  let client: OpenAI;
  try {
    client = buildClient();
  } catch (error) {
    console.error("[BRUTUS] Configuration error:", error);
    return NextResponse.json(
      { ok: false, error: "AI Gateway/OpenAI configuration is missing." },
      { status: 500 },
    );
  }

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature,
      messages,
    });

    const message = completion.choices[0]?.message ?? null;

    return NextResponse.json(
      {
        ok: true,
        model,
        message,
        usage: completion.usage,
        viaGateway: Boolean(
          (process.env.AI_GATEWAY_URL ?? "").trim() &&
            (process.env.AI_GATEWAY_API_KEY ?? "").trim(),
        ),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[BRUTUS] OpenAI/AI Gateway error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to call Brutus via AI Gateway. Check keys, URL, and model.",
      },
      { status: 500 },
    );
  }
}
