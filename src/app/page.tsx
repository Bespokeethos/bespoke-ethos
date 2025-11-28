import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { FounderStory } from "./_sections/founder-story";
import { TrustCredentials } from "./_sections/trust-credentials";
import { HomepageTestimonialsStrip } from "./_sections/testimonials";
import { AlexMollyStory } from "./_sections/alex-molly-story";
import { LGBTQDiscountModalTrigger } from "./_components/lgbtq-discount-modal-trigger";
import { Accordion } from "./_sections/accordion-faq";
import { BorderBeam } from "@/components/ui/border-beam";
import { ConsensusEngineCard } from "@/components/ConsensusEngineCard";
import { StackedProductCards } from "@/components/stacked-product-cards";
import { FlagshipCarousel } from "./_sections/flagship-carousel";
import { ButtonLink } from "@/common/button";
import { ConversionOptimizedHero } from "@/components/conversion-optimized-hero";

// Prefer static generation with periodic refresh for SEO stability.
export const revalidate = 1800;

const homeFaqItems = [
  {
    question: "What kinds of businesses do you work with?",
    answer:
      'We focus on small businesses and founders in Cleveland, Ohio and similar markets—especially teams in "survival mode" who need practical wins, not 40-page decks.',
  },
  {
    question: "What problems do you actually solve?",
    answer:
      "We take the busywork—you keep control. That means automating repetitive workflows, adding Cadence, our flagship premium chatbot, and rescuing brittle automations so you get your time back without losing visibility.",
  },
  {
    question: "How does the 25% LGBTQ+ discount work?",
    answer:
      "If you're an LGBTQ-owned business, you get 25% off all upfront project fees on approved scopes. Monthly subscriptions are billed at standard rates.",
  },
] as const;

