import Link from "next/link";
import clsx from "clsx";
import { VogueCard } from "./vogue-card";

type StackCard = {
  key: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

const STACKED_CARDS: StackCard[] = [
  {
    key: "cadence",
    title: "Meet Cadence  Your AI Concierge",
    tagline: "On-brand AI front door",
    description:
      "Customer-facing AI concierge that answers common questions, routes work, and hands off to you when it matters.",
    href: "/products/cadence",
    imageSrc: "/assets/generated/hero-chatbots-desktop.webp",
    imageAlt: "AI Strategy Sprint hero image",
  },
  {
    key: "flowstack",
    title: "Workflow Automation Setup",
    tagline: "Process mapped, approvals kept",
    description:
      "Map your process, keep approvals intact, build production-ready automation in days, not months.",
    href: "/solutions/flowstack",
    imageSrc: "/assets/generated/hero-flowstack-desktop.webp",
    imageAlt: "Workflow automation setup hero image",
  },
  {
    key: "consensus",
    title: "Consensus Engine  Your AI Strategy Sprint",
    tagline: "Clarity with receipts",
    description:
      "Multi-lens research sprint that synthesizes sources, surfaces options, and delivers a cited brief for confident decisions.",
    href: "/solutions/consensus-engine",
    imageSrc: "/assets/generated/hero-consensus-desktop.webp",
    imageAlt: "AI research assistant hero image",
  },
  {
    key: "redbridging",
    title: "Automation Rescue",
    tagline: "Fix, fortify, monitor",
    description:
      "Broken workflow? Duct-taped integrations? We fix what's failing and build it rightfast.",
    href: "/solutions/redbridging",
    imageSrc: "/assets/generated/hero-redbridging-desktop.webp",
    imageAlt: "Automation rescue hero image",
  },
] as const;

const LAYER_CLASSES = [
  // top card
  "z-40 rotate-[-1deg] -translate-y-1",
  // second card
  "z-30 rotate-1 translate-y-4",
  // third card
  "z-20 rotate-[-2deg] translate-y-8",
  // bottom card
  "z-10 rotate-2 translate-y-12",
] as const;

export function StackedProductCards() {
  return (
    <div
      className="relative mx-auto mt-6 flex max-w-5xl items-center justify-center"
      aria-label="Stacked view of flagship small-business solutions"
    >
      <div className="relative h-[520px] w-full max-w-2xl sm:h-[560px]">
        {STACKED_CARDS.map((card, index) => {
          const layerClass = LAYER_CLASSES[index] ?? LAYER_CLASSES[LAYER_CLASSES.length - 1];

          return (
            <Link
              key={card.key}
              href={card.href}
              className={clsx(
                "group absolute inset-x-0 mx-auto max-w-md transition-transform duration-500 ease-out",
                layerClass,
              )}
            >
              <VogueCard
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                title={card.title}
                tagline={card.tagline}
                description={card.description}
                className="pointer-events-none group-hover:-translate-y-3 group-hover:rotate-0"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
