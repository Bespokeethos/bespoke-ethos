import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { ButtonLink } from "@/common/button";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { CadenceLogoCard } from "@/common/cadence-logo-card";
import { PRICING, formatMoney } from "@/config/pricing";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Cadence™: Premium Chatbot Trained on Your Business | Bespoke Ethos",
  description:
    "Not just another chatbot. Cadence™ is trained on your products, voice, and stories—building loyalty 24/7. 35–45% ticket deflection. See how it works.",
  alternates: { canonical: "/products/cadence" },
};

const ALT = {
  hero: "Soft-focus shot of a small-business owner at a workbench, warm lighting, with an overlay card describing Cadence—your brand’s rhythm.",
  newAsset:
    "Operations lead working on a laptop in a small office, smiling while reviewing a simple automation dashboard, candid natural-light photo",
};

export default function CadencePage() {
  return (
    <main>
      <CadenceProductJsonLd />
      {/* Hero */}
      <section className="relative cadence-card">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/generated/cadence-feature-voice-desktop.webp"
            alt={ALT.hero}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1366px) 90vw, 1200px"
          />
        </div>
        <Section className="min-h-[260px] md:min-h-[320px] lg:min-h-[380px] flex flex-col justify-center pb-10 pt-10 md:pt-14">
          <div className="cadence-card-text max-w-(--breakpoint-md)">
            <div className="mb-2 flex items-center gap-2">
              <CadenceLogoCard size={48} />
              <span className="cadence-badge inline-block rounded px-2 py-1 text-xs font-semibold">Cadence™</span>
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-xs sm:text-sm font-medium text-white/90 shadow-lg backdrop-blur-md">
              <span>Cadence™</span>
              <span className="opacity-90">Your Brand’s Rhythm</span>
            </div>

            <Heading align="left" subtitle="A chatbot tuned for people who hate chatbots.">
              <h1>Not Just Another Chatbot. Cadence™.</h1>
            </Heading>

            <div className="mt-4 flex flex-wrap gap-3">
              <p className="text-sm text-white/80">
                Starts at {formatMoney(PRICING.cadence.setup)} setup + {formatMoney(PRICING.cadence.monthly)}/mo.
                <Link href="/solutions/flowstack" className="underline ml-1">
                  Need something simpler? Try Flowstack™.
                </Link>
              </p>
              <ButtonLink intent="primary" href="#demo">
                See a Live Demo (2 min)
              </ButtonLink>
              <ButtonLink intent="secondary" href="/contact?service=llm-setups">
                Book a strategy call
              </ButtonLink>
              <ButtonLink
                unstyled
                className="underline underline-offset-4 text-white/90"
                href="/contact?subject=Cadence%20pilot"
              >
                Start a 30-day pilot
              </ButtonLink>
            </div>
          </div>
        </Section>
      </section>

      {/* Solution Intro */}
      <Section className="gap-6">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Products", href: "/solutions" }, { name: "Cadence" }]} />
        <Heading align="left">
          <h2>Meet Cadence™: The Chatbot That Knows Your Business</h2>
        </Heading>
        <div className="prose prose-zinc max-w-prose dark:prose-invert">
          <p>
            Cadence™ isn’t programmed. It’s <em>trained</em>—like a team member.
          </p>
          <p>
            We don’t start with code. We start with your products, your voice, your best customer stories. Then we sculpt a
            chatbot that:
          </p>
          <ul>
            <li>
              <strong>Knows your products</strong> inside-out (differentiators, backstory, use cases)
            </li>
            <li>
              <strong>Speaks your language</strong> (pauses, tone, biases—the good kind)
            </li>
            <li>
              <strong>Tells your stories</strong> (the ones that build loyalty and drive purchases)
            </li>
            <li>
              <strong>Hands off gracefully</strong> (when humans need to step in)
            </li>
          </ul>
          <p>
            <strong>The result?</strong> A digital team member that works 24/7, never burns out, and makes your customers feel
            <em> heard</em>—not handled.
          </p>
        </div>
      </Section>

      {/* How Cadence Is Trained (5 Steps) */}
      <Section className="gap-8">
        <Heading align="left">
          <h2>How We Build Your Cadence™ (It’s Not What You Think)</h2>
        </Heading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Step
            title="Step 1: Deep Product Discovery"
            body="We learn your product line inside-out. What sets you apart? What’s the backstory? What do customers really care about at 3 AM when they urgently need your solution?"
            outcome="Outcome: Cadence™ knows your products better than most human reps."
          />
          <Step
            title="Step 2: Voice & Personality Sculpting"
            body="We record a conversation with you (or your best team member). Our system analyzes your pauses, tone, and conversational rhythm. That data feeds directly into Cadence™’s language model."
            outcome="Outcome: Cadence™ sounds like you—not a robot."
          />
          <Step
            title="Step 3: Storytelling Integration"
            body="We map your product stories—the ones that build trust and loyalty. Cadence™ doesn’t just say “Yes, we have candles.” It says “Our French vanilla candles are inspired by a Victorian B&B the founder visited...”"
            outcome="Outcome: Customers leave feeling connected to your brand, not just informed."
          />
          <Step
            title="Step 4: Conversational Naturalness"
            body="We fine-tune how Cadence™ handles interruptions, clarifying questions, and follow-ups. The goal: it should feel like a sharp team member, not a script."
            outcome="Outcome: Conversations feel natural—even when customers jump around or change their mind."
          />
          <Step
            title="Step 5: Guardrails & Handoffs"
            body="We define which questions Cadence™ should always escalate, how it hands off context to humans, and what it’s never allowed to say or do."
            outcome="Outcome: You stay in control. Cadence™ handles the busywork; humans handle the judgment calls."
          />
        </div>
      </Section>

      {/* Demo + Social Proof */}
      <Section className="gap-10" id="demo">
        <Heading align="left">
          <h2>See Cadence™ in Action</h2>
        </Heading>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-secondary p-4 shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary">
            <div className="relative h-64 w-full">
              <Image
                src="/assets/generated/cadence-feature-workflow-desktop.webp"
                alt={ALT.newAsset}
                fill
                className="object-cover object-center rounded-xl"
                sizes="(max-width: 768px) 100vw, 640px"
              />
            </div>
          </div>
          <div className="space-y-4 text-sm text-text-secondary dark:text-dark-text-secondary">
            <p>
              Cadence™ plugs into the tools you already use—no need to rip out your support stack. It can draft replies, collect
              context, and surface the right customer details before a human ever joins the conversation.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Deflects 35–45% of repetitive tickets without sacrificing tone or empathy.</li>
              <li>Surfaces high-intent leads to humans with full conversation history.</li>
              <li>Trains on your real stories and objections—not generic chatbot scripts.</li>
            </ul>
            <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
              Numbers are based on early pilots with owner-operated businesses; your mileage may vary. We’ll help you define what a win
              looks like before you invest.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}

