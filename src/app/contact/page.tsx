import Script from "next/script";
import { SuccessNotice } from "./success-notice";

// Render on each request to honor querystring messages like ?sent=1
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const metadata = {
  title: "Contact",
  description: "Get in touch. We usually respond within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage({ searchParams }: { searchParams: { sent?: string; error?: string } }) {
  const sent = searchParams?.sent === "1";
  const error = searchParams?.error;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
      <ContactPageJsonLd />
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Contact us</h1>
      <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
        Tell us a bit about your project. We usually reply within one business day.
      </p>

      {sent ? (
        <div className="mt-6 rounded-md border border-green-700/30 bg-green-500/10 p-4 text-sm text-green-700 dark:border-green-300/20 dark:text-green-300">
          <p className="font-medium">Thanks! Your message is on its way.</p>
          <p className="mt-1 opacity-90">We&rsquo;ll get back to you soon. Redirecting to the homepage…</p>
          <SuccessNotice />
        </div>
      ) : null}

      <form method="post" action="/api/contact" className="mt-8 grid grid-cols-1 gap-4">
        <input type="hidden" name="successRedirect" value="/contact?sent=1" />
        <input type="hidden" name="errorRedirect" value="/contact?error=1" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Name</span>
            <input name="name" type="text" className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Email</span>
            <input name="email" type="email" required className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary" />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Company (optional)</span>
            <input name="company" type="text" className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Timeline</span>
            <select name="timeline" className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary">
              <option value="Not sure yet">Not sure yet</option>
              <option value="ASAP">ASAP</option>
              <option value="2–4 weeks">2–4 weeks</option>
              <option value="1–3 months">1–3 months</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-text-secondary dark:text-dark-text-secondary">What are you hoping to achieve?</span>
          <input name="useCase" type="text" placeholder="e.g., automate intake, rescue a Zapier flow, align on messaging" className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary" />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Budget (optional)</span>
            <select name="budget" className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary">
              <option value="Not sure yet">Not sure yet</option>
              <option value="Under $1k">Under $1k</option>
              <option value="$1k–$3k">$1k–$3k</option>
              <option value="$3k–$10k">$3k–$10k</option>
              <option value="$10k+">$10k+</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Message</span>
          <textarea name="message" rows={6} required className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary" />
        </label>

        <label className="mt-2 flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
          <input name="consent" type="checkbox" value="yes" className="mt-1" />
          <span>
            You agree we may contact you about this request. We&rsquo;ll never share your email.
          </span>
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

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90">
            Send message
          </button>
          <Link className="text-sm text-text-secondary underline-offset-4 hover:underline dark:text-dark-text-secondary" href="/book">
            Prefer to book a call?
          </Link>
        </div>
      </form>
    </div>
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
