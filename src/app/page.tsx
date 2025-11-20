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
import { VogueCard } from "@/components/vogue-card";

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
      "We Take the Busywork—you Keep Control. That means automating repetitive workflows, adding Cadence™, our flagship premium chatbot, and rescuing brittle automations so you get your time back without losing visibility.",
  },
  {
    question: "How does the 25% LGBTQ+ discount work?",
    answer:
      "If you’re an LGBTQ-owned business, you get 25% off all upfront project fees on approved scopes. Monthly subscriptions are billed at standard rates.",
  },
];

export const metadata: Metadata = {
  title: "AI Automation for Cleveland Small Businesses | Bespoke Ethos",
  description:
    "Free 30-minute AI consultation and Consensus Engine™ research for Cleveland small-business founders who want clarity on their next move.",
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
              Risk-free AI readiness audit and a custom Consensus Engine research report on your biggest uncertainty.
            </p>

            <div className="relative inline-block mb-6 sm:mb-8 rounded-full">
              <BorderBeam borderWidth={1} lightWidth={360} duration={10} />
              <Link href="/contact?service=llm-setups" className="primary-cta relative inline-block z-[1]">
                Book Your Free AI Readiness Audit
              </Link>
            </div>

            <p className="home-hero-tagline">
              &ldquo;Am I doing this right?&rdquo; is where most non-technical Cleveland founders start. No jargon. No
              overnight. Just practical automation.
            </p>
          </div>

          <div className="mt-6 mx-auto max-w-md sm:max-w-lg sm:mt-8 lg:max-w-2xl lg:mt-10">
            <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame">
              <Image
                src="/assets/generated/hero-ai-automation-dashboard-desktop.webp"
                alt="AI automation dashboard for a Cleveland small business, showing workflow connections between Gmail, Slack, Salesforce and Airtable"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consensus Engine feature card */}
      <section
        className="home-section home-section--cream py-12 sm:py-16 md:py-20"
        aria-labelledby="consensus-engine-heading"
      >
        <div className="home-section-inner">
          <ConsensusEngineCard />
        </div>
      </section>

      {/* You're Not Alone */}
      <section
        className="home-section home-section--cream"
        aria-labelledby="youre-not-alone-heading"
      >
        <div className="home-section-inner">
          <div className="be-section-card max-w-4xl mx-auto text-center">
            <header className="home-section-header">
              <h2 id="youre-not-alone-heading" className="home-section-title">
                You&apos;re Not Alone
              </h2>
            </header>

            <p className="text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4 sm:mb-5">
              Working a day job while building your dream. Terrified you&apos;ll make the wrong call. Reading articles that
              make it sound easy, then hitting walls when you try to do it yourself.
            </p>

            <p className="text-lg sm:text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              78% of small business owners know they need AI. Most don&apos;t know where to start.
            </p>
          </div>
        </div>
      </section>

      {/* The Offer / What You Get */}
      <section
        className="home-section home-section--white"
        id="book"
        aria-labelledby="what-you-get-heading"
      >
        <div className="home-section-inner">
          <div className="be-section-card">
            <header className="home-section-header text-center">
              <p className="home-section-eyebrow">Free AI Readiness Audit</p>
              <h2 id="what-you-get-heading" className="home-section-title">
                What You Get in 30 Minutes
              </h2>
            </header>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 text-left mb-8 sm:mb-10">
              <div className="home-section-card">
                <p className="home-section-card-title">Plain-English AI Explanation</p>
                <p className="text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  No jargon. No hype. Just a clear picture of what AI can and can&apos;t do for a business like yours.
                </p>
              </div>

              <div className="home-section-card">
                <p className="home-section-card-title">Real Talk About What Works</p>
                <p className="text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  Our wins, our failures, and the patterns we&apos;ve seen across real Cleveland small businesses.
                </p>
              </div>

              <div className="home-section-card">
                <p className="home-section-card-title">Custom Consensus Engine Report</p>
                <p className="text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  One free, cited research report on your biggest question&mdash;pricing, automation, marketing, or
                  anything else.
                </p>
              </div>

              <div className="home-section-card">
                <p className="home-section-card-title">Your Next Step (Even If It&apos;s Not Us)</p>
                <p className="text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  A concrete, founder-friendly recommendation on what to do next so you&apos;re not stuck guessing.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <Link href="/contact?service=llm-setups" className="primary-cta inline-flex">
                Book Your Free AI Readiness Audit
              </Link>
              <p className="home-section-note">
                No pressure. No sales pitch. Just clarity.
              </p>
              <div className="relative mx-auto mt-2 max-w-[800px] w-full rounded-2xl px-4 sm:px-0">
                <BorderBeam borderWidth={3} lightWidth={420} duration={10} />
                <div className="bg-[var(--navy-primary)] p-6 sm:p-8 rounded-2xl text-center">
                  <p className="text-base sm:text-lg md:text-xl text-white mb-4 sm:mb-6 leading-normal sm:leading-relaxed">
                    <strong>LGBTQ+ small business owners:</strong> 25% off all upfront project costs*
                    <br />
                    <span className="text-sm sm:text-base opacity-90">*subscription fees not included</span>
                  </p>
                  <LGBTQDiscountModalTrigger>Learn More About the Discount</LGBTQDiscountModalTrigger>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship 2x2 Vogue grid */}
      <section
        className="home-section home-section--cream"
        aria-labelledby="flagship-vogue-heading"
      >
        <div className="home-section-inner">
          <header className="home-section-header text-center">
            <p className="home-section-eyebrow">Bespoke Ethos Flagship Line</p>
            <h2 id="flagship-vogue-heading" className="home-section-title">
              Couture Tools for Small Business
            </h2>
            <p className="text-base text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
              Cadence™ and Consensus Engine™ top the list, with Flowstack™ and Redbridging™ rounding out the workhorse set. Each card is a snapshot—6 to 9 words that make the promise clear before you click deeper.
            </p>
          </header>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
            <VogueCard
              imageSrc="/assets/logos/cadence.png"
              imageAlt="Cadence couture card"
              title="Cadence™"
              tagline="Brand Rhythm"
              description="Your 4 AM voice across chat, email, SMS."
            />
            <VogueCard
              imageSrc="/assets/logos/consensus.png"
              imageAlt="Consensus Engine couture card"
              title="Consensus Engine™"
              tagline="Collaborative Decisions"
              description="Four AI perspectives deliver one auditable answer."
            />
            <VogueCard
              imageSrc="/assets/logos/flowstack.png"
              imageAlt="Flowstack couture card"
              title="Flowstack™"
              tagline="Workflow Automation"
              description="Compliance-ready automation fabric with approvals + audits."
            />
            <VogueCard
              imageSrc="/assets/logos/RedBridging.png"
              imageAlt="Redbridging couture card"
              title="Redbridging™"
              tagline="AI Reliability"
              description="Automation rescue, monitoring, and runbooks for real ops."
            />
          </div>
        </div>
      </section>

      {/* About / trust */}
      <section
        className="home-section home-section--cream"
        aria-labelledby="built-by-weekend-heading"
      >
        <div className="home-section-inner text-center">
          <div className="be-section-card">
            <header className="home-section-header">
              <h2 id="built-by-weekend-heading" className="home-section-title">
                Built By Weekend Warriors, For Weekend Warriors
              </h2>
            </header>

            <p className="text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-6 sm:mb-8">
              We&apos;re not a fancy agency with marble lobbies.
              <br />
              We&apos;re founders who work manufacturing jobs and build businesses nights and weekends.
              <br />
              <br />
              We&apos;ve filed for bankruptcy. We&apos;ve been terrified. We get it.
            </p>

            <div className="inline-block bg-[var(--soft-white)] px-8 sm:px-12 py-5 sm:py-6 rounded-lg mb-6 sm:mb-8">
              <p className="text-base sm:text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                NGLCC-Certified Gay-Owned Business
              </p>
              <p className="text-sm sm:text-base text-text-secondary dark:text-dark-text-secondary m-0">
                Cleveland, Ohio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Existing trust + founder + testimonials for depth */}
      <HomepageTestimonialsStrip />
      <FounderStory />
      <TrustCredentials />

      {/* Quick answers (FAQ teaser) */}
      <section
        className="home-section home-section--soft"
        aria-labelledby="home-faq-heading"
      >
        <div className="home-section-inner">
          <div className="be-section-card">
            <h2 id="home-faq-heading" className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-3 sm:mb-4 text-left">
              Quick answers for busy founders
            </h2>
            <p className="text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary mb-5 sm:mb-6">
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
            <p className="home-faq-footer">
              Want more details? Our full{" "}
              <Link href="/faq" style={{ textDecoration: "underline" }}>
                FAQ
              </Link>{" "}
              page covers timelines, tools, pricing, and how we work.
            </p>
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
