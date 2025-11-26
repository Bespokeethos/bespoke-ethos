import Image from "next/image";
import { Section } from "@/common/layout";

export function AlexMollyStory() {
  return (
    <Section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-50/30 to-transparent dark:from-accent-950/20 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left: Image with Spotlight Effect */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Glow backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-400/20 to-accent-600/10 rounded-2xl blur-2xl" />
              
              {/* Main image container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border border-accent-200/50 dark:border-accent-800/50">
                <Image
                  src="/assets/Real-CustomersAlex-Ordedock-Coffee-Marquette-Mi.jpg"
                  alt="Alex Ordedock with Molly tutor interface on his laptop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                {/* Overlay accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Right: Story with Founders Mug Integration */}
          <div className="mt-12 lg:col-span-6 lg:mt-0 space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
                ✦ Real Student. Real Results.
              </h2>
              <h3 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-text-primary dark:text-dark-text-primary">
                Alex's B+ Changed Everything.
              </h3>
            </div>

            <div className="space-y-4 text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
              <p>
                Alex from Orock Brewery in Michigan has dyslexia. After years away from school, he decided to return and reach out to us for help with statistics. We built <span className="font-semibold text-text-primary dark:text-dark-text-primary">Molly</span>—a custom AI tutor that adapts to his pace and humor.
              </p>
              <p>
                Weeks later, Alex walked into finals carrying a <span className="font-bold text-accent-600 dark:text-accent-400">B+</span>. For someone who grew up with dyslexia, that's not just a grade—it's proof that the right tools unlock potential.
              </p>
            </div>

            {/* Founders Mug Badge */}
            <div className="pt-4 border-t border-accent-200/50 dark:border-accent-800/50">
              <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                Why we do this:
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 relative">
                  <Image
                    src="/assets/we-founders-mug.png"
                    alt="We Founders mug with heart icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-base italic text-text-primary dark:text-dark-text-primary font-medium">
                  "Nothing sells small businesses like human proof. Alex is ours."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
