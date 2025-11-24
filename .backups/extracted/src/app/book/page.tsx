import Script from "next/script";
import type { Metadata } from "next";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Book a Free Assessment | Bespoke Ethos",
  description:
    "Schedule a 30-minute session with Bespoke Ethos to map your highest-leverage automation or AI opportunity.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  const calendlyUrl = "https://calendly.com/contact-bespokeethos/30min";
  return (
    <Section className="gap-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Book" }]} />
      <Heading subtitle="Schedule a free assessment in minutes" align="left">
        <h1>Book a Free Assessment</h1>
      </Heading>

      <div className="rounded-lg border border-border bg-surface-secondary p-4 dark:border-dark-border dark:bg-dark-surface-secondary">
        <div className="calendly-inline-widget h-[760px] w-full" data-url={calendlyUrl} />
      </div>

      <div className="flex gap-3">
        <ButtonLink intent="primary" href={calendlyUrl} target="_blank">
          Open Calendly in a new tab
        </ButtonLink>
        <ButtonLink intent="secondary" href="/contact">
          Prefer to contact us?
        </ButtonLink>
      </div>

      {/* Calendly embed script */}
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </Section>
  );
}
