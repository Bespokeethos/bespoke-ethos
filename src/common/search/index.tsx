"use client";

import * as React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

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

export function SearchContent() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [meta, setMeta] = React.useState<Pick<SearchResponse, "source" | "mode"> | null>(null);

  React.useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setError(null);
      setMeta(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const handle = window.setTimeout(async () => {
      try {
        const res = await fetch("/api/search/internal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: trimmed }),
        });

        if (!res.ok) {
          throw new Error(`Search failed (${res.status})`);
        }

        const data = (await res.json()) as SearchResponse;
        if (cancelled) return;

        setResults(data.results ?? []);
        setMeta({ source: data.source, mode: data.mode });
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Search failed");
        setResults([]);
        setMeta(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [query]);

  const showResults = query.trim().length > 0 && (loading || error || results.length > 0);

  return (
    <div className="relative ml-auto w-full md:max-w-[320px]">
      <label
        className={clsx(
          "flex w-full items-center gap-x-1 rounded-full border border-border px-3.5 py-2.5 ring-accent-500! focus-within:ring-3 dark:border-dark-border",
        )}
      >
        <MagnifyingGlassIcon
          className="pointer-events-none size-5 shrink-0 text-text-secondary transition-colors duration-75 dark:text-dark-text-secondary"
          color="currentColor"
        />
        <input
          className="grow bg-transparent outline-hidden! placeholder:text-text-tertiary focus-visible:outline-hidden dark:placeholder:text-dark-text-tertiary"
          placeholder="Search docs & changelog"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {showResults ? (
        <div className="border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary absolute right-0 top-[calc(100%+6px)] z-20 w-[min(420px,100vw-2rem)] rounded-lg border p-2 shadow-lg">
          {loading ? (
            <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary px-1 py-0.5">
              Searching&hellip;
            </p>
          ) : error ? (
            <p className="text-xs text-destructive px-1 py-0.5">Search error: {error}</p>
          ) : results.length === 0 ? (
            <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary px-1 py-0.5">
              No matches yet. Try another phrase.
            </p>
          ) : (
            <ul className="flex max-h-80 flex-col gap-1 overflow-auto">
              {results.map((result) => {
                const href = result.slug ? `/changelog/${result.slug}` : "#";
                return (
                  <li key={result.id}>
                    <a
                      className="hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary block rounded-md px-2 py-1.5 text-sm"
                      href={href}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{result.title}</span>
                        {result.type ? (
                          <span className="text-[10px] uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
                            {result.type}
                          </span>
                        ) : null}
                      </div>
                      {result.snippet ? (
                        <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary line-clamp-2">
                          {result.snippet}
                        </p>
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
          {meta ? (
            <p className="text-[10px] text-text-tertiary dark:text-dark-text-tertiary mt-1 px-1">
              Source: {meta.source === "pinecone" ? "semantic (Pinecone + embeddings)" : "Sanity"}
              {meta.mode === "fallback" || meta.mode === "disabled"
                ? " (fallback mode)"
                : undefined}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
