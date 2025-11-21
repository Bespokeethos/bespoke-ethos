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
    "Simple, transparent pricing for small business: Flowstack setup $399 + $59.99/mo, with Chatbots and Redbridging options.",
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
        NGLCC-certified, Catalant-vetted • 20% discount for LGBTQ-owned businesses
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Flowstack</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.flowstack.setup)} setup • {formatMoney(PRICING.flowstack.monthly)}/mo
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Discovery-led build, documented and monitored</li>
            <li>Human-in-the-loop approvals and rollback</li>
            <li>Ships fast; you retain full ownership</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Chatbots</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.chatbots.rangeMin)}-{formatMoney(PRICING.chatbots.rangeMax)}/mo
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>24/7 on-brand answers with escalation</li>
            <li>Trained on your FAQs and tone</li>
            <li>Lead capture and analytics</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-5 dark:border-dark-border">
          <h2 className="text-lg font-semibold">Redbridging</h2>
          <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
            {formatMoney(PRICING.redbridging.standaloneLow)}/{formatMoney(PRICING.redbridging.standaloneHigh)} standalone or free with subscription
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
            <li>Rescue brittle automations quickly</li>
            <li>Monitoring, alerts, and retries</li>
            <li>Documentation and ownership handoff</li>
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
        itemOffered: { "@type": "Service", name: "Flowstack" },
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
