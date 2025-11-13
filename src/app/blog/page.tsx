import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Bespoke Ethos",
  description: "Updates on Bespoke Ethos automation projects and insights from the AI dance floor.",
  alternates: { canonical: "/blog" },
};

export default function BlogLandingPage() {
  return (
    <div className="max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold text-text-primary">BaseHub Stories & Notes</h1>
      <p className="mt-3 text-lg text-text-secondary">
        We publish dispatches about automations, AI trust, and founders who lean on Bespoke Ethos. Subscribe for field notes.
      </p>
      <div className="mt-8 space-y-4 text-sm text-text-tertiary">
        <p>No posts yet? Stay tuned and refresh this page; we ship new notes quarterly.</p>
        <p>
          Prefer a conversation instead? <Link className="text-accent-500" href="/contact">Book a consultation</Link> and we&rsquo;ll share what’s up.
        </p>
      </div>
    </div>
  );
}
