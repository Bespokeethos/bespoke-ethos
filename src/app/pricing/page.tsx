import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { PRICING, formatMoney } from "@/config/pricing";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/common/button";
import { ENTERPRISE_CONTACT, ENTERPRISE_OFFERINGS } from "../enterprise/data";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Pricing | Bespoke Ethos",
  description:
    "Simple, transparent pricing for small business: Cadence  Your AI Concierge, Consensus Engine  Your AI Strategy Sprint, Workflow Automation Setup, and Automation Rescue—with fixed scopes and LGBTQ-owned discounts.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <OfferCatalogJsonLd />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Pricing" }]} />

        {/* Hero */}
        <div className="page-hero-shell space-y-4">
          <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame shadow-xl pricing-hero-glow">
            <div className="relative h-40 w-full sm:h-48 lg:h-56">
              <Image
                src="/assets/generated/hero-flowstack-desktop.webp"
                alt="Calm workspace with an automation dashboard open beside a notebook and coffee"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 960px"
                priority={false}
              />
            </div>
          </div>
          <Heading subtitle="Simple, transparent pricing" align="left">
            <h1>Pricing</h1>
          </Heading>
          <div className="pill-row">
            <span className="pill">Built for founders, not enterprise retainers</span>
            <span className="pill">NGLCC-certified ú Catalant-vetted</span>
            <span className="pill">25% LGBTQ-owned discount</span>
          </div>
        </div>

        {/* Four flagship offerings */}
        <div className="rail-shell">
          <div className="rail-grid two gap-y-4">
            {/* Workflow Automation Setup */}
            <div className="ghost-card">
              <div className="accent-bar mb-3">Automation</div>
              <h2 className="text-lg font-semibold">Workflow Automation Setup</h2>
              <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                Pick one painful task that&apos;s killing your week. We map your process, keep approvals intact, and build
                production-ready automation in days, not months.
              </p>
              <p className="mt-2 text-base font-semibold text-text-primary dark:text-dark-text-primary">
                {formatMoney(PRICING.workflowAutomationSetup.setup)} setup +{" "}
                {formatMoney(PRICING.workflowAutomationSetup.monthly)}/mo
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>One-task automation built end-to-end with rollback and audit trails.</li>
                <li>Respects edge cases and exceptions instead of flattening them.</li>
                <li>You own the system—no proprietary lock-in.</li>
              </ul>
            </div>

            {/* Cadence */}
            <div className="ghost-card ghost-card--soft border border-success/60 shadow-[0_18px_46px_rgba(52,211,153,0.18)]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-success/60 bg-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-success">
                <span className="h-2 w-2 rounded-full bg-success" />
                Most popular
              </div>
              <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Meet Cadence  Your AI Concierge
              </h2>
              <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
                From {formatMoney(PRICING.aiStrategySprint.setup)} setup + {formatMoney(PRICING.aiStrategySprint.monthly)}/mo
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>Relationship-first AI concierge that feels like your best staffer, not a script.</li>
                <li>Trained on your stories, FAQs, and escalation rules from an AI Strategy Sprint-style intake.</li>
                <li>Lead capture, reporting, and guardrails baked in so you stay in control.</li>
              </ul>
              <div className="mt-4">
                <ButtonLink
                  href="/products/cadence"
                  unstyled
                  className="inline-flex items-center justify-center rounded-full bg-success px-4 py-2 text-sm font-semibold text-black shadow-md transition-transform duration-200 hover:scale-[1.02]"
                >
                  Talk about Cadence
                </ButtonLink>
              </div>
            </div>

            {/* Consensus Engine */}
            <div className="ghost-card">
              <div className="accent-bar mb-3">Decisions</div>
              <h2 className="text-lg font-semibold">Consensus Engine  Your AI Strategy Sprint</h2>
              <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
                {formatMoney(PRICING.aiResearchAssistant.monthly)}/mo (up to {PRICING.aiResearchAssistant.queryLimit} Consensus Engine briefs)
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>Four AI perspectives debate your strategic question and synthesize one clear answer.</li>
                <li>Cited sources and tradeoffs so you see how the recommendation was formed.</li>
                <li>Perfect for &quot;Should we raise prices?&quot; or &quot;Which segment should we focus on?&quot; decisions.</li>
              </ul>
            </div>

            {/* Automation Rescue */}
            <div className="ghost-card">
              <div className="accent-bar mb-3">Rescue</div>
              <h2 className="text-lg font-semibold">Automation Rescue</h2>
              <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
                Most one-time rescues start around {formatMoney(PRICING.automationRescue.standaloneALaCarte)} for non-members, with
                discounted ranges between {formatMoney(PRICING.automationRescue.standaloneLow)} and{" "}
                {formatMoney(PRICING.automationRescue.standaloneHigh)} for ongoing clients.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>Stabilizes brittle Zapier/Make/HubSpot automations before they cost you revenue.</li>
                <li>Adds monitoring and alerts so failures don&apos;t stay silent.</li>
                <li>Ideal when you&apos;ve duct-taped workflows together and can&apos;t risk them breaking again.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enterprise blurb */}
        <div className="rail-shell">
          <div className="rail-grid two gap-y-4">
            <div className="ghost-card ghost-card--soft">
              <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Enterprise and advanced needs
              </h2>
              <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                For compliance-heavy orgs, agencies, or teams with complex legacy systems, we extend the same Workflow
                Automation Setup and Automation Rescue patterns into your infrastructure.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                {ENTERPRISE_OFFERINGS.map((item) => (
                  <li key={item.title}>{item.title}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                Reach out directly at{" "}
                <Link href={`mailto:${ENTERPRISE_CONTACT}`} className="text-accent-600 hover:underline">
                  {ENTERPRISE_CONTACT}
                </Link>{" "}
                to discuss scope and pricing.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3 text-sm">
          <Link className="text-accent-600 hover:underline" href="/contact">
            Contact us
          </Link>
          <Link className="text-accent-600 hover:underline" href="/contact?service=llm-setups">
            Book a free consultation
          </Link>
        </div>
      </Section>
    </main>
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
        itemOffered: { "@type": "Service", name: "Workflow Automation Setup" },
        priceCurrency: currency,
        price: PRICING.workflowAutomationSetup.setup,
        priceSpecification: {
          "@type": "PriceSpecification",
          name: "Setup + Monthly",
          priceCurrency: currency,
          price: PRICING.workflowAutomationSetup.setup,
          eligibleQuantity: 1,
        },
      },
      {
        "@type": "Offer",
        url: `${base}/solutions/consensus-engine`,
        itemOffered: { "@type": "Service", name: "Consensus Engine  Your AI Strategy Sprint" },
        priceCurrency: currency,
        priceSpecification: {
          "@type": "PriceSpecification",
          name: "Monthly",
          priceCurrency: currency,
          price: PRICING.aiResearchAssistant.monthly,
        },
      },
      {
        "@type": "Offer",
        url: `${base}/products/cadence`,
        itemOffered: { "@type": "Service", name: "Cadence  Your AI Concierge" },
        priceCurrency: currency,
        priceSpecification: {
          "@type": "PriceSpecification",
          name: "Setup + Monthly",
          priceCurrency: currency,
          price: PRICING.aiStrategySprint.setup,
        },
      },
      {
        "@type": "Offer",
        url: `${base}/solutions/redbridging`,
        itemOffered: { "@type": "Service", name: "Automation Rescue" },
        priceCurrency: currency,
        priceSpecification: {
          "@type": "PriceSpecification",
          name: "Standalone",
          priceCurrency: currency,
          minPrice: PRICING.automationRescue.standaloneLow,
          maxPrice: PRICING.automationRescue.standaloneHigh,
        },
      },
    ],
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
