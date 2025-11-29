export function FounderAiStrategySprintQA() {
  const items: { q: string; a: string }[] = [
    {
      q: "Why did you build AI Strategy Sprint?",
      a: "Because I hate bad chatbots as much as you do. I've run small businesses long enough to know what it feels like when a \"helpful\" widget makes customers more frustrated, not less. AI Strategy Sprint came out of a simple question: what if a chatbot could sound like your best day on the floor with a regular instead of a script someone copied out of a support playbook?",
    },
    {
      q: "What makes AI Strategy Sprint worth $900+ and a monthly fee?",
      a: "You're not buying a plugin-you're buying a teammate that pays rent. We sit in your world, study your products and stories, and train AI Strategy Sprint to handle the questions you answer 50 times a week and tell the stories that actually close the sale. The conditional patent we've been granted on the orchestration behind AI Strategy Sprint isn't a flex for lawyers; it's proof there's real process and IP behind how we keep answers on-brand, safe, and measurable. I know that makes AI Strategy Sprint feel expensive-and I also know it's underpriced for the kind of lifetime value it can unlock when it's tuned properly.",
    },
    {
      q: "Is AI Strategy Sprint just ChatGPT with a skin on it?",
      a: "No. Under the hood we absolutely use modern AI models-but AI Strategy Sprint is about everything wrapped around them: how we feed in your stories, how we set guardrails and approvals, how we monitor what it says, and how we decide when a human should step in. Think of the model as the engine; AI Strategy Sprint is the whole car, safety features included.",
    },
    {
      q: "Who is AI Strategy Sprint actually for?",
      a: "AI Strategy Sprint is for founders who care about voice and relationship: owner-led brands, story-heavy products, and teams who want fewer repetitive questions without sending visitors into a dead-end loop. If you just want a cheap FAQ bot to make your site look \"AI-enabled,\" you don't need me and you don't need AI Strategy Sprint.",
    },
    {
      q: "How do I know it won’t embarrass my brand?",
      a: "We start small and we measure. You’ll see transcripts, escalation rules, and what AI Strategy Sprint is and isn’t allowed to promise before anything goes live. During the pilot we tune it together and keep you in the approval loop. If something ever feels off, we change it. You stay in control—that’s the whole point.",
    },
    {
      q: "AI Strategy Sprint is out of our budget, but we desperately need something—what do we do?",
      a: "First, if you're an LGBTQ-owned business, tell me. We keep a standing 25% discount on upfront project fees because I know firsthand how hard it is to build something from scratch. Even if you're not, I believe in the power of these tools enough that I'll look for ways to bring the cost closer to your reality—whether that's a smaller starter scope, phasing the work, or pointing you to our more budget-friendly chatbot option. Our standard Chatbots offering uses the same care around voice and handoffs at a lower monthly price. The goal is not to sell you the most expensive thing; it's to get you a chatbot you're proud to put in front of your customers. I also keep one open grant slot each year for a full AI Strategy Sprint build—need-based, not a marketing stunt. If you think you're a fit, just email me and tell me what you need my tech for. No tricky forms, no gotcha fine print.",
    },
  ];

  return (
    <section
      aria-labelledby="founder-ai-strategy-sprint-qa-heading"
      className="mt-10 space-y-4 rounded-2xl border border-border bg-surface-secondary/70 p-5 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 dark:text-dark-text-secondary"
    >
      <div className="space-y-1">
        <h2
          id="founder-ai-strategy-sprint-qa-heading"
          className="text-base font-semibold text-text-primary dark:text-dark-text-primary"
        >
          A few questions I’d ask about a $900 chatbot
        </h2>
        <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
          Answered by Upton, founder of Bespoke Ethos.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.q}
            className="rounded-xl border border-border/70 bg-surface-primary/60 p-3 dark:border-dark-border/70 dark:bg-dark-surface-primary/60"
          >
            <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{item.q}</h3>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
