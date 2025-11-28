"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { motion } from "framer-motion";

import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import Image from "next/image";
import { Section } from "@/common/layout";
import { BorderBeam } from "@/components/ui/border-beam";
import { SuccessNotice } from "./success-notice";

function ContactForm() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent") === "1";
  const error = searchParams.get("error");
  const service = searchParams.get("service");
  const isLlmSetup = service === "llm-setups";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="be-section-card space-y-6 page-hero-shell"
    >
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

      {/* Mobile hero heading above the card */}
      <div className="space-y-1 text-center md:hidden">
        <p className="inline-flex rounded-full bg-surface-secondary px-3 py-1 text-[11px] font-medium tracking-tight text-text-secondary dark:bg-dark-surface-secondary dark:text-dark-text-secondary">
          {isLlmSetup ? "Automation setups · Tool mapping · Guardrails" : "Productized AI · Fixed scopes · No enterprise fluff"}
        </p>
        <h1 className="font-hero-accent text-balance text-[1.5rem] font-semibold leading-snug">
          {isLlmSetup ? "Let’s map your AI tools the right way." : "Fix the bottleneck, keep the lights on."}
        </h1>
      </div>

      <div className="grid w-full items-start gap-4 -mt-2 sm:gap-8 sm:-mt-2 md:mt-0 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-stretch">
        <div className="space-y-5 text-left md:block md:space-y-6">
          <p className="inline-flex rounded-full bg-surface-secondary px-3 py-1 text-xs font-medium tracking-tight text-text-secondary dark:bg-dark-surface-secondary dark:text-dark-text-secondary">
            {isLlmSetup ? "Automation setups · Tool mapping · Guardrails" : "Productized AI · 25% LGBTQ discount · Founder-run"}
          </p>

          <div className="space-y-3">
            <h1 className="font-hero-accent text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              {isLlmSetup ? "Let’s map your AI tools the right way." : "Fix the thing that’s keeping you up at night."}
            </h1>
            <div className="pill-row">
              <span className="pill">Static-first · serverless when required</span>
              <span className="pill">Human replies · no AI auto-responder</span>
              <span className="pill">25% LGBTQ-owned discount</span>
            </div>
            <p className="text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              No decks, no enterprise retainers. Tell me what’s broken, what tools you use, and your budget ceiling. I’ll reply with a
              yes/no, a price, and the fastest path using static/serverless, audited builds.
              <div className="mt-2 flex flex-wrap items-center gap-2 text-left">
                <Image
                  src="/founder-upton-rand.jpg"
                  alt="Upton Rand, Founder."
                  width={32}
                  height={32}
                  className="shrink-0 rounded-full object-cover"
                />
                <span className="inline-block max-w-[38ch] text-pretty sm:max-w-none">
                  Tool &amp; die tech + AI trainer. I read every note and will tell you if a $20 tool is all you need.
                </span>
              </div>
            </p>

            {isLlmSetup ? (
              <div className="rounded-2xl border border-border bg-surface-secondary/80 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80 dark:text-dark-text-secondary space-y-2">
                <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                  You&rsquo;re asking about automation & AI tool mapping.
                </p>
                <p>
                  Tell me where your data lives (docs, CRM, tools), who needs access, and what’s breaking. I’ll outline 1-2 setup options
                  and costs—favoring static/serverless so maintenance stays low.
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                  <li>Mention 2-3 workflows you’d love to hand off (intake, reporting, support triage).</li>
                  <li>If you have broken Zaps/Scenarios, link them; I’ll include a rescue plan.</li>
                  <li>Want Cadence chatbot? Note tone/FAQ sources you’d train on.</li>
                </ul>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-surface-secondary/80 p-4 text-sm text-text-secondary shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/80 dark:text-dark-text-secondary">
                <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                  What happens after you hit “Send”?
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs md:text-sm">
                  <li>I read and reply—no AI auto-responder.</li>
                  <li>Plain-English response within one business day with a price or a no-go.</li>
                  <li>If it&apos;s not a fit, I&apos;ll still point you to a cheaper/faster option.</li>
                </ul>
              </div>
            )}

            <div className="rounded-xl border-2 border-accent-400/60 bg-gradient-to-br from-accent-50/90 to-orange-50/80 dark:from-accent-900/40 dark:to-orange-900/30 p-5 text-sm text-text-primary dark:text-dark-text-primary shadow-md dark:border-accent-600/50">
              <p className="leading-relaxed">
                <strong className="font-bold text-accent-700 dark:text-accent-300">LGBTQ+ discount:</strong>{" "}
                If you&apos;re an LGBTQ+-owned business, mention it in your message. You may qualify for{" "}
                <span className="font-bold text-accent-600 dark:text-accent-400">25% off upfront project costs</span> (not subscriptions).
              </p>
            </div>
          </div>
        </div>

        <div className="be-form-glass-card max-w-md w-full mx-auto md:max-w-none md:mx-0 sm:p-6">
        {sent ? (
          <div className="mb-6 rounded-md border border-green-700/30 bg-green-500/10 p-4 text-sm text-green-700 dark:border-green-300/20 dark:text-green-300">
            <p className="font-medium">Got it. I’m reading this shortly. No auto‑responder, just me.</p>
            <SuccessNotice />
          </div>
        ) : null}

        {/* Jotform Embed */}
        <div className="w-full overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_18px_rgba(0,0,0,0.06)]">
          <iframe
            id="JotFormIFrame-253292960463058"
            title="Bespoke Ethos Contact Form"
            allowFullScreen
            allow="geolocation; microphone; camera"
            src="https://form.jotform.com/253292960463058"
            frameBorder="0"
            style={{
              minWidth: "100%",
              minHeight: "640px",
              height: "700px",
              border: "none",
              display: "block",
            }}
          />
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `(function() { var formId = "253292960463058"; var iframeId = "JotFormIFrame-" + formId; var ifr = document.getElementById(iframeId); if (!ifr) return; var src = ifr.src.split("?")[0]; var iframeParams = []; if (window.location.search.length > 1) { iframeParams = iframeParams.concat(window.location.search.substring(1).split('&')); } if (iframeParams.length) { ifr.src = src + "?" + iframeParams.join('&'); } var handleMessage = function(e) { if (!e.data || typeof e.data !== "string") return; var args = e.data.split(":"); if (args.length > 2 && args[0] === formId) { var command = args[1]; var value = args[2]; if (command === "setHeight") { var newHeight = Number(value); if (!isNaN(newHeight) && newHeight > 0) { ifr.style.height = newHeight + "px"; } } if (command === "scrollIntoView") { try { if (typeof window.scrollTo === "function") { window.scrollTo(0, 0); } } catch (_) {} } } }; window.addEventListener("message", handleMessage, false); ifr.addEventListener("load", function() { try { if (window.parent && typeof window.parent.scrollTo === "function") { window.parent.scrollTo(0, 0); } } catch (_) {} }, { once: true }); })();` }} />
        </div>

        <p className="mt-4 text-center text-xs text-text-tertiary dark:text-dark-text-tertiary">
          If you’re family (LGBTQ+ owned), tell me. I take 25% off setup fees because I know how hard it is to get started.
        </p>

        {/* Legacy form removed */}
      </div>
      </div>
    </motion.div>
  );
}


export default function ContactPage() {
  return (
    <main className="be-page-slate">
      <ContactPageJsonLd />
      <Section className="gap-5 -mt-14 md:gap-6 md:-mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </Suspense>
      </Section>
    </main>
  )
}

function ContactPageJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${base}/contact`,
    name: "Contact Bespoke Ethos",
    mainEntityOfPage: `${base}/contact`,
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

