import Link from "next/link";
import Image from "next/image";
import { Section } from "@/common/layout";
import { BorderBeam } from "@/components/ui/border-beam";

export function LGBTQDiscountBanner() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/generated/hero-ai-automation-dashboard-desktop.webp"
          alt=""
          fill
          className="h-full w-full object-cover opacity-20"
          sizes="(max-width: 768px) 100vw, 960px"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center py-8 sm:py-12">
        <div className="relative rounded-3xl border border-border/80 bg-surface-secondary/95 p-8 shadow-xl dark:border-dark-border/80 dark:bg-dark-surface-secondary/95 sm:p-12">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-600 dark:text-accent-300">
              <span aria-hidden="true">🏳️‍🌈</span>
              <span>Supporting LGBTQ+ entrepreneurs</span>
            </div>

            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
              25% Off for LGBTQ+ Businesses
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-lg">
              Starting a business as a minority is hard as hell. I know-I&rsquo;ve been there. That&rsquo;s why LGBTQ-owned businesses get{" "}
              <strong className="text-text-primary dark:text-dark-text-primary">25% off</strong>. No hoops, no fine print. Just mention it when you reach out.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="relative inline-flex rounded-full">
                <BorderBeam borderWidth={2} lightWidth={360} duration={8} />
                <Link
                  href="/lgbtq-discount"
                  className="relative z-[1] inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition-colors duration-200 hover:bg-slate-100"
                >
                  Claim Your 25% Discount
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
