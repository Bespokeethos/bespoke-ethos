import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import path from "node:path";
import fs from "node:fs";
import {
  IconArrowUpRight,
  IconChecklist,
  IconCircuitSwitchClosed,
  IconMessage2Bolt,
  IconSparkles,
} from "@tabler/icons-react";

import { HeroSlideshow, type Slide } from "../_sections/hero/slideshow";
import { PRICING, formatMoney } from "@/config/pricing";

const SOLUTION_DATA = [
  {
    slug: "flowstack",
    name: "Flowstack™",
    summary:
      "Automate the single, soul-sucking task stealing hours from your week—while you stay in the approval loop.",
    stat: "Clients regain 15+ hours every week on average.",
    href: "/solutions/flowstack",
    Icon: IconSparkles,
    heroEyebrow: "Flowstack™",
    heroTitle: "Automate Your Worst Task. Own the Results.",
    heroSubtitle: `We map your real process, keep human approvals intact, and ship a production-ready automation in days. ${formatMoney(PRICING.flowstack.setup)} setup + ${formatMoney(PRICING.flowstack.monthly)}/mo.`,
    heroDescription:
      "Flowstack™ eliminates swivel-chair work without inviting AI chaos. Discovery-first builds capture your nuance, document every dependency, and keep audit trails and rollback paths in reach.",
    primaryCTA: { label: "Automate My #1 Task", href: "/contact" },
    secondaryCTA: { label: "Schedule a Free Consultation", href: "/contact?service=llm-setups" },
    pricing: [
      `${formatMoney(PRICING.flowstack.setup)} setup - process mapping + architecture`,
      `${formatMoney(PRICING.flowstack.monthly)}/month - monitoring, tweaks, and on-call fixes`,
      "Includes documentation, audit trails, and approval checkpoints.",
    ],
    highlights: [
      "Keeps humans in every approval loop that matters.",
      "Every automation ships with rollback and documentation.",
      "24/7 monitoring so outages never blindside you again.",
    ],
    process: [
      {
        title: "Discovery Session (1 hour)",
        description:
          "We interview the people doing the work today so Flowstack™ mirrors your unique rules, exceptions, and tone.",
      },
      {
        title: "Custom Build (2 hours)",
        description:
          "We wire your workflow in the tools you already trust—Zapier, Make, Jotform, Calendly, HubSpot, QuickBooks, and more.",
      },
      {
        title: "Deploy & Iterate",
        description:
          "You get 24/7 access, monitoring, and fast iterations as your business evolves—without ever losing ownership.",
      },
    ],
    metrics: [
      { label: "Hours saved weekly", value: "15+" },
      { label: "Approval retention", value: "100%" },
      { label: "Documentation delivered", value: "Audit + SOP" },
    ],
    caseStudy: {
      solutionName: "Flowstack™",
      title: "Molly, the Brewery Statistics Tutor",
      summary:
        "Alex, a brewer in Marquette, Michigan, had to finish college statistics with learning disabilities and zero time. Flowstack™ delivered Molly-an AI tutor that explains stats through brewery analogies.",
      bullets: [
        "1 hour discovery, 2 hour build, ongoing 24/7 access.",
        `Costs ${formatMoney(PRICING.flowstack.setup)} down + ${formatMoney(PRICING.flowstack.monthly)}/mo—far less than $30-$50/hr tutoring.`,
        "Confidence skyrocketed because explanations finally matched real life.",
      ],
      testimonial:
        "I needed statistics help, but generic tutoring didn't work. Molly explains everything through Ore Dock Brewing and finally makes sense.",
      author: "Alex Rand, Brewer & College Student, Ore Dock Brewing Company",
    },
  },
  {
    slug: "consensus-engine",
    name: "Consensus Engine™",
    summary:
      "Stop guessing on critical decisions. Consensus Engine™ fuses numbers, brand tone, and customer signals into one clear brief.",
    stat: "First strategic decision is always free.",
    href: "/solutions/consensus-engine",
    Icon: IconChecklist,
    heroEyebrow: "Consensus Engine™",
    heroTitle: "Decide with Confidence. No Committee Needed.",
    heroSubtitle:
      "Upload surveys, sales data, transcripts, or competitor copy. We deliver multi-perspective analysis that ends stalemates.",
    heroDescription:
      "Consensus Engine™ compares qualitative insight and financial impact so your next rebrand, launch, or pricing move lands with certainty.",
    primaryCTA: { label: "Get Your Free Answer", href: "/solutions/consensus-engine" },
    secondaryCTA: { label: "Book a Strategy Session", href: "/contact?service=llm-setups" },
    pricing: [
      "First decision is free — receive a full executive brief.",
      "Bundle follow-up questions by month or quarter.",
      "Optional add-ons: presentation-ready visuals, team workshops.",
    ],
    highlights: [
      "Synthesizes voice of customer, sales, and brand tone in one pass.",
      "Outputs ready-to-present briefs and decision trees.",
      "Ideal for rebrands, product launches, pricing, and hiring plans.",
    ],
    process: [
      {
        title: "Intake & Priorities",
        description:
          "Provide context, constraints, and assets—brand docs, CRM exports, survey data, transcripts, financials.",
      },
      {
        title: "Multi-Perspective Analysis",
        description:
          "Consensus Engine™ evaluates each scenario through customer, operator, and finance lenses with transparent rationale.",
      },
      {
        title: "Actionable Brief",
        description:
          "Receive the winning recommendation plus implementation steps, watchouts, and a plan B if conditions change.",
      },
    ],
    metrics: [
      { label: "Avg. time-to-decision", value: "48 hrs" },
      { label: "Stakeholder alignment", value: "90%+" },
      { label: "Conversion lift (avg.)", value: "+22%" },
    ],
    caseStudy: {
      solutionName: "Consensus Engine™",
      title: "Retail Co-Op Rebrand Alignment",
      summary:
        "A Cleveland retail co-op was split on two brand directions. Consensus Engine™ synthesized customer interviews, Shopify sales, and competitive audits into a clear creative brief everyone trusted.",
      bullets: [
        "Initial rebrand recommendation delivered in 48 hours.",
        "Landing-page conversion jumped 22% after implementation.",
        "Ongoing decisions bundled for seasonal campaigns and packaging updates.",
      ],
      testimonial:
        "We finally agreed on brand voice without another six-week debate—and the plan actually moved revenue.",
      author: "Monique Ellis, Co-Founder, Lake Effect Co-op",
    },
  },
  {
    slug: "chatbots",
    name: "Chatbots for Small Business",
    summary:
      "24/7 customer answers tuned to your tone, FAQ, and escalation rules—no training videos or call centers required.",
    stat: "Cuts repetitive support tickets by up to 50%.",
    href: "/solutions/chatbots",
    Icon: IconMessage2Bolt,
    heroEyebrow: "Chatbots for Small Business",
    heroTitle: "Bot Answers. Human Tone. Zero Burnout.",
    heroSubtitle:
      "Deploy AI assistants that speak in your brand voice, capture leads, and escalate to real humans on your terms.",
    heroDescription:
      "From onboarding forms to order status checks, our chatbots keep your team free for high-touch work while customers get instant, accurate help.",
    primaryCTA: { label: "Try AI Chatbot Free", href: "/solutions/chatbots" },
    secondaryCTA: { label: "See Customer Playbooks", href: "/blog" },
    pricing: [
      `Starter: ${formatMoney(PRICING.chatbots.rangeMin)}/mo - FAQ + simple flows.`,
      `Growth: ${formatMoney(99)}/mo - CRM + order lookups.`,
      `Scale: ${formatMoney(PRICING.scale.monthly)}/mo - advanced integrations + analytics.`,
    ],
    highlights: [
      "Trained on your docs, emails, transcripts, and brand guidelines.",
      "Dynamic escalation rules so humans step in only when needed.",
      "Lead capture and CRM sync out of the box.",
    ],
    process: [
      {
        title: "Voice & Tone Workshop",
        description:
          "We capture the phrases, style, and empathy your customers expect so every answer feels on-brand.",
      },
      {
        title: "Knowledge Capture",
        description:
          "We load SOPs, transcripts, FAQs, and policies. You can keep refining with a simple upload flow.",
      },
      {
        title: "Launch & Learn",
        description:
          "Go live with dashboards for unanswered questions, lead capture, and handoff transcripts.",
      },
    ],
    metrics: [
      { label: "Ticket reduction", value: "Up to 50%" },
      { label: "Avg. satisfaction", value: "4.6 / 5" },
      { label: "Escalation accuracy", value: "92%" },
    ],
    caseStudy: {
      solutionName: "Chatbots for Small Business",
      title: "24/7 Support for Specialty Retail",
      summary:
        "A boutique eCommerce retailer needed overnight answers without hiring a night shift. Our chatbot handles sizing, shipping, and restock alerts while capturing new leads.",
      bullets: [
        "Support response times dropped from 12 hours to under 2 minutes.",
        "Lead capture increased 18% thanks to proactive prompts.",
        "Escalation rules ensure VIP customers still reach a human fast.",
      ],
      testimonial:
        "Customers rave about getting real answers after hours, and my team finally gets nights and weekends back.",
      author: "Priya Menon, Founder, Tidal Thread Boutique",
    },
  },
  {
    slug: "redbridging",
    name: "Redbridging™",
    summary:
      "Automation rescue and monitoring that keeps revenue-critical workflows alive when Zapier or Make decide to stall out.",
    stat: "Emergency fixes delivered same day for most stacks.",
    href: "/solutions/redbridging",
    Icon: IconCircuitSwitchClosed,
    heroEyebrow: "Redbridging™",
    heroTitle: "Automation Rescue. Revenue Guarded.",
    heroSubtitle:
      "When your Zapier or Make scenario breaks, Redbridging™ restores operations, adds monitoring, and prevents repeat outages.",
    heroDescription:
      "We treat every automation as mission-critical: restore service, document the fix, and install guardrails so the panic never returns.",
    primaryCTA: { label: "Protect My Automations", href: "/contact" },
    secondaryCTA: { label: "See Rescue Checklist", href: "/pricing" },
    pricing: [
      "Emergency rescue: $49 one-time (credited toward plans).",
      "Standard plan: $99/mo for proactive monitoring + unlimited fixes.",
      "Included with Flowstack™ retainers.",
    ],
    highlights: [
      "Covers Zapier, Make, Jotform, Calendly, HubSpot, QuickBooks, and Stripe.",
      "Real-time monitoring and alerting before clients feel the pain.",
      "Documentation and video walk-through of every remediation.",
    ],
    process: [
      {
        title: "Stabilize Revenue Flow",
        description:
          "We triage missed orders, invoices, or leads, then restore the automations responsible for cash flow.",
      },
      {
        title: "Diagnose & Document",
        description:
          "Root-cause analysis with clear remediation notes so you understand exactly what broke and why.",
      },
      {
        title: "Monitor & Prevent",
        description:
          "Install dashboards, heartbeat checks, and notification logic so your team receives warnings before outages escalate.",
      },
    ],
    metrics: [
      { label: "Recovery time", value: "< 4 hrs" },
      { label: "Automations covered", value: "180+" },
      { label: "Alert lead time", value: "10 min" },
    ],
    caseStudy: {
      solutionName: "Redbridging™",
      title: "Accounting Workflow Revival",
      summary:
        "LedgerLight Accounting lost two days of invoices when Zapier failed silently. Redbridging™ restored their QuickBooks sync, added monitoring, and stopped revenue leakage overnight.",
      bullets: [
        "Recovered every invoice in under four hours with zero data loss.",
        "Installed proactive alerts so month-end close stays clean.",
        `Flat ${formatMoney(PRICING.redbridging.standaloneLow)} rescue rolled into a ${formatMoney(PRICING.redbridging.standaloneHigh)}/mo safeguard plan.`,
      ],
      testimonial:
        "Revenue stopped bleeding, and now we get alerted before clients feel pain. Worth every penny.",
      author: "Derrick Patel, Founder, LedgerLight Accounting",
    },
  },
] as const;

