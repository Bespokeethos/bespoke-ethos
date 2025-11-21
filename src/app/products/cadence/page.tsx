import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { ButtonLink } from "@/common/button";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { FounderCadenceQA } from "@/app/_components/founder-cadence-qa";
import { TrustStrip } from "@/app/_components/trust-strip";
import { CadenceLogoCard } from "@/common/cadence-logo-card";
import { PRICING, formatMoney } from "@/config/pricing";
import { VogueCard } from "@/components/vogue-card";
import { TechNerdCard } from "@/components/tech-nerd-card";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Cadence: For People Who Hate Chatbots | Bespoke Ethos",
  description:
    "Cadence is a highly tailored customer chatbot for people who hate generic bots—trained on your stories so every conversation sounds like you.",
  alternates: { canonical: "/products/cadence" },
};

const ALT = {
  hero: "Soft-focus shot of a small-business owner at a workbench, warm lighting, with an overlay card describing Cadence—your brand's rhythm.",
  newAsset:
    "Operations lead working on a laptop in a small office, smiling while reviewing a simple automation dashboard, candid natural-light photo",
  infographic:
    "Three-panel infographic showing how Cadence turns founder stories into a human-sounding chatbot for people who hate generic bots, using a conditionally patented orchestration process",
};

export default function CadencePage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-8">
          <CadenceProductJsonLd />

          {/* Hero */}
          <section className="relative cadence-card rounded-2xl">
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
                  <span className="cadence-badge inline-block rounded px-2 py-1 text-xs font-semibold">Cadence</span>
                </div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-xs sm:text-sm font-medium text-white/90 shadow-lg backdrop-blur-md">
                  <span>Cadence</span>
                  <span className="opacity-90">Your Brand&apos;s Rhythm</span>
                </div>

                <Heading
                  align="left"
                  subtitle="A highly tailored customer chatbot for people who think chatbots are just the worst."
                >
                  <h1 className="font-hero-accent">Cadence: For People Who Hate Chatbots.</h1>
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

                <div className="mt-4 rounded-2xl border border-white/20 bg-black/25">
                  <TrustStrip size="thin" />
                </div>
              </div>
            </div>
          </section>

          <VogueCard
            imageSrc="/assets/logos/cadence.png"
            imageAlt="Cadence couture card"
            title="Cadence"
            tagline="Your Brand's Rhythm"
            description="Introducing Cadence—a highly tailored customer chatbot for people who think chatbots are just the worst, powered by a conditionally patented orchestration process so every conversation sounds like you."
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
              Cadence keeps your brand human—even when your customers get weird at 4 AM.
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
              <h2>Meet Cadence: From Specs to Story</h2>
            </Heading>
            <div className="prose prose-zinc max-w-prose dark:prose-invert">
              <p>
                Cadence isn&apos;t just some computer program you install. It&apos;s a relationship-first assistant
                trained on why you built the business, who you serve, and what keeps them up at 4 AM.
              </p>
              <p>
                Before we ever turn on a chat bubble, we spend time in your world&mdash;listening to real
                conversations, reading your emails, and pulling out your <strong>Why</strong>, <strong>Who</strong>, and{" "}
                <strong>Where</strong>&mdash;plus founder motivations, origin stories, and your best customer wins.
                Cadence learns to speak like a teammate, not a template, so every interaction sounds like your best
                day with a regular.
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

          {/* Cadence infographic-style explainer */}
          <section
            aria-labelledby="cadence-infographic"
            className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start"
          >
            <div className="space-y-5">
              <Heading align="left">
                <h2 id="cadence-infographic">Why Cadence feels different from every other chatbot</h2>
              </Heading>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 rounded-2xl border border-border bg-surface-secondary/70 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 dark:text-dark-text-secondary">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary dark:text-dark-text-tertiary">
                    01 · For people who hate chatbots
                  </p>
                  <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                    Built for skeptics, not early adopters
                  </h3>
                  <p>
                    Cadence is a highly tailored customer chatbot for people who think chatbots are just the worst. It
                    behaves more like a patient sales associate who knows your stories than a pop-up FAQ.
                  </p>
                </div>
                <div className="space-y-2 rounded-2xl border border-border bg-surface-secondary/70 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 dark:text-dark-text-secondary">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary dark:text-dark-text-tertiary">
                    02 · Trained on your stories
                  </p>
                  <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                    Your origin stories, not internet noise
                  </h3>
                  <p>
                    We train Cadence on why you built the business, the backstories behind your products, and real
                    conversations with customers—so it can tell the French vanilla candle story instead of just quoting a
                    price.
                  </p>
                </div>
                <div className="space-y-2 rounded-2xl border border-border bg-surface-secondary/70 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 dark:text-dark-text-secondary">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary dark:text-dark-text-tertiary">
                    03 · Conditionally patented orchestration
                  </p>
                  <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                    Guardrails, not guesswork
                  </h3>
                  <p>
                    Behind the scenes, Cadence runs on a conditionally patented orchestration process with guardrails,
                    approvals, and audit trails. You get a modern chatbot with clear boundaries and review points instead
                    of mystery behavior.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame shadow-xl md:h-72">
              <Image
                src="/assets/generated/cadence-infographic-desktop.webp"
                alt={ALT.infographic}
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </section>

          {/* Demo and value prop sections (unchanged structure, now inside card) */}
          <Section className="gap-6 px-0 pb-0 pt-0">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start" id="demo">
              <div className="space-y-4">
                <Heading align="left">
                  <h2>What a Cadence conversation actually feels like</h2>
                </Heading>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  On the surface, Cadence looks like a clean, on-brand chat bubble in the corner of your site. Under
                  the hood, it&apos;s a set of smart lookups, workflows, and safety rules that acts more like a patient
                  sales associate who knows your stories than a generic chatbot.
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <li>
                    <strong>Asks clarifying questions</strong> when a visitor is vague instead of guessing or making things up.
                  </li>
                  <li>
                    <strong>Surfaces stories and examples</strong> from your own case studies and founder notes.
                  </li>
                  <li>
                    <strong>Hands off gracefully to your team</strong> when a human is needed-with context attached.
                  </li>
                </ul>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  If someone asks about your French vanilla candle, Cadence can do more than say, &quot;It&apos;s
                  $39.99.&quot; It might add, &quot;We created this scent after a stay at a tiny New England
                  bed-and-breakfast where the sheets smelled exactly like this. When we got home, we worked with a local
                  perfumery to capture it so you could bring that feeling into your own space.&quot; Those are the
                  moments that build loyalty and customers for life.
                </p>
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
                  <h2>What we do before Cadence ever answers a visitor</h2>
                </Heading>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <li>Content and data audit: products, FAQs, docs, transcripts, best-performing emails.</li>
                  <li>Safety and tone guardrails: what Cadence can&apos;t say or promise.</li>
                  <li>Decision trees for when to escalate to human support or sales.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <Heading align="left">
                  <h2>Where Cadence fits in your business</h2>
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

          <FounderCadenceQA />

          <TechNerdCard product="cadence" />
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
    name: "Cadence",
    description:
      "Cadence is Bespoke Ethos's highly tailored customer chatbot for small businesses in Cleveland, Ohio—built for founders who hate generic chatbots. It is trained on your products, voice, and stories so every conversation sounds like you, while deflecting repetitive questions and keeping your brand human.",
    image: [`${base}/assets/generated/cadence-feature-voice-desktop.webp`],
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



