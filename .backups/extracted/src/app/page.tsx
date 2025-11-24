import Link from "next/link";
import type { Metadata } from "next";
import path from "node:path";
import fs from "node:fs";
import { HeroSlideshow, type Slide } from "./_sections/hero/slideshow";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePageBackup() {
  const publicDir = path.join(process.cwd(), "public", "assets", "generated");
  const webp: Array<{ file: string; alt: string; caption: string }> = [
    { file: "hero-flowstack-desktop.webp", alt: "Flowstack automation visual with connected tasks", caption: "Flowstack - Automate your #1 task" },
    { file: "hero-chatbots-desktop.webp", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "hero-consensus-desktop.webp", alt: "Consensus Engine converging lines", caption: "Consensus - Four perspectives, one answer" },
    { file: "hero-redbridging-desktop.webp", alt: "Redbridging reliability bridge with shield", caption: "Redbridging - Rescue brittle automations" },
  ];
  const png: Array<{ file: string; alt: string; caption: string }> = [
    { file: "flowstack-hero.png", alt: "Flowstack automation visual with connected tasks", caption: "Flowstack - Automate your #1 task" },
    { file: "chatbots-hero.png", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "chatbot-hero.png", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "consensus-hero.png", alt: "Consensus Engine converging lines", caption: "Consensus - Four perspectives, one answer" },
    { file: "redbridging-hero.png", alt: "Redbridging reliability bridge with shield", caption: "Redbridging - Rescue brittle automations" },
    { file: "research_hero.png", alt: "Founder reviewing insights on a clean AI dashboard", caption: "Research - Decisions backed by learning and context" },
    { file: "research-hero.png", alt: "Founder reviewing insights on a clean AI dashboard", caption: "Research - Decisions backed by learning and context" },
  ];
  const webpSlides = webp
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({ src: `/assets/generated/${c.file}`, alt: c.alt, caption: c.caption }));
  const pngSlides = png
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({ src: `/assets/generated/${c.file}`, alt: c.alt, caption: c.caption }));
  const slides: Slide[] = (webpSlides.length ? webpSlides : pngSlides) as Slide[];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="be-hero-aurora absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-14 pt-20 md:grid-cols-2 md:pt-24">
          <div className="order-2 md:order-1 text-pretty">
            <span className="text-accent-500 text-sm font-semibold uppercase tracking-[0.3em] motion-safe:animate-fadeIn">Main Street automation, handcrafted.</span>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-5xl motion-safe:animate-enterFromLeft">
              Soft, clean automation that keeps your hands on the controls.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text-tertiary dark:text-dark-text-tertiary">
              Auditable AI workflows, on-brand chatbots, and decision clarity—built for small business. Keep human approvals, regain your time, and stay in charge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-fadeIn">
              <Link href="/contact" className="bg-accent-600 hover:brightness-110 inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-white">Automate My #1 Task</Link>
              <Link href="/solutions" className="border-border text-text-primary hover:bg-black/5 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-white/5 inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold">See Products</Link>
              <Link href="/book" className="text-text-tertiary hover:text-text-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary inline-flex items-center justify-center px-3 py-3 text-sm font-semibold">Free Assessment</Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <img src="/assets/nglcc-badge-dark.svg" alt="NGLCC Certified" className="h-6 w-auto block dark:hidden" />
              <img src="/assets/nglcc-badge-light.svg" alt="NGLCC Certified" className="h-6 w-auto hidden dark:block" />
              <img src="/assets/catalant-badge-dark.svg" alt="Catalant Vetted" className="h-6 w-auto block dark:hidden" />
              <img src="/assets/catalant-badge-light.svg" alt="Catalant Vetted" className="h-6 w-auto hidden dark:block" />
            </div>
            <p className="mt-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">Consensus Engine™ and Redbridging™ are trademark pending.</p>
          </div>
          <div className="order-1 md:order-2 motion-safe:animate-enterFromRight">
            <HeroSlideshow slides={slides.length ? slides : undefined} />
          </div>
        </div>
      </section>
    </main>
  );
}
