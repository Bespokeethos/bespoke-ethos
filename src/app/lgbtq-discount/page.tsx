import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { BorderBeam } from "@/components/ui/border-beam";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "LGBTQ+ Founder Discount | Bespoke Ethos",
  description:
    "We offer LGBTQ+ owned businesses a standing 25% discount on upfront project fees for Workflow Automation Setup™, AI Strategy Sprint™, Automation Rescue™, and one-time services. Subscription fees are excluded.",
  alternates: { canonical: "/lgbtq-discount" },
};

export default function LGBTQDiscountPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "LGBTQ+ Discount" }]} />

      <div className="relative w-full overflow-hidden rounded-3xl border border-border/80 bg-surface-secondary/95 p-6 shadow-xl dark:border-dark-border/80 dark:bg-dark-surface-secondary/95 sm:p-10 be-image-frame">
        <div className="relative z-10 space-y-4 text-center sm:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-300">
            <span aria-hidden="true">Always On</span>
            <span>LGBTQ+ Founder Support</span>
          </p>

          <Heading align="left" subtitle="A standing discount, not a campaign.">
            <h1 className="font-hero-accent">We Take 25% Off Upfront for LGBTQ+ Businesses.</h1>
          </Heading>

          <p className="text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-lg">
            Starting a business as a minority is hard as hell. I know—I’ve been there. That’s why LGBTQ-owned
            businesses get a{" "}
            <strong className="text-text-primary dark:text-dark-text-primary">
              full-time, sitewide 25% discount on upfront project fees
            </strong>{" "}
            for our core products and one-time services. No campaign window. No hoops. Just say you qualify when we talk.
          </p>

          <div className="grid gap-4 text-left sm:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-tertiary dark:text-dark-text-tertiary">
                What the discount covers
              </h2>
              <ul className="list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>25% off Workflow Automation Setup™ setup fees.</li>
                <li>25% off AI Strategy Sprint™ setup and training packages.</li>
                <li>25% off Automation Rescue™ rescue engagements.</li>
                <li>25% off one-time strategy, LLM setup, and automation audits.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-tertiary dark:text-dark-text-tertiary">
                What it doesn’t cover
              </h2>
              <ul className="list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>
                  Does <strong>not</strong> apply to recurring subscription fees.
                </li>
                <li>
                  Does <strong>not</strong> reduce third-party platform costs (Zapier, Make, etc.).
                </li>
                <li>Applies to our fees only—the work we directly deliver.</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
            If you’re LGBTQ+-owned or led, just mention it when you reach out. We’ll apply the discount automatically to
            the eligible parts of your proposal.
          </p>

          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative inline-flex w-full rounded-full sm:w-auto">
              <BorderBeam borderWidth={2} lightWidth={360} duration={10} />
              <Link
                href="/contact?service=llm-setups&subject=25%25%20LGBTQ%2B%20Discount"
                className="relative z-[1] inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition-colors duration-200 hover:bg-slate-100 sm:w-auto"
              >
                Talk about my project
              </Link>
            </div>

            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary hover:bg-black/5 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-white/5 sm:w-auto"
            >
              See pricing details
            </Link>
          </div>
        </div>
      </div>
      </Section>
    </main>
  );
}
