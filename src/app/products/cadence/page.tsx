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
    "Not just another chatbot. Cadence™ is trained on your products, voice, and stories-building loyalty 24/7. 35-45% ticket deflection. See how it works.",
  alternates: { canonical: "/products/cadence" },
};

const ALT = {
  hero: "Candid, joyful small-business owner in workshop, future-focused and freeCadence chatbot product hero background",
  asset1:
    "Small-business founder in a studio workshop, laughing mid-conversation with a customer just off-frame, natural light, authentic candid moment",
  asset2:
    "Shop owner carefully arranging products on a shelf in warm window light, focused expression, cozy independent retail space",
  newAsset:
    "Operations lead working on a laptop in a small office, smiling while reviewing a simple automation dashboard, candid natural-light photo",
};

export default function CadencePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative cadence-card">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/generated/cadence-hero.png"
            alt={ALT.hero}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1366px) 90vw, 1200px"
          />
        </div>
        <Section className="min-h-[420px] md:min-h-[520px] lg:min-h-[640px] flex flex-col justify-end pb-12">
          <div className="cadence-card-text max-w-(--breakpoint-md)">
            <div className="mb-3 flex items-center gap-2">
              <CadenceLogoCard size={56} />
              <span className="cadence-badge inline-block rounded px-2 py-1 text-xs font-semibold">Cadence™</span>
            </div>
            <Heading align="left" subtitle="A chatbot tuned for people who hate chatbots.">
              <h1>Not Just Another Chatbot. Cadence™.</h1>
            </Heading>
            <div className="mt-4 flex flex-wrap gap-3">
              <p className="text-sm text-white/70">
                Starts at {formatMoney(PRICING.cadence.setup)} setup + {formatMoney(PRICING.cadence.monthly)}/mo.
                <Link href="/solutions/flowstack" className="underline ml-1">Need something simpler? Try Flowstack™.</Link>
              </p>
              <ButtonLink intent="primary" href="#demo">See a Live Demo (2 min)</ButtonLink>
              <ButtonLink intent="secondary" href="/book">Book a strategy call</ButtonLink>
              <ButtonLink unstyled className="underline underline-offset-4 text-white/90" href="/contact?subject=Cadence%20pilot">Start a 30-day pilot</ButtonLink>
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
          <p>Cadence™ isn&apos;t programmed. It&apos;s <em>trained</em>-like a team member.</p>
          <p>
            We don&apos;t start with code. We start with your products, your voice, your best customer stories. Then we sculpt a
            chatbot that:
          </p>
          <ul>
            <li><strong>Knows your products</strong> inside-out (differentiators, backstory, use cases)</li>
            <li>
              <strong>Speaks your language</strong> (pauses, tone, biases-the good kind)
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
            <em> heard</em>-not handled.
          </p>
        </div>
      </Section>

      {/* How Cadence Is Trained (5 Steps) */}
      <Section className="gap-8">
        <Heading align="left">
          <h2>How We Build Your Cadence™ (It&apos;s Not What You Think)</h2>
        </Heading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Step
            title="Step 1: Deep Product Discovery"
            body="We learn your product line inside-out. What sets you apart? What&apos;s the backstory? What do customers really care about at 3 AM when they urgently need your solution?"
            outcome="Outcome: Cadence™ knows your products better than most human reps."
          />
          <Step
            title="Step 2: Voice & Personality Sculpting"
            body="We record a conversation with you (or your best team member). Our system analyzes your pauses, tone, and conversational rhythm. That data feeds directly into Cadence™&apos;s language model."
            outcome="Outcome: Cadence™ sounds like you—not a robot."
          />
          <Step
            title="Step 3: Storytelling Integration"
            body="We map your product stories—the ones that build trust and loyalty. Cadence™ doesn&apos;t just say 'Yes, we have candles.' It says 'Our French vanilla candles are inspired by a Victorian B&B the founder visited...'"
            outcome="Outcome: Customers leave feeling connected to your brand, not just informed."
          />
          <Step
            title="Step 4: Conversational Naturalness"
            body="Instant replies feel robotic. Humans pause. They think. Cadence™ simulates cognitive pauses, typing rhythm, and turn-taking cues so conversations feel present, not scripted."
            outcome="Outcome: Customers trust Cadence™ more and escalate less."
          />
          <Step
            title="Step 5: Testing, Guardrails & Human Handoff"
            body="We spend 5-10 hours conversing with your Cadence™ before launch. We test natural flow, set guardrails (payment details? hand off to human), and ensure seamless escalation."
            outcome="Outcome: Cadence™ handles routine work. Your team handles complex, high-value interactions. Everyone wins."
          />
        </div>
      </Section>

      {/* Feature Showcase - first three features */}
      <Section className="gap-8">
        <Heading align="left">
          <h2>Feature Showcase</h2>
        </Heading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Feature
            title="Brand Voice Mastery"
            headline="It Sounds Like You—Because It&apos;s Trained on You."
            benefit="Customers feel like they&apos;re talking to your team, not a generic bot."
            body="Cadence™ learns your pauses, tone, and conversational biases. The result? A chatbot that feels like part of your brand—not an outsourced tool."
            bullets={[
              "Voice/conversation recording analysis",
              "Pause timing and tone modeling",
              "Conversational bias alignment (favoring your products naturally, not pushy)",
            ]}
            image={{ src: "/assets/generated/cadence-feature-voice-desktop.webp", alt: ALT.asset1 }}
          />
          <Feature
            title="Product Storytelling Engine"
            headline="It Doesn&apos;t Just Answer Questions—It Tells Your Story."
            benefit="Build brand loyalty automatically, 24/7."
            body="Customers don&apos;t just want specs—they want to know why your product matters. Cadence™ knows your backstories, craftsmanship details, and customer testimonials. It weaves them into every conversation."
            bullets={["Deep product knowledge ingestion", "Backstory/origin narrative integration", "Customer use case library", "Differentiation talking points (vs. competitors)"]}
            image={{ src: "/assets/generated/cadence-feature-story-desktop.webp", alt: ALT.asset2 }}
          />
          <Feature
            title="Seamless Workflow Integration"
            headline="Your AI Assistant That Learns Your Workflow."
            benefit="Cadence™ integrates with your existing tools to automate follow-ups and data entry."
            body="Cadence™ is designed to be a team member, not a silo. It can automatically create tickets, update CRM records, and trigger follow-up emails based on conversation outcomes."
            bullets={["Integrates with Zapier/Make", "CRM update automation", "Ticket creation and routing", "Post-conversation data logging"]}
            image={{ src: "/assets/generated/cadence-feature-workflow-desktop.webp", alt: ALT.newAsset }}
          />
        </div>
      </Section>

      {/* Pricing summary CTA */}
      <Section className="gap-4">
        <Heading align="left">
          <h2>Transparent Pricing (No Surprises)</h2>
        </Heading>
        <div className="prose prose-zinc max-w-prose dark:prose-invert">
          <p>
            Cadence™ is an investment in your brand, not a commodity. Here&apos;s what it costs—and why it&apos;s worth it.
          </p>
          <ul>
            <li>Full Customization & Automation: {formatMoney(PRICING.cadence.setup)} setup</li>
            <li>Maintenance & Redbridging™ Coverage: {formatMoney(PRICING.cadence.monthly)}/mo thereafter</li>
          </ul>
          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">30-day pilot available for {formatMoney(PRICING.cadence.pilot)}.</p>
        </div>
        <div className="mt-2 flex gap-3">
          <ButtonLink intent="primary" href="#demo">See a Live Demo (2 min)</ButtonLink>
          <ButtonLink intent="secondary" href="/book">Book a 20-minute strategy call</ButtonLink>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="gap-6">
        <Heading align="left" subtitle="Common Questions About Cadence™">
          <h2>FAQ</h2>
        </Heading>
        <div className="divide-y divide-border dark:divide-dark-border">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group py-3">
              <summary className="cursor-pointer select-none font-medium group-open:opacity-70">
                {item.q}
              </summary>
              <div className="prose prose-zinc max-w-none pt-2 dark:prose-invert">
                <p dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section className="gap-4">
        <Heading align="left">
          <h2>Ready to Build Your Cadence™?</h2>
        </Heading>
        <div className="prose prose-zinc max-w-prose dark:prose-invert">
          <p>Most businesses lose customers to slow, generic support. You don&apos;t have to.</p>
          <p>
            Cadence™ answers questions, tells your story, and builds loyalty—24/7, without burning out your team.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLink intent="primary" href="#demo">See a Live Demo (2 min)</ButtonLink>
          <ButtonLink unstyled className="text-accent-600 underline underline-offset-4" href="/book">
            Or book a 20-minute strategy call to discuss your specific needs.
          </ButtonLink>
          <ul className="mt-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
            <li>No credit card required for demo</li>
            <li>2-4 week launch timeline</li>
            <li>30-day pilot available for $500</li>
            <li>You own your data. Always.</li>
          </ul>
        </div>
      </Section>
    </main>
  );
}

