export type LocalPost = {
  _id: string;
  _slug: string;
  _title: string;
  description: string;
  publishedAt: string;
  categories: string[];
  authors: Array<{
    _id: string;
    _title: string;
    image: { url: string; alt: string; width: number; height: number };
  }>;
  image: {
    light: { url: string; alt: string; width: number; height: number; aspectRatio: string; blurDataURL?: string };
    dark?: { url: string; alt: string; width: number; height: number; aspectRatio: string; blurDataURL?: string } | null;
  };
  html: string;
};

const author = {
  _id: "author-bespoke-ethos",
  _title: "Bespoke Ethos",
  image: { url: "/assets/logo-light.png", alt: "Bespoke Ethos", width: 64, height: 64 },
};

export const localPosts: LocalPost[] = [
  {
    _id: "p-flowstack-guide",
    _slug: "automate-your-1-task-flowstack-guide",
    _title: "Automate Your #1 Task with Flowstack — Keep Control, Save Hours",
    description:
      "How small businesses ship a reliable automation in days without losing approvals or ownership.",
    publishedAt: new Date().toISOString(),
    categories: ["automation", "operations"],
    authors: [author],
    image: {
      light: {
        url: "/assets/hero-illustration.png",
        alt: "Flowstack automation visual",
        width: 1200,
        height: 675,
        aspectRatio: "16/9",
      },
    },
    html:
      `<p>Flowstack™ turns the single most time-consuming task on your plate into a dependable automation — while you stay in control. We map your real process, keep human approvals intact, and ship a production-ready build in days. Every build includes documentation, audit trails, and rollback.</p>
       <ul><li>Discovery-led design — we capture your nuance and edge cases</li><li>Approval checkpoints — you approve what matters</li><li>Monitoring — alerts and retries so outages don’t blindside you</li></ul>
       <p>Pricing is simple: $399 setup + $59.99/month. You own the system.</p>`
  },
  {
    _id: "p-chatbots-roi",
    _slug: "are-chatbots-worth-it-for-small-business",
    _title: "Are Chatbots Worth It for Small Business? Yes — If They’re On‑Brand",
    description:
      "A practical guide to 24/7 support that actually helps — on-brand answers, human handoff, and clear ROI.",
    publishedAt: new Date().toISOString(),
    categories: ["chatbots", "customer-experience"],
    authors: [author],
    image: {
      light: {
        url: "/assets/hero-gradient-grid.svg",
        alt: "Minimal chatbots gradient",
        width: 1200,
        height: 675,
        aspectRatio: "16/9",
      },
    },
    html:
      `<p>Great chatbots resolve the same five questions instantly and escalate the rest to a human. Trained on your FAQs and tone, they reduce response time dramatically and capture more leads while you sleep.</p>
       <ul><li>24/7 answers with clear handoff</li><li>On‑brand tone trained on your content</li><li>Lead capture and analytics</li></ul>
       <p>Start with your top FAQs, measure deflection, and tune weekly.</p>`
  },
  {
    _id: "p-consensus-clarity",
    _slug: "decision-clarity-with-consensus-engine",
    _title: "Decision Clarity with Consensus Engine — Four Perspectives, One Answer",
    description:
      "Stop guessing on decisions that matter. See transparent reasoning, disagreement, and a clear recommendation.",
    publishedAt: new Date().toISOString(),
    categories: ["strategy", "decision-making"],
    authors: [author],
    image: {
      light: {
        url: "/assets/consensus-infographic.png",
        alt: "Consensus Engine converging lines",
        width: 1200,
        height: 675,
        aspectRatio: "16/9",
      },
    },
    html:
      `<p>Consensus Engine gives you four independent AI perspectives that debate a tough question, flag risk, and synthesize one actionable answer. You see the thinking — not a black box.</p>
       <p>Use it for pricing, positioning, or expansion. First answer free; then bundle as you grow.</p>`
  },
  {
    _id: "p-redbridging-rescue",
    _slug: "automation-rescue-with-redbridging",
    _title: "Automation Rescue with Redbridging — Keep Revenue Flowing",
    description:
      "Stabilize brittle workflows, add monitoring and retries, and document everything for handoff.",
    publishedAt: new Date().toISOString(),
    categories: ["reliability", "operations"],
    authors: [author],
    image: {
      light: {
        url: "/assets/solution-pillar-illustration.svg",
        alt: "Redbridging reliability pillars",
        width: 1200,
        height: 675,
        aspectRatio: "16/9",
      },
    },
    html:
      `<p>When a Zap breaks at 2am, revenue stops. Redbridging audits and hardens existing automations, adds monitoring, and documents every dependency so you’re never blind-sided again.</p>
       <ul><li>Audit and harden — fix flakey edges</li><li>Monitoring and retries — know before customers do</li><li>Documentation and ownership — you keep control</li></ul>`
  },
];

export function findLocalPost(slug: string) {
  return localPosts.find((p) => p._slug === slug);
}

