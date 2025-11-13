import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Case Studies | Bespoke Ethos",
  description:
    "See how small businesses reclaimed hours with Flowstack™, Chatbots, Consensus Engine, and Redbridging - auditable automation you control.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Case Studies" }]} />
      <Heading subtitle="Proof in shipped outcomes" align="left">
        <h1>Case Studies</h1>
      </Heading>
      <p className="text-text-secondary dark:text-dark-text-secondary">
        We&rsquo;re assembling detailed case studies now. In the meantime, browse our blog for recent builds and
        implementation notes.
      </p>
      <div>
        <ButtonLink href="/blog" intent="secondary">
          Read the blog
        </ButtonLink>
      </div>
    </Section>
  );
}
