import Image from "next/image";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, formatMoney } from "@/config/pricing";
import { ConsensusEngineCard } from "@/components/ConsensusEngineCard";
import { TechNerdCard } from "@/components/tech-nerd-card";
import { VogueCard } from "@/components/vogue-card";
import { TrustStrip } from "@/app/_components/trust-strip";
import { FounderConsensusQA } from "@/app/_components/founder-consensus-qa";
import { ConsensusResearchers } from "@/components/consensus-researchers";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Consensus Engine - Decision Clarity | Bespoke Ethos",
  description:
    "Consensus Engine turns your toughest strategic question into a calm, cited brief by running it through multiple AI perspectives that surface risk, tradeoffs, and a clear recommendation.",
  alternates: { canonical: "/solutions/consensus-engine" },
};

export default function ConsensusEnginePage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-6 -mt-6 md:-mt-4">
        <div className="be-section-card space-y-8 pt-4 md:pt-5">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Solutions", href: "/solutions" },
              { name: "Consensus Engine" },
            ]}
          />
          <ProductJsonLd />
          <ConsensusServiceJsonLd />

          {/* Hero */}
          <section
            aria-labelledby="consensus-hero-heading"
            className="relative overflow-hidden rounded-3xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame shadow-xl"
          >
            <div className="relative h-40 w-full sm:h-48 lg:h-56">
              <Image
                src="/assets/generated/hero-consensus-desktop.webp"
                alt="Abstract ribbons of light converging into one clear decision point on a strategist's screen"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl bg-black/45 px-5 py-3 text-center text-sm sm:text-base font-medium text-white/95 shadow-2xl backdrop-blur-md">
                  <div className="mb-1 text-xs uppercase tracking-[0.22em] text-amber-200">Consensus Engine</div>
                  <div className="text-sm sm:text-base">Decision clarity when it actually matters</div>
                </div>
              </div>
            </div>
          </section>

          {/* Intro + hero title */}
          <section aria-labelledby="consensus-hero-heading" className="space-y-4">
            <Heading
              align="left"
              subtitle="When a decision is big enough to keep you up at night, you need more than one opinion and a gut check."
            >
              <h1 id="consensus-hero-heading" className="font-hero-accent">
                Consensus Engine: Decision clarity for the calls that count
              </h1>
            </Heading>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
              Most AI tools give you one very smart answer and hope that&apos;s enough. Consensus Engine runs a
              coordinated research process that looks at your question from multiple vantage points, lets those
              perspectives challenge each other, and hands you back a calm, cited brief you can actually act on.
            </p>

            <div className="mt-3 rounded-2xl border border-border bg-surface-secondary/70 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 dark:text-dark-text-secondary md:flex md:items-center md:justify-between md:gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary dark:text-dark-text-tertiary">
                  Who it&apos;s for
                </p>
                <p>
                  Founders and operators without a research team who still need research-level clarity on pricing, pivots,
                  positioning, or other moves that change the shape of the business.
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-0 md:justify-end">
                <span className="inline-flex items-center rounded-full bg-surface-primary/80 px-3 py-1 text-xs font-semibold text-text-primary dark:bg-dark-surface-primary/80 dark:text-dark-text-primary">
                  Cited briefs, not mystery answers
                </span>
                <span className="inline-flex items-center rounded-full bg-surface-primary/80 px-3 py-1 text-xs font-semibold text-text-primary dark:bg-dark-surface-primary/80 dark:text-dark-text-primary">
                  You still make the call
                </span>
              </div>
            </div>
          </section>

          {/* Couture card for consistency with other products */}
          <VogueCard
            imageSrc="/assets/logos/consensus.png"
            imageAlt="Consensus Engine couture card"
            title="Consensus Engine\u2122"
            tagline="Collaborative decisions"
            description="Coordinated AI perspectives with citations and clear tradeoffs so your biggest calls come with receipts instead of guesses."
          />

          {/* Trust + pricing */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] items-start">
            <div className="space-y-3 text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
              <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Not just &quot;more AI&quot;—a different vantage point
              </h2>
              <p>
                Most tools give you one model with a single vantage point. Consensus Engine brings several
                specialized lenses to your question—copy and narrative, numbers, legal and compliance, and future
                modelling—then synthesizes what they find into one decision brief. You see options, evidence,
                tradeoffs, and a recommendation, not just a confident paragraph.
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Several perspectives weigh the same decision, then synthesize a recommendation.</li>
                <li>Transparent reasoning and tradeoffs you can push back on.</li>
                <li>Reusable context so follow-up questions get sharper over time.</li>
              </ul>
              <div className="mt-4 rounded-2xl border border-border bg-surface-secondary/70 p-3 text-xs text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 dark:text-dark-text-secondary md:text-sm">
                <p>
                  You&apos;re not handing your toughest calls to a mystery lab. Consensus Engine is built by an
                  independent founder who has spent years training and evaluating frontier models—and who still has to
                  live with the consequences of his own decisions. We start with one big question and earn your trust
                  from there.
                </p>
              </div>
            </div>

            <div className="home-section-card">
              <p className="home-section-card-title">Pricing at a glance</p>
              <p className="mb-2 text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                {formatMoney(PRICING.consensusEngine.monthly)}/mo for up to {PRICING.consensusEngine.queryLimit} research
                queries.
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                Every free 30-minute consultation comes with one Consensus Engine research brief on a reasonable
                strategic question, so you can see the process before you ever pay for a plan. Many clients then move to
                a single, fixed-price research question or a monthly subscription. LGBTQ-owned businesses receive 25%
                off upfront project fees on approved scopes; subscriptions stay at standard rates. If this level of
                clarity would materially change your trajectory but the price is out of reach, email about our annual
                Consensus Engine grant slot.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink
                  className="w-full justify-center sm:w-auto"
                  intent="primary"
                  href="/contact?service=llm-setups"
                >
                  Talk through a question with me
                </ButtonLink>
                <ButtonLink className="w-full justify-center sm:w-auto" intent="secondary" href="/contact">
                  Ask about the grant slot
                </ButtonLink>
              </div>
              <div className="mt-4 rounded-2xl border border-border bg-surface-secondary/70 p-3 dark:border-dark-border dark:bg-dark-surface-secondary/70">
                <TrustStrip size="thin" />
              </div>
            </div>
          </section>

          {/* Cinematic Consensus Engine card + researcher lenses */}
          <ConsensusEngineCard className="my-10" />

          <ConsensusResearchers />

          {/* How it looks in practice */}
          <section className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start">
            <div className="space-y-3 text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
              <h2 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">
                What a Consensus Engine run actually looks like
              </h2>
              <p>
                Under the hood, Consensus Engine walks through your options side by side, shows the evidence each
                lens leaned on, and explains why the recommended path makes sense. Instead of a single verdict, you get
                a structured outline of: options, supporting facts, tradeoffs, and a clear &quot;if this, then
                that&quot; recommendation.
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Your question in plain language, plus any constraints we agree on.</li>
                <li>Several perspectives—story, numbers, legal, and future—summarized separately.</li>
                <li>A synthesized recommendation with citations you can check.</li>
              </ul>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame shadow-xl md:h-56">
              <Image
                src="/assets/generated/service-consensus-decision-interface-desktop.webp"
                alt="Consensus Engine decision interface comparing options with votes, notes, and cited AI insights"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </section>

          {/* Founder Q&A in your voice */}
          <FounderConsensusQA />

          {/* Nerd card for technical readers */}
          <TechNerdCard product="consensus" />
        </div>
      </Section>
    </main>
  );
}

function ProductJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Consensus Engine",
    description:
      "Consensus Engine is Bespoke Ethos's AI-assisted research service for small-business founders. Multiple AI perspectives debate your toughest strategic question, surface disagreements, and synthesize one actionable brief with citations.",
    image: [`${base}/assets/generated/hero-consensus-desktop.webp`],
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
      url: base,
    },
    url: `${base}/solutions/consensus-engine`,
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function ConsensusServiceJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${base}/solutions/consensus-engine#service`,
    name: "Consensus Engine",
    description:
      "Consensus Engine is Bespoke Ethos's AI research service for small-business founders in Cleveland, Ohio. Multiple AI research lenses debate your toughest question, surface risk, and synthesize one recommendation so you can move forward with confidence. LGBTQ-owned businesses receive 25% off upfront project fees on approved scopes.",
    image: [`${base}/assets/generated/hero-consensus-desktop.webp`],
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
      url: base,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Cleveland, OH",
    },
    url: `${base}/solutions/consensus-engine`,
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
