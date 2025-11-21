import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "About Bespoke Ethos | Small Business AI Automation",
  description:
    "NGLCC-certified, Catalant-vetted, 5 years in AI. We take busywork; you keep control - with approvals, logs, and rollback.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Section className="gap-6">
      <AboutPageJsonLd />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <Heading subtitle="AI automation you can trust" align="left">
        <h1>About Bespoke Ethos</h1>
      </Heading>
      <div className="prose prose-invert max-w-none dark:prose-invert">
        <p>
          We help small businesses reclaim time with auditable, human-in-the-loop automations. Our approach is
          consultative and practical: map the real process first, ship increments fast, and keep you in control with
          approvals, logs, and rollback paths.
        </p>
        <p>
          Based in Cleveland and proudly LGBTQ-owned, we focus on outcomes: fewer fire drills, clearer ownership, and
          measurable hours saved every week.
        </p>
      </div>
    </Section>
  );
}

function AboutPageJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${base}/about`,
    name: "About Bespoke Ethos",
    mainEntity: { "@type": "Organization", name: "Bespoke Ethos" },
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
