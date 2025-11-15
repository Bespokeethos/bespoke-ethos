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
    title: "Molly, the Brewery Statistics Tutor (FlowstackT)",
    summary:
      "FlowstackT delivered a custom tutor that explains statistics using real brewery work, matching learning style and schedule.",
    quote:
      "Molly explains stats using my brewery floor. It's not generic - it's mine.",
    author: "Alex Rand",
    role: "Brewer",
    company: "Ore Dock Brewing Company",
    imageSrc: "/assets/generated/founder2.avif",
  },
  {
    title: "Brand Direction with Confidence (Consensus EngineT)",
    summary:
      "Consensus EngineT synthesized surveys, sales data, and competitor tone so a retail co-op could agree on a rebrand direction.",
    quote:
      "We finally agreed on our brand voice without another 6-week debate.",
    author: "Monique Ellis",
    role: "Co-Founder",
    company: "Lake Effect Co-op",
    imageSrc: "/assets/generated/founder3.avif",
  },
  {
    title: "Accounting Workflow Revival (RedbridgingT)",
    summary:
      "RedbridgingT restored broken QuickBooks automations, added monitoring, and stopped invoice leakage for an accounting firm.",
    quote:
      "Revenue stopped bleeding, and now we get alerts before clients feel pain.",
    author: "Derrick Patel",
    role: "Founder",
    company: "LedgerLight Accounting",
  },
];

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Testimonials | Bespoke Ethos",
  description:
    "Proof you can feel – stories from teams who reclaimed time and stayed in control.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <Section className="gap-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Testimonials" }]} />
      <Heading align="left" subtitle="Proof in shipped outcomes">
        <h1>Testimonials</h1>
      </Heading>

      <div className="grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.title}
            className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface-secondary/60 p-5 dark:border-dark-border dark:bg-dark-surface-secondary/60"
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
              "{t.quote}"
            </blockquote>
            {!t.imageSrc ? (
              <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                {t.author}, {t.role}, {t.company}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-text-tertiary dark:text-dark-text-tertiary">
        Want to add your story?{" "}
        <Link href="/contact" className="text-accent-600 underline hover:text-accent-700">
          Get in touch
        </Link>
        .
      </p>
    </Section>
  );
}
