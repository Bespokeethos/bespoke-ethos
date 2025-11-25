export function FounderConsensusQA() {
  const items: { q: string; a: string }[] = [
    {
      q: "Why did you build Consensus Engine?",
      a: "Because some questions deserve more than a hunch and a single AI answer. I kept running into decisions in my own work where \"it depends\" wasn't good enough-pricing changes, product kills, market pivots. I didn't want another chatbot; I wanted something that could surround a question from multiple angles, argue with itself a bit, and then hand me a calm, cited brief I could actually act on."
    },
    {
      q: "Isn't this just \"more AI\" or a fancier chatbot?",
      a: "No. A chatbot is built to talk to your customers in real time. Consensus Engine is built to talk to your hardest questions. Under the hood we still use modern models, but the value is in how we frame the question, where we pull evidence from, how we let perspectives disagree, and how we package the output. It's closer to a tiny research desk than anything you'd embed on a website."
    },
    {
      q: "Who is Consensus Engine actually for?",
      a: "Founders and operators who feel the weight of big decisions and don't have a research team on payroll. If you've ever thought, \"I wish I had two or three very smart, very honest colleagues to talk this through with,\" you're the person I built this for. It's not for trivial \"what should I post today?\" questions-it's for the calls you lose sleep over."
    },
    {
      q: "How does this compare to something like a Bloomberg terminal?",
      a: "A Bloomberg terminal gives you towering vantage points on markets and instruments if you know how to drive it. Consensus Engine borrows that spirit-a focus on vantage points and receipts-but points it at your specific question instead of a generic feed. You bring the context of your business; the engine brings structured options, tradeoffs, and cited evidence so you're not guessing in the dark."
    },
    {
      q: "How do I know I can trust the output?",
      a: "First, you get citations and reasoning, not a mysterious verdict. You'll see where ideas came from, what each perspective leaned on, and where they disagreed. Second, we start small. Most clients come in with one big question, review the brief together, and decide whether the way we think fits how they want to run the business. You still make the call-Consensus Engine just makes it a lot harder for blind spots to hide."
    },
    {
      q: "Is there any grant access if I truly can't afford this?",
      a: "Yes. I keep one standing grant each year for up to four Consensus Engine research queries. It's reserved for founders and organizations who genuinely need this level of clarity but can't reasonably fit it into the budget right now. There's no fancy application-just email me, tell me what you need my tech for, and if I think we're a fit, we'll make it happen. I know this level of research doesn't come cheap-and I also know it's underpriced for what it can do when you point it at the right questions."
    }
  ];

  return (
    <section
      aria-labelledby="founder-consensus-qa-heading"
      className="mt-10 space-y-4 rounded-2xl border border-border bg-surface-secondary/70 p-5 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 dark:text-dark-text-secondary"
    >
      <div className="space-y-1">
        <h2
          id="founder-consensus-qa-heading"
          className="text-base font-semibold text-text-primary dark:text-dark-text-primary"
        >
          A few questions I’d ask before trusting an AI with big decisions
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

