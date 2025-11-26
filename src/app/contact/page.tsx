import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import Image from "next/image";
import { Section } from "@/common/layout";
import { BorderBeam } from "@/components/ui/border-beam";
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
    <main className="be-page-slate">
      <ContactPageJsonLd />

      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

          {/* Mobile hero heading above the card */}
          <div className="space-y-1 text-center md:hidden">
            <p className="inline-flex rounded-full bg-surface-secondary px-3 py-1 text-[11px] font-medium tracking-tight text-text-secondary dark:bg-dark-surface-secondary dark:text-dark-text-secondary">
              {isLlmSetup ? "Automation setups · Tool mapping · Guardrails" : "Small business automation · Founder-friendly"}
            </p>
            <h1 className="font-hero-accent text-balance text-[1.5rem] font-semibold leading-snug">
              {isLlmSetup ? "Let&rsquo;s map your AI tools the right way." : "Let’s fix the thing that’s keeping you up at night."}
            </h1>
          </div>

          <div className="grid w-full items-start gap-4 -mt-2 sm:gap-8 sm:-mt-2 md:mt-0 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-stretch">
          <div className="space-y-5 text-left md:block md:space-y-6">
            <p className="inline-flex rounded-full bg-surface-secondary px-3 py-1 text-xs font-medium tracking-tight text-text-secondary dark:bg-dark-surface-secondary dark:text-dark-text-secondary">
              {isLlmSetup ? "Automation setups · Tool mapping · Guardrails" : "Small business automation • Founder-friendly"}
            </p>

            <div className="space-y-3">
              <h1 className="font-hero-accent text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                {isLlmSetup ? "Let&rsquo;s map your AI tools the right way." : "Let’s fix the thing that’s keeping you up at night."}
              </h1>
              <p className="text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                You don&rsquo;t need a 40‑page deck. You need to know if this is fixable and what it costs. Tell me what’s broken.
                <span className="inline-flex items-center gap-2">
                  <Image
                    src="/founder-upton-rand.jpg"
                    alt="Upton Rand, Founder."
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  I read every email myself, and I’ll give you a straight answer—even if that answer is ‘don’t hire me, use this $20 tool instead.’
                </span>
              </p>

              {isLlmSetup ? (
              <div className="rounded-2xl border border-border bg-surface-secondary/80 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80 dark:text-dark-text-secondary space-y-2">
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                    You&rsquo;re asking about automation & AI tool mapping.
                  </p>
                  <p>
                    Use the message box to tell us where your data lives (docs, CRM, tools), who needs access, and what&rsquo;s
                    breaking today. We&rsquo;ll outline 1-2 setup options and what they&rsquo;d cost-using tools that fit your size
                    and budget.
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                    <li>Mention 2-3 workflows you&rsquo;d love to hand off (intake, reporting, customer support triage, etc.).</li>
                    <li>If you have broken Zaps/Scenarios, link them and we&rsquo;ll include a &quot;rescue plan.&quot;</li>
                  </ul>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-surface-secondary/80 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80 dark:text-dark-text-secondary">
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                    What happens after you hit &quot;Send&quot;?
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs md:text-sm">
                    <li>We read every message ourselves-no AI auto-replies.</li>
                    <li>You&rsquo;ll get a plain-English response within one business day.</li>
                    <li>If there&rsquo;s a fit, we&rsquo;ll suggest a call; if not, we&rsquo;ll still point you in the right direction.</li>
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-dashed border-border/70 bg-surface-secondary/40 p-4 text-xs text-text-secondary dark:border-dark-border/80 dark:bg-dark-surface-secondary/40 dark:text-dark-text-secondary">
                <p>
                  <strong className="font-semibold text-text-primary dark:text-dark-text-primary">LGBTQ+ discount:</strong>{" "}
                  If you’re an LGBTQ+-owned business, mention it in your message. You may qualify for{" "}
                  <span className="font-semibold">25% off upfront project costs</span> (not subscriptions).
                </p>
              </div>
            </div>
          </div>

          <div className="be-form-glass-card max-w-md w-full mx-auto md:max-w-none md:mx-0 sm:p-6">
            {sent ? (
              <div className="mb-6 rounded-md border border-green-700/30 bg-green-500/10 p-4 text-sm text-green-700 dark:border-green-300/20 dark:text-green-300">
                <p className="font-medium">Got it. I’m reading this shortly. No auto‑responder, just me.</p>
                <p className="mt-1 opacity-90">We’ll get back to you soon. Redirecting to the homepage.</p>
                <SuccessNotice />
              </div>
            ) : null}

            <form method="post" action="/api/contact" className="grid grid-cols-1 gap-3 sm:gap-4">
              <input type="hidden" name="successRedirect" value="/contact?sent=1" />
              <input type="hidden" name="errorRedirect" value="/contact?error=1" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-white sm:text-sm">
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
                  <span className="text-xs text-white sm:text-sm">
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

              <label className="flex flex-col gap-1">
                <span className="text-xs text-white sm:text-sm">Phone (optional)</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="If you&rsquo;d like us to call you back"
                  className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                />
              </label>

              <label className="flex flex-col gap-1">
<span className="text-xs text-white sm:text-sm">
	                  Message <span className="text-red-600">*</span>
	                  <span className="block text-[10px] font-normal text-text-tertiary dark:text-dark-text-tertiary">
	                    Don’t worry about jargon. Just describe the pain.
	                  </span>
	                </span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what&rsquo;s on your plate and what a win would look like."
                  required
                  minLength={10}
                  className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary"
                />
              </label>

              <label className="mt-2 flex items-start gap-2 text-sm text-white">
                <input name="consent" type="checkbox" value="yes" className="mt-1" />
                <span>You agree we may contact you about this request. We’ll never share your email.</span>
              </label>

              {error ? (
                <p className="text-sm text-red-600 dark:text-red-400">Failed to send. Please try again.</p>
              ) : null}

                <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
	                <p className="text-center text-xs text-text-tertiary dark:text-dark-text-tertiary">
	                  If you’re family (LGBTQ+ owned), tell me. I take 25% off setup fees because I know how hard it is to get started.
	                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:brightness-110"
                >
                  Send message
                </button>
                <Link
                  className="text-center text-sm text-white underline-offset-4 hover:underline"
                  href="https://calendly.com/contact-bespokeethos/30min"
                >
                  Prefer to book a call?
                </Link>
              </div>
            </form>
          </div>
        </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="relative mx-auto mb-12 mt-10 max-w-2xl hidden">
          <BorderBeam borderWidth={2} lightWidth={360} duration={10} />
          <div className="relative rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-lg dark:from-slate-800 dark:to-slate-900">
            <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
              25% Off for LGBTQ+ Businesses
            </h3>
            <p className="mb-6 text-lg text-slate-700 dark:text-slate-300">
              Starting a business as a minority is hard as hell. I know&mdash;I&apos;ve been there.
              That&apos;s why LGBTQ-owned businesses get 25% off upfront project costs on approved scopes.
              No hoops, no fine print. Just mention it when you reach out.
            </p>
            <Link
              href="/lgbtq-discount"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition-colors duration-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Learn More About Our Commitment
            </Link>
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

