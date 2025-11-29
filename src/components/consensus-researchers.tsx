import Image from "next/image";
import clsx from "clsx";

type ConsensusResearchersProps = {
  className?: string;
};

const RESEARCHERS = [
  {
    id: "clarice",
    name: "Clarice",
    role: "Copy & narrative lens",
    icon: "/assets/icons/clarice.png",
    accentClass: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: "brutus",
    name: "Brutus",
    role: "Finance & numbers lens",
    icon: "/assets/icons/brutus.png",
    accentClass: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    id: "astrid",
    name: "Astrid",
    role: "Legal, tax, & compliance lens",
    icon: "/assets/icons/astrid.png",
    accentClass: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    id: "ember",
    name: "Ember",
    role: "Future modeling & predictive lens",
    icon: "/assets/icons/ember.png",
    accentClass: "bg-rose-50 dark:bg-rose-900/20",
  },
] as const;

export function ConsensusResearchers({ className }: ConsensusResearchersProps) {
  return (
    <section
      aria-labelledby="consensus-researchers-heading"
      className={clsx(
        "rounded-2xl border border-border bg-surface-secondary/70 p-5 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 dark:text-dark-text-secondary md:p-6",
        className,
      )}
    >
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            id="consensus-researchers-heading"
            className="text-base font-semibold text-text-primary dark:text-dark-text-primary"
          >
            Meet the four research lenses inside the Consensus Engine
          </h2>
          <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
            Each run brings these lenses to your question, then synthesizes what they find into one calm, cited brief.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {RESEARCHERS.map((r) => (
          <article
            key={r.id}
            className={clsx(
              "flex flex-col items-center rounded-xl border border-border/70 p-3 text-center dark:border-dark-border/70",
              r.accentClass,
            )}
          >
            <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full bg-white/80 shadow-[0_10px_24px_rgba(15,23,42,0.25)] dark:bg-slate-900/80">
              <Image
                src={r.icon}
                alt={`${r.name} icon — ${r.role}`}
                fill
                className="object-contain"
                sizes="64px"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{r.name}</h3>
            <p className="mt-1 text-[11px] leading-snug text-text-secondary dark:text-dark-text-secondary">
              {r.role}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
