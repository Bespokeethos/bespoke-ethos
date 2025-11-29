import Image from "next/image";
import Link from "next/link";

type TechNerdCardProps = {
  product: "cadence" | "consensus";
};

export function TechNerdCard({ product }: TechNerdCardProps) {
  const isAiStrategySprint = product === "cadence";

  const href =
    product === "cadence"
      ? "/contact?service=llm-setups&topic=ai-strategy-sprint-technical-brief"
      : "/contact?service=llm-setups&topic=consensus-engine-technical-brief";

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary/70 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/70 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
      <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16">
        <Image
          src="/assets/NERD.png"
          alt="Friendly nerd card illustration inviting you to dive into the technical details"
          fill
          className="object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
          Want the nerdy version?
        </h3>
        <p className="text-xs text-text-secondary dark:text-dark-text-secondary sm:text-sm">
          {isAiStrategySprint
            ? "Curious how Cadence actually works behind the scenes—from API calls to safety rails and handoffs?"
            : "Curious how Consensus Engine turns one big question into a calm, cited brief without being a pile of prompts?"}
        </p>
        <Link href={href} className="text-xs font-semibold text-accent-600 hover:underline sm:text-sm">
          Ask for the {isAiStrategySprint ? "Cadence" : "Consensus Engine"} technical brief
        </Link>
      </div>
      <div className="pt-1 sm:pt-0">
        <Link
          href="mailto:contact@bespokeethos.com?subject=Nerdy%20questions"
          className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-text-primary hover:bg-surface-primary dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-dark-surface-primary sm:text-sm"
        >
          Email contact@bespokeethos.com
        </Link>
      </div>
    </section>
  );
}
