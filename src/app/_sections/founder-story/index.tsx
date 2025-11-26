import Image from "next/image";

export function FounderStory() {
  return (
    <section className="bg-surface-secondary dark:bg-dark-surface-secondary py-10 md:py-12">
      <div className="mx-auto max-w-4xl px-6 founder-story-wrap">
        <div className="founder-story-portrait relative overflow-hidden rounded-2xl shadow-2xl be-image-frame">
          <Image
            src="/founder-upton-rand.jpg"
            alt="Upton Rand, Founder of Bespoke Ethos"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-tertiary dark:text-dark-text-tertiary">
              Meet the Founder
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
              My First Business Almost Broke Me. AI Saved It.
            </h2>
          </div>

          <div className="founder-story-copy space-y-4 text-text-secondary dark:text-dark-text-secondary leading-relaxed text-sm md:text-base">
            <p>
              Six months into my first business—a publishing house I built from scratch—I was drowning. I was a creator and a storyteller, not
              a logistics expert or a CRM guru. Every minute felt like an hour.
            </p>
            <p>
              That’s when I turned to my five years of experience in AI. I taught an AI to be my second brain, automating the overwhelming tasks
              that were holding me back. It saved my business.
            </p>
            <p>
              I founded <strong className="text-text-primary dark:text-dark-text-primary">Bespoke Ethos</strong> for one reason: to bring that same relief
              to fellow entrepreneurs and creators. The power of AI shouldn’t be reserved for Fortune 500 companies. It belongs in the hands
              of small businesses, solo founders, and the teams who actually talk to customers every day.
            </p>
            <p className="text-text-primary dark:text-dark-text-primary font-medium">
              I’m not just a consultant; I’m a guide who has walked this path and can show you the way through, one pragmatic workflow at a
              time.
            </p>
            <p className="text-xs md:text-sm italic text-text-tertiary dark:text-dark-text-tertiary">
              – Upton Rand, Founder &amp; CEO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
