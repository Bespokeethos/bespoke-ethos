'use client';

import { useState, useRef, useEffect } from "react";
import type React from "react";

export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [response]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setImage(result);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || !password.trim() || loading) return;

    setLoading(true);
    setResponse("");
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, password, image }),
      });

      if (!res.ok || !res.body) {
        throw new Error("API request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        if (text) {
          setResponse((prev) => prev + text);
        }
      }
    } catch (err) {
      setError("Error: Failed to get response from Brutus.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setPrompt("");
    setResponse("");
    setError(null);
  }

  return (
    <main className="be-page-slate">
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="be-section-card max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <p className="inline-flex rounded-full bg-surface-secondary px-3 py-1 text-[11px] font-medium tracking-tight text-text-secondary dark:bg-dark-surface-secondary dark:text-dark-text-secondary">
              Brutus · GPT-4.1 via Vercel AI Gateway
            </p>
            <h1 className="font-hero-accent text-balance text-2xl font-semibold leading-snug md:text-3xl">
              Brutus · Financial and engineering analyst chat
            </h1>
            <p className="text-sm md:text-base text-text-secondary dark:text-dark-text-secondary">
              Ask focused questions about automation, integrations, or financial analysis. Brutus runs
              on GPT-4.1 through the Vercel AI Gateway using your custom prompt.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                Brutus password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the shared Brutus password"
                className="w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-sm outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                Upload image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-xs text-text-secondary file:mr-3 file:rounded-md file:border file:border-border file:bg-surface-secondary file:px-3 file:py-1.5 file:text-xs file:font-medium hover:file:bg-surface-secondary/80 dark:text-dark-text-secondary dark:file:border-dark-border dark:file:bg-dark-surface-secondary"
                disabled={loading}
              />
              {image && (
                <div className="mt-2 space-y-2">
                  <div className="overflow-hidden rounded-md border border-border bg-surface-secondary/40 p-2 dark:border-dark-border dark:bg-dark-surface-secondary/40">
                    <img
                      src={image}
                      alt="Uploaded preview"
                      className="max-h-64 w-auto rounded-md object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="text-xs font-medium text-red-600 hover:underline dark:text-red-400"
                    disabled={loading}
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Brutus about a workflow, integration, or financial scenario…"
              className="w-full h-32 rounded-md border border-border bg-surface-primary px-3 py-2 text-sm outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
              disabled={loading}
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="inline-flex items-center justify-center rounded-md bg-accent-600 px-5 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-60"
              >
                {loading ? "Thinking…" : "Send to Brutus"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface-secondary px-4 py-2 text-xs font-medium text-text-secondary hover:bg-surface-secondary/80 disabled:opacity-60 dark:border-dark-border dark:bg-dark-surface-secondary dark:text-dark-text-secondary"
              >
                Clear
              </button>
            </div>
          </form>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {response && (
            <div
              ref={outputRef}
              className="max-h-[60vh] overflow-y-auto rounded-md border border-border bg-surface-secondary/40 p-4 text-sm leading-relaxed text-text-primary whitespace-pre-wrap dark:border-dark-border dark:bg-dark-surface-secondary/40 dark:text-dark-text-primary"
            >
              {response}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
