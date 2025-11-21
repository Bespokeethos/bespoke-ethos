import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { FounderBadge } from "@/app/_components/founder-badge";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Case Studies | Bespoke Ethos",
  description:
    "See how small businesses reclaimed hours with Flowstack™, Chatbots, Consensus Engine™, and Redbridging™ — auditable automation you control.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Case Studies" }]} />

      <Heading
        subtitle="Real small businesses, real hours saved. These are representative composites based on the kinds of builds we ship for founders in Cleveland and beyond."
        align="left"
      >
        <h1 className="font-hero-accent">Case Studies</h1>
      </Heading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Flowstack™ */}
        <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary/80 p-5 text-sm shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary dark:text-dark-text-tertiary">
            Flowstack™ · Cleveland brewery
          </p>
          <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
            From sticky notes to same‑day fulfillment.
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            A local brewery was tracking wholesale orders in email threads and a wall of sticky notes. Orders slipped
            through the cracks, and re‑orders took days.
          </p>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            We mapped the real process, then used Flowstack™ to route orders from inbox → spreadsheet → production queue
            with human approvals at each step and a clean activity log.
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
            <div>
              <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Time saved</dt>
              <dd>~6 hours/week on manual updates</dd>
            </div>
            <div>
              <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Tools Used</dt>
              <dd>Gmail · Sheets · Flowstack™</dd>
            </div>
          </dl>
        </article>

        {/* Chatbots */}
        <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary/80 p-5 text-sm shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary dark:text-dark-text-tertiary">
            Chatbots · Service business
          </p>
          <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
            Fewer “quick questions”, more booked work.
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            A home‑services company was spending evenings replying to “just checking” messages. Most answers were the
            same, but they needed to stay on‑brand and hand off to a human for pricing.
          </p>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            We built an on‑site chatbot trained on their FAQs and tone that could answer common questions, capture
            contact info, and escalate anything nuanced directly into their inbox.
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
            <div>
              <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Result</dt>
              <dd>30–40% fewer back‑and‑forth emails</dd>
            </div>
            <div>
              <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Tools Used</dt>
              <dd>Website · Chatbot · Email</dd>
            </div>
          </dl>
        </article>

        {/* Redbridging™ + Consensus Engine™ */}
        <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary/80 p-5 text-sm shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary dark:text-dark-text-tertiary">
            Redbridging™ + Consensus Engine™ · Online retailer
          </p>
          <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
            Rescuing brittle automations—and choosing what to fix first.
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            An online retailer had a tangle of old Zaps that quietly failed on busy days. No alerts, no logs, just
            missing orders and confused customers.
          </p>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            We used Redbridging™ to audit and harden the existing flows, then ran a Consensus Engine™ report on where
            automation would deliver the biggest payoff next.
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
            <div>
              <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Incidents</dt>
              <dd>Zero silent failures after launch</dd>
            </div>
            <div>
              <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Tools Used</dt>
              <dd>Zapier/Make · Redbridging™ · Consensus Engine™</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <ButtonLink href="/contact" intent="primary">
          Talk about a similar project
        </ButtonLink>
        <ButtonLink href="/blog" intent="secondary">
          Read implementation notes on the blog
        </ButtonLink>
      </div>
      <FounderBadge />
        </div>
      </Section>
    </main>
  );
}