function Step({
  title,
  body,
  outcome,
}: {
  title: string;
  body: string;
  outcome: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-border bg-surface-secondary/80 p-5 shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80">
      <div className="pointer-events-none absolute -left-10 top-1/2 hidden h-24 w-24 -translate-y-1/2 rotate-[-18deg] rounded-full bg-accent-500/15 blur-2xl md:block" />
      <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{title}</h3>
      <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{body}</p>
      <p className="mt-3 text-xs font-medium text-accent-700 dark:text-accent-300">{outcome}</p>
    </article>
  );
}

function Feature({
  title,
  headline,
  benefit,
  body,
  bullets,
  image,
}: {
  title: string;
  headline: string;
  benefit: string;
  body: string;
  bullets: string[];
  image: { src: string; alt: string };
}) {
  return (
    <article className="grid grid-cols-1 gap-4 rounded-lg border border-border p-5 dark:border-dark-border md:grid-cols-5">
      <div className="md:col-span-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 font-medium">{headline}</p>
        <p className="text-text-secondary dark:text-dark-text-secondary">{benefit}</p>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">{body}</p>
        <ul className="mt-2 list-disc pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <div className="relative md:col-span-2">
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          className="h-full w-full rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1366px) 50vw, 600px"
        />
      </div>
    </article>
  );
}