export const metadata: Metadata = {
  title: "Cleveland AI Consulting That Actually Makes Sense | Bespoke Ethos",
  description:
    "Cleveland-based AI consulting for small businesses: free readiness audit + Decision Brief, fixed scopes from $997, NGLCC-certified, 25% LGBTQ discount, static/serverless builds.",
  keywords: [
    "AI consulting Cleveland",
    "AI automation consultant Cleveland",
    "Cleveland small business AI",
    "AI readiness audit Cleveland",
    "chatbot setup Cleveland",
    "Zapier Make rescue Cleveland",
    "LGBTQ owned AI consulting",
    "Decision Briefs AI research",
    "static site automation",
    "Appen AI trainer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.bespokeethos.com",
    title: "Cleveland AI Consulting | Bespoke Ethos",
    description:
      "Free AI readiness audit and Decision Brief for Cleveland small businesses. Fixed scopes from $997; NGLCC-certified and LGBTQ-owned.",
    images: [
      {
        url: "/assets/generated/logo-square-dark.png",
        width: 1200,
        height: 630,
        alt: "Bespoke Ethos orange square logo",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main aria-label="Bespoke Ethos homepage">
      <HomePageJsonLd />
      <HomeFaqJsonLd />

      <ConversionOptimizedHero />

      {/* Pain points */}
      <section className="home-section home-section--cream" aria-labelledby="pain-points-heading">
        <div className="home-section-inner home-section-grid">
          <div className="space-y-3">
            <p className="home-section-eyebrow">STUCK BETWEEN &quot;AI SOUNDS GREAT&quot; AND &quot;WHERE DO I START?&quot;</p>
            <h2 id="pain-points-heading" className="home-section-title font-hero-accent">
              You&apos;re not alone. Most small businesses struggle with AI integration and trust.
            </h2>
            <ul className="home-section-list space-y-2">
              <li>Want proof before you commit? We start with a free Decision Brief on your biggest question.</li>
              <li>Hate jargon? You get plain-English plans, not enterprise decks.</li>
              <li>No dev team? Everything ships static/serverless with approvals and rollback.</li>
              <li>Cost stress? Clear pricing and a standing 25% LGBTQ-owned discount.</li>
            </ul>
          </div>
          <div className="be-section-card space-y-3">
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">Built for Cleveland founders</h3>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-6">
              Manufacturing labor shortages, post-COVID recovery, service businesses that can&apos;t afford downtime—we’ve lived it. I work
              out of North Olmsted and answer every request myself.
            </p>
            <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Local, audited, and NGLCC-certified.</p>
          </div>
        </div>
      </section>

      {/* Real customers */}
      <section className="home-section home-section--white" aria-labelledby="real-customers-heading">
        <div className="home-section-inner space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="home-section-eyebrow">Real Cleveland businesses</p>
              <h2 id="real-customers-heading" className="home-section-title font-hero-accent">Proof before promises</h2>
            </div>
            <ButtonLink intent="secondary" href="/testimonials">
              See testimonials
            </ButtonLink>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="ghost-card ghost-card--soft space-y-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/60 dark:border-dark-border/60">
                <Image
                  src="/assets/Real-Customers/Alex-with-Molly.jpg"
                  alt="Alex with Molly AI tutor open on his laptop"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 45vw"
                />
              </div>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                “Cadence sounds like us, not a robot. It hands off when it should and keeps approvals intact.”
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary dark:text-dark-text-tertiary">Retail co-op · Premium chat</p>
            </div>
            <div className="ghost-card ghost-card--soft space-y-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/60 dark:border-dark-border/60">
                <Image
                  src="/assets/Real-Customers/Alex-Ordedock-Coffee-Marquette-Mi.jpg"
                  alt="Founder meeting at a local coffee shop reviewing automation tasks"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 45vw"
                />
              </div>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                “We stopped babysitting automations. Everything is documented with approvals and alerts.”
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary dark:text-dark-text-tertiary">Service &amp; ops · Automation Runbook</p>
            </div>
          </div>
        </div>
      </section>

      {/* Straight talk pricing */}
      <section className="home-section home-section--impact" aria-labelledby="pricing-transparent-heading">
        <div className="home-section-inner home-section-grid">
          <div className="space-y-3">
            <p className="home-section-eyebrow">Straight talk on pricing</p>
            <h2 id="pricing-transparent-heading" className="home-section-title font-hero-accent">
              Competitors charge $200-350/hr and $10K-$50K retainers. We start at $997.
            </h2>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              Because we remember being broke. Fixed scopes, clear deliverables, and a 25% LGBTQ-owned discount on upfront project fees.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink intent="primary" href="/pricing">
                View pricing
              </ButtonLink>
              <ButtonLink intent="secondary" href="/contact?service=llm-setups">
                Ask about your budget
              </ButtonLink>
            </div>
          </div>
          <div className="be-section-card space-y-2">
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">What you get</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
              <li>Decision Brief on your biggest question before you commit</li>
              <li>Static/serverless builds with approvals, rollback, and docs</li>
              <li>No enterprise fluff; founder answers every request</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Specific use cases */}
      <section className="home-section home-section--white" aria-labelledby="use-cases-heading">
        <div className="home-section-inner space-y-4">
          <p className="home-section-eyebrow">What we actually automate</p>
          <h2 id="use-cases-heading" className="home-section-title font-hero-accent">
            The work that keeps you up at night, handled with approvals on.
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="be-section-card">
              <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>Email sequences that don&apos;t sound like robots</li>
                <li>Lead qualification so you stop chasing tire-kickers</li>
                <li>Customer support replies (you approve before they send)</li>
              </ul>
            </div>
            <div className="be-section-card">
              <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>Appointment scheduling that actually works</li>
                <li>Zapier/Make rescues with monitoring and rollback</li>
                <li>Decision Briefs to end endless debates before you spend</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Keep-the-lights-on promises */}
      <section className="home-section home-section--impact" aria-labelledby="lights-on-heading">
        <div className="home-section-inner">
          <div className="rail-shell">
            <div className="rail-grid two">
              <div className="ghost-card ghost-card--soft space-y-3">
                <p className="home-section-eyebrow">Built for survival-mode founders</p>
                <h2 id="lights-on-heading" className="home-section-title font-hero-accent">
                  Fix the thing that&apos;s costing you sleep, not a deck you can&apos;t defend.
                </h2>
                <p className="text-lg text-text-secondary dark:text-dark-text-secondary leading-7">
                  Static-first builds, serverless only when needed, approval trails on everything. I read every request and
                  give you a price or a no-go—no enterprise retainers, no AI auto-responder.
                </p>
                <ul className="home-section-list space-y-2">
                  <li>Broken Zaps/Make/QuickBooks? Redbridging rescues with monitoring and rollback.</li>
                  <li>Need a real chatbot? Cadence trains on your voice and knows when to escalate.</li>
                  <li>Big decision gridlock? Consensus Engine gives you a cited brief before you spend.</li>
                  <li>LGBTQ-owned? Mention it—25% off upfront costs.</li>
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <ButtonLink intent="primary" href="/contact?service=llm-setups">
                    Tell me what&apos;s broken
                  </ButtonLink>
                  <ButtonLink intent="secondary" href="/pricing">
                    See productized pricing
                  </ButtonLink>
                </div>
              </div>
              <div className="ghost-card space-y-3">
                <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                  No enterprise fluff. Rust Belt tolerances.
                </h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-6">
                  Tool &amp; die tech + AI trainer. Everything ships with docs, approvals, and audit trails. Static outputs
                  keep maintenance low; serverless is used sparingly and documented. If a $20 tool beats a custom build, I&apos;ll
                  tell you.
                </p>
                <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                  NGLCC-certified, Catalant-vetted. 90-day “break it, we fix it” coverage on new builds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productized offers */}
      <section className="home-section home-section--white" aria-labelledby="productized-heading">
        <div className="home-section-inner">
          <div className="rail-shell">
            <div className="rail-grid two">
              <div className="ghost-card ghost-card--soft space-y-4">
                <p className="home-section-eyebrow">Productized AI, not open-ended hours</p>
                <h2 id="productized-heading" className="home-section-title font-hero-accent">
                  Clear scopes, fixed pricing, 90-day “break it we fix it” coverage.
                </h2>
                <p className="text-lg text-text-secondary dark:text-dark-text-secondary leading-7">
                  Every build ships with approvals and audit trails intact: static/site-first delivery, serverless functions only
                  when required, and zero surprise infrastructure. You get ownership, documentation, and founder-friendly pricing.
                </p>
                <ul className="home-section-list space-y-2">
                  <li>Cadence premium chatbot — $949 setup + $149/mo, tuned to your voice and founder story.</li>
                  <li>Flowstack automation — one painful workflow stabilized and documented (starts at $1,497).</li>
                  <li>Consensus Engine — cited research briefs on your biggest decision before you commit budget.</li>
                  <li>25% discount for LGBTQ-owned businesses; need-based slots for under-resourced founders.</li>
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <ButtonLink intent="primary" href="/contact?service=productized">
                    Claim your slot
                  </ButtonLink>
                  <ButtonLink intent="secondary" href="/pricing">
                    View pricing details
                  </ButtonLink>
                </div>
              </div>
              <div className="ghost-card ghost-card--soft">
                <StackedProductCards />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alex & Molly Story */}
      <AlexMollyStory />

      {/* Flagship Carousel (Cube) */}
      <section className="home-section home-section--soft" aria-labelledby="bespoke-solutions-heading">
        <div className="home-section-inner">
          <FlagshipCarousel />
        </div>
      </section>

      {/* Consensus Engine cinematic card highlight */}
      <section className="home-section" aria-labelledby="consensus-highlight-heading">
        <div className="home-section-inner">
          <div className="rail-shell">
            <div className="rail-grid two">
              <div className="ghost-card space-y-3">
                <h2
                  id="consensus-highlight-heading"
                  className="text-2xl font-semibold text-text-primary dark:text-dark-text-primary font-hero-accent"
                >
                  A research brief, not a mystery answer
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  Consensus Engine turns one big strategic question into a calm, cited brief. During your free consultation,
                  we’ll run one reasonable question through the engine so you can see what it feels like to have your problem
                  fully surrounded before you decide anything.
                </p>
              </div>
              <div className="ghost-card ghost-card--soft">
                <ConsensusEngineCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cognitive prosthetic positioning */}
      <section className="home-section home-section--cream" aria-labelledby="cognitive-heading">
        <div className="home-section-inner">
          <div className="rail-shell">
            <div className="ghost-card ghost-card--soft space-y-4">
              <h2
                id="cognitive-heading"
                className="home-section-title font-hero-accent text-text-primary dark:text-dark-text-primary"
              >
                Built as a cognitive prosthetic, not a novelty
              </h2>
              <p className="text-lg text-text-secondary dark:text-dark-text-secondary leading-7">
                I live between “the Torrent”—hyper-systemizing bursts where solutions click like spinning padlocks—and the
                need for a steady anchor as my mother navigates Alzheimer&apos;s. Everything we ship is designed to catch the
                burst without hallucinating and to hold context without breaking trust.
              </p>
              <ul className="home-section-list space-y-2">
                <li>Human-in-loop by default: approvals, rollback, and audit trails on every build.</li>
                <li>Static/site-first with lightweight serverless only when needed—no surprise infra or upkeep.</li>
                <li>Memory and tone guardrails tuned for bottom-up thinkers (autistic/ADHD, demisexual slow-burn connection).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials, founder story, and trust credentials */}
      <HomepageTestimonialsStrip />
      <FounderStory />
      <TrustCredentials />

      {/* Quick answers (FAQ teaser) */}
      <section className="home-section home-section--soft" aria-labelledby="home-faq-heading">
        <div className="home-section-inner">
          <div className="rail-shell">
            <div className="ghost-card ghost-card--soft">
              <h2
                id="home-faq-heading"
                className="text-2xl font-semibold text-text-primary dark:text-dark-text-primary mb-2 font-hero-accent"
              >
                Quick answers for busy founders
              </h2>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                Three questions we hear most often from Cleveland small-business owners thinking about automation.
              </p>
              <div className="mx-auto w-full max-w-2xl">
                <Accordion
                  items={homeFaqItems.map((item) => ({
                    _title: item.question,
                    answer: item.answer,
                  }))}
                />
              </div>
              <p className="mt-4 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                Want more details? Our full{" "}
                <Link href="/faq" className="underline">
                  FAQ
                </Link>{" "}
                page covers timelines, tools, pricing, and how we work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LGBTQ discount banner */}
      <section className="home-section" aria-labelledby="lgbtq-banner-heading">
        <div className="home-section-inner">
          <div className="rail-shell">
            <div className="ghost-card ghost-card--soft flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                  <h2
                  id="lgbtq-banner-heading"
                  className="text-lg font-semibold text-text-primary dark:text-dark-text-primary font-hero-accent"
                >
                  A helping hand for tech
                </h2>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  We know many founders are tired, under-resourced, and still carrying big visions. If these tools would
                  fundamentally move the needle for you but the budget feels tight, reach out—we keep a 25% discount for
                  LGBTQ-owned businesses and a small number of need-based grant slots each year.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <LGBTQDiscountModalTrigger />
                <ButtonLink intent="secondary" href="/contact">
                  Tell me what you&apos;re building
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HomePageJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${base}/#homepage`,
    url: base,
    name: "AI Automation for Cleveland Small Businesses | Bespoke Ethos",
    isPartOf: {
      "@id": `${base}/#website`,
    },
    about: {
      "@id": `${base}/#organization`,
    },
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function HomeFaqJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    mainEntityOfPage: `${base}/`,
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

