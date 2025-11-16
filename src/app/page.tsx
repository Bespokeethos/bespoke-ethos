import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { FounderStory } from "./_sections/founder-story";
import { TrustCredentials } from "./_sections/trust-credentials";
import { HomepageTestimonialsStrip } from "./_sections/testimonials";
import { LGBTQDiscountModalTrigger } from "./_components/lgbtq-discount-modal-trigger";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "AI Automation for Cleveland Small Businesses | Bespoke Ethos",
  description:
    "Free 30-minute AI consultation and Consensus Engine™ research for Cleveland small-business founders who want clarity on their next move.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.bespokeethos.com",
    title: "AI Automation for Cleveland Small Businesses | Bespoke Ethos",
    description:
      "Free 30-minute AI consultation and founder-friendly research reports for Cleveland small businesses.",
    images: [
      {
        url: "/assets/generated/logo-square-dark.png",
        width: 1200,
        height: 630,
        alt: "Bespoke Ethos orange square logo",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main>
      <HomePageJsonLd />
      {/* Hero */}
      <section
        style={{
          backgroundColor: "var(--cream-bg)",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "var(--charcoal-text)",
            marginBottom: "24px",
            lineHeight: "1.2",
          }}
        >
          &quot;Am I Doing This Right?&quot;
        </h1>

        <p
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--muted-text)",
            marginBottom: "32px",
          }}
        >
          Every founder asks this. We answer it.
        </p>

        <p
          style={{
            fontSize: "20px",
            color: "var(--muted-text)",
            maxWidth: "700px",
            margin: "0 auto 24px",
            lineHeight: "1.6",
          }}
        >
          Free 30-minute AI consultation + custom research report on your biggest uncertainty.
          <br />
          No jargon. No pressure. Just answers.
        </p>

        <Link href="/book" className="primary-cta inline-block" style={{ marginBottom: "32px" }}>
          Schedule Your Free Consultation
        </Link>

        <p
          style={{
            fontSize: "18px",
            color: "var(--muted-text)",
            fontStyle: "italic",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          You&apos;re working your day job and building nights and weekends. We get it&mdash;we&apos;re
          doing it too. Let&apos;s figure this out together.
        </p>

        <div className="mt-10 mx-auto max-w-5xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary">
            <Image
              src="/assets/generated/hero-ai-automation-dashboard-desktop.webp"
              alt="AI automation dashboard showing workflow connections between Gmail, Slack, Salesforce and Airtable for small business efficiency"
              fill
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 960px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Consensus Engine / How we work */}
      <section
        style={{
          backgroundColor: "var(--soft-white)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "var(--charcoal-text)",
            marginBottom: "16px",
          }}
        >
          How We Take the Guesswork Out
        </h2>

        <p
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--amber-cta)",
            marginBottom: "48px",
          }}
        >
          The Consensus Engine &mdash; Proprietary Multi-Agent Research
        </p>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              color: "var(--charcoal-text)",
              marginBottom: "32px",
              fontWeight: 600,
            }}
          >
            You tell us your biggest question.
          </p>

          <p
            style={{
              fontSize: "18px",
              color: "var(--muted-text)",
              marginBottom: "16px",
              fontStyle: "italic",
            }}
          >
            (&quot;Should I automate customer service?&quot; &quot;How do I price this?&quot; &quot;Will
            this marketing work?&quot;)
          </p>

          <p
            style={{
              fontSize: "20px",
              color: "var(--charcoal-text)",
              marginBottom: "24px",
              fontWeight: 600,
            }}
          >
            We send 4 specialized AI researchers to work on it:
          </p>

          <ul
            style={{
              fontSize: "18px",
              color: "var(--muted-text)",
              lineHeight: 2,
              listStyle: "none",
              paddingLeft: 0,
              marginBottom: "32px",
            }}
          >
            <li>
              <strong>Marketing Expert</strong> researches customer behavior and positioning
            </li>
            <li>
              <strong>Financial Analyst</strong> researches costs, ROI, and pricing strategies
            </li>
            <li>
              <strong>Case Study Specialist</strong> finds real businesses who tried this
            </li>
            <li>
              <strong>Design Strategist</strong> researches implementation approaches
            </li>
          </ul>

          <p
            style={{
              fontSize: "18px",
              color: "var(--muted-text)",
              lineHeight: 1.8,
              marginBottom: "16px",
            }}
          >
            Each one researches independently using live internet data.
            <br />
            Then they cross-reference each other&apos;s findings.
            <br />
            Then we compile it into a founder-friendly report with actionable next steps.
          </p>

          <p
            style={{
              fontSize: "20px",
              color: "var(--charcoal-text)",
              fontWeight: 600,
              marginBottom: "24px",
            }}
          >
            All research is cited. All recommendations are verified.
            <br />
            You get the confidence to make the call.
          </p>

          <div
            style={{
              backgroundColor: "var(--cream-bg)",
              padding: "24px",
              borderRadius: "8px",
              borderLeft: "4px solid var(--amber-cta)",
              marginTop: "32px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                color: "var(--charcoal-text)",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Every consultation includes one free Consensus Engine report.
            </p>
          </div>
        </div>
      </section>

      {/* You&apos;re not alone */}
      <section
        style={{
          backgroundColor: "var(--cream-bg)",
          padding: "80px 24px",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "var(--charcoal-text)",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          You&apos;re Not Alone
        </h2>

        <p
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--amber-cta)",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          We&apos;ve Been There
        </p>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <ul
            style={{
              fontSize: "20px",
              color: "var(--muted-text)",
              lineHeight: 2,
              listStyle: "none",
              paddingLeft: 0,
              marginBottom: "48px",
            }}
          >
            <li>Working a day job while building your dream</li>
            <li>Terrified you&apos;ll make the wrong call and lose everything</li>
            <li>Knowing AI is important but feeling completely overwhelmed</li>
            <li>Reading articles that make it sound easy, then trying and hitting walls</li>
          </ul>

          <div
            style={{
              backgroundColor: "var(--soft-white)",
              padding: "32px",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            <p
              style={{
                fontSize: "28px",
                color: "var(--charcoal-text)",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              78% of small business owners know they need AI.
            </p>
            <p
              style={{
                fontSize: "20px",
                color: "var(--muted-text)",
                marginBottom: 0,
              }}
            >
              Most don&apos;t know where to start.
              <br />
              That&apos;s exactly why we exist.
            </p>
          </div>
        </div>
      </section>

      {/* The offer */}
      <section
        style={{
          backgroundColor: "var(--soft-white)",
          padding: "80px 24px",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "var(--charcoal-text)",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          What You Get
        </h2>

        <p
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--muted-text)",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Free 30-Minute Consultation
        </p>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto 48px",
            textAlign: "left",
          }}
        >
          <ul
            style={{
              fontSize: "20px",
              color: "var(--muted-text)",
              lineHeight: 2.2,
              listStyle: "none",
              paddingLeft: 0,
              marginBottom: "48px",
            }}
          >
            <li style={{ marginBottom: "16px" }}>Plain-English explanation of how AI works</li>
            <li style={{ marginBottom: "16px" }}>Real talk about our experience (what worked, what didn&apos;t)</li>
            <li style={{ marginBottom: "16px" }}>Discussion of how AI could help your specific situation</li>
            <li style={{ marginBottom: "16px" }}>
              One free Consensus Engine research report on any topic you choose
            </li>
          </ul>

          <div
            style={{
              backgroundColor: "var(--cream-bg)",
              padding: "32px",
              borderRadius: "8px",
              marginBottom: "48px",
            }}
          >
            <p
              style={{
                fontSize: "22px",
                color: "var(--charcoal-text)",
                fontWeight: 600,
                marginBottom: "24px",
              }}
            >
              After the consultation, you&apos;ll know:
            </p>
            <ul
              style={{
                fontSize: "18px",
                color: "var(--muted-text)",
                lineHeight: 2,
                listStyle: "none",
                paddingLeft: 0,
                margin: 0,
              }}
            >
              <li>If AI makes sense for your business right now</li>
              <li>What your next step should be (even if it&apos;s not working with us)</li>
              <li>Exactly what it would cost to implement</li>
            </ul>
          </div>

          <p
            style={{
              fontSize: "20px",
              color: "var(--charcoal-text)",
              textAlign: "center",
              fontWeight: 600,
              marginBottom: "32px",
            }}
          >
            No pressure. No sales pitch. Just clarity.
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Link href="/book" className="primary-cta inline-block" style={{ marginBottom: "24px" }}>
            Schedule Your Free Consultation
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "var(--navy-primary)",
            padding: "32px",
            borderRadius: "8px",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              color: "#ffffff",
              marginBottom: "24px",
              lineHeight: 1.6,
            }}
          >
            <strong>LGBTQ+ small business owners:</strong> 25% off all upfront project costs*
            <br />
            <span style={{ fontSize: "16px", opacity: 0.9 }}>*subscription fees not included</span>
          </p>
          <LGBTQDiscountModalTrigger>Find Out More</LGBTQDiscountModalTrigger>
        </div>
      </section>

      {/* About / trust */}
      <section
        style={{
          backgroundColor: "var(--cream-bg)",
          padding: "80px 24px",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "var(--charcoal-text)",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Built By Weekend Warriors, For Weekend Warriors
        </h2>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              color: "var(--muted-text)",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            We&apos;re not a fancy agency with marble lobbies.
            <br />
            We&apos;re founders who work manufacturing jobs and build businesses nights and weekends.
            <br />
            <br />
            We&apos;ve filed for bankruptcy. We&apos;ve been terrified. We get it.
          </p>

          <div
            style={{
              display: "inline-block",
              backgroundColor: "var(--soft-white)",
              padding: "24px 48px",
              borderRadius: "8px",
              marginBottom: "32px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                color: "var(--charcoal-text)",
                fontWeight: 600,
                margin: "0 0 8px 0",
              }}
            >
              NGLCC-Certified Gay-Owned Business
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "var(--muted-text)",
                margin: 0,
              }}
            >
              Cleveland, Ohio
            </p>
          </div>
        </div>
      </section>

      {/* Existing trust + founder + testimonials for depth */}
      <HomepageTestimonialsStrip />
      <FounderStory />
      <TrustCredentials />
    </main>
  );
}

function HomePageJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${base}/#homepage`,
    url: base,
    name: "AI Automation for Cleveland Small Businesses | Bespoke Ethos",
    isPartOf: {
      "@id": `${base}/#website`,
    },
    about: {
      "@id": `${base}/#organization`,
    },
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
