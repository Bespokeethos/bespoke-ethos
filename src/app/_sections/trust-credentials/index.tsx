import Image from "next/image";
import Link from "next/link";
import { Section } from "@/common/layout";
import { IconCertificate, IconBriefcase, IconRobot, IconCheck } from "@tabler/icons-react";
import { BorderBeam } from "@/components/ui/border-beam";

export function TrustCredentials() {
  return (
    <Section>
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-accent-500 text-sm font-semibold uppercase tracking-[0.3em]">
          Trusted & Certified
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
          Real Credentials. Real Experience.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary dark:text-dark-text-secondary">
          We&rsquo;re not just another AI consultant. We&rsquo;re vetted, certified, and battle-tested.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3 items-stretch">
          {/* NGLCC Certified */}
          <div className="flex h-full flex-col items-center rounded-xl border border-border bg-surface-secondary p-8 text-center dark:border-dark-border dark:bg-dark-surface-secondary">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10">
              <IconCertificate className="h-8 w-8 text-accent-500" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              NGLCC Certified
            </h3>
            <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
              Officially recognized as an LGBTQ-owned business by the National LGBT Chamber of Commerce.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <Image
                src="/assets/nglcc_trust_badge.png"
                alt="NGLCC Certified LGBT Business Enterprise"
                width={140}
                height={80}
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Catalant Vetted */}
          <div className="flex h-full flex-col items-center rounded-xl border border-border bg-surface-secondary p-8 text-center dark:border-dark-border dark:bg-dark-surface-secondary">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10">
              <IconBriefcase className="h-8 w-8 text-accent-500" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              Catalant Certified
            </h3>
            <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
              Vetted and approved as a professional business consultant through Catalant&rsquo;s rigorous screening process.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-2 text-xs font-semibold text-accent-600">
              <IconCheck className="h-4 w-4" />
              <span>Catalant vetted consultant</span>
            </div>
          </div>

          {/* AI Experience */}
          <div className="flex h-full flex-col items-center rounded-xl border border-border bg-surface-secondary p-8 text-center dark:border-dark-border dark:bg-dark-surface-secondary">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10">
              <IconRobot className="h-8 w-8 text-accent-500" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              5+ Years AI Training
            </h3>
              <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                Extensive hands-on experience as a Human-in-the-Loop AI trainer with Appen, one of the world&rsquo;s leading AI data companies.
              </p>
            <div className="mt-6">
              <span className="inline-flex items-center rounded-full bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-500">
                Since 2019
              </span>
            </div>
          </div>
        </div>

        {/* 25% Discount Callout with LGBTQ+ button */}
          <div
            className="mt-12 mx-auto max-w-4xl rounded-2xl border-2 border-accent-500/20 p-8 text-center"
            style={{ backgroundColor: "var(--cream-bg)" }}
          >
          <h3 className="text-2xl font-semibold text-text-primary dark:text-dark-text-primary">
            25% Off for LGBTQ+ Businesses
          </h3>
            <p className="mx-auto mt-3 max-w-2xl text-text-secondary dark:text-dark-text-secondary">
            Starting a business as a minority is hard as hell. I know—I&rsquo;ve been there. That&rsquo;s why LGBTQ-owned businesses get 25% off. No hoops, no fine print. Just mention it when you reach out.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative inline-flex rounded-full">
              <BorderBeam borderWidth={2} lightWidth={360} duration={10} />
              <Link
                href="/lgbtq-discount"
                className="relative z-[1] inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition-colors duration-200 hover:bg-slate-100"
              >
                Learn about the 25% discount
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
