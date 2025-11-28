"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { ButtonLink } from "@/common/button";
import { BorderBeam } from "@/components/ui/border-beam";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ConversionOptimizedHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7ec] via-white to-[#f5f3ff] py-14 sm:py-18 lg:py-22">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-orange-200/35 blur-[90px]" />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-sky-200/35 blur-[110px]" />
      </div>

      <div className="container relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-6">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-800 shadow-sm backdrop-blur">
            Cleveland · Small-business AI · NGLCC Certified
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-3">
            <h1 className="text-balance font-hero-accent text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              Ship AI automation in weeks—not quarters—with a founder who trained the models you use.
            </h1>
            <p className="text-lg text-slate-700">
              Fixed scopes from $997. We handle the busywork—Cadence chat concierge, Flowstack automations, Consensus research briefs, and Redbridging rescues—so you keep control and time.
            </p>
          </motion.div>

          <motion.ul variants={fadeUp} className="grid gap-2 text-sm font-medium text-slate-800 sm:grid-cols-2">
            {[
              "Transparent pricing + 25% LGBTQ+ discount on upfront work",
              "SMB-first delivery with enterprise-grade guardrails",
              "Proof first: Decision Brief or mini-automation before full build",
              "Human-in-the-loop: 10+ years Appen / HIL training experience",
            ].map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-2 rounded-lg bg-white/70 px-3 py-2 shadow-sm ring-1 ring-slate-200"
              >
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative inline-flex">
              <BorderBeam borderWidth={2} lightWidth={420} duration={9} />
              <ButtonLink
                intent="primary"
                size="lg"
                className="relative z-[1] px-6"
                href="https://calendly.com/contact-bespokeethos/30min"
              >
                Book a free consult
              </ButtonLink>
            </div>
            <ButtonLink intent="secondary" size="lg" href="/pricing">
              View pricing & timelines
            </ButtonLink>
            <Link href="/contact" className="text-sm font-semibold text-orange-700 underline underline-offset-4">
              Or tell us your workflow
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Starts at $997 · 2–4 week delivery
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-slate-200">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              25% off LGBTQ-owned businesses
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <TrustBadge src="/assets/generated/trust/nglcc-square-light.webp" alt="NGLCC Certified LGBTQ+ Owned" />
            <TrustBadge src="/assets/generated/trust/catalant-square-light.webp" alt="Catalant Vetted" />
            <TrustBadge src="/assets/generated/trust/experience-5yrs-square-light.webp" alt="5 years AI HIL" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Cleveland · Rust Belt manufacturing friendly
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.25 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-white/70 shadow-2xl shadow-orange-100/50 ring-1 ring-slate-200" />
          <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200">
            <Image
              src="/assets/generated/hero-cadence-desktop.webp"
              alt="Cadence concierge and automation dashboard"
              width={960}
              height={780}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 520px"
              priority
              loading="eager"
              quality={95}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 shadow-sm ring-1 ring-slate-200">
      <span className="relative block h-8 w-8 overflow-hidden rounded-md">
        <Image src={src} alt={alt} fill sizes="32px" className="object-contain" />
      </span>
      <span className="text-xs font-semibold text-slate-700">{alt}</span>
    </div>
  );
}
