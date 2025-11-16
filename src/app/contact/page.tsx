import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Section } from "@/common/layout";
import { SuccessNotice } from "./success-notice";

// Render on each request to honor querystring messages like ?sent=1
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Bespoke Ethos | Talk About Your Automation Project",
  description:
    "Tell us about your small business and where you’re stuck with automation or AI. We usually respond within one business day with honest, practical next steps.",
  alternates: { canonical: "/contact" },
};

type PageProps = {
  searchParams?: Promise<{ sent?: string; error?: string; service?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const sent = params.sent === "1";
  const error = params.error;
  const service = params.service;
  const isLlmSetup = service === "llm-setups";

  return (
    <main>
      <ContactPageJsonLd />
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />

      <Section className="gap-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

        <div className="grid w-full items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="space-y-6 text-left">
            <p className="inline-flex rounded-full bg-surface-secondary px-3 py-1 text-xs font-medium tracking-tight text-text-secondary dark:bg-dark-surface-secondary dark:text-dark-text-secondary">
              {isLlmSetup ? "Automation setups · Stack mapping · Guardrails" : "Small business automation • Founder-friendly"}
            </p>

            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {isLlmSetup ? "Let’s map your LLM stack the right way." : "Tell us what you’re trying to ship."}
              </h1>
              <p className="text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                You don’t need a 40-page strategy deck. You need clear next steps. Share where you&apos;re stuck and what a win would
                look like, and we&apos;ll respond with practical options—no pressure, no hard sell.
              </p>

              {isLlmSetup ? (
                <div className="rounded-2xl border border-border bg-surface-secondary/80 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80 dark:text-dark-text-secondary">
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                    You&apos;re asking about automation &amp; AI stack mapping.
                  </p>
                  <p className="mt-2">
                    In the message box, tell us where your data lives (docs, CRM, tools), who needs access, and what&apos;s breaking today.
                    We&apos;ll outline 1–2 stack options and what they&apos;d cost—using tools that fit your size and budget.
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                    <li>Mention 2–3 workflows you&apos;d love to hand off (intake, reporting, customer support triage, etc.).</li>
                    <li>If you have broken Zaps/Scenarios, link them and we&apos;ll include a “rescue plan.”</li>
                  </ul>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-surface-secondary/80 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80 dark:text-dark-text-secondary">
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                    What happens after you hit “Send”?
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>We read every message ourselves—no AI auto-replies.</li>
                    <li>You&apos;ll get a plain-English response within one business day.</li>
                    <li>If there&apos;s a fit, we&apos;ll suggest a call; if not, we&apos;ll still point you in the right direction.</li>
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-dashed border-border/70 bg-surface-secondary/40 p-4 text-xs text-text-secondary dark:border-dark-border/80 dark:bg-dark-surface-secondary/40 dark:text-dark-text-secondary">
                <p>
                  <strong className="font-semibold text-text-primary dark:text-dark-text-primary">LGBTQ+ discount:</strong>{" "}
                  If you&apos;re an LGBTQ+-owned business, mention it in your message. You may qualify for{" "}
                  <span className="font-semibold">25% off upfront project costs</span> (not subscriptions).
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface-secondary/90 p-6 shadow-lg shadow-black/5 dark:border-dark-border dark:bg-dark-surface-secondary/90">
            {sent ? (
              <div className="mb-6 rounded-md border border-green-700/30 bg-green-500/10 p-4 text-sm text-green-700 dark:border-green-300/20 dark:text-green-300">
                <p className="font-medium">Thanks! Your message is on its way.</p>
                <p className="mt-1 opacity-90">We&apos;ll get back to you soon. Redirecting to the homepage.</p>
                <SuccessNotice />
              </div>
            ) : null}

            <form method="post" action="/api/contact" className="grid grid-cols-1 gap-4">
              <input type="hidden" name="successRedirect" value="/contact?sent=1" />
              <input type="hidden" name="errorRedirect" value="/contact?error=1" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Name <span className="text-red-600">*</span>
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Email <span className="text-red-600">*</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Company (optional)</span>
                  <input
                    name="company"
                    type="text"
                    className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Timeline</span>
                  <select
                    name="timeline"
                    className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                  >
                    <option value="Not sure yet">Not sure yet</option>
                    <option value="ASAP">ASAP</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-3 months">1-3 months</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  What are you hoping to achieve? <span className="text-red-600">*</span>
                </span>
                <input
                  name="useCase"
                  type="text"
                  placeholder="e.g., automate intake, rescue a Zapier flow, align on messaging"
                  required
                  className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Budget (optional)</span>
                <select
                  name="budget"
                  className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                >
                  <option value="Not sure yet">Not sure yet</option>
                  <option value="Under $1k">Under $1k</option>
                  <option value="$1k-$3k">$1k-$3k</option>
                  <option value="$3k-$10k">$3k-$10k</option>
                  <option value="$10k+">$10k+</option>
                </select>
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  Message <span className="text-red-600">*</span>
                </span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                />
              </label>

              <label className="mt-2 flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <input name="consent" type="checkbox" value="yes" className="mt-1" />
                <span>You agree we may contact you about this request. We&apos;ll never share your email.</span>
              </label>

              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                <div className="mt-4 flex justify-center">
                  <div
                    className="cf-turnstile"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    data-appearance="interaction-only"
                    data-theme="auto"
                  />
                </div>
              ) : null}

              {error ? (
                <p className="text-sm text-red-600 dark:text-red-400">Failed to send. Please try again.</p>
              ) : null}

              <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 sm:w-auto"
                >
                  Send message
                </button>
                <Link
                  className="text-center text-sm text-text-secondary underline-offset-4 hover:underline dark:text-dark-text-secondary"
                  href="https://calendly.com/contact-bespokeethos/30min"
                  >
                  Prefer to book a call?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </main>
  );
}

function ContactPageJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${base}/contact`,
    name: "Contact Bespoke Ethos",
    mainEntityOfPage: `${base}/contact`,
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

