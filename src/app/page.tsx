import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import path from "node:path";
import fs from "node:fs";
import { HeroSlideshow, type Slide } from "./_sections/hero/slideshow";
import { FounderStory } from "./_sections/founder-story";
import { TrustCredentials } from "./_sections/trust-credentials";
import { LGBTQDiscountBanner } from "./_sections/lgbtq-discount-banner";
import { TrustStrip } from "./_components/trust-strip";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePageBackup() {
  const publicDir = path.join(process.cwd(), "public", "assets", "generated");

  // Define slides in correct order: Cadence FIRST, then others
  const webp: Array<{
    file: string;
    alt: string;
    caption: string;
    duration?: number;
    href?: string;
  }> = [
    {
      file: "hero-cadence-desktop.webp",
      alt: "CadenceT - Man in tool room working on chair",
      caption: "CadenceT - Your AI assistant that learns your workflow",
      duration: 9000,
      href: "/products/cadence",
    },
    {
      file: "hero-flowstack-desktop.webp",
      alt: "FlowstackT automation visual with connected tasks",
      caption: "FlowstackT - Automate your #1 task",
      href: "/solutions/flowstack",
    },
    {
      file: "hero-chatbots-desktop.webp",
      alt: "Chatbots answering a question on mobile",
      caption: "Chatbots - On-brand answers 24/7",
      href: "/solutions/chatbots",
    },
    {
      file: "hero-consensus-desktop.webp",
      alt: "Consensus Engine converging lines",
      caption: "Consensus - Four perspectives, one answer",
      href: "/solutions/consensus-engine",
    },
    {
      file: "hero-redbridging-desktop.webp",
      alt: "Redbridging reliability bridge with shield",
      caption: "Redbridging - Rescue brittle automations",
      href: "/solutions/redbridging",
    },
    {
      file: "love-founders-mug.avif",
      alt: "Ceramic mug printed with the phrase 'We Founders Heart' on a founder's desk",
      caption: "We founders — for people who are in it with you.",
      href: "/about",
    },
  ];

  const png: Array<{
    file: string;
    alt: string;
    caption: string;
    duration?: number;
    href?: string;
  }> = [
    {
      file: "cadence-hero.png",
      alt: "CadenceT - Man in tool room working on chair",
      caption: "CadenceT - Your AI assistant that learns your workflow",
      duration: 9000,
      href: "/products/cadence",
    },
    {
      file: "flowstack-hero.png",
      alt: "FlowstackT automation visual with connected tasks",
      caption: "FlowstackT - Automate your #1 task",
      href: "/solutions/flowstack",
    },
    {
      file: "chatbots-hero.png",
      alt: "Chatbots answering a question on mobile",
      caption: "Chatbots - On-brand answers 24/7",
      href: "/solutions/chatbots",
    },
    {
      file: "chatbot-hero.png",
      alt: "Chatbots answering a question on mobile",
      caption: "Chatbots - On-brand answers 24/7",
      href: "/solutions/chatbots",
    },
    {
      file: "consensus-hero.png",
      alt: "Consensus Engine converging lines",
      caption: "Consensus - Four perspectives, one answer",
      href: "/solutions/consensus-engine",
    },
    {
      file: "redbridging-hero.png",
      alt: "Redbridging reliability bridge with shield",
      caption: "Redbridging - Rescue brittle automations",
      href: "/solutions/redbridging",
    },
    {
      file: "research_hero.png",
      alt: "Founder reviewing insights on a clean AI dashboard",
      caption: "Research - Decisions backed by learning and context",
      href: "/solutions",
    },
    {
      file: "research-hero.png",
      alt: "Founder reviewing insights on a clean AI dashboard",
      caption: "Research - Decisions backed by learning and context",
      href: "/solutions",
    },
  ];

  const webpSlides = webp
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({
      src: `/assets/generated/${c.file}`,
      alt: c.alt,
      caption: c.caption,
      duration: c.duration,
      href: c.href,
    }));
  const pngSlides = png
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({
      src: `/assets/generated/${c.file}`,
      alt: c.alt,
      caption: c.caption,
      duration: c.duration,
      href: c.href,
    }));
  const slides: Slide[] = (webpSlides.length ? webpSlides : pngSlides) as Slide[];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="be-hero-aurora absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-6 pb-14 pt-8 sm:pt-12 md:grid-cols-2 md:gap-10 md:pt-24 lg:pt-32">
          <div className="order-2 text-pretty md:order-1">
            <span className="motion-safe:animate-fadeIn text-sm font-semibold uppercase tracking-[0.3em] text-accent-500">
              Automation handcrafted for your business
            </span>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-text-primary motion-safe:animate-enterFromLeft dark:text-dark-text-primary sm:text-5xl">
              We take the busywork. You keep control.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text-tertiary dark:text-dark-text-tertiary">
              Auditable AI workflows, on-brand chatbots, and decision clarity-built for small business. Keep human approvals, regain your time, and stay in charge. Web
              Star Ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-fadeIn">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-accent-600 px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
              >
                Automate My #1 Task
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold text-text-primary hover:bg-black/5 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-white/5"
              >
                See Products
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-3 py-3 text-sm font-semibold text-text-tertiary hover:text-text-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary"
              >
                Free Assessment
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/assets/nglcc-badge-dark.svg"
                alt="NGLCC Certified dark version"
                width={120}
                height={40}
                className="block h-6 w-auto dark:hidden"
              />
              <Image
                src="/assets/nglcc-badge-light.svg"
                alt="NGLCC Certified light version"
                width={120}
                height={40}
                className="hidden h-6 w-auto dark:block"
              />
              <Image
                src="/assets/catalant-badge-dark.svg"
                alt="Catalant Vetted dark version"
                width={120}
                height={40}
                className="block h-6 w-auto dark:hidden"
              />
              <Image
                src="/assets/catalant-badge-light.svg"
                alt="Catalant Vetted light version"
                width={120}
                height={40}
                className="hidden h-6 w-auto dark:block"
              />
            </div>
            <p className="mt-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">
              Consensus EngineT and RedbridgingT are trademark pending.
            </p>
          </div>
          <div className="order-1 motion-safe:animate-enterFromRight md:order-2">
            <HeroSlideshow slides={slides.length ? slides : undefined} />
          </div>
        </div>
      </section>
      <FounderStory />
      <TrustCredentials />
      <LGBTQDiscountBanner />
    </main>
  );
}

