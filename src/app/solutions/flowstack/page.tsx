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
    <main className="be-page-slate">
      <Section className="gap-6 -mt-6 md:-mt-4">
        <div className="be-section-card space-y-6 pt-4 md:pt-5">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Solutions", href: "/solutions" },
              { name: "Flowstack™" },
            ]}
          />
          <ProductJsonLd />

          <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame shadow-xl">
            <div className="relative h-28 w-full sm:h-36 lg:h-44">
              <Image
                src="/assets/generated/hero-flowstack-desktop.webp"
                alt="Founder's desk transformed from cluttered paperwork to a calm automation dashboard"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl bg-black/45 px-5 py-3 text-center text-sm sm:text-base font-medium text-white/95 shadow-2xl backdrop-blur-md">
                  <div className="mb-1 text-xs uppercase tracking-[0.22em] text-amber-200">Flowstack™</div>
                  <div className="text-sm sm:text-base">Automate Your #1 Task</div>
                </div>
              </div>
            </div>
          </div>

          <Heading
            subtitle="Proprietary general automation for any business task. Own the results."
            align="center"
          >
            <h1 className="font-hero-accent">Flowstack™</h1>
          </Heading>

          <div className="space-y-4 text-text-secondary">
            <p>
              When I was drowning in my publishing business, I didn&rsquo;t need a fancy AI platform. I needed someone
              to automate the one task that was stealing hours from my week. So I built Flowstack™ for myself first. It
              is our proprietary general automation package, designed to handle any business task&mdash;from lead routing
              to inventory updates.
            </p>
            <p>
              We map your real process, keep human approvals intact, and ship a production-ready automation in days.
              Every build ships with documentation, audit trails, and rollback&mdash;because I learned the hard way that
              automation without guardrails creates more problems than it solves.
            </p>
          </div>

          <ul className="mt-2 list-disc pl-6 text-text-secondary">
            <li>Keeps humans in the approval loop where it matters</li>
            <li>Single source of truth with clear audit trails</li>
            <li>Rollback paths and alerts for safe operations</li>
            <li>Ships in days, not months - start with your worst task</li>
          </ul>

          <div className="flex gap-3">
            <ButtonLink intent="primary" href="/contact">
              Automate my #1 task
            </ButtonLink>
            <ButtonLink intent="secondary" href="/contact?service=llm-setups">
              Schedule a free consultation
            </ButtonLink>
          </div>

          <p className="mt-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
            {planSummary(PRICING.flowstack.setup, PRICING.flowstack.monthly)}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            <div className="space-y-3 text-text-secondary">
              <h2 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">
                See Flowstack™ in action
              </h2>
              <p>
                Behind the scenes, FlowstackT is just a clean, auditable workflow: one trigger, a few well-designed
                actions, and logs you can actually read. No mystery black box&mdash;just the steps you wish you had time
                to connect yourself.
              </p>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary">
              <Image
                src="/assets/generated/service-flowstack-builder-desktop.webp"
                alt="Flowstack workflow automation builder showing a new customer signup sequence across forms, Airtable, email and Slack"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
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
