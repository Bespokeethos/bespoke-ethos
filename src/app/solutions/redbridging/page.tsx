import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Redbridging - Automation Rescue | Bespoke Ethos",
  description: "Stabilize brittle workflows, add monitoring and retries, and document everything so revenue keeps flowing.",
  alternates: { canonical: "/solutions/redbridging" },
};

export default function RedbridgingPage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Redbridging" }]} />
      <ProductJsonLd />
      <Heading subtitle="We rescue broken automations" align="left">
        <h1>Redbridging™</h1>
      </Heading>
      <div className="space-y-4 text-text-secondary dark:text-dark-text-secondary">
          <p>
          I&rsquo;ve been there—waking up to a broken Zapier flow that&rsquo;s been silently failing for days, costing you orders, invoices, or leads. The panic is real. That&rsquo;s why I created Redbridging™: to rescue automations that are holding your business hostage.
        </p>
        <p>
          We stabilize brittle workflows, add monitoring, and document everything so the next outage doesn&rsquo;t blindside you. Most rescues ship in days, not weeks—because I know you can&rsquo;t afford to wait.
        </p>
      </div>
      <ul className="mt-2 list-disc pl-6 text-text-secondary dark:text-dark-text-secondary">
        <li>Audit and harden existing automations</li>
        <li>Monitoring with alerts and failure retries</li>
        <li>Documentation and ownership handoff</li>
        <li>Fast fixes: days not weeks</li>
      </ul>
      <div className="flex gap-3">
        <ButtonLink intent="primary" href="/contact">
          Rescue my automation
        </ButtonLink>
        <ButtonLink intent="secondary" href="/pricing">
          See pricing
        </ButtonLink>
      </div>
    </Section>
  );
}

function ProductJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Redbridging™",
    description:
      "Rescue brittle automations with audit, hardening, monitoring, alerts, retries, and documentation for ownership handoff.",
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
    },
    url: `${base}/solutions/redbridging`,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
