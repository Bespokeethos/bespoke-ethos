import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { ButtonLink } from "@/common/button";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "A La Carte — Flexible Add‑Ons | Bespoke Ethos",
  description: "Pick exactly what you need: Chatbots, lead capture, small fixes, and syncs. Plain language, no contract.",
  alternates: { canonical: "/solutions/a-la-carte" },
};

const ITEMS = [
  { title: "Chatbots", blurb: "On‑brand answers 24/7 with graceful handoff and lead capture.", href: "/solutions/chatbots" },
  { title: "Lead Capture", blurb: "Accessible forms that route cleanly to your CRM with alerts.", href: "/solutions/essentials" },
  { title: "Zap Fix", blurb: "Quick rescue for a brittle Zapier flow with retries and alerts.", href: "/solutions/essentials" },
  { title: "CRM Sync", blurb: "Keep contacts and deals aligned without weird duplicates.", href: "/solutions/essentials" },
];

export default function ALaCartePage() {
  return (
    <Section className="gap-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "A La Carte" }]} />
      <div className="relative overflow-hidden rounded-lg">
        <div className="hero-cloud-bg absolute inset-0 -z-10" />
        <div className="relative z-10 p-6 md:p-8">
          <Heading subtitle="Flexible Add‑Ons" align="left">
            <h1>A La Carte</h1>
          </Heading>
          <p className="mt-2 max-w-prose text-text-secondary dark:text-dark-text-secondary">
            Pick only what you need. Plain language, simple pricing, and no lock‑in. Each add‑on follows the same rules: you keep ownership and approvals, and we monitor the edge cases.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ITEMS.map((i) => (
          <article key={i.title} className="be-card p-5">
            <h2 className="text-lg font-semibold">{i.title}</h2>
            <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">{i.blurb}</p>
            <div className="mt-3">
              <ButtonLink intent="secondary" href={i.href}>Learn More</ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

