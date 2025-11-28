"use client";

import Image from "next/image";
import { Section } from "@/common/layout";
import { useState } from "react";

export function AlexMollyStory() {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  return (
    <>
      <Section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-50/30 to-transparent dark:from-accent-950/20 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left: Image with Spotlight Effect - CLICKABLE TO ENLARGE */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* Glow backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-br from-accent-400/20 to-accent-600/10 rounded-2xl blur-2xl" />
                
                {/* Main image container - CLICKABLE */}
                <button
                  onClick={() => setIsImageEnlarged(true)}
                  className="relative aspect-[3/4] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border border-accent-200/50 dark:border-accent-800/50 cursor-zoom-in hover:shadow-3xl transition-shadow duration-300 group"
                  aria-label="Click to enlarge Alex's photo with Molly on screen"
                >
                  <Image
                    src="/assets/Real-Customers/Alex-with-Molly.jpg"
                    alt="Alex with laptop showing Molly AI tutor interface"
                    fill
                    className="object-cover object-[50%_32%] sm:object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  
                  {/* Overlay accent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Zoom hint */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to enlarge
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Story with Founders Mug Integration */}
            <div className="mt-12 lg:col-span-6 lg:mt-0 space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
                  ✦ Real Student. Real Results.
                </h2>
                <h3 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-text-primary dark:text-dark-text-primary font-hero-accent">
                  Alex&rsquo;s B+ Changed Everything.
                </h3>
              </div>

              <div className="space-y-4 text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                <p>
                  Alex from Orock Brewery in Michigan has dyslexia. After years away from school, he decided to return and reach out to us for help with statistics. We built <span className="font-semibold text-text-primary dark:text-dark-text-primary">Molly</span>—a custom AI tutor that adapts to his pace and humor.
                </p>
                <p>
                  Weeks later, Alex walked into finals carrying a <span className="font-bold text-accent-600 dark:text-accent-400">B+</span>. For someone who grew up with dyslexia, that&rsquo;s not just a grade—it&rsquo;s proof that the right tools unlock potential.
                </p>
              </div>

              {/* Founders Mug Badge - ENHANCED VISIBILITY */}
              <div className="pt-6 mt-6 border-t-2 border-accent-300/70 dark:border-accent-700/70">
                <p className="text-base font-bold text-text-primary dark:text-dark-text-primary mb-4 tracking-wide">
                  Why we do this:
                </p>
                <div className="flex items-start gap-5 bg-gradient-to-br from-accent-50/80 to-accent-100/40 dark:from-accent-950/40 dark:to-accent-900/20 p-5 rounded-xl border border-accent-200/60 dark:border-accent-800/60 shadow-md">
                  <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative">
                    <Image
                      src="/assets/we-heart-founders-mug.avif"
                      alt="We love founders mug with heart icon"
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                  <p className="text-lg text-text-primary dark:text-dark-text-primary font-semibold leading-relaxed pt-2">
                    We get where founders are coming from because we&apos;ve been there. Human proof matters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Enlarged Image Modal */}
      {isImageEnlarged && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          onClick={() => setIsImageEnlarged(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged view of Alex with Molly"
        >
          <div className="relative w-full max-w-6xl max-h-[90vh]">
            <Image
              src="/assets/Real-Customers/Alex-with-Molly.jpg"
              alt="Alex with laptop showing Molly AI tutor interface - enlarged view"
              width={1600}
              height={1200}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
            <button
              onClick={() => setIsImageEnlarged(false)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl shadow-lg transition-colors"
              aria-label="Close enlarged image"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
