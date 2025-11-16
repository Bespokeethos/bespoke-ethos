import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "LGBTQ+ Founder Discount | Bespoke Ethos",
  description:
    "We offer LGBTQ+ owned businesses a standing 25% discount on upfront project fees for Flowstack™, Cadence™, Redbridging™, and one-time services. Subscription fees are excluded.",
  alternates: { canonical: "/lgbtq-discount" },
};

export default function LGBTQDiscountPage() {
  return (
    <Section className="gap-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "LGBTQ+ Discount" }]} />

      <div className="relative w-full overflow-hidden rounded-3xl border border-border/80 bg-surface-secondary/95 p-6 shadow-xl dark:border-dark-border/80 dark:bg-dark-surface-secondary/95 sm:p-10">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-40 lgbtq-rainbow-background" />

        <div className="relative z-10 space-y-4 text-center sm:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-300">
            <span aria-hidden="true">🏳️‍🌈</span>
            <span>LGBTQ+ Founder Support</span>
          </p>

          <Heading align="left" subtitle="A standing discount, not a campaign.">
            <h1>We Take 25% Off Upfront for LGBTQ+ Businesses.</h1>
          </Heading>

          <p className="text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-lg">
            Starting a business as a minority is hard as hell. I know—I&apos;ve been there. That&apos;s why LGBTQ-owned businesses get a{" "}
            <strong className="text-text-primary dark:text-dark-text-primary">full-time, sitewide 25% discount on upfront project fees</strong>{" "}
            for our core products and one-time services. No campaign window. No hoops. Just say you qualify when we talk.
          </p>

          <div className="grid gap-4 text-left sm:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-tertiary dark:text-dark-text-tertiary">
                What the discount covers
              </h2>
              <ul className="list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>25% off Flowstack™ setup fees.</li>
                <li>25% off Cadence™ setup and training packages.</li>
                <li>25% off Redbridging™ rescue engagements.</li>
                <li>25% off one-time strategy, LLM setup, and automation audits.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-tertiary dark:text-dark-text-tertiary">
                What it doesn&apos;t cover
              </h2>
              <ul className="list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>Does <strong>not</strong> apply to recurring subscription fees.</li>
                <li>Does <strong>not</strong> reduce third-party platform costs (Zapier, Make, etc.).</li>
                <li>Applies to our fees only—the work we directly deliver.</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
            If you&apos;re LGBTQ+-owned or led, just mention it when you reach out. We&apos;ll apply the discount automatically to the
            eligible parts of your proposal.
          </p>

          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/contact?service=llm-setups&subject=25%25%20LGBTQ%2B%20Discount"
              className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] lgbtq-rainbow-button sm:w-auto"
            >
              <span className="absolute inset-0 rounded-full lgbtq-rainbow-ring" />
              <span className="absolute inset-[3px] rounded-full lgbtq-button-inner" />
              <span className="relative z-10 flex items-center bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Talk about my project
                <svg
                  className="ml-2 h-5 w-5 text-purple-600 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

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
  );
}