const SOLUTION_MAP = SOLUTION_DATA.reduce<Record<string, (typeof SOLUTION_DATA)[number]>>(
  (acc, solution) => {
    acc[solution.slug] = solution;
    return acc;
  },
  {},
);

const PROOF_POINTS = [
  {
    title: "NGLCC Certified & LGBTQ-Owned",
    image: "/assets/badge-nglcc.png",
    alt: "NGLCC badge",
  },
  {
    title: "Catalant Vetted Consultants",
    image: "/assets/badge-catalant.png",
    alt: "Catalant badge",
  },
  {
    title: "5 Years of Hands-On AI Deployments",
    image: "/assets/logo-dark.png",
    alt: "Bespoke Ethos logomark",
  },
] as const;

const RESEARCH_HIGHLIGHTS = [
  {
    title: "Small businesses adopting AI faster than expected",
    source: "Intuit QuickBooks 2024 Report",
    href: "https://quickbooks.intuit.com/r/future-of-small-business/state-of-small-business/",
  },
  {
    title: "Automation is the top lever for service response times",
    source: "Zendesk SMB Customer Service Trends",
    href: "https://www.zendesk.com/blog/small-business-customer-service-trends/",
  },
  {
    title: "Owners want AI that preserves human oversight",
    source: "Deloitte AI Readiness Study",
    href: "https://www2.deloitte.com/us/en/insights/focus/technology-and-the-future-of-work/ai-automation-small-business.html",
  },
] as const;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolved = await params;
  const slugs = resolved.slug;
  const path = slugs && slugs.length > 0 ? `/${slugs.join("/")}` : "/";
  return {
    title: "Bespoke Ethos",
    description:
      "AI workflow automation, chatbot support, and decision clarity tailored for small businesses.",
    alternates: { canonical: path },
  };
}

