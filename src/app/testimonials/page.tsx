import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

type Testimonial = {
  title: string;
  summary: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  imageSrc?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    title: "AI Strategy Sprint paid for itself in 3 weeks",
    summary:
      "Premium chatbot trained on founder voice for an LGBTQ-owned retail co-op. 25% discount applied, escalation paths intact, zero black-box infra.",
    quote:
      "Not another chatbot. AI Strategy Sprint sounds like us, hands off to humans when it should, and we kept approvals. Customers noticed the difference immediately.",
    author: "Monique Ellis",
    role: "Co-Founder",
    company: "Lake Effect Co-op",
    imageSrc: "/assets/generated/testimonial-monique.jpg",
  },
  {
    title: "Workflow Automation Setup stopped the 2 a.m. outages",
    summary:
      "One brittle Zapier/QuickBooks chain was rebuilt static-first with rollback paths and monitoring. Rust Belt manufacturer reclaimed 10+ hours a week.",
    quote:
      "We stopped babysitting failed Zaps. Everything is documented with approvals and alerts-built by someone who knows tight tolerances.",
    author: "Derrick Patel",
    role: "Ops Lead",
    company: "Torque Transmission",
    imageSrc: "/assets/generated/testimonial-derrick.jpg",
  },
  {
    title: "AI Research Assistant ended the endless debate",
    summary:
      "Cited brief across multiple AI lenses let the board pick a brand direction in one meeting-no 6-week spiral.",
    quote:
      "We finally agreed on our voice without another circular debate. The sources made it defensible.",
    author: "Alex Rand",
    role: "Director",
    company: "Riverstone Collective",
    imageSrc: "/assets/generated/testimonial-alex.jpg",
  },
];

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Testimonials | Bespoke Ethos",
  description:
    "Proof from founders who needed audited, low-maintenance automation—not black-box magic.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <TestimonialsJsonLd />
        <div className="be-section-card space-y-6 page-hero-shell">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Testimonials" }]} />
      <Heading align="left" subtitle="Rust Belt proof, productized outcomes">
        <h1>Testimonials</h1>
      </Heading>
      <div className="pill-row">
        <span className="pill">AI Strategy Sprint · Premium chatbot</span>
        <span className="pill">Workflow Automation Setup · Automation with approvals</span>
        <span className="pill">AI Research Assistant · Cited briefs</span>
        <span className="pill">Automation Rescue · Reliability rescue</span>
      </div>

      <div className="rail-shell">
        <div className="rail-grid two">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.title}
              className="ghost-card ghost-card--soft flex h-full flex-col gap-3"
            >
              <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                {t.title}
              </h2>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {t.summary}
              </p>
              {t.imageSrc ? (
                <div className="mt-2 flex items-center gap-3">
                  <Image
                    src={t.imageSrc}
                    alt={t.author}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                    {t.author}, {t.role}, {t.company}
                  </p>
                </div>
              ) : null}
              <blockquote className="mt-2 border-l-2 border-accent-500 pl-3 text-sm italic text-text-primary dark:text-dark-text-primary">
                &quot;{t.quote}&quot;
              </blockquote>
              {!t.imageSrc ? (
                <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                  {t.author}, {t.role}, {t.company}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-text-tertiary dark:text-dark-text-tertiary">
        Want in? Book a free consult and we&apos;ll run one AI Research Assistant brief on your biggest question before you commit.
      </p>
        </div>
      </Section>
    </main>
  );
}

function TestimonialsJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const reviews = TESTIMONIALS.map((t) => ({
    "@type": "Review",
    name: t.title,
    reviewBody: t.quote,
    author: {
      "@type": "Person",
      name: t.author,
    },
    itemReviewed: {
      "@type": "Service",
      name: t.company || "Bespoke Ethos service",
      provider: {
        "@id": `${base}/#organization`,
      },
    },
  }));

  const json = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${base}/testimonials#webpage`,
    url: `${base}/testimonials`,
    name: "Testimonials | Bespoke Ethos",
    mainEntity: reviews,
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
