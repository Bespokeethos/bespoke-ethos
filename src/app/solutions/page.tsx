import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, planSummary, planFromMonthly, formatMoney } from "@/config/pricing";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Solutions | Bespoke Ethos",
  description:
    "AI automation, chatbots, decision clarity, and automation rescue - enterprise-grade and affordable for small businesses.",
  alternates: { canonical: "/solutions" },
};

const solutions = [
  {
    slug: "cadence",
    title: "Cadence Chat Concierge (Cadence™)",
    summary: "Premium, relationship-first chatbot trained on your products, voice, and founder stories—built for people who hate generic bots.",
    logo: "/assets/logos/cadence_logo.png",
  },
  {
    slug: "flowstack",
    title: "Automation Runbook (Flowstack™)",
    summary: "Proprietary general automation package. Automate any business task while keeping approvals and audit trails intact.",
    logo: "/assets/logos/flowstack_logo.png",
  },
  {
    slug: "chatbots",
    title: "Chatbots",
    summary: "Standardized at $79.99/mo. Friendly, on-brand AI support that resolves common questions and routes the rest to humans.",
    logo: "/assets/generated/hero-chatbots-square.webp",
  },
  {
    slug: "consensus-engine",
    title: "Decision Briefs (Consensus Engine™)",
    summary: "Decision clarity from multiple AI perspectives that debate and synthesize an answer you trust.",
    logo: "/assets/logos/consensus_engine_logo.png",
  },
  {
    slug: "redbridging",
    title: "Automation Rescue (Redbridging™)",
    summary: "We rescue broken automations—stabilize, document, and maintain with alerts and rollbacks.",
    logo: "/assets/logos/redbridging_logo.png",
  },
];

const flagshipTools = [
  {
    name: "Cadence Chat Concierge (Cadence™)",
    tagline: "Premium Chat",
    href: "/products/cadence",
    image: "/assets/generated/hero-chatbots-desktop.webp",
  },
  {
    name: "Automation Runbook (Flowstack™)",
    tagline: "Workflow Automation",
    href: "/solutions/flowstack",
    image: "/assets/generated/hero-flowstack-desktop.webp",
  },
  {
    name: "Decision Briefs (Consensus Engine™)",
    tagline: "Collaborative Decisions",
    href: "/solutions/consensus-engine",
    image: "/assets/generated/hero-consensus-desktop.webp",
  },
  {
    name: "Automation Rescue (Redbridging™)",
    tagline: "AI Reliability",
    href: "/solutions/redbridging",
    image: "/assets/generated/hero-redbridging-desktop.webp",
  },
];

export default function SolutionsPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6 solutions-hero page-hero-shell">
          <SolutionsItemListJsonLd />
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions" }]} />
          <Heading subtitle="Productized AI that keeps the lights on" align="left">
            <h1>Solutions</h1>
          </Heading>
          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
            Tool &amp; die tech + AI trainer. NGLCC-certified, Catalant-vetted. 25% discount for LGBTQ-owned businesses.
          </p>
          <div className="solutions-meta">
            <span className="solutions-chip">Cadence Chat Concierge (Cadence™)</span>
            <span className="solutions-chip">Automation Runbook (Flowstack™)</span>
            <span className="solutions-chip">Decision Briefs (Consensus Engine™)</span>
            <span className="solutions-chip">Automation Rescue (Redbridging™)</span>
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
                      <h3 className="text-xl font-medium text-text-primary dark:text-dark-text-primary">{tool.name}</h3>
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

        <div className="rail-shell">
          <div className="rail-grid two">
            {solutions.map((s) => {
              let priceLine: string | null = null;
              if (s.slug === "cadence") priceLine = null; // custom pricing tiers on product page
              if (s.slug === "flowstack") priceLine = planSummary(PRICING.flowstack.setup, PRICING.flowstack.monthly);
              if (s.slug === "chatbots") priceLine = planFromMonthly(PRICING.chatbots.standardMonthly);
              if (s.slug === "consensus-engine") {
                priceLine = `${formatMoney(PRICING.consensusEngine.monthly)}/mo for up to ${PRICING.consensusEngine.queryLimit} queries. Includes one free report with consultation.`;
              }
              if (s.slug === "redbridging") {
                priceLine = `From ${formatMoney(PRICING.redbridging.standaloneLow)}/mo standalone or free with Flowstack™/Cadence™`;
              }

              return (
                <div key={s.slug} className="ghost-card">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border/60 bg-white dark:border-dark-border/60">
                    <Image
                      src={
                        s.slug === "cadence"
                          ? "/assets/generated/hero-chatbots-desktop.webp"
                          : s.slug === "flowstack"
                            ? "/assets/generated/hero-flowstack-desktop.webp"
                            : s.slug === "consensus-engine"
                              ? "/assets/generated/hero-consensus-desktop.webp"
                              : s.slug === "redbridging"
                                ? "/assets/generated/hero-redbridging-desktop.webp"
                                : s.logo
                      }
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
                      <h2 className="text-xl font-medium text-text-primary dark:text-dark-text-primary">{s.title}</h2>
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
          <Link className="text-accent-500 font-medium underline hover:text-accent-600" href="/contact?service=llm-setups">
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
    { name: "Flowstack™", url: `${base}/solutions/flowstack` },
    { name: "Chatbots", url: `${base}/solutions/chatbots` },
    { name: "Consensus Engine™", url: `${base}/solutions/consensus-engine` },
    { name: "Redbridging™", url: `${base}/solutions/redbridging` },
  ];
  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}










