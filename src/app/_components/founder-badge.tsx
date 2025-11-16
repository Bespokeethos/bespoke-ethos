import Image from "next/image";

export function FounderBadge() {
  return (
    <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-surface-secondary/80 p-4 shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80 sm:p-5">
      <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border/60 bg-surface-primary dark:border-dark-border/60">
        <Image
          src="/founder-upton-rand.jpg"
          alt="Upton Rand, Founder of Bespoke Ethos"
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
          Upton Rand
        </p>
        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
          Founder &amp; CEO · Bespoke Ethos · Cleveland, OH
        </p>
      </div>
    </div>
  );
}

