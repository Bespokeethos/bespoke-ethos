import type { Metadata } from "next";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Essentials | Bespoke Ethos",
  description: "Starter automations and small fixes for when you just need the basics covered.",
  alternates: { canonical: "/solutions/essentials" },
};

export default function EssentialsPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Solutions", href: "/solutions" },
              { name: "Essentials" },
            ]}
          />
          <Heading align="left" subtitle="Simple, reliable building blocks for your systems">
            <h1 className="font-hero-accent">Essentials</h1>
          </Heading>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            We&apos;ll fill in this experience soon. If you need Essentials delivered today—lead capture, small Zap
            fixes, or a basic sync—reach out via the contact form and mention “Essentials” in your message.
          </p>
        </div>
      </Section>
    </main>
  );
}
