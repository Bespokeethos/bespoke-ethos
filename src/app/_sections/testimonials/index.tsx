import Image from "next/image";
import { Section } from "@/common/layout";

type MiniTestimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  imageSrc: string;
};

const HOMEPAGE_TESTIMONIALS: MiniTestimonial[] = [
  {
    name: "Alex Rand",
    role: "Brewer",
    company: "Ore Dock Brewing Company",
    quote: "“Molly explains stats using my brewery floor. It's not generic—it’s mine.”",
    imageSrc: "/assets/generated/founder2.avif",
  },
  {
    name: "Monique Ellis",
    role: "Co‑Founder",
    company: "Lake Effect Co‑op",
    quote: "“We finally agreed on our brand voice without another six‑week debate.”",
    imageSrc: "/assets/generated/founder3.avif",
  },
  {
    name: "Derrick Patel",
    role: "Founder",
    company: "LedgerLight Accounting",
    quote: "“Revenue stopped bleeding—and now we get alerts before clients feel pain.”",
    imageSrc: "/founder-upton-rand.jpg",
  },
];

export function HomepageTestimonialsStrip() {
  return (
    <Section id="testimonials" className="bg-surface-secondary/40 dark:bg-dark-surface-secondary/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
        <div className="flex flex-col gap-2 text-left md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-500">
              What founders say
            </p>
            <h2 className="mt-2 text-balance text-2xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary md:text-3xl">
              Real small businesses, real time back.
            </h2>
          </div>
          <p className="max-w-md text-sm text-text-secondary dark:text-dark-text-secondary">
            A few of the teams who used Bespoke Ethos to rescue brittle workflows and ship AI that actually fits their business.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {HOMEPAGE_TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-3 rounded-xl border border-border bg-surface-primary/90 p-4 shadow-sm dark:border-dark-border dark:bg-dark-surface-primary/90"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-surface-secondary dark:bg-dark-surface-secondary">
                  <Image
                    src={t.imageSrc}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-text-primary dark:text-dark-text-primary">{t.name}</div>
                  <div className="text-text-tertiary dark:text-dark-text-tertiary">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
              <blockquote className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {t.quote}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
