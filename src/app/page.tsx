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
  const webp: Array<{ file: string; alt: string; caption: string; duration?: number; href?: string }> = [
    { file: "hero-cadence-desktop.webp", alt: "Cadence™ - Man in tool room working on chair", caption: "Cadence™ - Your AI assistant that learns your workflow", duration: 9000, href: "/products/cadence" },
    { file: "hero-flowstack-desktop.webp", alt: "Flowstack™ automation visual with connected tasks", caption: "Flowstack™ - Automate your #1 task", href: "/solutions/flowstack" },
    { file: "hero-chatbots-desktop.webp", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7", href: "/solutions/chatbots" },
    { file: "hero-consensus-desktop.webp", alt: "Consensus Engine converging lines", caption: "Consensus - Four perspectives, one answer", href: "/solutions/consensus-engine" },
    { file: "hero-redbridging-desktop.webp", alt: "Redbridging reliability bridge with shield", caption: "Redbridging - Rescue brittle automations", href: "/solutions/redbridging" },
  ];
  
  const png: Array<{ file: string; alt: string; caption: string; duration?: number; href?: string }> = [
    { file: "cadence-hero.png", alt: "Cadence™ - Man in tool room working on chair", caption: "Cadence™ - Your AI assistant that learns your workflow", duration: 9000, href: "/products/cadence" },
    { file: "flowstack-hero.png", alt: "Flowstack™ automation visual with connected tasks", caption: "Flowstack™ - Automate your #1 task", href: "/solutions/flowstack" },
    { file: "chatbots-hero.png", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7", href: "/solutions/chatbots" },
    { file: "chatbot-hero.png", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7", href: "/solutions/chatbots" },
    { file: "consensus-hero.png", alt: "Consensus Engine converging lines", caption: "Consensus - Four perspectives, one answer", href: "/solutions/consensus-engine" },
    { file: "redbridging-hero.png", alt: "Redbridging reliability bridge with shield", caption: "Redbridging - Rescue brittle automations", href: "/solutions/redbridging" },
    { file: "research_hero.png", alt: "Founder reviewing insights on a clean AI dashboard", caption: "Research - Decisions backed by learning and context", href: "/solutions" },
    { file: "research-hero.png", alt: "Founder reviewing insights on a clean AI dashboard", caption: "Research - Decisions backed by learning and context", href: "/solutions" },
  ];
  
  const webpSlides = webp
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({ src: `/assets/generated/${c.file}`, alt: c.alt, caption: c.caption, duration: c.duration, href: c.href }));
  const pngSlides = png
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({ src: `/assets/generated/${c.file}`, alt: c.alt, caption: c.caption, duration: c.duration, href: c.href }));
  const slides: Slide[] = (webpSlides.length ? webpSlides : pngSlides) as Slide[];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="be-hero-aurora absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-6 pb-14 pt-8 sm:pt-12 md:gap-10 md:grid-cols-2 md:pt-24 lg:pt-32">
          <div className="order-2 md:order-1 text-pretty">
            <span className="text-accent-500 text-sm font-semibold uppercase tracking-[0.3em] motion-safe:animate-fadeIn">Automation handcrafted for your business</span>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-5xl motion-safe:animate-enterFromLeft">
              We take the busywork. You keep control.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text-tertiary dark:text-dark-text-tertiary">
              Auditable AI workflows, on-brand chatbots, and decision clarity—built for small business. Keep human approvals, regain your time, and stay in charge. Web Star Ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-fadeIn">
              <Link href="/contact" className="bg-accent-600 hover:brightness-110 inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-white">Automate My #1 Task</Link>
              <Link href="/solutions" className="border-border text-text-primary hover:bg-black/5 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-white/5 inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold">See Products</Link>
              <Link href="/book" className="text-text-tertiary hover:text-text-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary inline-flex items-center justify-center px-3 py-3 text-sm font-semibold">Free Assessment</Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/assets/nglcc-badge-dark.svg"
                alt="NGLCC Certified dark version"
                width={120}
                height={40}
                className="h-6 w-auto block dark:hidden"
              />
              <Image
                src="/assets/nglcc-badge-light.svg"
                alt="NGLCC Certified light version"
                width={120}
                height={40}
                className="h-6 w-auto hidden dark:block"
              />
              <Image
                src="/assets/catalant-badge-dark.svg"
                alt="Catalant Vetted dark version"
                width={120}
                height={40}
                className="h-6 w-auto block dark:hidden"
              />
              <Image
                src="/assets/catalant-badge-light.svg"
                alt="Catalant Vetted light version"
                width={120}
                height={40}
                className="h-6 w-auto hidden dark:block"
              />
            </div>
            <p className="mt-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">Consensus Engine™ and Redbridging™ are trademark pending.</p>

          </div>
          <div className="order-1 md:order-2 motion-safe:animate-enterFromRight">
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
