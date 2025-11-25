import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

// Lazily create the OpenAI client to avoid build-time errors when OPENAI_API_KEY is not set
function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new OpenAI({ apiKey });
}

export async function POST(req: NextRequest) {
  const openai = getOpenAIClient();
  if (!openai) {
    return NextResponse.json(
      { ok: false, error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const prompt = typeof (body as any)?.prompt === "string" ? (body as any).prompt : "";
  const model =
    typeof (body as any)?.model === "string" && (body as any).model.trim().length > 0
      ? (body as any).model
      : "gpt-4.1-mini";
  const temperature =
    typeof (body as any)?.temperature === "number" ? (body as any).temperature : 0.2;

  if (!prompt.trim()) {
    return NextResponse.json({ ok: false, error: "Field `prompt` is required." }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      temperature,
      messages: [
        {
          role: "system",
          content:
            "You are a senior TypeScript/React/Next.js engineer helping work on the Bespoke Ethos codebase deployed on Vercel. " +
            "Prefer concise, production-ready code snippets and short explanations. Assume the project root is C:\\vercel and that Next.js 16 / React 19 are in use.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const message = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json(
      {
        ok: true,
        model,
        message,
        usage: completion.usage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[DEV_CODER] OpenAI error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to call OpenAI. Check OPENAI_API_KEY and model configuration.",
      },
      { status: 500 },
    );
  }
}

