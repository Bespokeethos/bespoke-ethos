import Image from "next/image";
import { Section } from "@/common/layout";

export function FounderStory() {
  return (
    <Section className="bg-surface-secondary dark:bg-dark-surface-secondary">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div className="relative aspect-square w-full max-w-[220px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/founder-upton-rand.jpg"
                alt="Upton Rand, Founder of Bespoke Ethos"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <p className="text-accent-500 text-sm font-semibold uppercase tracking-[0.3em]">
                Meet the Founder
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
                My First Business Almost Broke Me. AI Saved It.
              </h2>
            </div>

            <div className="space-y-4 text-text-secondary dark:text-dark-text-secondary leading-relaxed">
              <p>
                Six months into my first business—a publishing house I built from scratch—I was drowning. I was a creator and a storyteller, not a logistics expert or a CRM guru. Every minute felt like an hour.
              </p>
              <p>
                That&rsquo;s when I turned to my five years of experience in AI. I taught an AI to be my second brain, automating the overwhelming tasks that were holding me back. It saved my business.
              </p>
              <p>
                I founded <strong className="text-text-primary dark:text-dark-text-primary">Bespoke Ethos</strong> for one reason: to bring that same relief to fellow entrepreneurs and creators. The power of AI shouldn&rsquo;t be reserved for Fortune 500 companies. It belongs in the hands of small businesses, solo founders, and the teams who actually talk to customers every day.
              </p>
              <p className="text-text-primary dark:text-dark-text-primary font-medium">
                I&rsquo;m not just a consultant; I&rsquo;m a guide who has walked this path and can show you the way through, one pragmatic workflow at a time.
              </p>
              <p className="text-sm italic">
                — Upton Rand, Founder & CEO
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