function FallbackStaticPage({ slug }: { slug?: string[] }) {
  // Local slideshow slides from generated assets
  const publicDir = path.join(process.cwd(), "public", "assets", "generated");
  const webp: Array<{ file: string; alt: string; caption: string }> = [
    { file: "hero-flowstack-desktop.webp", alt: "Flowstack automation visual with connected tasks", caption: "Flowstack - Automate your #1 task" },
    { file: "hero-chatbots-desktop.webp", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "hero-consensus-desktop.webp", alt: "Consensus Engine converging lines", caption: "Consensus - Four perspectives, one answer" },
    { file: "hero-redbridging-desktop.webp", alt: "Redbridging reliability bridge with shield", caption: "Redbridging - Rescue brittle automations" },
  ];
  const png: Array<{ file: string; alt: string; caption: string }> = [
    { file: "flowstack-hero.png", alt: "Flowstack automation visual with connected tasks", caption: "Flowstack - Automate your #1 task" },
    { file: "chatbots-hero.png", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "chatbot-hero.png", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "consensus-hero.png", alt: "Consensus Engine converging lines", caption: "Consensus - Four perspectives, one answer" },
    { file: "redbridging-hero.png", alt: "Redbridging reliability bridge with shield", caption: "Redbridging - Rescue brittle automations" },
    { file: "research_hero.png", alt: "Founder reviewing insights on a clean AI dashboard", caption: "Research - Decisions backed by learning and context" },
    { file: "research-hero.png", alt: "Founder reviewing insights on a clean AI dashboard", caption: "Research - Decisions backed by learning and context" },
  ];
  const webpSlides = webp
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({ src: `/assets/generated/${c.file}`, alt: c.alt, caption: c.caption }));
  const pngSlides = png
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({ src: `/assets/generated/${c.file}`, alt: c.alt, caption: c.caption }));
  const slides: Slide[] = (webpSlides.length ? webpSlides : pngSlides) as Slide[];
  const offerings = [
    {
      name: "Flowstack™",
      href: "/solutions/flowstack",
      description: "Automate the single task stealing the most hours from your week—while you keep approvals, ownership, and audit trails.",
      stat: "Clients regain 15+ hours every week on average.",
      Icon: IconSparkles,
    },
    {
      name: "Consensus Engine™",
      href: "/solutions/consensus-engine",
      description: "Multi-perspective AI analysis that compares brand, customer, and financial data so you stop guessing on your next move.",
      stat: "First strategic decision is always free.",
      Icon: IconChecklist,
    },
    {
      name: "Chatbots for Small Business",
      href: "/solutions/chatbots",
      description: "24/7 customer answers tuned to your voice, FAQ, and escalation rules—no training videos or call center required.",
      stat: "Up to 50% reduction in repetitive support tickets.",
      Icon: IconMessage2Bolt,
    },
    {
      name: "Redbridging™",
      href: "/solutions/redbridging",
      description: "Automation rescue and monitoring that keeps your revenue-critical workflows alive when Zapier or Make decide to stall out.",
      stat: "Emergency fixes delivered same day for most SMB stacks.",
      Icon: IconCircuitSwitchClosed,
    },
  ];

  const proofPoints = [
    {
      title: "NGLCC Certified & LGBTQ-Owned",
      image: "/assets/badge-nglcc.png",
      alt: "NGLCC badge",
    },
    {
      title: "Catalant Vetted Consultants",
      image: "/assets/badge-catalant.png",
      alt: "Catalant badge",
    },
    {
              title: "5 Years of Hands-On AI Deployments",
      image: "/assets/logo-dark.png",
      alt: "Bespoke Ethos logomark",
    },
  ];

  const caseStudies = [
    {
      title: "Molly, the Brewery Statistics Tutor (Flowstack™)",
      summary:
        "Alex, a brewer in Marquette, Michigan, needed statistics to finish college. Flowstack™ delivered a custom Gemini tutor that speaks in fermentation batches, remembers his humor, and adapts to learning disabilities.",
      bullets: [
        "1 hour discovery, 2 hours build, 24/7 availability forever.",
        "Time-to-understanding dropped from weeks to a single evening.",
        `Cost certainty: ${formatMoney(PRICING.flowstack.setup)} setup + ${formatMoney(PRICING.flowstack.monthly)}/mo beats $30-50/hr tutors.`,
      ],
      testimonial:
        "“Molly explains stats using my brewery floor. It&rsquo;s not generic—it&rsquo;s mine.”",
      author: "Alex Rand, Brewer, Ore Dock Brewing Company",
    },
    {
      title: "Brand Direction with Confidence (Consensus Engine™)",
      summary:
        "A Main Street retail co-op in Cleveland faced a rebrand showdown. Consensus Engine™ synthesized survey data, Shopify sales, and competitor tone to deliver a creative brief the whole founding team trusted.",
      bullets: [
        "First report delivered free in 48 hours with clear &lsquo;why&rsquo;.",
        "Consensus-backed direction increased landing-page conversion 22%.",
        "Ongoing decisions packaged in bundles for seasonal campaigns.",
      ],
      testimonial:
        "“We finally agreed on our brand voice without another 6-week debate.”",
      author: "Monique Ellis, Co-Founder, Lake Effect Co-op",
    },
    {
      title: "Accounting Workflow Revival (Redbridging™)",
      summary:
        "An Akron bookkeeping firm lost two days of invoices when a Zapier update broke their QuickBooks sync. Redbridging™ restored the automations, added monitoring, and put approvals back in human hands.",
      bullets: [
        "Recovery within four hours, zero data loss.",
        "Automated alerting prevents repeat failures during month-end close.",
        "Flat $49 emergency rescue credited toward a broader safeguard plan.",
      ],
      testimonial:
        "“Revenue stopped bleeding, and now we get alerts before clients feel pain.”",
      author: "Derrick Patel, Founder, LedgerLight Accounting",
    },
  ];

  const researchHighlights = [
    {
      title: "Small businesses adopting AI faster than expected",
      source: "Intuit QuickBooks 2024 Report",
      href: "https://quickbooks.intuit.com/r/future-of-small-business/state-of-small-business/",
    },
    {
      title: "Automation is the top lever for service response times",
      source: "Zendesk SMB Customer Service Trends",
      href: "https://www.zendesk.com/blog/small-business-customer-service-trends/",
    },
    {
      title: "Owners want AI that preserves human oversight",
      source: "Deloitte AI Readiness Study",
      href: "https://www2.deloitte.com/us/en/insights/focus/technology-and-the-future-of-work/ai-automation-small-business.html",
    },
  ];

  return (
    <div className="bg-surface-primary dark:bg-dark-surface-primary">
      <section className="relative overflow-hidden">
        <div className="be-hero-aurora absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-14 pt-20 md:grid-cols-2 md:pt-24">
          <div className="order-2 md:order-1 text-pretty">
            <span className="text-accent-500 text-sm font-semibold uppercase tracking-[0.3em] motion-safe:animate-fadeIn">Main Street automation, handcrafted.</span>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-5xl motion-safe:animate-enterFromLeft">
              Soft, clean automation that keeps your hands on the controls.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text-tertiary dark:text-dark-text-tertiary">
              Auditable AI workflows, on-brand chatbots, and decision clarity—built for small business. Keep human approvals, regain your time, and stay in charge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-fadeIn">
              <Link href="/contact" className="bg-accent-600 hover:brightness-110 inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-white">Automate My #1 Task</Link>
              <Link href="/solutions" className="border-border text-text-primary hover:bg-black/5 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-white/5 inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold">See Products</Link>
              <Link href="/contact?service=llm-setups" className="text-text-tertiary hover:text-text-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary inline-flex items-center justify-center px-3 py-3 text-sm font-semibold">Free Consultation</Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/assets/nglcc-badge-dark.svg"
                alt="NGLCC Certified dark version"
                width={120}
                height={40}
                className="h-6 w-auto block dark:hidden"
              />
              <Image
                src="/assets/nglcc-badge-light.svg"
                alt="NGLCC Certified light version"
                width={120}
                height={40}
                className="h-6 w-auto hidden dark:block"
              />
              <Image
                src="/assets/catalant-badge-dark.svg"
                alt="Catalant Vetted dark version"
                width={120}
                height={40}
                className="h-6 w-auto block dark:hidden"
              />
              <Image
                src="/assets/catalant-badge-light.svg"
                alt="Catalant Vetted light version"
                width={120}
                height={40}
                className="h-6 w-auto hidden dark:block"
              />
            </div>
            <p className="mt-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">Consensus Engine™ and Redbridging™ are trademark pending.</p>
          </div>
          <div className="order-1 md:order-2 motion-safe:animate-enterFromRight">
            <HeroSlideshow slides={slides.length ? slides : undefined} />
          </div>
        </div>
      </section>

      <section className="bg-surface-secondary dark:bg-dark-surface-secondary">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center">
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-text-tertiary dark:text-dark-text-tertiary">
            Trusted operators for modern main street businesses
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {proofPoints.map((badge) => (
              <figure key={badge.title} className="flex flex-col items-center gap-2">
                <Image
                  src={badge.image}
                  alt={badge.alt}
                  width={120}
                  height={120}
                  className="h-16 w-auto"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-pretty text-3xl font-semibold text-text-primary dark:text-dark-text-primary">
              Choose the play built for your biggest bottleneck
            </h2>
            <p className="mt-2 max-w-2xl text-text-tertiary dark:text-dark-text-tertiary">
              Whether you need approvals to stay human, decisions to land faster, or zaps rescued before payroll, each flagship product starts with your language and ends with a monitored system you can edit.
            </p>
          </div>
          <Link
            href="/solutions"
            className="text-accent-500 inline-flex items-center text-sm font-medium"
          >
            Explore all playbooks <IconArrowUpRight className="ml-1 size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {offerings.map(({ name, description, stat, href, Icon }) => (
            <a
              key={name}
              href={href}
              className="border-border dark:border-dark-border relative overflow-hidden rounded-2xl border bg-surface-secondary/50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-dark-surface-secondary/60"
            >
              <Icon className="text-accent-500 mb-4 size-10" />
              <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                {name}
              </h3>
              <p className="mt-3 text-sm text-text-tertiary dark:text-dark-text-tertiary">
                {description}
              </p>
              <p className="mt-4 text-sm font-medium text-accent-500">{stat}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-surface-secondary dark:bg-dark-surface-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-pretty text-3xl font-semibold text-text-primary dark:text-dark-text-primary">
                Proof that Flowstack™, Consensus Engine™, and Redbridging™ deliver
              </h2>
              <p className="mt-2 max-w-3xl text-text-tertiary dark:text-dark-text-tertiary">
                Real owners, real outcomes. Discovery-led builds that respect how your business actually runs.
              </p>
            </div>
            <Link href="/solutions" className="text-accent-500 text-sm font-medium">
              View all case studies
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {caseStudies.map((study) => (
              <article
                key={study.title}
                className="border-border dark:border-dark-border flex flex-col gap-4 rounded-2xl border bg-surface-primary/80 p-6 dark:bg-dark-surface-primary/70"
              >
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                  {study.title}
                </h3>
                <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                  {study.summary}
                </p>
                <ul className="space-y-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
                  {study.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 size-2 rounded-full bg-accent-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <blockquote className="border-l-2 border-accent-500 pl-4 text-sm italic text-text-tertiary dark:text-dark-text-tertiary">
                  “{study.testimonial.replace(/^“|”$/g, "")}”
                </blockquote>
                <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
                  {study.author}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-pretty text-3xl font-semibold text-text-primary dark:text-dark-text-primary">
              Why owners choose Bespoke Ethos
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "No one-size-fits-all playbooks—everything is trained on your approvals, brand, and risk tolerance.",
                "We start with discovery, not dashboards. That&rsquo;s why Flowstack™ builds often ship in under 3 hours.",
                "You keep control with human-in-the-loop reviews, rollback paths, and transparent pricing.",
                "Decision support that blends qualitative brand tone and hard numbers into actionable briefs.",
              ].map((point) => (
                <div
                  key={point}
                  className="border-border dark:border-dark-border rounded-xl border bg-surface-secondary/60 p-4 text-sm text-text-tertiary dark:bg-dark-surface-secondary/60 dark:text-dark-text-tertiary"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
          <aside className="border-border dark:border-dark-border flex flex-col gap-4 rounded-2xl border bg-surface-secondary/50 p-6 dark:bg-dark-surface-secondary/60">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-primary dark:text-dark-text-primary">
              Fresh insights for small business owners
            </h3>
            <ul className="space-y-4 text-sm">
              {researchHighlights.map(({ title, source, href }) => (
                <li key={href} className="flex flex-col gap-1">
                  <a
                    href={href}
                    className="text-text-primary dark:text-dark-text-primary hover:text-accent-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {title}
                  </a>
                  <span className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
                    {source}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-accent-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Let’s map your automation plan in under 30 minutes.
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Email the founders directly or grab a Calendly slot—every project starts with an honest conversation, never a script.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:contact@bespokeethos.com?subject=Project%20inquiry"
              className="bg-white text-accent-600 hover:bg-slate-100 inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition"
            >
              Email contact@bespokeethos.com
            </a>
            <a
              href="https://calendly.com/contact-bespokeethos/30min"
              className="bg-white text-accent-600 hover:bg-slate-100 inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition"
              target="_blank"
              rel="noreferrer"
            >
              Schedule on Calendly
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Bespoke Ethos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function DynamicPage({
  params: _params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await _params;
  const slugs = params.slug;

  return <FallbackStaticPage slug={slugs} />;
}
