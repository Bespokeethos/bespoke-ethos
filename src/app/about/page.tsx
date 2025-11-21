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
    <main className="be-page-slate">
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <AboutPageJsonLd />
        <AboutVideoJsonLd />
        <div className="be-section-card space-y-6">
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
          <div className="prose max-w-none mt-6">
            <p>
              We help small businesses reclaim time with auditable, human-in-the-loop automations. Our approach is
              simple on purpose: map the real process first, ship in small, testable pieces, and keep you in control with
              approvals, logs, and rollback paths so nothing disappears into a system you can&apos;t inspect.
            </p>
            <p>
              Based in Cleveland and proudly LGBTQ-owned, we exist for the Davids, not the Goliaths: founders who want
              modern tools without giving up judgment, ownership, or their customers&apos; trust.
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
          We believe small businesses deserve the same caliber of tools the Fortune 500 enjoy—without the complexity,
          lock-in, or loss of control. Every solution we build includes human oversight, clear audit trails, and the
          ability to roll back changes. We&apos;re not here to replace your team; we&apos;re here to give them back the
          hours they lose to busywork so they can focus on the parts of the business only humans can do.
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
              I built Bespoke Ethos after years of watching small businesses get handed automation and AI that felt
              magical in the demo and chaotic in real life. Tools were powerful, but they were also opaque—no paper
              trail, no guardrails, and no way to see how a decision was made. Raw power isn&apos;t the point. Vantage
              points, accountability, and alignment are.
            </p>
            <p className="text-text-secondary">
              For the past eighteen months I&apos;ve been working hands-on with a frontier AI model that may become a
              household name. I also run my own small business outside Bespoke Ethos, so none of these founder pressure
              points are hypothetical. I&apos;ve seen up close how much good these systems can do—and how quickly they
              can drift if nobody is steering for ethics and real-world impact. We&apos;ve walked away from work when
              the intended use didn&apos;t line up with our values, and we&apos;ll keep doing that. Bespoke Ethos exists
              to nudge the path a few degrees toward better, one project at a time.
            </p>
            <p className="text-text-secondary">
              As a proud member of the LGBTQ+ community, I&apos;m committed to making that future accessible to the
              Davids of the world, not just the Goliaths. Unlike shops that simply resell ChatGPT, Copilot, or Gemini,
              we use our training and evaluation experience to choose where these tools help, where they hurt, and when
              we should reach for something else. We offer a 25% discount on upfront project fees for LGBTQ-owned teams
              and center clear communication over jargon. The goal is simple: AI and humans working together, with
              small-business founders still firmly in control.
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
