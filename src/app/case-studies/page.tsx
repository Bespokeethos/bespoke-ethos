import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { FounderBadge } from "@/app/_components/founder-badge";
import { ButtonLink } from "@/common/button";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Case Studies | Bespoke Ethos",
  description:
    "See how small businesses reclaimed hours with Workflow Automation Setup, Cadence  Your AI Concierge, Consensus Engine  Your AI Strategy Sprint, and Automation Rescue—auditable automation you control.",
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Workflow Automation Setup */}
            <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary/80 p-5 text-sm shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary dark:text-dark-text-tertiary">
                Workflow Automation Setup ú Cleveland brewery
              </p>
              <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                From sticky notes to same-day fulfillment.
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                A local brewery was tracking wholesale orders in email threads and a wall of sticky notes. Orders slipped
                through the cracks, and re-orders took days.
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                We mapped the real process, then used Workflow Automation Setup to route orders from inbox ú spreadsheet ú
                production queue with human approvals at each step and a clean activity log.
              </p>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
                <div>
                  <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Time saved</dt>
                  <dd>~6 hours/week on manual updates</dd>
                </div>
                <div>
                  <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Tools Used</dt>
                  <dd>Gmail ú Sheets ú Workflow Automation Setup</dd>
                </div>
              </dl>
            </article>

            {/* Cadence – Your AI Concierge */}
            <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary/80 p-5 text-sm shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary dark:text-dark-text-tertiary">
                Cadence ú Service business
              </p>
              <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Fewer &ldquo;quick questions&rdquo;, more booked work.
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                A home-services company was spending evenings replying to &ldquo;just checking&rdquo; messages. Most answers were the
                same, but they needed to stay on-brand and hand off to a human for pricing.
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                We deployed Cadence—Meet Cadence, Your AI Concierge—trained on their FAQs and tone so it could answer common
                questions, capture contact info, and escalate anything nuanced directly into their inbox with a short summary.
              </p>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
                <div>
                  <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Result</dt>
                  <dd>30–40% fewer back-and-forth emails</dd>
                </div>
                <div>
                  <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Tools Used</dt>
                  <dd>Website ú Cadence ú Email</dd>
                </div>
              </dl>
            </article>

            {/* Automation Rescue + Consensus Engine */}
            <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary/80 p-5 text-sm shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary dark:text-dark-text-tertiary">
                Automation Rescue + Consensus Engine ú Online retailer
              </p>
              <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Rescuing brittle automations—and choosing what to fix first.
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                An online retailer had a tangle of old Zaps that quietly failed on busy days. No alerts, no logs, just missing
                orders and confused customers.
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                We used Automation Rescue to audit and harden the existing flows, then ran a Consensus Engine ú Your AI Strategy
                Sprint to decide which workflows should be automated next for the biggest payoff.
              </p>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
                <div>
                  <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Incidents</dt>
                  <dd>Zero silent failures after launch</dd>
                </div>
                <div>
                  <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Tools Used</dt>
                  <dd>Zapier/Make ú Automation Rescue ú Consensus Engine</dd>
                </div>
              </dl>
            </article>

            {/* Consensus Calendar – Cleveland LGBTQ+ social calendar */}
            <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary/80 p-5 text-sm shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary dark:text-dark-text-tertiary">
                Consensus Engine ú Cleveland LGBTQ+ social calendar
              </p>
              <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Turning scattered listings into one trusted calendar.
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Cleveland&apos;s queer community had no single, trustworthy hub for events. Listings were scattered across social
                media, newsletters, and outdated blogs.
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                We used Consensus Engine ú Your AI Strategy Sprint to send three AI agents on independent research sprints. They knew
                they were competing, lost points for stale or wrong info, and earned extra credit for catching each other&apos;s mistakes.
                High-scoring events were then spot-checked by a human before publishing.
              </p>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
                <div>
                  <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Outcome</dt>
                  <dd>Quarterly-updated, centralized LGBTQ+ calendar for Cleveland</dd>
                </div>
                <div>
                  <dt className="font-semibold text-text-primary dark:text-dark-text-primary">Tools Used</dt>
                  <dd>Consensus Engine ú Consensus Calendar</dd>
                </div>
              </dl>
              <ButtonLink href="/calendar" intent="secondary">
                View the Consensus Calendar
              </ButtonLink>
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
