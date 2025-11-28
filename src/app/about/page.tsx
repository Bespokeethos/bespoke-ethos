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
    "NGLCC-certified, Catalant-vetted, 5 years training AI models. Tool & die technician building cognitive prosthetics for founders who need proof, not jargon.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <AboutPageJsonLd />
        <AboutVideoJsonLd />
        <div className="be-section-card space-y-6 page-hero-shell">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />

      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame be-video-hero shadow-xl">
        <div className="relative h-40 w-full sm:h-52 lg:h-60">
          <video
            src="/assets/About.mp4"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Short looping glimpse of Bespoke Ethos at work with automation dashboards and founder notes"
          />
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <Heading subtitle="AI automation you can trust" align="left">
            <h1>About Bespoke Ethos</h1>
          </Heading>
          <div className="pill-row">
            <span className="pill">Tool &amp; die technician + AI trainer</span>
            <span className="pill">NGLCC-certified</span>
            <span className="pill">Catalant-vetted</span>
            <span className="pill">25% LGBTQ-owned discount</span>
          </div>
          <div className="prose max-w-none mt-6">
            <p>
              I&apos;m Upton Rand—a Cleveland tool &amp; die technician by day and AI trainer by night. I spent 5+ years
              training the same frontier models everyone is buying now, and I build automations that stay simple: static
              sites, serverless when needed, approvals and audit trails always on.
            </p>
            <p>
              Bespoke Ethos exists for founders who can&apos;t afford McKinsey: fixed scopes, clear prices, and a
              90-day “break it, we fix it” safety net. NGLCC-certified, Catalant-vetted, and proudly LGBTQ-owned—with a
              25% discount on upfront fees for LGBTQ-owned teams and a few need-based slots each year.
            </p>
          </div>
        </div>
        
        <div className="rail-shell">
          <div className="ghost-card ghost-card--soft">
            <h2 className="text-xl font-semibold mb-4">Our Credentials</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">✓</span>
                <span><strong>NGLCC Certified</strong> - LGBTQ+ business enterprise with supplier diversity access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">✓</span>
                <span><strong>Catalant Vetted</strong> - Independently verified enterprise consultant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">✓</span>
                <span><strong>5+ Years training AI</strong> - Human-in-the-loop model training (Appen)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">✓</span>
                <span><strong>Small Business Focus</strong> - Productized outcomes, not hourly mystery work</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 rail-shell">
        <div className="ghost-card ghost-card--soft">
          <h2 className="text-2xl font-semibold mb-4">Why I built this</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            I live between two extremes: “the Torrent”—hyper-systemizing bursts where solutions click into place like
            spinning padlocks—and the need for a steady anchor as my mother navigates Alzheimer&apos;s. I needed a
            cognitive prosthetic before I needed it to survive. That&apos;s why everything we ship is designed to catch
            ideas without hallucinating and to hold context without breaking trust.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            Rust Belt roots mean we hold tight tolerances: audit trails, approvals, rollbacks, and documentation on every
            engagement. No black-box infra, no surprise servers—just resilient workflows you can explain to your team.
          </p>
        </div>
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
              Tool &amp; die technician (journeyman track), AI trainer (Appen), 10 years sober, and founder who learned
              the hard way that automation without alignment just breaks louder. I bridge manufacturing precision with
              AI orchestration so small teams get enterprise-grade clarity without enterprise overhead.
            </p>
            <p className="text-text-secondary">
              Human-in-the-loop is non-negotiable: we design with bottom-up thinkers in mind (autistic/ADHD founders,
              demisexual “slow burn” connection patterns) so your systems stay patient, consistent, and aligned to real
              intent. We walk away from work that ignores ethics or trust.
            </p>
            <p className="text-text-secondary">
              As an NGLCC-certified LGBTQ+ founder, I keep a 25% discount for LGBTQ-owned teams and offer productized
              scopes that start at $997: Cadence premium chatbot, Flowstack automations, Consensus Engine research,
              Redbridging for brittle workflows—all delivered with documentation, rollback paths, and a 90-day “break it
              we fix it” guarantee.
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
        </div>
      </Section>
    </main>
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

function AboutVideoJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "About Bespoke Ethos in 10 Seconds",
    description:
      "A short looping header video of Bespoke Ethos at work—automation dashboards, founder notes, and the calm we aim to bring to small-business operations.",
    thumbnailUrl: `${base}/assets/logo-light.png`,
    uploadDate: "2025-01-01T00:00:00Z",
    contentUrl: `${base}/assets/About.mp4`,
    embedUrl: `${base}/about`,
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
