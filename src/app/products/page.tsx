import type { Metadata } from "next";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { StackedProductCards } from "@/components/stacked-product-cards";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Small Business AI Products | Bespoke Ethos",
  description:
    "Cadence, Flowstack, Consensus Engine, and Redbridging—our flagship small-business AI products for chat, automation, research, and reliability.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6 page-hero-shell">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products" },
            ]}
          />
          <Heading subtitle="Flagship tools for founders in the thick of it" align="left">
            <h1>Small Business Solutions</h1>
          </Heading>
          <div className="pill-row">
            <span className="pill">Cadence Chat Concierge</span>
            <span className="pill">Automation Runbook (Flowstack™)</span>
            <span className="pill">Decision Briefs (Consensus Engine™)</span>
            <span className="pill">Automation Rescue (Redbridging™)</span>
          </div>
          <p className="max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary">
            These are the tools we reach for most often when a small-business founder asks for help: Cadence for
            relationship-first chat, Automation Runbook for auditable automation, Decision Briefs for big decisions, and
            Automation Rescue for keeping critical workflows from falling apart.
          </p>
          <div className="rail-shell">
            <StackedProductCards />
          </div>
        </div>
      </Section>
    </main>
  );
}

