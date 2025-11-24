import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of Service | Bespoke Ethos",
  description: "The essentials for using Bespoke Ethos' site and services - responsibilities, acceptable use, updates.",
  alternates: { canonical: "/terms" },
};

export default function TermsOfService() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
      <Heading align="left" subtitle="The basics for using our site and services">
        <h1>Terms of Service</h1>
      </Heading>
      <div className="prose prose-invert max-w-none dark:prose-invert text-sm">
        <p>
          By accessing or using this website, you agree to these terms. Content is provided “as is” without warranty.
          Do not misuse the site, attempt to break security, or infringe on intellectual property. We may update these
          terms at any time. If you have questions, contact us at contact@bespokeethos.com.
        </p>
        <p>Last updated: 2025-10-01</p>
      </div>
    </Section>
  );
}
