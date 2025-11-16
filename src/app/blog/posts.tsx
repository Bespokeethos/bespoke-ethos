import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTimeMinutes: number;
  hero: {
    src: string;
    alt: string;
  };
  tags: string[];
  content: () => ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cleveland-small-business-ai-automation-guide",
    title: "Cleveland Small Business Guide to AI Automation (Without Losing Control)",
    description:
      "Where Cleveland founders should start with AI automation, what to automate first, and how to stay in control of approvals and data.",
    publishedAt: "2025-11-15",
    readingTimeMinutes: 8,
    hero: {
      src: "/assets/generated/blog-cleveland-ai-automation-desktop.webp",
      alt: "Candid Cleveland small business owner reviewing an automation dashboard at a shop counter",
    },
    tags: ["AI automation", "Cleveland", "small business"],
    content: function PostContent() {
      return (
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <p>
            Cleveland is full of owner-operated businesses that run on grit, reputation, and relationships. Most of them are still running on
            spreadsheets, sticky notes, and late-night inbox cleanups. When people hear “AI automation,” they picture robots taking over—not
            a calmer Tuesday.
          </p>
          <p>
            This guide is for founders who want the calm Tuesday. We&apos;ll cover where to start, what to automate first, and how to stay in
            control while AI handles the busywork.
          </p>

          <h2>Start With One Messy Workflow</h2>
          <p>
            The biggest mistake small businesses make with automation is trying to “redo everything” at once. That&apos;s a rebrand, not a
            workflow fix. Instead, pick one process that is:
          </p>
          <ul>
            <li>Recurring (weekly or daily)</li>
            <li>Repeatable (steps are similar every time)</li>
            <li>Annoying enough that you complain about it at least once a month</li>
          </ul>
          <p>Examples we see all the time in Cleveland:</p>
          <ul>
            <li>Manually copying leads from contact forms into a CRM or spreadsheet</li>
            <li>Chasing down invoices and marking them paid in two or three systems</li>
            <li>Answering the same five pre-sales questions in email, Messenger, and DMs</li>
          </ul>
          <p>
            That first workflow is where a service like{" "}
            <Link href="/solutions/flowstack" className="underline">
              Flowstack™
            </Link>{" "}
            shines: narrow scope, clear inputs/outputs, and very measurable time saved.
          </p>

          <h2>What “Good” AI Automation Looks Like</h2>
          <p>AI can be risky when it&apos;s bolted on without guardrails. For small businesses, good automation is defined by three rules:</p>
          <ol>
            <li>
              <strong>Approvals stay human for anything money- or relationship-critical.</strong> AI proposes; you approve. Tools like{" "}
              <Link href="/solutions/consensus-engine" className="underline">
                Consensus Engine™
              </Link>{" "}
              can support strategic decisions, but they don&apos;t get the final say.
            </li>
            <li>
              <strong>There&apos;s a paper trail.</strong> Every automation should leave logs you can read: what ran, when, and why. That&apos;s
              the core of how Bespoke Ethos builds workflows.
            </li>
            <li>
              <strong>You can roll it back.</strong> If something behaves strangely, you can pause it, revert, and fix it—without taking your
              whole business offline.
            </li>
          </ol>

          <h2>Three Cleveland-Friendly Starting Points</h2>
          <p>If you&apos;re not sure which workflow to pick, here are three “starter automations” we routinely implement:</p>
          <ul>
            <li>
              <strong>Intake + triage for service businesses.</strong> Form submissions flow into Airtable, get tagged by service type, and
              auto-create tasks in your project tool—no more hunting through inbox folders.
            </li>
            <li>
              <strong>Invoice and payment hygiene.</strong> When an invoice is paid, customer records update automatically, follow-up sequences
              kick in, and internal alerts fire only when something looks off.
            </li>
            <li>
              <strong>On-brand FAQ responses.</strong> A{" "}
              <Link href="/products/cadence" className="underline">
                Cadence™
              </Link>{" "}
              style chatbot handles first-touch questions while keeping your voice and values intact.
            </li>
          </ul>

          <h2>How to Keep Risk Low</h2>
          <p>Small businesses can&apos;t afford outages. To keep risk low:</p>
          <ul>
            <li>Run new automations in “shadow mode” first—log actions but don&apos;t perform them.</li>
            <li>Alert humans before AI takes irreversible steps (refunds, cancellations, legal notices).</li>
            <li>Document every connection so you&apos;re never dependent on one contractor who “knows the system.”</li>
          </ul>

          <h2>Next Step for Cleveland Founders</h2>
          <p>
            If you&apos;re in Cleveland (or act like a Cleveland founder even if you&apos;re not), your next move is simple: list one
            workflow you&apos;d love never to think about again. Bring that to a{" "}
            <Link href="/contact?service=llm-setups" className="underline">
              free consultation call
            </Link>{" "}
            and we&apos;ll map out an automation that pays for itself in hours-not buzzwords.
          </p>
        </div>
      );
    },
  },
  {
    slug: "what-to-automate-first-small-business",
    title: "What to Automate First in Your Small Business",
    description:
      "A practical checklist for deciding which workflow to automate first so you save time without breaking what already works.",
    publishedAt: "2025-11-15",
    readingTimeMinutes: 7,
    hero: {
      src: "/assets/generated/blog-what-to-automate-first-desktop.webp",
      alt: "Candid photo of a founder prioritizing tasks on a whiteboard in a small studio",
    },
    tags: ["automation strategy", "small business", "prioritization"],
    content: function PostContent() {
      return (
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <p>
            “What should I automate first?” is the right question to ask. Automate the wrong thing and you burn time, budget, and trust. Automate
            the right thing and you get hours back every week.
          </p>

          <h2>The 80/20 Automation Filter</h2>
          <p>Before you plug anything into Zapier, Make, or custom code, run each candidate workflow through this filter:</p>
          <ul>
            <li>
              <strong>Volume:</strong> Does this happen at least 10 times a month?
            </li>
            <li>
              <strong>Repetition:</strong> Are the steps mostly the same each time?
            </li>
            <li>
              <strong>Risk:</strong> If something goes wrong, can we fix it quickly?
            </li>
            <li>
              <strong>Value:</strong> Does this save founder or senior team time—not just intern time?
            </li>
          </ul>
          <p>The sweet spot for a first build is high volume, high repetition, low-to-medium risk, and high value.</p>

          <h2>Good First-Automation Examples</h2>
          <ul>
            <li>Routing new leads into a CRM, tagging them, and sending a warm, on-brand first reply.</li>
            <li>Syncing paid invoices into your bookkeeping system with clear notes for your accountant.</li>
            <li>Collecting form responses into Airtable and notifying the right teammate in Slack or email.</li>
          </ul>
          <p>
            These are exactly the kinds of workflows{" "}
            <Link href="/solutions/flowstack" className="underline">
              Flowstack™
            </Link>{" "}
            is designed to handle.
          </p>

          <h2>What Not to Automate First</h2>
          <p>Resist the urge to start with:</p>
          <ul>
            <li>Big-bang lead scoring or full-funnel attribution projects.</li>
            <li>Complex pricing logic where a mistake could lose you money or trust.</li>
            <li>Anything that depends on fuzzy, subjective judgment you can&apos;t yet describe in words.</li>
          </ul>

          <h2>Human-in-the-Loop by Default</h2>
          <p>
            In our work with founders, the sweet spot is “AI does the grunt work; humans still make the call.” For early automations, design flows
            so that:
          </p>
          <ul>
            <li>AI drafts responses or updates; humans approve in one click.</li>
            <li>Every automated action is logged with who/what/when.</li>
            <li>Pausing or rolling back is always an option—no black boxes.</li>
          </ul>

          <h2>Your First Automation, in One Page</h2>
          <p>
            Want help deciding? Bring three candidate workflows to a{" "}
            <Link href="/contact?service=llm-setups" className="underline">
              free consultation
            </Link>{" "}
            and we&apos;ll sketch a one-page automation plan: what to automate, which tools to use, and how to know it&apos;s working.
          </p>
        </div>
      );
    },
  },
  {
    slug: "rescue-broken-zapier-make-automations",
    title: "How to Rescue a Broken Zapier or Make Automation (Without Nuking Revenue)",
    description:
      "A founder-friendly troubleshooting checklist for broken Zapier/Make automations—and when it’s time to call in Redbridging™.",
    publishedAt: "2025-11-15",
    readingTimeMinutes: 9,
    hero: {
      src: "/assets/generated/blog-redbridging-zapier-rescue-desktop.webp",
      alt: "Candid photo of an operations lead reviewing error logs with a developer in a small office",
    },
    tags: ["Zapier", "Make", "Redbridging", "incident response"],
    content: function PostContent() {
      return (
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <p>
            Nothing spikes founder stress like discovering a Zap or Make scenario has been failing silently for days. Missed invoices, lost leads,
            angry customers—the stuff that keeps you up at night.
          </p>
          <p>This post walks you through a calm, step-by-step rescue plan.</p>

          <h2>Step 1: Stop the Bleed</h2>
          <p>Before debugging, prevent more damage:</p>
          <ul>
            <li>Pause the offending Zap or scenario instead of deleting it.</li>
            <li>Identify downstream systems that might be impacted (CRM, accounting, email tools).</li>
            <li>Export recent data so you have a snapshot before making changes.</li>
          </ul>

          <h2>Step 2: Reproduce the Failure</h2>
          <p>Run a controlled test:</p>
          <ul>
            <li>Create a test record clearly marked as such.</li>
            <li>Trigger the Zap or scenario manually and watch each step.</li>
            <li>Capture screenshots of any errors or odd behavior.</li>
          </ul>
          <p>
            This is exactly the kind of evidence a rescue service like{" "}
            <Link href="/solutions/redbridging" className="underline">
              Redbridging™
            </Link>{" "}
            relies on to fix things quickly.
          </p>

          <h2>Step 3: Classify the Problem</h2>
          <p>Most automation failures fall into one of four buckets:</p>
          <ul>
            <li>
              <strong>Auth and permissions:</strong> expired tokens, revoked API keys, or changed user permissions.
            </li>
            <li>
              <strong>Schema drift:</strong> fields renamed, deleted, or made required in connected apps.
            </li>
            <li>
              <strong>Volume and rate limits:</strong> hitting external API quotas or timeouts during spikes.
            </li>
            <li>
              <strong>Logic bugs:</strong> assumptions in filters, paths, or code steps that no longer hold.
            </li>
          </ul>

          <h2>Step 4: Fix, Then Harden</h2>
          <p>Once you know the cause, don&apos;t just patch it—harden it:</p>
          <ul>
            <li>Add alerts when a Zap or scenario errors more than a few times in a row.</li>
            <li>Introduce “circuit breakers” that stop automation instead of looping on bad input.</li>
            <li>Log every run into Airtable or your database for easier forensics next time.</li>
          </ul>

          <h2>When to Bring in Redbridging™</h2>
          <p>Call in outside help when:</p>
          <ul>
            <li>The workflow touches revenue, compliance, or customer trust.</li>
            <li>You&apos;ve already spent more than a day chasing the same error.</li>
            <li>No one on your team “owns” the automation stack anymore.</li>
          </ul>
          <p>
            Redbridging™ is designed for exactly these situations: we stabilize, monitor, and document brittle automations so the next outage
            doesn&apos;t blindside you.
          </p>

          <h2>Next Steps</h2>
          <p>
            If you&apos;re staring at a broken Zapier or Make setup right now,{" "}
            <Link href="/contact?service=redbridging-rescue" className="underline">
              send a quick note
            </Link>{" "}
            with a short description, screenshots, and which tools are involved. We&apos;ll let you know whether it&apos;s a quick fix or a
            better fit for a structured Redbridging™ engagement.
          </p>
        </div>
      );
    },
  },
  {
    slug: "on-brand-ai-chatbots-vs-generic",
    title: "On‑Brand AI Chatbots vs Generic Bots: Why Cadence™ Converts Better",
    description:
      "Most chatbots feel robotic because they’re trained on generic data. Here’s how an on‑brand chatbot like Cadence™ can actually build loyalty.",
    publishedAt: "2025-11-15",
    readingTimeMinutes: 8,
    hero: {
      src: "/assets/generated/blog-on-brand-ai-chatbots-desktop.webp",
      alt: "Candid photo of a founder smiling with a laptop open to a chat interface in a cozy shop",
    },
    tags: ["Cadence", "chatbots", "customer experience"],
    content: function PostContent() {
      return (
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <p>
            Most small-business chatbots are copy-paste templates with your logo slapped on top. They answer questions, but they don&apos;t sound
            like you—and your customers can feel that.
          </p>
          <p>
            Cadence™ was built to do the opposite: a chatbot that feels like part of your team. Here&apos;s what makes an on‑brand chatbot
            different, and why it converts better.
          </p>

          <h2>Generic Bots Answer; On‑Brand Bots Relate</h2>
          <p>A generic bot focuses on accuracy. An on‑brand bot focuses on accuracy plus relationship:</p>
          <ul>
            <li>It knows your product stories, not just your SKU list.</li>
            <li>It mirrors your tone—whether that&apos;s warm, nerdy, or no‑nonsense.</li>
            <li>It understands when to escalate to a human and how to hand off gracefully.</li>
          </ul>

          <h2>What Goes Into Training Cadence™</h2>
          <p>When we build Cadence™ for a client, we don&apos;t start with prompts. We start with:</p>
          <ul>
            <li>Recorded conversations with you or your best customer‑facing team member.</li>
            <li>Real emails, DMs, and support tickets that show how you talk when stakes are high.</li>
            <li>Product stories and objections you want handled consistently.</li>
          </ul>
          <p>That training data becomes the foundation for a chatbot that actually sounds like your brand.</p>

          <h2>Measuring “Better” in Real Numbers</h2>
          <p>On‑brand chatbots outperform generic ones on metrics that matter:</p>
          <ul>
            <li>Higher completion rates on key flows (newsletter signups, quiz completions, consultation bookings).</li>
            <li>Better CSAT/feedback scores on conversations that start with the bot.</li>
            <li>Lower escalation volume for simple questions—and better context when humans do step in.</li>
          </ul>

          <h2>Where Cadence™ Fits in Your Stack</h2>
          <p>
            Cadence™ plays nicely with tools you already use. It can collect leads into Airtable, create tickets, and hand off to humans via
            email or your help desk—no custom platform required.
          </p>

          <h2>Is Cadence™ Right for You?</h2>
          <p>Cadence™ is a good fit if:</p>
          <ul>
            <li>Your brand voice is a real asset (founder‑led, story‑driven, values‑heavy).</li>
            <li>You get repeat questions that a well‑trained bot could handle.</li>
            <li>You&apos;re ready to invest in a pilot that proves ROI before you scale.</li>
          </ul>

          <p>
            If that sounds like you,{" "}
            <Link href="/products/cadence" className="underline">
              explore the Cadence™ product page
            </Link>{" "}
            or{" "}
            <Link href="/contact?subject=Cadence%20pilot" className="underline">
              ask about a 30‑day pilot
            </Link>
            .
          </p>
        </div>
      );
    },
  },
];

export function getAllPosts() {
  return BLOG_POSTS.slice().sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
