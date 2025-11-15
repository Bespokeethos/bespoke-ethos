import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { PRICING, formatMoney } from "@/config/pricing";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import Link from "next/link";
import { ButtonLink } from "@/common/button";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Pricing | Bespoke Ethos",
  description:
    "Simple, transparent pricing for small business: Flowstack\u2122 setup $399 + $59.99/mo, with Chatbots and Redbridging options.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <Section className="gap-8">
      <OfferCatalogJsonLd />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Pricing" }]} />
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary">
        <div className="relative h-40 w-full sm:h-52 lg:h-60">
          <Image
            src="/assets/generated/hero-flowstack-desktop.webp"
            alt="Calm workspace with an automation dashboard open beside a notebook and coffee"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 960px"
            priority={false}
          />
        </div>
      </div>
      <Heading subtitle="Simple, transparent pricing" align="left">
        <h1>Pricing</h1>
      </Heading>
      <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
        NGLCC-certified, Catalant-vetted • 25% discount for LGBTQ-owned businesses
      </p>

      {/* Core subscriptions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Flowstack */}
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Flowstack\u2122</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.flowstack.setup)} setup • {formatMoney(PRICING.flowstack.monthly)}/mo
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Proprietary general automation for any business task</li>
            <li>Discovery-led build, documented and monitored</li>
            <li>Human-in-the-loop approvals and rollback</li>
            <li>Ships fast; you retain full ownership</li>
          </ul>
        </div>

        {/* Chatbots – featured plan with neon green highlight */}
        <div className="pricing-featured-card rounded-2xl border border-success bg-surface-secondary/95 p-5 dark:border-success dark:bg-dark-surface-secondary/95">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-success/60 bg-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-success">
            <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_2px_rgba(0,0,0,0.75)]" />
            Most popular
          </div>
          <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Chatbots</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.chatbots.standardMonthly)}/mo (Standard)
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>24/7 on-brand answers with escalation</li>
            <li>Trained on your FAQs and tone</li>
            <li>Lead capture and analytics</li>
          </ul>
          <div className="mt-4">
            <ButtonLink
              href="/book"
              unstyled
              className="inline-flex items-center justify-center rounded-full bg-success px-4 py-2 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(0,0,0,0.85),0_0_32px_rgba(20,201,162,0.75)] transition-transform duration-200 hover:scale-[1.02]"
            >
              Get started
            </ButtonLink>
          </div>
        </div>

        {/* Redbridging */}
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Redbridging\u2122</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.redbridging.standaloneLow)}/mo standalone or free with Flowstack\u2122/Cadence\u2122
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Rescue brittle automations quickly</li>
            <li>Monitoring, alerts, and retries</li>
            <li>Included with Flowstack\u2122 and Cadence\u2122 subscriptions</li>
          </ul>
        </div>

        {/* Consensus Engine */}
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Consensus Engine\u2122</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.consensusEngine.monthly)}/mo for up to {PRICING.consensusEngine.queryLimit} research queries
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Decision clarity from multiple AI perspectives</li>
            <li>Debate and synthesize an answer you trust</li>
            <li>Includes one free research query with consultation</li>
          </ul>
          <p className="mt-4 text-sm text-text-tertiary">
            <Link href="/solutions/consensus-engine" className="underline">
              Need a single report? Try a free consultation.
            </Link>
          </p>
        </div>
      </div>

      {/* One-time services */}
      <Heading subtitle="Quick, high-impact solutions" align="left" className="mt-12">
        <h2>One-Time Services</h2>
      </Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h3 className="text-lg font-semibold">AI Tool Stack Consultation</h3>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.redbridging.aiToolStackConsultation)} one-time
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>30-minute consultation to identify best AI tools for your specific needs.</li>
            <li>Focus on affordability and immediate impact.</li>
            <li>Receive a personalized recommendation report.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h3 className="text-lg font-semibold">Zapier/Make Workflow Audit</h3>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.redbridging.zapierMakeWorkflowAudit)} one-time
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Expert review of one existing automation workflow (Zapier, Make, etc.).</li>
            <li>Identify failure points, optimize steps, and ensure data integrity.</li>
            <li>Receive a report with actionable optimization steps.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h3 className="text-lg font-semibold">Chatbot Audit &amp; Tune-up</h3>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.redbridging.chatbotAuditTuneUp)} one-time
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>One-time performance review for an existing chatbot (any platform).</li>
            <li>Guardrail check, training data optimization, and tone review.</li>
            <li>Report includes steps to increase ticket deflection and CSAT.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h3 className="text-lg font-semibold">Prompt Engineering</h3>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.redbridging.promptEngineering)} one-time
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Deep-dive session to refine your AI inputs for better, more consistent outputs.</li>
            <li>Delivery of 5-10 optimized, reusable prompts for your core business tasks.</li>
            <li>Perfect for content creation, marketing copy, or internal documentation.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h3 className="text-lg font-semibold">Redbridging\u2122 Rescue</h3>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.redbridging.standaloneALaCarte)} one-time
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>One-time rescue for non-subscription holders.</li>
            <li>Stabilize, document, and fix a single broken workflow.</li>
            <li>Perfect for a quick fix without a monthly commitment.</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 flex gap-3 text-sm">
        <Link className="text-accent-600 hover:underline" href="/contact">
          Contact us
        </Link>
        <Link className="text-accent-600 hover:underline" href="/book">
          Book a free assessment
        </Link>
      </div>
    </Section>
  );
}

function OfferCatalogJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const currency = "USD";
  const json = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Bespoke Ethos Pricing",
    url: `${base}/pricing`,
    itemListElement: [
      {
        "@type": "Offer",
        url: `${base}/solutions/flowstack`,
        itemOffered: { "@type": "Service", name: "Flowstack\u2122" },
        priceCurrency: currency,
        price: PRICING.flowstack.setup,
        priceSpecification: {
          "@type": "PriceSpecification",
          name: "Setup + Monthly",
          priceCurrency: currency,
          price: PRICING.flowstack.setup,
          eligibleQuantity: 1,
        },
      },
      {
        "@type": "Offer",
        url: `${base}/solutions/chatbots`,
        itemOffered: { "@type": "Service", name: "Chatbots" },
        priceCurrency: currency,
        priceSpecification: {
          "@type": "PriceSpecification",
          name: "Monthly",
          priceCurrency: currency,
          minPrice: PRICING.chatbots.rangeMin,
          maxPrice: PRICING.chatbots.rangeMax,
        },
      },
      {
        "@type": "Offer",
        url: `${base}/solutions/redbridging`,
        itemOffered: { "@type": "Service", name: "Redbridging" },
        priceCurrency: currency,
        priceSpecification: {
          "@type": "PriceSpecification",
          name: "Standalone",
          priceCurrency: currency,
          minPrice: PRICING.redbridging.standaloneLow,
          maxPrice: PRICING.redbridging.standaloneHigh,
        },
      },
    ],
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
