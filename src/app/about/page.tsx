import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { ButtonLink } from "@/common/button";
import Image from "next/image";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "About Bespoke Ethos | Small Business AI Automation",
  description:
    "NGLCC-certified, Catalant-vetted, 5 years in AI. We take busywork; you keep control - with approvals, logs, and rollback.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Section className="gap-10">
      <AboutPageJsonLd />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />

      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame">
        <div className="relative h-56 w-full sm:h-72 lg:h-80">
          <Image
            src="/assets/generated/hero-ai-automation-dashboard-desktop.webp"
            alt="AI automation dashboard showing workflow connections between Gmail, Slack, Salesforce and Airtable for small business efficiency"
            fill
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 960px"
          />
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <Heading subtitle="AI automation you can trust" align="left">
            <h1>About Bespoke Ethos</h1>
          </Heading>
          <div className="prose max-w-none mt-6">
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
        </div>
        
        <div className="flex items-center justify-center">
          <div className="rounded-lg border border-border p-6 bg-surface-secondary/50">
            <h2 className="text-xl font-semibold mb-4">Our Credentials</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">✓</span>
                <span><strong>NGLCC Certified</strong> - Nationally recognized LGBTQ+ business enterprise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">✓</span>
                <span><strong>Catalant Vetted</strong> - Approved consultant on enterprise platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">✓</span>
                <span><strong>5 Years in AI</strong> - Deep experience with automation and LLMs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">✓</span>
                <span><strong>Small Business Focus</strong> - Enterprise-grade tools at affordable prices</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border p-8 bg-gradient-to-br from-surface-secondary/30 to-surface-secondary/10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          We believe small businesses deserve the same automation advantages as Fortune 500 companies, without the complexity, 
          lock-in, or loss of control. Every solution we build includes human oversight, clear audit trails, and the ability 
          to roll back changes. We are not here to replace your team - we are here to give them back their time.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Meet the Founder</h2>
        <div className="grid gap-8 md:grid-cols-[200px_1fr] items-start">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/founder-upton-rand.jpg"
              alt="Upton Rand, Founder of Bespoke Ethos"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mt-0">Upton Rand</h3>
            <p className="text-text-secondary">
              Upton founded Bespoke Ethos after years of watching small businesses struggle with automation tools that 
              promised simplicity but delivered chaos. With a background in AI, process optimization, and a deep commitment 
              to transparency, Upton built a consultancy that treats automation as a craft - not a commodity.
            </p>
            <p className="text-text-secondary">
              As a proud member of the LGBTQ+ community, Upton is committed to supporting minority-owned businesses and 
              offers a 25% discount to LGBTQ-owned teams. Based in Cleveland, Ohio, Bespoke Ethos serves clients nationwide.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <ButtonLink href="/contact" intent="primary">
          Get in touch
        </ButtonLink>
        <ButtonLink href="/solutions" intent="secondary">
          View our solutions
        </ButtonLink>
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
