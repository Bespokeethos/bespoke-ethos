import Image from "next/image";
import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, planSummary } from "@/config/pricing";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Flowstack™ - Automate Your #1 Task | Bespoke Ethos",
  description:
    "Proprietary general automation package. Discovery-led builds that keep human approvals, audit trails, and rollback. Enterprise-grade automation you own.",
  alternates: { canonical: "/solutions/flowstack" },
};

export default function FlowstackPage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: "Flowstack™" },
        ]}
      />
      <ProductJsonLd />
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary">
        <div className="relative h-52 w-full sm:h-64 lg:h-72">
          <Image
            src="/assets/generated/hero-flowstack-desktop.webp"
            alt="Founder's desk transformed from cluttered paperwork to a calm automation dashboard"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />
        </div>
      </div>
      <Heading
        subtitle="Proprietary general automation for any business task. Own the results."
        align="left"
      >
        <h1>Flowstack™</h1>
      </Heading>
      <div className="space-y-4 text-text-secondary">
        <p>
          When I was drowning in my publishing business, I didn&rsquo;t need a
          fancy AI platform. I needed someone to automate the one task that was
          stealing hours from my week. So I built Flowstack™ for myself first.
          It is our proprietary general automation package, designed to handle
          any business task&mdash;from lead routing to inventory updates.
        </p>
        <p>
          We map your real process, keep human approvals intact, and ship a
          production-ready automation in days. Every build ships with
          documentation, audit trails, and rollback&mdash;because I learned the
          hard way that automation without guardrails creates more problems than
          it solves.
        </p>
      </div>
      <ul className="mt-2 list-disc pl-6 text-text-secondary">
        <li>Keeps humans in the approval loop where it matters</li>
        <li>Single source of truth with clear audit trails</li>
        <li>Rollback paths and alerts for safe operations</li>
        <li>Ships in days, not months — start with your worst task</li>
      </ul>
      <div className="flex gap-3">
        <ButtonLink intent="primary" href="/contact">
          Automate my #1 task
        </ButtonLink>
        <ButtonLink intent="secondary" href="/book">
          Schedule a free assessment
        </ButtonLink>
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
      url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com"
      }/solutions/flowstack`,
    },
    additionalType: "https://schema.org/Service",
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

