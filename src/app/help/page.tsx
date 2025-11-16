import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Help & Product Overview | Bespoke Ethos",
  description:
    "What Flowstack™, Chatbots, Consensus Engine™,  and Redbridging™ do (and don&rsquo;t). Packages, SLAs, and links to pricing.",
  alternates: { canonical: "/help" },
};

const LINK_SEPARATOR = <span className="text-text-tertiary">•</span>;

export default function HelpPage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Help" }]} />
      <Heading subtitle="What our products do and don&rsquo;t" align="left">
        <h1>Help & Product Overview</h1>
      </Heading>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProductCard
          title="Flowstack™"
          summary="Automate your most time-consuming task without losing approvals."
          learnHref="/solutions/flowstack"
        >
          <Column
            heading="Does"
            items={["Discovery-led design and custom build", "Human approvals and rollback", "Monitoring + documentation"]}
          />
          <Column
            heading="Doesn&rsquo;t"
            items={["Replace your ownership or create lock-in", "Ship a fragile, unmonitored prototype"]}
          />
        </ProductCard>

        <ProductCard
          title="Chatbots"
          summary="On-brand, helpful answers 24/7 with a human handoff when needed."
          learnHref="/solutions/chatbots"
        >
          <Column
            heading="Does"
            items={["Answer common questions instantly", "Escalate complex issues to your team", "Capture leads and measure deflection"]}
          />
          <Column
            heading="Doesn&rsquo;t"
            items={["Replace your brand voice", "Hide handoffs when a human is required"]}
          />
        </ProductCard>

        <ProductCard
          title="Consensus Engine"
          summary="Four AI perspectives debate your strategic question and ship one clear answer."
          learnHref="/solutions/consensus-engine"
        >
          <Column
            heading="Does"
            items={["Provide transparent reasoning and tradeoffs", "Highlight disagreements and risk areas", "Deliver a concrete recommendation"]}
          />
          <Column
            heading="Doesn&rsquo;t"
            items={["Offer black-box answers without evidence", "Replace your judgment or ownership"]}
          />
        </ProductCard>

        <ProductCard
          title="Redbridging"
          summary="Rescue brittle automations; add monitoring, alerts, and documentation."
          learnHref="/solutions/redbridging"
        >
          <Column
            heading="Does"
            items={["Audit and harden existing workflows", "Implement retries and alerting", "Document and hand off ownership"]}
          />
          <Column
            heading="Doesn&rsquo;t"
            items={["Introduce lock-in or hidden dependencies", "Leave you without visibility or recourse"]}
          />
        </ProductCard>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link className="text-accent-600 hover:underline" href="/contact">
          Contact us
        </Link>
        {LINK_SEPARATOR}
        <Link className="text-accent-600 hover:underline" href="/contact?service=llm-setups">
          Book a free assessment
        </Link>
        {LINK_SEPARATOR}
        <Link className="text-accent-600 hover:underline" href="/case-studies">
          View case studies & solutions
        </Link>
      </div>
    </Section>
  );
}

function ProductCard({
  title,
  summary,
  learnHref,
  children,
}: {
  title: string;
  summary: string;
  learnHref: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-lg border border-border p-5 text-sm dark:border-dark-border">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">{summary}</p>
      <div className="mt-3 grid grid-cols-2 gap-4">{children}</div>
      <p className="mt-3 space-x-2">
        <Link className="text-accent-600 hover:underline" href={learnHref}>
          Learn more
        </Link>
        <span className="text-text-tertiary">•</span>
        <Link className="text-accent-600 hover:underline" href="/pricing">
          See pricing
        </Link>
      </p>
    </article>
  );
}

function Column({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-medium">{heading}</h3>
      <ul className="mt-2 list-disc pl-5 text-text-secondary dark:text-dark-text-secondary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

