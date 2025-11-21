"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export type Slide = {
  src: string;
  alt: string;
  caption: string;
};

const defaultSlides: Slide[] = [
  {
    src: "/assets/hero-illustration.png",
    alt: "Flowstack automation visual with connected tasks",
    caption: "Flowstack — Automate your #1 task",
  },
  {
    src: "/assets/consensus-infographic.png",
    alt: "Consensus Engine graphic of converging lines",
    caption: "Consensus — Four perspectives, one answer",
  },
  {
    src: "/assets/hero-gradient-grid.svg",
    alt: "Chatbots gradient grid backdrop",
    caption: "Chatbots — On-brand answers 24/7",
  },
  {
    src: "/assets/solution-pillar-illustration.svg",
    alt: "Redbridging pillars illustration",
    caption: "Redbridging — Rescue brittle automations",
  },
];

export function HeroSlideshow({ slides = defaultSlides }: { slides?: Slide[] }) {
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 18 });
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!emblaApi || prefersReduced) return;
    const id = setInterval(() => {
      if (!paused) emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(id);
  }, [emblaApi, paused, prefersReduced]);

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={emblaRef}
      aria-label="Product highlights carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex">
        {slides.map((s, i) => (
          <div className="min-w-0 flex-[0_0_100%] p-2" key={i}>
            <figure className="relative overflow-hidden rounded-xl border border-border bg-surface-secondary/50 dark:border-dark-border dark:bg-dark-surface-secondary/50">
              <div className="relative h-[260px] w-full sm:h-[320px]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 45vw"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 dark:from-black/40" />
              </div>
              <figcaption className="absolute bottom-2 left-2 rounded-md bg-black/40 px-2 py-1 text-xs text-white backdrop-blur-sm dark:bg-white/10">
                {s.caption}
              </figcaption>
              <div className="absolute right-2 top-2 rounded-md bg-black/40 px-2 py-1 text-[10px] text-white backdrop-blur-sm dark:bg-white/10">
                Enterprise-grade • Affordable • Small-business fit
              </div>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
