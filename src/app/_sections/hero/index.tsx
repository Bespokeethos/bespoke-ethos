import clsx from "clsx";

import { fragmentOn } from "basehub";
import { AvatarsGroup } from "@/common/avatars-group";
import { Avatar } from "@/common/avatar";
import { avatarFragment } from "@/lib/basehub/fragments";
import { TrackedButtonLink } from "@/app/_components/tracked_button";
import { GeneralEvents } from "@/../basehub-types";
import { HeroSlideshow, type Slide } from "./slideshow";
import path from "node:path";
import fs from "node:fs";
import {
  IconAdjustmentsBolt,
  IconMessageCircle2,
  IconChartDots,
  IconShieldCheck,
} from "@tabler/icons-react";
import Link from "next/link";

export const heroFragment = fragmentOn("HeroComponent", {
  _analyticsKey: true,
  customerSatisfactionBanner: {
    text: true,
    avatars: {
      items: {
        _id: true,
        avatar: avatarFragment,
      },
    },
  },
  title: true,
  subtitle: true,
  actions: {
    _id: true,
    href: true,
    label: true,
    type: true,
  },
});
type Hero = fragmentOn.infer<typeof heroFragment>;

export function Hero(hero: Hero & { eventsKey: GeneralEvents["ingestKey"] }) {
  // Detect generated hero assets on the server and pass to the client slideshow
  const publicDir = path.join(process.cwd(), "public", "assets", "generated");
  const candidates: Array<{ file: string; alt: string; caption: string }> = [
    { file: "hero-cadence-desktop.webp", alt: "Candid, joyful small-business owner in workshop, future-focused and free – Cadence chatbot product hero background", caption: "Cadence™ - The chatbot for people who hate chatbots" },
    { file: "hero-flowstack-desktop.webp", alt: "Flowstack™ automation visual with connected tasks", caption: "Flowstack™ - Automate your #1 task" },
    { file: "hero-chatbots-desktop.webp", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "hero-consensus-desktop.webp", alt: "Consensus Engine converging lines", caption: "Consensus Engine™ - Like having a genius that watches your business's back, side, up and down" },
    { file: "hero-redbridging-desktop.webp", alt: "Redbridging reliability bridge with shield", caption: "Redbridging™ - Rescue brittle automations before they break" },
  ];
  const pngFallbacks: Array<{ file: string; alt: string; caption: string }> = [
    { file: "flowstack-hero.png", alt: "Flowstack™ automation visual with connected tasks", caption: "Flowstack™ - Automate your #1 task" },
    { file: "chatbots-hero.png", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "chatbot-hero.png", alt: "Chatbots answering a question on mobile", caption: "Chatbots - On-brand answers 24/7" },
    { file: "consensus-hero.png", alt: "Consensus Engine converging lines", caption: "Consensus - Four perspectives, one answer" },
    { file: "redbridging-hero.png", alt: "Redbridging reliability bridge with shield", caption: "Redbridging - Rescue brittle automations" },
    { file: "research_hero.png", alt: "Founder reviewing insights on a clean AI dashboard", caption: "Research - Decisions backed by learning and context" },
    { file: "research-hero.png", alt: "Founder reviewing insights on a clean AI dashboard", caption: "Research - Decisions backed by learning and context" },
  ];

  const webpSlides = candidates
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({ src: `/assets/generated/${c.file}`, alt: c.alt, caption: c.caption }));

  const pngSlides = pngFallbacks
    .filter((c) => fs.existsSync(path.join(publicDir, c.file)))
    .map((c) => ({ src: `/assets/generated/${c.file}`, alt: c.alt, caption: c.caption }));

  const generatedSlides: Slide[] = webpSlides.length ? webpSlides : pngSlides;

  // Optional square backgrounds for feature cards if present
  const cardBg = (key: 'Flowstack™' | 'Chatbots' | 'Consensus Engine' | 'Redbridging') => {
    const map: Record<string, string[]> = {
      'Flowstack™': ['hero-flowstack-square.webp'],
      'Chatbots': ['hero-chatbots-square.webp', 'hero-chatbot-square.webp'],
      'Consensus Engine': ['hero-consensus-square.webp'],
      'Redbridging': ['hero-redbridging-square.webp'],
    };
    const files = map[key] ?? [];
    for (const f of files) {
      const p = path.join(publicDir, f);
      if (fs.existsSync(p)) return `/assets/generated/${f}`;
    }
    return null;
  };

  const featureCards = [
    {
      title: "Flowstack™",
      description: "Automate your most painful task without losing approvals or ownership.",
      href: "/solutions/flowstack",
      Icon: IconAdjustmentsBolt,
    },
    {
      title: "Chatbots",
      description: "Friendly, on-brand answers 24/7 with clear human handoff.",
      href: "/solutions/chatbots",
      Icon: IconMessageCircle2,
    },
    {
      title: "Consensus Engine™",
      description: "Trademark pending. Four perspectives debate and deliver one confident recommendation.",
      href: "/solutions/consensus-engine",
      Icon: IconChartDots,
    },
    {
      title: "Redbridging™",
      description: "Trademark pending. Rescue brittle automations with monitoring, alerts, and documentation.",
      href: "/solutions/redbridging",
      Icon: IconShieldCheck,
    },
  ];

  return (
    <section className="relative min-h-[calc(630px-var(--header-height))] overflow-hidden pb-10">
      {/* Decorative hero backdrop (subtle, GPU friendly) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="be-hero-aurora absolute inset-0" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/generated/hero-background.svg" alt="" className="absolute right-[-4vw] top-[18%] hidden h-[64vh] w-auto object-contain opacity-70 md:block" loading="eager" decoding="async" />
      </div>
      <div className="border-border dark:border-dark-border absolute top-0 left-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b">
        {/* Decorations */}
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="border-border dark:border-dark-border col-span-1 flex h-full items-center justify-center border-x" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>
      {/* --- */}
      <figure className="bg-accent-500/30 pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[220px]" />
      <figure className="bg-surface-primary dark:bg-dark-surface-primary pointer-events-none absolute top-[64px] left-[4vw] z-20 hidden aspect-square w-[32vw] rounded-full opacity-50 blur-[100px] md:block" />
      <figure className="bg-surface-primary dark:bg-dark-surface-primary pointer-events-none absolute right-[7vw] bottom-[-50px] z-20 hidden aspect-square w-[30vw] rounded-full opacity-50 blur-[100px] md:block" />
      {/* --- */}
      <div className="divide-border dark:divide-dark-border relative z-10 flex flex-col divide-y pt-[35px]">
        <div className="flex flex-col items-center justify-end">
          <div className="border-border dark:border-dark-border flex items-center gap-2 border! border-b-0! px-4 py-2">
            <AvatarsGroup>
              {hero.customerSatisfactionBanner.avatars.items.map(({ avatar, _id }) => (
                <Avatar priority {...avatar} key={_id} />
              ))}
            </AvatarsGroup>
            <p className="text-text-tertiary dark:text-dark-text-tertiary text-sm tracking-tight">
              {hero.customerSatisfactionBanner.text}
            </p>
          </div>
        </div>
        <div>
          <div className="mx-auto flex min-h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-3 px-2 py-6 sm:px-16 lg:px-24">
            <h1 className="text-text-primary dark:text-dark-text-primary max-w-(--breakpoint-lg) text-center text-[clamp(32px,7vw,64px)] leading-none font-medium tracking-[-1.44px] text-pretty md:tracking-[-2.16px]">
              {hero.title}
            </h1>
            <h2 className="text-md text-text-tertiary dark:text-dark-text-tertiary max-w-2xl text-center text-pretty md:text-lg">
              {hero.subtitle}
            </h2>
          </div>
        </div>
        <div className="mt-6 grid items-start gap-6 px-4 md:grid-cols-2">
          {/* Left: square research image + CTAs */}
          <div className="flex w-full max-w-[90vw] flex-col items-center justify-start md:max-w-[520px]">
            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/generated/research-hero.png"
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/assets/generated/research_hero.png")}
                alt="Small business owner reviewing a simple AI dashboard"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: "rgba(30, 64, 175, 0.30)" }} />
            </div>

            {/* CTA cluster: first row inline, contact centered below */}
            <div className="flex w-full flex-wrap items-center justify-center gap-3">
              {hero.actions?.slice(0, 2).map(({ href, label, type, _id }) => (
                <TrackedButtonLink
                  key={_id}
                  analyticsKey={hero.eventsKey}
                  className={clsx(
                    "h-12! rounded-md px-5 text-sm!",
                    type === "primary"
                      ? "inline-flex items-center justify-center bg-accent-500 text-white hover:brightness-110"
                      : "inline-flex items-center justify-center border border-border bg-transparent text-text-primary hover:bg-black/5 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-white/5",
                  )}
                  href={href}
                  intent={type}
                  name="cta_click"
                >
                  {label}
                </TrackedButtonLink>
              ))}
            </div>
            <div className="mt-3 flex w-full justify-center">
              <Link href="/contact" className="rounded-md bg-accent-600 px-5 py-2 text-sm font-medium text-white hover:brightness-110">
                Contact Bespoke Ethos
              </Link>
            </div>
          </div>

          {/* Right: Local, lightweight slideshow */}
          <div className="mx-auto w-full max-w-6xl">
            <HeroSlideshow slides={generatedSlides.length ? generatedSlides : undefined} />
          </div>
        </div>
        <div className="mt-8 px-4">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map(({ title, description, href, Icon }) => {
              const bg = cardBg(title as any);
              return (
                <Link
                  key={title}
                  href={href}
                  className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-border p-4 transition-transform hover:-translate-y-1 hover:border-accent-500 hover:shadow-lg dark:border-dark-border"
                  style={bg ? { backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                >
                  {bg ? <span className="absolute inset-0 bg-black/25 backdrop-blur-[1px] transition-opacity group-hover:bg-black/35" aria-hidden /> : null}
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent-500/15 text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-white dark:bg-accent-500/20">
                    <Icon className="size-5" />
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-white drop-shadow-sm dark:text-white">{title}</h3>
                    <p className="mt-1 text-sm text-white/90 drop-shadow-sm dark:text-white/90">{description}</p>
                  </div>
                  <span className="relative z-10 mt-auto text-sm font-medium text-white group-hover:underline">
                    Explore {title} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
