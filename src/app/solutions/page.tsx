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
    title: "Cadence™",
    summary: "Premium, relationship-first chatbot trained on your products, voice, and founder stories—built for people who hate generic bots.",
    logo: "/assets/logos/cadence_logo.png",
  },
  {
    slug: "flowstack",
    title: "Flowstack™",
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
    title: "Consensus Engine™",
    summary: "Decision clarity from multiple AI perspectives that debate and synthesize an answer you trust.",
    logo: "/assets/logos/consensus_engine_logo.png",
  },
  {
    slug: "redbridging",
    title: "Redbridging™",
    summary: "We rescue broken automations-stabilize, document, and maintain with alerts and rollbacks.",
    logo: "/assets/logos/redbridging_logo.png",
  },
];

const flagshipTools = [
  {
    name: "Cadence™",
    tagline: "Brand Rhythm",
    href: "/products/cadence",
    image: "/assets/logos/cadence.png",
  },
  {
    name: "Flowstack",
    tagline: "Workflow Automation",
    href: "/solutions/flowstack",
    image: "/assets/logos/flowstack.png",
  },
  {
    name: "Consensus Engine™",
    tagline: "Collaborative Decisions",
    href: "/solutions/consensus-engine",
    image: "/assets/logos/consensus.png",
  },
  {
    name: "Redbridging",
    tagline: "AI Reliability",
    href: "/solutions/redbridging",
    image: "/assets/logos/RedBridging.png",
  },
];

export default function SolutionsPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6">
      <SolutionsItemListJsonLd />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions" }]} />
      <Heading subtitle="Small business AI, without the chaos" align="left">
        <h1>Solutions</h1>
      </Heading>
      <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
        NGLCC-certified, Catalant-vetted - 25% discount for LGBTQ-owned businesses
      </p>

      {/* Flagship tools banner (four-product strip) */}
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame">
        <div className="relative h-32 w-full sm:h-40 lg:h-48">
          <Image
            src="/assets/generated/flagship-tools-banner.webp"
            alt="Cadence, Flowstack, Consensus Engine, and Redbridging - professional AI workflow tools from Bespoke Ethos"
            fill
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />
        </div>
      </div>

      {/* 2x2 flagship grid (chunky glass cards per design spec) */}
      <section aria-label="Flagship AI workflow tools" className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {flagshipTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
            >
              {/* Chunky glass card: translucent white, gentle blur + drop shadow, 5px solid black border, square edges */}
              <div
                className="flex h-full flex-col gap-3 border-[5px] border-black bg-white/30 p-4 text-left shadow-[0_20px_45px_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] dark:bg-white/20"
                style={{ borderRadius: 0 }}
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={tool.image}
                    alt={`${tool.name} square title card`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 45vw"
                    priority
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-secondary dark:text-dark-text-secondary">{tool.tagline}</p>
                  <h3 className="text-xl font-medium text-text-primary dark:text-dark-text-primary">{tool.name}</h3>
                  <p className="text-xs uppercase tracking-[0.28em] text-text-tertiary dark:text-dark-text-tertiary">
                    Professional AI workflow tools
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <li key={s.slug} className="rounded-lg border border-border p-5 dark:border-dark-border">
              <div className="flex items-center gap-4">
                <Image src={s.logo} alt={`${s.title} logo`} width={40} height={40} className="h-10 w-10" />
                <h2 className="text-xl font-medium">{s.title}</h2>
              </div>
              <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">{s.summary}</p>
              {priceLine ? (
                <p className="mt-1 text-sm text-text-tertiary dark:text-dark-text-tertiary">{priceLine}</p>
              ) : null}
              <div className="mt-4">
                <ButtonLink href={s.slug === "cadence" ? "/products/cadence" : `/solutions/${s.slug}`} intent="secondary">
                  Learn more
                </ButtonLink>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6">
        <Link className="text-accent-500 font-medium" href="/contact?service=llm-setups">
          Not sure where to start? Book a free consultation
        </Link>
      </div>
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










