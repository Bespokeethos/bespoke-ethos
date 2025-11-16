import Image from "next/image";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Redbridging™ - Automation Rescue | Bespoke Ethos",
  description: "Stabilize brittle workflows, add monitoring and retries, and document everything so revenue keeps flowing.",
  alternates: { canonical: "/solutions/redbridging" },
};

export default function RedbridgingPage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Redbridging" }]} />
      <ProductJsonLd />
      <RedbridgingServiceJsonLd />
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame shadow-xl">
        <div className="relative h-40 w-full sm:h-48 lg:h-56">
          <Image
            src="/assets/generated/hero-redbridging-desktop.webp"
            alt="Stylized bridge of circuit traces connecting chaos on one side to calm, stable operations on the other"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-black/45 px-5 py-3 text-center text-sm sm:text-base font-medium text-white/95 shadow-2xl backdrop-blur-md">
              <div className="mb-1 text-xs uppercase tracking-[0.22em] text-amber-200">Redbridging™</div>
              <div className="text-sm sm:text-base">Automation Rescue &amp; Monitoring</div>
            </div>
          </div>
        </div>
      </div>
      <Heading subtitle="We rescue broken automations" align="left">
        <h1>Redbridging™</h1>
      </Heading>
      <div className="space-y-4 text-text-secondary dark:text-dark-text-secondary">
        <p>
          I&rsquo;ve been there-waking up to a broken Zapier flow that&rsquo;s been silently failing for days, costing you orders, invoices, or leads. The panic is
          real. That&rsquo;s why I created Redbridging™: to rescue automations that are holding your business hostage.
        </p>
        <p>
          We stabilize brittle workflows, add monitoring, and document everything so the next outage doesn&rsquo;t blindside you. Most rescues ship in days, not
          weeks-because I know you can&rsquo;t afford to wait.
        </p>
      </div>
      <ul className="mt-2 list-disc pl-6 text-text-secondary dark:text-dark-text-secondary">
        <li>Audit and harden existing automations</li>
        <li>Monitoring with alerts and failure retries</li>
        <li>Documentation and ownership handoff</li>
        <li>Fast fixes: days not weeks</li>
      </ul>
      <div className="flex gap-3">
        <ButtonLink intent="primary" href="/contact">
          Rescue my automation
        </ButtonLink>
        <ButtonLink intent="secondary" href="/pricing">
          See pricing
        </ButtonLink>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
        <div className="space-y-3 text-text-secondary dark:text-dark-text-secondary">
          <h2 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">
            Redbridging™ monitoring in action
          </h2>
          <p>
            After a rescue, Redbridging™ keeps watch: run health, failure spikes, and alerts that reach you before your customers feel pain. No more wondering
            whether your automations are quietly failing in the background.
          </p>
        </div>
        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary">
          <Image
            src="/assets/generated/service-redbridging-monitoring-desktop.webp"
            alt="Redbridging monitoring dashboard showing AI workflow health and alerts"
            fill
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </div>
      </div>
    </Section>
  );
}

function ProductJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Redbridging™",
    description:
      "Rescue brittle automations with audit, hardening, monitoring, alerts, retries, and documentation for ownership handoff.",
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
    },
    url: `${base}/solutions/redbridging`,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function RedbridgingServiceJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${base}/solutions/redbridging#service`,
    name: "Redbridging™",
    description:
      "Redbridging™ is Bespoke Ethos’s automation rescue and monitoring service for small businesses in Cleveland, Ohio. We stabilize brittle Zapier/Make flows, add monitoring and alerts, and document everything so revenue keeps flowing. LGBTQ-owned businesses receive 25% off upfront project fees on approved scopes.",
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
      url: base,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Cleveland, OH",
    },
    url: `${base}/solutions/redbridging`,
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
