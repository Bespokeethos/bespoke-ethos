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
      "Most clients see a production-ready workflow in days. We start with your most painful task and iterate with you in the loop.",
  },
  {
    _analyticsKey: "faq-2",
    _title: "Will I stay in control of approvals?",
    answer:
      "Yes. Every build supports human approval checkpoints, clear audit trails, and rollbacks.",
  },
  {
    _analyticsKey: "faq-3",
    _title: "Which tools do you work with?",
    answer:
      "Zapier, Make, Airtable, HubSpot, QuickBooks, and more—plus custom connectors when needed.",
  },
  {
    _analyticsKey: "faq-4",
    _title: "Is my data secure?",
    answer:
      "We minimize data exposure, encrypt in transit, and follow least-privilege principles. Sensitive operations can run on your infra.",
  },
];

function FaqJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
    <Section className="gap-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
      <Heading subtitle="Straight answers, no hype" align="left">
        <h1>Frequently Asked Questions</h1>
      </Heading>
      <FaqJsonLd />
      <Faq
        heading={{ title: "Questions", subtitle: "What clients ask us most", align: "left", tag: null }}
        layout="accordion"
        questions={{ items: questions as any }}
      />
    </Section>
  );
}
