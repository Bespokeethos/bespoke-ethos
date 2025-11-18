import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { FounderStory } from "./_sections/founder-story";
import { TrustCredentials } from "./_sections/trust-credentials";
import { HomepageTestimonialsStrip } from "./_sections/testimonials";
import { LGBTQDiscountModalTrigger } from "./_components/lgbtq-discount-modal-trigger";
import { BorderBeam } from "@/components/ui/border-beam";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const homeFaqItems = [
  {
    question: "What kinds of businesses do you work with?",
    answer:
      'We focus on small businesses and founders in Cleveland, Ohio and similar markets—especially teams in "survival mode" who need practical wins, not 40-page decks.',
  },
  {
    question: "What problems do you actually solve?",
    answer:
      "We Take the Busywork—you Keep Control. That means automating repetitive workflows, adding Cadence™, our flagship premium chatbot, and rescuing brittle automations so you get your time back without losing visibility.",
  },
  {
    question: "How does the 25% LGBTQ+ discount work?",
    answer:
      "If you’re an LGBTQ-owned business, you get 25% off all upfront project fees on approved scopes. Monthly subscriptions are billed at standard rates.",
  },
];

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
      <HomeFaqJsonLd />

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-hero-title font-hero-accent">
            Stop guessing. Start growing. AI automation for Cleveland small businesses.
          </h1>

          <p className="home-hero-subtitle">
            <span className="home-hero-subtitle-part">We help Cleveland small businesses</span>
            <span className="home-hero-rotate" aria-live="polite">
              <span>AUTOMATE</span>
              <span>SIMPLIFY</span>
              <span>SCALE</span>
              <span>PROFIT</span>
              <span>COMPETE</span>
              <span>GROW</span>
            </span>
            <span className="home-hero-subtitle-part">with AI.</span>
          </p>

          <p className="home-hero-body">
            Risk-free AI readiness audit and a custom Consensus Engine research report on your biggest uncertainty.
          </p>

          <div className="relative inline-block mb-8">
            <BorderBeam borderWidth={1} lightWidth={360} duration={10} />
            <Link href="/contact?service=llm-setups" className="primary-cta relative inline-block z-[1]">
              Book Your Free AI Readiness Audit
            </Link>
          </div>

          <p className="home-hero-tagline">
            “Am I doing this right?” is where most non-technical Cleveland founders start. No jargon. No overnight. Just
            practical automation.
          </p>

          <div className="mt-8 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl">
            <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame">
              <Image
                src="/assets/generated/hero-ai-automation-dashboard-desktop.webp"
                alt="AI automation dashboard for a Cleveland small business, showing workflow connections between Gmail, Slack, Salesforce and Airtable"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* You're Not Alone */}

      {/* You're Not Alone */}
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
          You’re Not Alone
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
          We’ve Been There
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
            <li>Terrified you’ll make the wrong call and lose everything</li>
            <li>Knowing AI is important but feeling completely overwhelmed</li>
            <li>Reading articles that make it sound easy, then trying and hitting walls</li>
          </ul>

          <div
            style={{
              backgroundColor: "white",
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
              Most don’t know where to start.
              <br />
              That’s exactly why we exist.
            </p>
          </div>
        </div>
      </section>

      {/* The Offer */}
      <section
        style={{
          backgroundColor: "white",
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
          Your First Step to Getting Your Time Back
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
          Free AI Readiness Audit
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
            <li style={{ marginBottom: "16px" }}>Real talk about our experience (what worked, what didn’t)</li>
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
              After the consultation, you’ll know:
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
              <li>What your next step should be (even if it’s not working with us)</li>
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
          <Link
            href="/contact?service=llm-setups"
            className="primary-cta inline-block"
            style={{ marginBottom: "24px" }}
          >
            Book Your Free AI Readiness Audit
          </Link>
        </div>

        <div className="relative mx-auto mt-4 max-w-[800px] rounded-2xl">
          <BorderBeam borderWidth={3} lightWidth={420} duration={10} />
          <div
            style={{
              backgroundColor: "var(--navy-primary)",
              padding: "32px",
              borderRadius: "16px",
              textAlign: "center",
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
            <Link
              href="/lgbtq-discount"
              className="relative z-[1] rounded-lg bg-white px-8 py-3 text-base font-semibold text-slate-900 shadow-lg transition-colors duration-200 hover:bg-slate-100"
            >
              Learn More About the Discount
            </Link>
          </div>
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
            We’re not a fancy agency with marble lobbies.
            <br />
            We’re founders who work manufacturing jobs and build businesses nights and weekends.
            <br />
            <br />
            We’ve filed for bankruptcy. We’ve been terrified. We get it.
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

      {/* Consensus Engine / How we work */}
      <section
        style={{
          backgroundColor: "var(--soft-white)",
          padding: "64px 24px 72px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "var(--charcoal-text)",
            marginBottom: "24px",
          }}
        >
          How we take the guesswork out of business decisions, with powerful AI.
        </h2>

        <p
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--amber-cta)",
            marginBottom: "48px",
          }}
        >
          The Consensus Engine - Proprietary Multi-Agent Research
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
            ("Should I automate customer service?" "How do I price this?" "Will this marketing work?")
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
            Then they cross-reference each other's findings.
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

      {/* Existing trust + founder + testimonials for depth */}
      <HomepageTestimonialsStrip />
      <FounderStory />
      <TrustCredentials />

      {/* Quick answers (FAQ teaser) */}
      <section
        style={{
          backgroundColor: "var(--soft-white)",
          padding: "56px 24px 64px",
        }}
      >
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--charcoal-text)",
              marginBottom: "16px",
              textAlign: "left",
            }}
          >
            Quick answers for busy founders
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "var(--muted-text)",
              marginBottom: "24px",
            }}
          >
            Three questions we hear most often from Cleveland small-business owners thinking about automation.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: "16px",
            }}
          >
            {homeFaqItems.map((item) => (
              <div
                key={item.question}
                style={{
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--cream-bg)",
                  padding: "16px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "var(--charcoal-text)",
                  }}
                >
                  {item.question}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "var(--muted-text)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: "20px",
              fontSize: "16px",
              color: "var(--muted-text)",
            }}
          >
            Want more details? Our full{" "}
            <Link href="/faq" style={{ textDecoration: "underline" }}>
              FAQ
            </Link>{" "}
            page covers timelines, tools, pricing, and how we work.
          </p>
        </div>
      </section>
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

function HomeFaqJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    mainEntityOfPage: `${base}/`,
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
