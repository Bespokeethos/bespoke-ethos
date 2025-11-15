import "server-only";

import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2025-02-01";
const token = process.env.SANITY_API_TOKEN;

const skipRemoteData = (process.env.SKIP_REMOTE_DATA ?? "").trim() === "1";

export const sanityClient =
  projectId && dataset && !skipRemoteData
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: !token && process.env.NODE_ENV === "production",
        token,
        perspective: token ? "published" : "published",
      })
    : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch<T>(query, params);
}
