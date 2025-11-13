import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, formatMoney } from "@/config/pricing";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Consensus Engine - Decision Clarity | Bespoke Ethos",
  description:
    "Four independent AI perspectives debate your toughest question, highlight risk, and deliver one actionable answer.",
  alternates: { canonical: "/solutions/consensus-engine" },
};

export default function ConsensusEnginePage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Consensus Engine" }]} />
      <ProductJsonLd />
      <Heading subtitle="Clarity from multiple AI perspectives" align="left">
        <h1>Consensus Engine™</h1>
        <p className="text-lg font-medium text-text-secondary">
          {formatMoney(PRICING.consensusEngine.monthly)}/mo for up to {PRICING.consensusEngine.queryLimit} research queries.
        </p>
      </Heading>
      <div className="space-y-4 text-text-secondary">
        <p>
          When you&rsquo;re running a business alone, every big decision feels paralyzing. Should I raise prices? Pivot my messaging? Hire someone? I built Consensus Engine™ because I needed a trusted advisor who could see all sides of a problem—without the $10,000 consulting bill.
        </p>
        <p>
          Ask your biggest strategic question and see a structured debate—four independent perspectives that synthesize a recommendation with reasoning and tradeoffs. It&rsquo;s like having a board of advisors in your pocket.
        </p>
      </div>
      <ul className="mt-2 list-disc pl-6 text-text-secondary">
        <li>Four perspectives debate, then synthesize a recommendation</li>
        <li>Transparent reasoning and tradeoffs you can challenge</li>
        <li>Reusable context to improve answers over time</li>
        <li>Perfect for pricing, positioning, prioritization</li>
      </ul>
      <div className="flex gap-3">
        <ButtonLink intent="primary" href="/book">
          Book a free consultation & get your first report free
        </ButtonLink>
        <ButtonLink intent="secondary" href="/contact">
          Talk to a human
        </ButtonLink>
      </div>
    </Section>
  );
}

function ProductJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Consensus Engine™",
    description:
      "Four AI perspectives debate your strategic question, surface disagreements, and synthesize one actionable answer.",
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
    },
    url: `${base}/solutions/consensus-engine`,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
