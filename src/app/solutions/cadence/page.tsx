import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { ButtonLink } from "@/common/button";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { CadenceLogoCard } from "@/common/cadence-logo-card";
import { PRICING, formatMoney } from "@/config/pricing";
import { VogueCard } from "@/components/vogue-card";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "CadenceT: Premium Chatbot Trained on Your Business | Bespoke Ethos",
  description:
    "CadenceT is a premium AI positioning and support agent that turns features into emotion-based messaging and on-brand chat conversations tuned to your customer's 4 AM moment.",
  alternates: { canonical: "/products/cadence" },
};

const ALT = {
  hero: "Soft-focus shot of a small-business owner at a workbench, warm lighting, with an overlay card describing Cadence-your brand's rhythm.",
  newAsset:
    "Operations lead working on a laptop in a small office, smiling while reviewing a simple automation dashboard, candid natural-light photo",
};

export default function CadencePage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-8">
          <CadenceProductJsonLd />

          {/* Hero */}
          <section className="relative cadence-card rounded-2xl overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <Image
                src="/assets/generated/cadence-feature-voice-desktop.webp"
                alt={ALT.hero}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1366px) 90vw, 1200px"
              />
            </div>
            <div className="relative z-10 flex min-h-[260px] flex-col justify-center pb-10 pt-10 md:min-h-[320px] md:pt-14">
              <div className="cadence-card-text max-w-(--breakpoint-md)">
                <div className="mb-2 flex items-center gap-2">
                  <CadenceLogoCard size={48} />
                  <span className="cadence-badge inline-block rounded px-2 py-1 text-xs font-semibold">CadenceT</span>
                </div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-xs sm:text-sm font-medium text-white/90 shadow-lg backdrop-blur-md">
                  <span>CadenceT</span>
                  <span className="opacity-90">Your Brand&apos;s Rhythm</span>
                </div>

                <Heading align="left" subtitle="The positioning agent that passes the 4 AM test.">
                  <h1 className="font-hero-accent">CadenceT: Your Brand&apos;s 4 AM Voice.</h1>
                </Heading>

                <div className="mt-4 flex flex-wrap gap-3">
                  <p className="text-sm text-white/80">
                    Starts at {formatMoney(PRICING.cadence.setup)} setup + {formatMoney(PRICING.cadence.monthly)}/mo.
                    <Link href="/solutions/flowstack" className="ml-1 underline">
                      Need something simpler? Try FlowstackT.
                    </Link>
                  </p>
                  <ButtonLink intent="primary" href="#demo">
                    See a Live Demo (2 min)
                  </ButtonLink>
                  <ButtonLink intent="secondary" href="/contact?service=llm-setups">
                    Book a strategy call
                  </ButtonLink>
                  <ButtonLink
                    unstyled
                    className="underline underline-offset-4 text-white/90"
                    href="/contact?subject=Cadence%20pilot"
                  >
                    Start a 30-day pilot
                  </ButtonLink>
                </div>
              </div>
            </div>
          </section>

          <VogueCard
            imageSrc="/assets/logos/cadence.png"
            imageAlt="Cadence couture card"
            title="Cadence™"
            tagline="Your Brand's Rhythm"
            description="The positioning + support agent that passes the 4 AM test and keeps every channel sounding like you."
          />

          {/* Personality ad banner (keeps the fun campaign visible) */}
          <section
            aria-labelledby="cadence-ad-banner"
            className="overflow-hidden rounded-2xl border border-border bg-surface-secondary/60 dark:border-dark-border dark:bg-dark-surface-secondary/60"
          >
            <div className="relative h-48 w-full sm:h-56 lg:h-64">
              <Image
                src="/assets/ads/cadence.jpg"
                alt='Playful Cadence ad showing “Everyone knows Julie keeps blaming her farts on the dog. Cadence gets it.”'
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
                priority={false}
              />
            </div>
            <p
              id="cadence-ad-banner"
              className="px-5 py-3 text-center text-sm font-medium text-text-secondary dark:text-dark-text-secondary"
            >
              Cadence™ keeps your brand human—even when your customers get weird at 4 AM.
            </p>
          </section>

          {/* Solution Intro */}
          <div className="space-y-6">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Products", href: "/solutions" },
                { name: "Cadence" },
              ]}
            />
            <Heading align="left">
              <h2>Meet CadenceT: From Specs to Story</h2>
            </Heading>
            <div className="prose prose-zinc max-w-prose dark:prose-invert">
              <p>
                CadenceT isn&apos;t a script you install. It&apos;s a positioning agent trained on why you built the
                business, who you serve, and what keeps them up at 4 AM.
              </p>
              <p>
                Before we ever turn on a chat bubble, we run your brand through our deep discovery framework&mdash;Why,
                Who, and Where&mdash;plus founder motivations, origin stories, and your best customer wins. CadenceT
                learns to speak like a teammate, not a template, so every interaction sounds like your best sales day.
              </p>
              <ul>
                <li>
                  <strong>Runs the 4 AM Test</strong>: captures the exact search phrases and questions your buyer would
                  type when they&apos;re desperate for help.
                </li>
                <li>
                  <strong>Translates features into feelings</strong>: turns specs and ingredients into the emotional
                  promises that actually drive purchase decisions.
                </li>
                <li>
                  <strong>Keeps your founder voice consistent</strong>: from homepage to help center, inbox replies, and
                  the chatbot itself.
                </li>
                <li>
                  <strong>Handles repetitive questions with empathy</strong>: resolves the boring stuff and surfaces real
                  stories when it matters, while handing off nuanced issues to humans.
                </li>
              </ul>
            </div>
          </div>

          {/* Demo and value prop sections (unchanged structure, now inside card) */}
          <Section className="gap-6 px-0 pb-0 pt-0">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start" id="demo">
              <div className="space-y-4">
                <Heading align="left">
                  <h2>What a CadenceT conversation actually feels like</h2>
                </Heading>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  On the surface, CadenceT looks like a clean, on-brand chat bubble in the corner of your site. Under the
                  hood, it&apos;s a stack of retrieval, workflows, and guardrails that acts more like a patient sales
                  assistant than a script.
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <li>
                    <strong>Asks clarifying questions</strong> when a visitor is vague instead of guessing or hallucinating.
                  </li>
                  <li>
                    <strong>Surfaces stories and examples</strong> from your own case studies and founder notes.
                  </li>
                  <li>
                    <strong>Hands off gracefully to your team</strong> when a human is needed—with context attached.
                  </li>
                </ul>
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame shadow-xl">
                <Image
                  src="/assets/generated/service-cadence-calendar-interface-desktop.webp"
                  alt={ALT.newAsset}
                  fill
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Heading align="left">
                  <h2>What we do before CadenceT ever answers a visitor</h2>
                </Heading>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <li>Content and data audit: products, FAQs, docs, transcripts, best-performing emails.</li>
                  <li>Safety and tone guardrails: what CadenceT can&apos;t say or promise.</li>
                  <li>Decision trees for when to escalate to human support or sales.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <Heading align="left">
                  <h2>Where CadenceT fits in your stack</h2>
                </Heading>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <li>Web chat widget on key pages (pricing, product, help, checkout).</li>
                  <li>Optional email reply assistant for common questions.</li>
                  <li>CRM + ticketing integration for full-funnel visibility.</li>
                </ul>
              </div>
            </div>

            <div className="mt-2 space-y-3 text-sm text-text-secondary dark:text-dark-text-secondary">
              <p>
                Most clients start with a 30-day pilot. We focus on one or two key goals: deflecting repetitive support
                questions, capturing higher-intent leads, or making sure nobody leaves your pricing page confused.
              </p>
              <p>
                At the end of the pilot, you&apos;ll get clear numbers: deflection, leads, transcripts, and a simple
                recommendation on whether to scale up, adjust, or pause.
              </p>
            </div>
          </Section>
        </div>
      </Section>
    </main>
  );
}

function CadenceProductJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const currency = PRICING.currency === "$" ? "USD" : "USD";

  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "CadenceT",
    description:
      "CadenceT is Bespoke Ethos's flagship premium positioning and support agent for small businesses in Cleveland, Ohio. It is trained on your products, voice, and stories to pass the 4 AM Test and deflect tickets while keeping your brand human.",
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: PRICING.cadence.setup,
      priceSpecification: {
        "@type": "PriceSpecification",
        name: "Initial setup",
        priceCurrency: currency,
        price: PRICING.cadence.setup,
      },
      availability: "https://schema.org/InStock",
      url: `${base}/products/cadence`,
    },
    additionalType: "https://schema.org/Service",
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
    },
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