const FAQ_ITEMS = [
  {
    q: "How is Cadence™ different from ChatGPT or other AI tools?",
    a: `ChatGPT is trained on the entire internet. Cadence™ is trained on <em>your</em> business. It knows your products, speaks your voice, and tells your stories. Plus, it's designed for customer-facing conversations—with guardrails, human handoff, and zero hallucinations.`,
  },
  {
    q: "What if Cadence™ gets a question it can't answer?",
    a: `It says so—and hands off to your team with full conversation context. We'd rather admit "I don't know" than hallucinate a wrong answer. Over time, we retrain Cadence™ on missed questions so it gets smarter every month.`,
  },
  {
    q: "Can Cadence™ really sound like me/my team?",
    a: `Yes. We record a conversation with you (or your best team member), analyze your pauses, tone, and conversational rhythm, and feed that into Cadence™'s language model. The result? A chatbot that feels like <em>you</em>—not a generic assistant.`,
  },
  { q: "How long does setup take?", a: `2-4 weeks from kickoff to launch. Week 1: Discovery and voice sculpting. Week 2-3: Training, testing, and guardrail configuration. Week 4: Final testing and go-live.` },
  {
    q: "What if we outgrow Cadence™ or want to cancel?",
    a: `You own your Cadence™. If you cancel, you keep all conversation logs, knowledge base docs, and configuration files. No vendor lock-in. No data hostage situations.`,
  },
  {
    q: "Does Cadence™ replace our customer service team?",
    a: `No. Cadence™ <em>augments</em> your team. It handles repetitive questions (return policies, shipping times, product specs) so your humans can focus on complex, high-value interactions. Research shows this improves team productivity by 30-50% <em>and</em> increases CSAT.[73][94]`,
  },
  { q: "Can we do a pilot or trial first?", a: `Yes. We offer a 30-day pilot for $500 (applied to full setup if you continue). You'll get a basic Cadence™ trained on 50-100 FAQs so you can see how it performs with real customers before committing.` },
];
