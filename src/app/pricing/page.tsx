import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { PRICING, formatMoney } from "@/config/pricing";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import Link from "next/link";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Pricing | Bespoke Ethos",
  description:
    "Simple, transparent pricing for small business: Flowstack™ setup $399 + $59.99/mo, with Chatbots and Redbridging options.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <Section className="gap-8">
      <OfferCatalogJsonLd />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Pricing" }]} />
      <Heading subtitle="Simple, transparent pricing" align="left">
        <h1>Pricing</h1>
      </Heading>
      <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
        NGLCC-certified, Catalant-vetted • 25% discount for LGBTQ-owned businesses
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Flowstack™™</h2>
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
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Chatbots</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.chatbots.standardMonthly)}/mo (Standard)
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>24/7 on-brand answers with escalation</li>
            <li>Trained on your FAQs and tone</li>
            <li>Lead capture and analytics</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Redbridging™</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.redbridging.standaloneLow)}/mo standalone or free with Flowstack™™/Cadence™
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Rescue brittle automations quickly</li>
            <li>Monitoring, alerts, and retries</li>
            <li>Included with Flowstack™™ and Cadence™ subscriptions</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Consensus Engine™</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.consensusEngine.monthly)}/mo for up to {PRICING.consensusEngine.queryLimit} research queries
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Decision clarity from multiple AI perspectives</li>
            <li>Debate and synthesize an answer you trust</li>
            <li>Includes one free research query with consultation</li>
          </ul>
          <p className="mt-4 text-sm text-text-tertiary">
            <Link href="/solutions/consensus-engine" className="underline">Need a single report? Try a free consultation.</Link>
          </p>
        </div>
      </div>

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
          <h3 className="text-lg font-semibold">Chatbot Audit & Tune-up</h3>
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
          <h3 className="text-lg font-semibold">Redbridging™ Rescue</h3>
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
        itemOffered: { "@type": "Service", name: "Flowstack™" },
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
