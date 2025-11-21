import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, formatMoney, planSummary } from "@/config/pricing";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Flowstack - Automate Your #1 Task | Bespoke Ethos",
  description:
    "Discovery-led builds that keep human approvals, audit trails, and rollback. Enterprise-grade automation you own.",
  alternates: { canonical: "/solutions/flowstack" },
};

export default function FlowstackPage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Flowstack" }]} />
      <ProductJsonLd />
      <Heading subtitle="Automate your worst task. Own the results." align="left">
        <h1>Flowstack™</h1>
      </Heading>
      <p className="text-text-secondary dark:text-dark-text-secondary">
        We map your real process, keep human approvals intact, and ship a production-ready automation in days. Every
        build ships with documentation, audit trails, and rollback.
      </p>
      <ul className="mt-2 list-disc pl-6 text-text-secondary dark:text-dark-text-secondary">
        <li>Keeps humans in the approval loop where it matters</li>
        <li>Single source of truth with clear audit trails</li>
        <li>Rollback paths and alerts for safe operations</li>
        <li>Ships in days, not months — start with your worst task</li>
      </ul>
      <div className="flex gap-3">
        <ButtonLink intent="primary" href="/contact">Automate my #1 task</ButtonLink>
        <ButtonLink intent="secondary" href="/book">Schedule a free assessment</ButtonLink>
      </div>
      <p className="mt-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
        {planSummary(PRICING.flowstack.setup, PRICING.flowstack.monthly)}
      </p>
    </Section>
  );
}

function ProductJsonLd() {
  const price = planSummary(PRICING.flowstack.setup, PRICING.flowstack.monthly);
  const currency = PRICING.currency === "$" ? "USD" : "USD";
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Flowstack™",
    description:
      "Custom automation for your most time-consuming task. Discovery-led build, human approvals, monitoring, documentation, and rollback.",
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: PRICING.flowstack.setup,
      priceSpecification: {
        "@type": "PriceSpecification",
        name: "Initial setup",
        priceCurrency: currency,
        price: PRICING.flowstack.setup,
      },
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com"}/solutions/flowstack`,
    },
    additionalType: "https://schema.org/Service",
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
