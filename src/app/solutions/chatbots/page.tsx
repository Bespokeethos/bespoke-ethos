import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { PRICING, planFromMonthly } from "@/config/pricing";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Chatbots - On-Brand Answers 24/7 | Bespoke Ethos",
  description: "Friendly, helpful chatbots trained on your voice with clear human handoff and lead capture.",
  alternates: { canonical: "/solutions/chatbots" },
};

export default function ChatbotsPage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Chatbots" }]} />
      <ProductJsonLd />
      <Heading subtitle="On-brand support that actually helps" align="left">
        <h1>Chatbots</h1>
      </Heading>
      <div className="space-y-4 text-text-secondary dark:text-dark-text-secondary">
        <p>
          As an author and publisher, I know the power of voice. Your customers don&rsquo;t want a robotic FAQ bot—they want to feel heard and helped. That&rsquo;s why I build chatbots that sound like you, not like a machine.
        </p>
        <p>
          We design helpful, friendly chatbots that resolve common questions and route the rest to your team. Always aligned to your tone, with clear handoffs—because your brand voice is too valuable to hand over to generic AI.
        </p>
      </div>
      <ul className="mt-2 list-disc pl-6 text-text-secondary dark:text-dark-text-secondary">
        <li>24/7 answers for FAQs with human escalation</li>
        <li>Trained on your voice and content, not generic stock</li>
        <li>Works across site, help center, and email handoffs</li>
        <li>Analytics on deflection and customer satisfaction</li>
      </ul>
      <div className="flex gap-3">
        <ButtonLink intent="primary" href="/contact">
          Try AI chatbot free
        </ButtonLink>
        <ButtonLink intent="secondary" href="/contact?service=llm-setups">
          Schedule a free consultation
        </ButtonLink>
      </div>
    </Section>
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
