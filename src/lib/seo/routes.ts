import type { MetadataRoute } from "next";

export type SeoRouteSection =
  | "core"
  | "solutions"
  | "products"
  | "social-proof"
  | "help"
  | "legal"
  | "enterprise";

export type SeoRoute = {
  label: string;
  path: string;
  description: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  section: SeoRouteSection;
  includeInSitemap?: boolean;
  primaryNav?: boolean;
  keywords?: string[];
};

export const SEO_ROUTES: SeoRoute[] = [
  {
    label: "Home",
    path: "/",
    description:
      "Upton Rand's Cleveland-based AI automation studio — Cadence  Your AI Concierge, Consensus Engine  Your AI Strategy Sprint, Workflow Automation Setup, and Automation Rescue for small businesses.",
    changeFrequency: "daily",
    priority: 1,
    section: "core",
    primaryNav: true,
    keywords: ["Upton Rand", "Bespoke Ethos", "Cleveland AI", "AI concierge", "workflow automation", "automation rescue"],
  },
  {
    label: "Solutions Overview",
    path: "/solutions",
    description:
      "Compare Cadence  Your AI Concierge, Consensus Engine  Your AI Strategy Sprint, Workflow Automation Setup automations, and Automation Rescue reliability work in one place.",
    changeFrequency: "weekly",
    priority: 0.8,
    section: "solutions",
    primaryNav: true,
    keywords: ["solutions", "AI concierge", "AI Strategy Sprint", "Workflow Automation Setup", "Automation Rescue"],
  },
  {
    label: "Workflow Automation Setup Automations",
    path: "/solutions/flowstack",
    description:
      "Workflow Automation Setup — Upton's automation fabric that keeps approvals, runbooks, and rollback intact for busy founders.",
    changeFrequency: "weekly",
    priority: 0.8,
    section: "solutions",
    keywords: ["Workflow Automation Setup", "automation", "Upton Rand"],
  },
  {
    label: "Cadence  Your AI Concierge",
    path: "/products/cadence",
    description:
      "Meet Cadence  Your AI Concierge — a relationship-first AI front door tuned by Upton Rand to sound like your founder voice and hand off to humans when it matters.",
    changeFrequency: "weekly",
    priority: 0.8,
    section: "products",
    primaryNav: true,
    keywords: ["Cadence", "AI concierge", "chatbot", "Upton Rand"],
  },
  {
    label: "Consensus Engine  Your AI Strategy Sprint",
    path: "/solutions/consensus-engine",
    description:
      "Consensus Engine  Your AI Strategy Sprint — four research lenses that cross-check sources before handing back a cited recommendation and approvals-intact plan.",
    changeFrequency: "weekly",
    priority: 0.8,
    section: "solutions",
    keywords: ["Consensus Engine", "AI Strategy Sprint", "research brief"],
  },
  {
    label: "Automation Rescue Reliability",
    path: "/solutions/redbridging",
    description:
      "Automation Rescue engagements rescue brittle automations and layer in monitoring, alerts, and documentation.",
    changeFrequency: "weekly",
    priority: 0.8,
    section: "solutions",
    keywords: ["Automation Rescue", "automation reliability"],
  },
  {
    label: "Essentials",
    path: "/solutions/essentials",
    description:
      "Compact automation scopes for founders who need one painful workflow handled fast with full documentation.",
    changeFrequency: "weekly",
    priority: 0.7,
    section: "solutions",
  },
  {
    // Legacy a-la-carte URL kept for redirects/SEO; no longer actively promoted.
    label: "A La Carte (legacy)",
    path: "/solutions/a-la-carte",
    description:
      "Legacy a la carte menu for automation upgrades and research briefs. New customers should start from the four flagship offerings instead.",
    changeFrequency: "weekly",
    priority: 0.3,
    section: "solutions",
    includeInSitemap: false,
  },
  {
    label: "Pricing",
    path: "/pricing",
    description:
      "Fixed scopes from $997, LGBTQ-owned discounts, and transparent retainers across Cadence, Consensus Engine  Your AI Strategy Sprint, Workflow Automation Setup, and Automation Rescue.",
    changeFrequency: "monthly",
    priority: 0.7,
    section: "core",
    primaryNav: true,
  },
  {
    label: "Book a Consult",
    path: "/book",
    description: "Direct link to schedule time with Upton Rand for automation or AI concierge planning.",
    changeFrequency: "monthly",
    priority: 0.6,
    section: "core",
  },
  {
    label: "About",
    path: "/about",
    description: "Upton Rand's founder story, NGLCC certification, and why Bespoke Ethos exists for small businesses.",
    changeFrequency: "monthly",
    priority: 0.5,
    section: "social-proof",
    primaryNav: true,
  },
  {
    label: "Case Studies",
    path: "/case-studies",
    description:
      "Proof before promises — Cleveland founders describing their Cadence, Workflow Automation Setup, Consensus Engine, and Automation Rescue wins.",
    changeFrequency: "monthly",
    priority: 0.5,
    section: "social-proof",
  },
  {
    label: "Testimonials",
    path: "/testimonials",
    description:
      "Founder quotes pulled from support inboxes and follow-ups after Cadence, Workflow Automation Setup, Consensus Engine, and Automation Rescue launches.",
    changeFrequency: "monthly",
    priority: 0.5,
    section: "social-proof",
  },
  {
    label: "LGBTQ Discount",
    path: "/lgbtq-discount",
    description: "Standing 25% discount on upfront project fees for LGBTQ-owned businesses and one grant slot per year.",
    changeFrequency: "monthly",
    priority: 0.5,
    section: "help",
  },
  {
    label: "Help Center",
    path: "/help",
    description:
      "Support resources for Cadence, Consensus Engine  Your AI Strategy Sprint, Workflow Automation Setup, and Automation Rescue customers.",
    changeFrequency: "monthly",
    priority: 0.4,
    section: "help",
  },
  {
    label: "FAQ",
    path: "/faq",
    description: "Three-part FAQ covering scope, timelines, and how Upton keeps approvals intact.",
    changeFrequency: "monthly",
    priority: 0.4,
    section: "help",
  },
  {
    label: "Contact",
    path: "/contact",
    description: "Personal contact form that goes straight to Upton Rand — no SDRs, no bots.",
    changeFrequency: "monthly",
    priority: 0.5,
    section: "help",
    primaryNav: true,
    keywords: ["contact Upton Rand", "Cleveland AI consultant"],
  },
  {
    label: "Blog",
    path: "/blog",
    description:
      "Long-form notes on automation, Cadence deployments, Consensus Engine research processes, and Automation Rescue reliability work.",
    changeFrequency: "weekly",
    priority: 0.6,
    section: "core",
  },
  {
    label: "Changelog",
    path: "/changelog",
    description:
      "Product updates across Cadence, Consensus Engine  Your AI Strategy Sprint, Workflow Automation Setup, and Automation Rescue for transparency.",
    changeFrequency: "weekly",
    priority: 0.5,
    section: "core",
  },
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
    description: "How Bespoke Ethos handles data, contact submissions, and tooling integration.",
    changeFrequency: "yearly",
    priority: 0.2,
    section: "legal",
  },
  {
    label: "Terms",
    path: "/terms",
    description: "Engagement terms, payment expectations, and responsibility statements for every project.",
    changeFrequency: "yearly",
    priority: 0.2,
    section: "legal",
  },
  {
    label: "Enterprise Automation Fabric",
    path: "/enterprise/automation-fabric",
    description:
      "Enterprise-specific articulation of Workflow Automation Setup for compliance-heavy orgs that need audit-ready automation.",
    changeFrequency: "monthly",
    priority: 0.7,
    section: "enterprise",
  },
  {
    label: "Enterprise Cloud Chatbot",
    path: "/enterprise/cloud-chatbot",
    description:
      "Cadence and AI Strategy Sprint patterns deployed at enterprise scale — human-in-the-loop chat concierge with tone controls and documentation.",
    changeFrequency: "monthly",
    priority: 0.7,
    section: "enterprise",
  },
  {
    label: "Enterprise Decision Room",
    path: "/enterprise/decision-room",
    description:
      "Consensus Engine packaged for executives — scenario planning with cited recommendations and audit notes.",
    changeFrequency: "monthly",
    priority: 0.7,
    section: "enterprise",
  },
  {
    label: "Enterprise Reliability Ops",
    path: "/enterprise/reliability-ops",
    description:
      "Automation Rescue patterns lifted to enterprise infrastructure to harden brittle automations and queues.",
    changeFrequency: "monthly",
    priority: 0.7,
    section: "enterprise",
  },
  {
    label: "Brutus API",
    path: "/brutus",
    description:
      "Landing for the Brutus Intelligence Platform — AI gateway, failover, and transparency for API teams.",
    changeFrequency: "monthly",
    priority: 0.6,
    section: "products",
  },
  {
    label: "Consensus Calendar",
    path: "/calendar",
    description:
      "Consensus Calendar — an AI-powered Cleveland LGBTQ+ social calendar that highlights verified community events using a consensus engine to filter out bad data.",
    changeFrequency: "daily",
    priority: 0.6,
    section: "core",
  },
];

export const NAVIGATION_ROUTES = SEO_ROUTES.filter((route) => route.primaryNav);
