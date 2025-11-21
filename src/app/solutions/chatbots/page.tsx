import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, planFromMonthly } from "@/config/pricing";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Chatbots - On-Brand Answers 24/7 | Bespoke Ethos",
  description:
    "Friendly, on-brand chatbots that answer common questions, hand off cleanly to humans, and offer a more budget-friendly alternative to Cadence™.",
  alternates: { canonical: "/solutions/chatbots" },
};

export default function ChatbotsPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Chatbots" }]} />
      <ProductJsonLd />
      <Heading subtitle="On-brand support that actually helps" align="left">
        <h1>Chatbots</h1>
      </Heading>
      <div className="space-y-4 text-text-secondary dark:text-dark-text-secondary">
        <p>
          Your customers don&apos;t want a robotic FAQ widget-they want to feel heard and helped. Our standard chatbots
          are the lighter-weight, more budget-friendly way to get there: trained on your content and tone, without the
          deeper story work and conditional patent overhead that come with Cadence™.
        </p>
        <p>
          We design helpful, friendly chatbots that resolve common questions and route the rest to your team. Always
          aligned to your tone, with clear handoffs-because your brand voice is too valuable to hand over to generic AI.
        </p>
      </div>
      <ul className="mt-2 list-disc pl-6 text-text-secondary dark:text-dark-text-secondary">
        <li>24/7 answers for FAQs with human escalation</li>
        <li>Trained on your voice and content, not generic stock</li>
        <li>Works across site, help center, and email handoffs</li>
        <li>Analytics on deflection and customer satisfaction</li>
      </ul>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink className="w-full justify-center sm:w-auto" intent="primary" href="/contact">
          Try AI chatbot free
        </ButtonLink>
        <ButtonLink
          className="w-full justify-center sm:w-auto"
          intent="secondary"
          href="/contact?service=llm-setups"
        >
          Schedule a free consultation
        </ButtonLink>
      </div>
      <p className="mt-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">
        Cost a stretch right now? Ask about our Helping Hand for Tech program. If you&apos;re LGBTQ-owned or just early
        in your journey, reach out and we&apos;ll see if we can bring things closer to your budget—whether through our
        25% LGBTQ discount, a smaller starter scope, or a more modest chatbot build.
      </p>
        </div>
      </Section>
    </main>
  );
}

function ProductJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Chatbots",
    description:
      "Friendly, on-brand chatbots that resolve common questions instantly, escalate complex issues, and capture leads.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: PRICING.currency === "$" ? "USD" : "USD",
      lowPrice: PRICING.chatbots.rangeMin,
      highPrice: PRICING.chatbots.rangeMax,
      availability: "https://schema.org/InStock",
      url: `${base}/solutions/chatbots`,
    },
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

