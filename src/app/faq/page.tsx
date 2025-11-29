import Image from "next/image";
import { Faq } from "@/app/_sections/faq";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "FAQ | Bespoke Ethos",
  description: "Straight answers about automation, approvals, tools, and security.",
  alternates: { canonical: "/faq" },
};

const questions = [
  {
    _analyticsKey: "faq-1",
    _title: "How fast can you ship a first automation?",
    answer:
      "Most clients see a production-ready workflow in days, not months. We start with your most painful task, ship a narrow win first, and iterate with you in the loop.",
  },
  {
    _analyticsKey: "faq-2",
    _title: "Will I stay in control of approvals?",
    answer:
      "Yes. Every build includes human approval checkpoints, clear audit trails, and rollbacks. You decide what runs automatically and what always needs a human click.",
  },
  {
    _analyticsKey: "faq-3",
    _title: "Which tools do you work with?",
    answer:
      "Zapier, Make, Jotform, Calendly, HubSpot, QuickBooks, Google Workspace, and more—plus custom connectors when needed. If you already have tools in place, we start there instead of ripping them out.",
  },
  {
    _analyticsKey: "faq-4",
    _title: "Is my data secure?",
    answer:
      "We minimize data exposure, encrypt in transit, and follow least-privilege principles. Sensitive operations can run on your infrastructure, and we avoid storing more data than a workflow truly needs.",
  },
  {
    _analyticsKey: "faq-5",
    _title: "Do you replace my team or work with them?",
    answer:
      "We design automations that take the busywork off your team's plate so they can stay focused on higher-value work. AI handles structured, repeatable tasks; humans still make the calls that matter.",
  },
  {
    _analyticsKey: "faq-6",
    _title: "What does a typical first project cost?",
    answer:
      "Most first projects land in the $799-$2,500 range depending on scope. The pricing page breaks down Cadence  Your AI Concierge, Consensus Engine  Your AI Strategy Sprint, Workflow Automation Setup, and Automation Rescue packages, plus one-time services.",
  },
  {
    _analyticsKey: "faq-7",
    _title: "Can you rescue broken automations I already have?",
    answer:
      "Yes—that's exactly what Automation Rescue is for. We stabilize brittle Zapier/Make flows, add monitoring and alerts, and document everything so you're not dependent on a single person who `knows the system`.",
  },
  {
    _analyticsKey: "faq-8",
    _title: "How do we get started?",
    answer:
      "Book a free assessment or send a quick note through the contact form. Share your top one or two pain points, your tools, and your rough budget. We'll respond with a concrete plan—not a generic sales deck.",
  },
] as const;

function FaqJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    image: ["/assets/generated/hero-consensus-desktop.webp"],
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q._title,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function FaqPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <div className="be-section-card space-y-6 page-hero-shell">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
          <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame shadow-xl">
            <div className="relative h-40 w-full sm:h-48 lg:h-56">
              <Image
                src="/assets/generated/hero-consensus-desktop.webp"
                alt="Founder meeting at a small table reviewing clear strategy notes together"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
          </div>
          <Heading subtitle="Straight answers, no hype" align="left">
            <h1 className="font-hero-accent">Frequently Asked Questions</h1>
          </Heading>
          <div className="pill-row">
            <span className="pill">Human-in-loop approvals</span>
            <span className="pill">Static-first ú serverless when needed</span>
            <span className="pill">25% LGBTQ-owned discount</span>
          </div>
          <FaqJsonLd />
          <div className="rail-shell">
            <div className="ghost-card ghost-card--soft">
              <Faq
                heading={{ title: "Questions", subtitle: "What clients ask us most", align: "left", tag: null }}
                layout="accordion"
                questions={{ items: questions as any }}
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