type StepProps = {
  title: string;
  body: string;
  outcome: string;
};

  function Step({ title, body, outcome }: StepProps) {
    return (
    <div className="rounded-2xl border border-border bg-surface-secondary/80 p-5 text-sm shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
      <h3 className="mb-2 text-base font-semibold text-text-primary dark:text-dark-text-primary">{title}</h3>
      <p className="mb-2 text-text-secondary dark:text-dark-text-secondary">{body}</p>
      <p className="text-xs font-medium text-text-tertiary dark:text-dark-text-tertiary">{outcome}</p>
      </div>
    );
  }

function CadenceProductJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const currency = PRICING.currency === "$" ? "USD" : "USD";
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Cadence™",
    description:
      "Cadence™ is Bespoke Ethos’s flagship premium chatbot for small businesses in Cleveland, Ohio—trained on your products, voice, and stories so it can resolve real questions 24/7 while keeping humans in control.",
    brand: {
      "@type": "Brand",
      name: "Bespoke Ethos",
    },
    provider: {
      "@type": "Organization",
      name: "Bespoke Ethos",
      url: base,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Cleveland, OH",
    },
    url: `${base}/products/cadence`,
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: PRICING.cadence.setup,
      priceSpecification: {
        "@type": "PriceSpecification",
        name: "Initial setup for Cadence™ chatbot",
        priceCurrency: currency,
        price: PRICING.cadence.setup,
      },
      availability: "https://schema.org/InStock",
      url: `${base}/products/cadence`,
    },
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
