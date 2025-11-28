"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export type Slide = {
  src: string;
  alt: string;
  caption: string;
  duration?: number; // Optional per-slide duration in milliseconds
  href?: string; // Optional link for clickable slides
};

const defaultSlides: Slide[] = [
  {
    src: "/assets/generated/hero-cadence-desktop.webp",
    alt: "Cadence™ - Man in tool room working on chair",
    caption: "Cadence — Your AI assistant that learns your workflow",
    duration: 9000,
  },
  {
    src: "/assets/hero-illustration.png",
    alt: "Flowstack™ automation visual with connected tasks",
    caption: "Flowstack™ — Automate your #1 task",
  },
  {
    src: "/assets/consensus-infographic.png",
    alt: "Consensus Engine™ graphic of converging lines",
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
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Track current slide index
  React.useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on("select", onSelect);
    onSelect();
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-advance with per-slide timing
  React.useEffect(() => {
    if (!emblaApi || prefersReduced || paused) return;
    
    const currentSlide = slides[currentIndex];
    const duration = currentSlide?.duration || 6000; // Default 6 seconds
    
    const id = setTimeout(() => {
      emblaApi.scrollNext();
    }, duration);
    
    return () => clearTimeout(id);
  }, [emblaApi, paused, prefersReduced, currentIndex, slides]);

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
            <figure className="relative overflow-hidden rounded-xl border border-border bg-surface-secondary/50 dark:border-dark-border dark:bg-dark-surface-secondary/50 group">
              {s.href && (
                <a href={s.href} className="absolute inset-0 z-10 cursor-pointer" aria-label={`Learn more about ${s.caption}`} />
              )}
              <div className="relative h-[260px] w-full sm:h-[320px]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 45vw"
                  priority={i === 0}
                />
                {/* Enhanced gradient overlay for better text legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 dark:from-black/70" />
              </div>
              {/* Enhanced caption with better contrast */}
              <figcaption className="absolute bottom-3 left-3 rounded-lg bg-black/80 px-4 py-2.5 text-sm font-semibold text-white shadow-2xl backdrop-blur-md border border-white/10">
                {s.caption}
              </figcaption>
              {/* Enhanced badge with better contrast */}
              <div className="absolute right-3 top-3 rounded-lg bg-black/80 px-3 py-2 text-xs font-medium text-white shadow-2xl backdrop-blur-md border border-white/10">
                Enterprise-grade | Affordable | Small-business fit
              </div>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
