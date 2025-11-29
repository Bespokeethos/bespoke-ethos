import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ENTERPRISE_OFFERINGS, ENTERPRISE_CONTACT } from "./data";

export const metadata: Metadata = {
  title: "Enterprise AI Services | Bespoke Ethos",
  description:
    "Workflow Automation Setup, Cadence, Consensus Engine, and Automation Rescue reimagined for enterprise teams that need compliance-ready automation, chat, research, and reliability.",
  alternates: { canonical: "/enterprise" },
};

export default function EnterpriseLandingPage() {
  return (
    <main className="be-page-slate">
      <section className="gap-6 -mt-10 md:-mt-6">
        <div className="be-section-card space-y-6">
          <header className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary dark:text-dark-text-tertiary">
              Enterprise Suite
            </p>
            <h1 className="font-hero-accent text-3xl md:text-4xl">Enterprise AI Services</h1>
            <p className="mx-auto max-w-3xl text-base text-text-secondary dark:text-dark-text-secondary">
              Workflow Automation Setup, Cadence, Consensus Engine, and Automation Rescue—rewired for infosec reviews, multi-cloud
              deployments, and executive accountability. We&apos;re Microsoft-backed and Google cloud-native, so we know Azure and GCP
              inside and out—specifically where vendor lock-in starts and where it can be avoided. We use that experience to keep your
              organization free, clear, and running on clean code whether you live in Azure, AWS, GCP, Alibaba, or sovereign infrastructure.
              Your cloud, your budget, we make it work.
            </p>
            <p className="mx-auto max-w-2xl text-xs text-text-tertiary dark:text-dark-text-tertiary">
              Heads up: this page leans into architecture and security jargon on purpose. If you&apos;d rather walk through a plain-English
              version for your business, reach out and we&apos;ll translate the stack talk into real outcomes.
            </p>
            <div className="mx-auto flex max-w-xs items-center justify-center gap-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
              <div className="relative h-6 w-6 shrink-0 sm:h-7 sm:w-7">
                <Image
                  src="/assets/NERD.png"
                  alt="Friendly nerd icon indicating this page leans into technical details"
                  fill
                  className="object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                />
              </div>
              <span>
                Want to go full-nerd on architecture? Ask for an enterprise technical brief and we&apos;ll happily talk cloud regions,
                tenants, and threat models.
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="mailto:contact@bespokeethos.com?subject=Enterprise%20Discovery"
                className="primary-cta inline-flex"
              >
                Email {ENTERPRISE_CONTACT}
              </Link>
              <Link href="/contact?service=enterprise" className="secondary-cta inline-flex">
                Book a working session
              </Link>
            </div>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {ENTERPRISE_OFFERINGS.map((offering) => (
              <Link
                key={offering.slug}
                href={`/enterprise/${offering.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-secondary/70 p-4 shadow-[0_25px_45px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_65px_rgba(0,0,0,0.2)] dark:border-dark-border dark:bg-dark-surface-secondary/70"
              >
                <div className="relative mb-4 aspect-[5/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={offering.heroImage.src}
                    alt={offering.heroImage.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary dark:text-dark-text-tertiary">
                  {offering.subtitle}
                </p>
                <h2 className="text-2xl font-semibold text-text-primary dark:text-dark-text-primary">
                  {offering.title}
                </h2>
                <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{offering.summary}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent-primary">
                  Explore offering 
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
