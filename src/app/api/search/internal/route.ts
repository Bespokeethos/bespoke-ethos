import { NextRequest, NextResponse } from "next/server";

import { sanityFetch } from "@/lib/sanity/client";
import { searchChangelogQuery } from "@/lib/sanity/queries";
import type { SanityChangelogPost } from "@/lib/sanity/types";

export const runtime = "nodejs";

const SKIP_REMOTE_DATA = (process.env.SKIP_REMOTE_DATA ?? "").trim() === "1";

type SearchResult = {
  id: string;
  title: string;
  slug?: string;
  snippet?: string;
  type?: string;
  score?: number;
  tags?: string[];
};

type SearchResponse = {
  query: string;
  source: "pinecone" | "sanity" | "disabled" | "error-fallback";
  mode: "vector" | "fallback" | "disabled" | "error";
  results: SearchResult[];
};

async function searchWithSanity(query: string): Promise<SearchResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query, source: "sanity", mode: "fallback", results: [] };
  }

  const posts =
    (await sanityFetch<SanityChangelogPost[]>(searchChangelogQuery, {
      query: `${trimmed}*`,
    })) ?? [];

  const results: SearchResult[] = posts.map((post) => ({
    id: post._id,
    title: post.title,
    slug: post.slug,
    snippet: post.excerpt,
    type: "changelog",
  }));

  return { query, source: "sanity", mode: "fallback", results };
}

async function searchWithPinecone(query: string): Promise<SearchResponse | null> {
  const pineconeHost = (process.env.PINECONE_HOST ?? "").trim();
  const pineconeApiKey = (process.env.PINECONE_API_KEY ?? "").trim();
  const namespace = (process.env.PINECONE_NAMESPACE ?? "production").trim();
  const embeddingModel = (process.env.EMBEDDING_MODEL ?? "").trim();
  const openaiKey = (process.env.OPENAI_API_KEY ?? "").trim();

  if (!pineconeHost || !pineconeApiKey || !embeddingModel || !openaiKey) {
    return null;
  }

  const embedRes = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: embeddingModel,
      input: query,
    }),
  });

  if (!embedRes.ok) {
    return null;
  }

  const embedJson = (await embedRes.json()) as {
    data?: Array<{ embedding?: number[] }>;
  };

  const vector = embedJson.data?.[0]?.embedding;
  if (!Array.isArray(vector) || vector.length === 0) {
    return null;
  }

  const host = pineconeHost.replace(/\/+$/, "");
  const pineconeRes = await fetch(`${host}/query`, {
    method: "POST",
    headers: {
      "Api-Key": pineconeApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vector,
      topK: 10,
      includeMetadata: true,
      namespace,
    }),
  });

  if (!pineconeRes.ok) {
    return null;
  }

  const pineconeJson = (await pineconeRes.json()) as {
    matches?: Array<{
      id: string;
      score?: number;
      metadata?: Record<string, unknown>;
    }>;
  };

  const results: SearchResult[] =
    pineconeJson.matches?.map((match) => {
      const metadata = match.metadata ?? {};
      const title = (metadata.title as string | undefined) ?? "";
      const type = (metadata.type as string | undefined) ?? "brand-doc";
      const tags = Array.isArray(metadata.tags)
        ? (metadata.tags as string[])
        : (metadata.source ? [String(metadata.source)] : []);
      const snippet = metadata.snippet as string | undefined;

      return {
        id: match.id,
        title,
        snippet,
        type,
        score: match.score,
        tags,
      };
    }) ?? [];

  return {
    query,
    source: "pinecone",
    mode: "vector",
    results,
  };
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const query = typeof (body as any)?.query === "string" ? (body as any).query : "";
  if (!query.trim()) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  if (SKIP_REMOTE_DATA) {
    const fallback = await searchWithSanity(query);
    return NextResponse.json<SearchResponse>({
      ...fallback,
      mode: "fallback",
    });
  }

  try {
    const pineconeResult = await searchWithPinecone(query);
    if (pineconeResult && pineconeResult.results.length > 0) {
      return NextResponse.json<SearchResponse>(pineconeResult);
    }

    const fallback = await searchWithSanity(query);
    return NextResponse.json<SearchResponse>({
      ...fallback,
      mode: "fallback",
    });
  } catch {
    const fallback = await searchWithSanity(query);
    return NextResponse.json<SearchResponse>({
      ...fallback,
      source: "error-fallback",
      mode: "error",
    });
  }
}

