import Link from "next/link";
import { Section } from "@/common/layout";

export function LGBTQDiscountBanner() {
  return (
    <Section className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl text-center py-8 sm:py-12">
        <div className="relative rounded-3xl border border-border/80 bg-surface-secondary/95 p-8 shadow-xl dark:border-dark-border/80 dark:bg-dark-surface-secondary/95 sm:p-12">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-40 lgbtq-rainbow-background" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-600 dark:text-accent-300">
              <span aria-hidden="true">🏳️‍🌈</span>
              <span>Supporting LGBTQ+ entrepreneurs</span>
            </div>

            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
              25% Off for LGBTQ+ Businesses
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-lg">
              Starting a business as a minority is hard as hell. I know—I&rsquo;ve been there. That&rsquo;s why LGBTQ-owned businesses get{" "}
              <strong className="text-text-primary dark:text-dark-text-primary">25% off</strong>. No hoops, no fine print. Just mention it when you reach out.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/lgbtq-discount"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] lgbtq-rainbow-button"
              >
                <span className="absolute inset-0 rounded-full lgbtq-rainbow-ring" />
                <span className="absolute inset-[3px] rounded-full lgbtq-button-inner" />
                <span className="relative z-10 flex items-center bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Claim Your 25% Discount
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
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
