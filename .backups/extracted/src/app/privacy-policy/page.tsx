import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy Policy | Bespoke Ethos",
  description: "How Bespoke Ethos handles personal data, contact form submissions, and third-party services.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />
      <Heading align="left" subtitle="How we handle your data">
        <h1>Privacy Policy</h1>
      </Heading>
      <div className="prose prose-invert max-w-none dark:prose-invert text-sm">
        <p>
          Bespoke Ethos respects your privacy. We collect only the information necessary to respond to inquiries and
          improve the site. Contact form submissions include the fields you provide and basic technical metadata (IP,
          user agent) used for spam prevention and troubleshooting.
        </p>
        <p>
          We do not sell personal data. Limited third-party services may process data on our behalf (e.g., spam
          protection, analytics). You can request deletion by emailing contact@bespokeethos.com.
        </p>
        <p>Last updated: 2025-10-01</p>
      </div>
    </Section>
  );
}
