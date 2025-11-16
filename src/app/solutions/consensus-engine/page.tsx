import Image from "next/image";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, formatMoney } from "@/config/pricing";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Consensus Engine™ - Decision Clarity | Bespoke Ethos",
  description:
    "Four independent AI perspectives debate your toughest question, highlight risk, and deliver one actionable answer.",
  alternates: { canonical: "/solutions/consensus-engine" },
};

export default function ConsensusEnginePage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Consensus Engine™" }]} />
      <ProductJsonLd />
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame">
        <div className="relative h-52 w-full sm:h-64 lg:h-72">
          <Image
            src="/assets/generated/hero-consensus-desktop.webp"
            alt="Abstract ribbons of light converging into one clear decision point on a strategist's screen"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />
        </div>
      </div>
      <Heading subtitle="Clarity from multiple AI perspectives" align="left">
        <h1>Consensus Engine™</h1>
      </Heading>
      <p className="text-lg font-medium text-text-secondary">
        {formatMoney(PRICING.consensusEngine.monthly)}/mo for up to {PRICING.consensusEngine.queryLimit} research queries.
      </p>
      <div className="space-y-4 text-text-secondary">
        <p>
          When you&rsquo;re running a business alone, every big decision feels paralyzing. Should I raise prices? Pivot my messaging? Hire someone? I built Consensus
          Engine™ because I needed a trusted advisor who could see all sides of a problem&mdash;without the $10,000 consulting bill.
        </p>
        <p>
          Ask your biggest strategic question and see a structured debate-four independent perspectives that synthesize a recommendation with reasoning and tradeoffs.
          It&rsquo;s like having a board of advisors in your pocket.
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
          Book a free consultation &amp; get your first report free
        </ButtonLink>
        <ButtonLink intent="secondary" href="/contact">
          Talk to a human
        </ButtonLink>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
        <div className="space-y-3 text-text-secondary">
          <h2 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">
            How Consensus Engine™ looks in practice
          </h2>
          <p>
            Under the hood, Consensus Engine™ is a structured research room: options, evidence, and a transparent recommendation you can challenge. No
            black-box magic&mdash;just a clear record of why one path beats the others.
          </p>
        </div>
        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary">
          <Image
            src="/assets/generated/service-consensus-decision-interface-desktop.webp"
            alt="Consensus Engine decision interface comparing Cleveland office options with votes and AI insights"
            fill
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </div>
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
