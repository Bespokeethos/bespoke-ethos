import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, planSummary, formatMoney } from "@/config/pricing";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Solutions | Bespoke Ethos",
  description:
    "Productized AI for founders who can't afford McKinsey: Cadence  Your AI Concierge, Consensus Engine  Your AI Strategy Sprint, Automation Rescue, and Workflow Automation Setup for brittle workflows and one-task automations.",
  alternates: { canonical: "/solutions" },
};

const solutions = [
  {
    slug: "cadence",
    title: "Meet Cadence  Your AI Concierge",
    summary:
      "Your AI concierge front door that routes conversations and tasks, keeps tone on-brand, and hands off cleanly to humans.",
    logo: "/assets/logos/cadence_logo.png",
  },
  {
    slug: "consensus-engine",
    title: "Consensus Engine  Your AI Strategy Sprint",
    summary:
      "AI Strategy Sprint powered by the Consensus Engine for big decisions, approvals-intact plans, and founder-in-the-loop roadmaps.",
    logo: "/assets/logos/consensus_engine_logo.png",
  },
  {
    slug: "redbridging",
    title: "Automation Rescue",
    summary:
      "Rescues brittle Zapier/Make/HubSpot automations, adds alerts and approvals, and documents everything so it stays fixed.",
    logo: "/assets/logos/redbridging_logo.png",
  },
  {
    slug: "flowstack",
    title: "Workflow Automation Setup",
    summary:
      "One painful task automated end-to-end with rollbacks and approvals intact—without hiring a full team.",
    logo: "/assets/logos/flowstack_logo.png",
  },
] as const;

const flagshipTools = [
  {
    name: "Meet Cadence  Your AI Concierge",
    tagline: "AI Concierge",
    href: "/products/cadence",
    image: "/assets/generated/cadence-feature-voice-desktop.webp",
  },
  {
    name: "Consensus Engine  Your AI Strategy Sprint",
    tagline: "Strategy Sprint",
    href: "/solutions/consensus-engine",
    image: "/assets/generated/hero-consensus-desktop.webp",
  },
  {
    name: "Automation Rescue",
    tagline: "AI Reliability",
    href: "/solutions/redbridging",
    image: "/assets/generated/hero-redbridging-desktop.webp",
  },
  {
    name: "Workflow Automation Setup",
    tagline: "Workflow Automation",
    href: "/solutions/flowstack",
    image: "/assets/generated/hero-flowstack-desktop.webp",
  },
] as const;

export default function SolutionsPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6 solutions-hero page-hero-shell">
          <SolutionsItemListJsonLd />
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions" }]} />
          <Heading subtitle="NO RESOURCES. NO PROBLEM. JUST YOU AND AI." align="left">
            <h1>Solutions</h1>
          </Heading>
          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
            Tool &amp; die tech + AI trainer. NGLCC-certified, LGBTQ-owned, and built for founders in survival
            mode—not enterprise retainers. Fixed scopes from $399, with a standing 25% discount for LGBTQ-owned
            businesses.
          </p>
          <div className="solutions-meta">
            <span className="solutions-chip">Cadence  Your AI Concierge</span>
            <span className="solutions-chip">Consensus Engine  Your AI Strategy Sprint</span>
            <span className="solutions-chip">Automation Rescue</span>
            <span className="solutions-chip">Workflow Automation Setup</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink intent="primary" href="/contact?service=llm-setups">
              Tell me what&apos;s broken
            </ButtonLink>
            <ButtonLink intent="secondary" href="/pricing">
              View pricing
            </ButtonLink>
          </div>
        </div>

        {/* 2x2 flagship grid with glow rails */}
        <section aria-label="Flagship AI workflow tools" className="solutions-flagship">
          <div className="rail-shell">
            <div className="grid gap-4 md:grid-cols-2">
              {flagshipTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                >
                  <div className="ghost-card ghost-card--soft space-y-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/60 dark:border-dark-border/60">
                      <Image
                        src={tool.image}
                        alt={`${tool.name} feature image`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, 45vw"
                        priority
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-secondary dark:text-dark-text-secondary">
                        {tool.tagline}
                      </p>
                      <h3 className="text-xl font-medium text-text-primary dark:text-dark-text-primary">
                        {tool.name}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.28em] text-text-tertiary dark:text-dark-text-tertiary">
                        Productized, audited delivery
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Detail cards for each solution */}
        <div className="rail-shell">
          <div className="rail-grid two">
            {solutions.map((s) => {
              let priceLine: string | null = null;
              if (s.slug === "cadence") {
                priceLine = null; // custom tiers on product page
              } else if (s.slug === "consensus-engine") {
                priceLine = `${planSummary(
                  PRICING.aiStrategySprint.setup,
                  PRICING.aiStrategySprint.monthly,
                )} for strategy sprint delivery, then custom retainers.`;
              } else if (s.slug === "redbridging") {
                priceLine = `From ${formatMoney(
                  PRICING.automationRescue.standaloneLow,
                )}/mo standalone or included with Workflow Automation Setup/Cadence retainers.`;
              } else if (s.slug === "flowstack") {
                priceLine = planSummary(
                  PRICING.workflowAutomationSetup.setup,
                  PRICING.workflowAutomationSetup.monthly,
                );
              }

              const heroImage =
                s.slug === "cadence"
                  ? "/assets/generated/cadence-feature-voice-desktop.webp"
                  : s.slug === "consensus-engine"
                    ? "/assets/generated/hero-consensus-desktop.webp"
                    : s.slug === "redbridging"
                      ? "/assets/generated/hero-redbridging-desktop.webp"
                      : "/assets/generated/hero-flowstack-desktop.webp";

              return (
                <div key={s.slug} className="ghost-card">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border/60 bg-white dark:border-dark-border/60">
                    <Image
                      src={heroImage}
                      alt={`${s.title} feature visual`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, 45vw"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <Image src={s.logo} alt={`${s.title} logo`} width={36} height={36} className="h-9 w-9" />
                    <div>
                      <p className="accent-bar text-[11px]">Productized</p>
                      <h2 className="text-xl font-medium text-text-primary dark:text-dark-text-primary">
                        {s.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">{s.summary}</p>
                  {priceLine ? (
                    <p className="mt-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">{priceLine}</p>
                  ) : null}
                  <div className="mt-4">
                    <ButtonLink
                      href={s.slug === "cadence" ? "/products/cadence" : `/solutions/${s.slug}`}
                      intent="secondary"
                    >
                      Learn more
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <Link
            className="text-accent-500 font-medium underline hover:text-accent-600"
            href="/contact?service=llm-setups"
          >
            Not sure where to start? Book a free consultation
          </Link>
        </div>
      </Section>
    </main>
  );
}

function SolutionsItemListJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const items = [
    { name: "Cadence  Your AI Concierge", url: `${base}/products/cadence` },
    { name: "Consensus Engine  Your AI Strategy Sprint", url: `${base}/solutions/consensus-engine` },
    { name: "Automation Rescue", url: `${base}/solutions/redbridging` },
    { name: "Workflow Automation Setup", url: `${base}/solutions/flowstack` },
  ] as const;

  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

