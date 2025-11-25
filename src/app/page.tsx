import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { FounderStory } from "./_sections/founder-story";
import { TrustCredentials } from "./_sections/trust-credentials";
import { HomepageTestimonialsStrip } from "./_sections/testimonials";
import { LGBTQDiscountModalTrigger } from "./_components/lgbtq-discount-modal-trigger";
import { Accordion } from "./_sections/accordion-faq";
import { BorderBeam } from "@/components/ui/border-beam";
import { ConsensusEngineCard } from "@/components/ConsensusEngineCard";
import { StackedProductCards } from "@/components/stacked-product-cards";
import { FlagshipCarousel } from "./_sections/flagship-carousel";
import { ButtonLink } from "@/common/button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  title: "AI Automation for Cleveland Small Businesses | Bespoke Ethos",
  description:
    "Free 30-minute AI consultation and one Consensus Engine research brief for Cleveland small-business founders who want clarity on their next move.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.bespokeethos.com",
    title: "AI Automation for Cleveland Small Businesses | Bespoke Ethos",
    description:
      "Free 30-minute AI consultation and founder-friendly research reports for Cleveland small businesses.",
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

      {/* Hero */}
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="be-hero-aurora" aria-hidden />
        <div className="home-hero-inner">
          <div className="home-hero-panel">
            <h1 id="home-hero-heading" className="home-hero-title font-hero-accent">
              Stop guessing. Start growing. AI automation for Cleveland small businesses.
            </h1>

            <p className="home-hero-subtitle">
              <span className="home-hero-subtitle-part">We help Cleveland small businesses</span>
              <span className="home-hero-rotate" aria-live="polite">
                <span>AUTOMATE</span>
                <span>SIMPLIFY</span>
                <span>SCALE</span>
                <span>PROFIT</span>
                <span>COMPETE</span>
                <span>GROW</span>
              </span>
              <span className="home-hero-subtitle-part">with AI.</span>
            </p>

            <p className="home-hero-body">
              Risk-free AI readiness audit and a free Consensus Engine research brief on your biggest uncertainty—bundled
              with a 30-minute consultation.
            </p>

            <div className="relative inline-block mb-8 rounded-full">
              <BorderBeam borderWidth={1} lightWidth={360} duration={10} />
              <Link href="/contact?service=llm-setups" className="primary-cta relative inline-block z-[1]">
                Book your free AI readiness audit
              </Link>
            </div>

            <p className="home-hero-tagline">
              “Am I doing this right?” is where most non-technical Cleveland founders start. No jargon. No overnight
              promises. Just practical automation.
            </p>
          </div>

          <div className="mt-8 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl">
            <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame">
              <Image
                src="/assets/generated/hero-ai-automation-dashboard-desktop.webp"
                alt="AI automation dashboard for a Cleveland small business, showing workflow connections between tools like Gmail, Slack, and a CRM"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Solutions Header and Flagship Carousel (Cube) */}
      <section className="home-section home-section--soft" aria-labelledby="bespoke-solutions-heading">
        <div className="home-section-inner">
          <h2 id="bespoke-solutions-heading" className="text-center text-3xl font-hero-accent text-text-primary dark:text-dark-text-primary mb-8">
            Bespoke Solutions
          </h2>
          <FlagshipCarousel />
        </div>
      </section>

      {/* Consensus Engine cinematic card highlight */}
      <section className="home-section" aria-labelledby="consensus-highlight-heading">
        <div className="home-section-inner space-y-6">
          <div className="be-section-card space-y-3">
            <h2
              id="consensus-highlight-heading"
              className="text-2xl font-semibold text-text-primary dark:text-dark-text-primary"
            >
              A research brief, not a mystery answer
            </h2>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              Consensus Engine turns one big strategic question into a calm, cited brief. During your free consultation,
              we’ll run one reasonable question through the engine so you can see what it feels like to have your problem
              fully surrounded before you decide anything.
            </p>
          </div>
          <ConsensusEngineCard />
        </div>
      </section>

      {/* Testimonials, founder story, and trust credentials */}
      <HomepageTestimonialsStrip />
      <FounderStory />
      <TrustCredentials />

      {/* Quick answers (FAQ teaser) */}
      <section className="home-section home-section--soft" aria-labelledby="home-faq-heading">
        <div className="home-section-inner">
          <div className="be-section-card">
            <h2
              id="home-faq-heading"
              className="text-2xl font-semibold text-text-primary dark:text-dark-text-primary mb-2"
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
      </section>

      {/* LGBTQ discount banner */}
      <section className="home-section" aria-labelledby="lgbtq-banner-heading">
        <div className="home-section-inner">
          <div className="be-section-card flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2
                id="lgbtq-banner-heading"
                className="text-lg font-semibold text-text-primary dark:text-dark-text-primary"
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
