'use client';

import { useState } from "react";

export function ConsensusEngineCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative max-w-5xl mx-auto my-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl overflow-hidden">
      {/* Proprietary Badge */}
      <div className="absolute top-6 right-6">
        <span className="px-4 py-2 rounded-full border border-white/60 bg-[color:var(--navy-primary)] text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/30">
          PROPRIETARY
        </span>
      </div>

      {/* Header */}
      <div className="p-10 md:p-14">
        <div className="flex flex-col items-center gap-6 mb-6 md:flex-row">
          {/* 4-agent grid image (kept as a card, not a hero) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/3263390b-6a39-48e3-a2ea-11fd016ef15d.png"
            alt="Cadence, Brutus, Finch, and Rex — the four Consensus Engine AI agents"
            className="h-40 w-40 rounded-2xl object-cover shadow-xl"
            loading="lazy"
            decoding="async"
          />

          <div className="flex-1 text-center md:text-left">
            <h2
              id="consensus-engine-heading"
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
            >
              The Consensus Engine
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-3">
              Exclusive to BespokeEthos clients
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-center">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                4 AI Agents
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                1000+ Sources
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                Superhuman Speed
              </span>
            </div>
          </div>
        </div>

        {/* Simplified Value Prop */}
        <div className="mb-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-2 border-orange-200 dark:border-orange-700">
          <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Got a big question? Get real answers.
          </p>
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            Our proprietary AI research platform analyzes <strong>1000+ sources</strong> at superhuman speed—SEC filings,
            patents, medical journals, tax regulations, and more—then delivers one actionable report with citations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full font-semibold">
              4 Specialized AI Agents
            </span>
            <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full font-semibold">
              Live Web Search
            </span>
            <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full font-semibold">
              Deep Archives
            </span>
          </div>
        </div>

        {/* Simple 3-Step Process */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-2xl font-bold mb-2">You Ask</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Any business question. Pricing, automation, marketing, compliance—anything.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-2xl font-bold mb-2">We Research</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              4 AI agents independently analyze 1000+ sources, then cross-verify findings.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-2xl font-bold mb-2">You Decide</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Get one cited, actionable report. Make your call with confidence.
            </p>
          </div>
        </div>

        {/* Expandable Agent Details */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-orange-500 font-semibold hover:underline mb-6 flex items-center gap-2 mx-auto"
          aria-expanded={isExpanded}
          aria-controls="consensus-agents-panel"
        >
          {isExpanded ? "Hide the 4 AI Agents" : "See the 4 AI Agents"}
        </button>

        {isExpanded && (
          <div
            id="consensus-agents-panel"
            className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8 border border-slate-200 dark:border-slate-700"
            role="region"
            aria-label="Details about the four Consensus Engine AI agents"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h5 className="font-bold mb-1">Cadence</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">Copy &amp; messaging expert</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h5 className="font-bold mb-1">Brutus</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">Brand strategy specialist</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h5 className="font-bold mb-1">Finch</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">Financial analysis pro</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h5 className="font-bold mb-1">Rex</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">Risk &amp; compliance guard</p>
              </div>
            </div>
          </div>
        )}

        {/* Offer Callout */}
        <div className="text-center mb-8 p-8 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl border-2 border-orange-300 dark:border-orange-700">
          <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Free With Your Consultation
          </p>
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-2">
            Every 30-minute consultation includes <strong>one free Consensus Engine report</strong>
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            (Normally $79.99  Ask any business question)
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a href="#book" className="primary-cta inline-flex px-10 py-4 text-xl font-bold">
            Get Answers  Book Free Consultation
          </a>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            30 minutes  Zero pressure  One free research report
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-2 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />
    </div>
  );
}
