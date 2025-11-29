import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@/common/button';
import { BorderBeam } from '@/components/ui/border-beam';

export const metadata: Metadata = {
  title: 'Brutus Intelligence Platform | Enterprise AI API | Bespoke Ethos',
  description:
    'Production-grade AI infrastructure. Unify GPT-4o, Gemini Vision, and open-source models with automatic failover, transparent billing, and edge performance. Deploy in 5 minutes.',
  openGraph: {
    title: 'Brutus Intelligence Platform | Enterprise AI API',
    description:
      'Production-grade AI infrastructure. Deploy in 5 minutes. Scale infinitely.',
    images: ['/assets/generated/logo-square-dark.png'],
  },
};

export default function BrutusPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
        </div>

        <div className="container relative mx-auto max-w-5xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300 backdrop-blur mb-6">
            Enterprise-Grade AI Infrastructure
          </div>

          <h1 className="font-hero-accent text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Brutus Intelligence
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Unify GPT-4o, Gemini Vision, and open-source models into a single, production-ready API.
            Automatic failover. Transparent billing. Edge performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="relative inline-flex">
              <BorderBeam borderWidth={2} />
              <ButtonLink
                intent="primary"
                size="lg"
                href="https://calendly.com/contact-bespokeethos/30min"
                className="relative z-[1]"
              >
                Schedule Enterprise Demo
              </ButtonLink>
            </div>
            <ButtonLink intent="secondary" size="lg" href="#pricing">
              View Pricing
            </ButtonLink>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Deploy in 5 minutes
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              99.9% uptime SLA
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              Zero vendor lock-in
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Code Example */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              One API. Three Intelligence Engines.
            </h2>
            <p className="text-lg text-slate-600">
              Stop juggling SDKs. Start shipping AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg ring-1 ring-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-orange-500" />
                GPT-4o (Coding)
              </h3>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`curl -X POST \\
  https://yourdomain.com/api/brutus/openai \\
  -H "x-api-key: YOUR_KEY" \\
  -d '{"prompt": "Generate a login component"}'`}
              </pre>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg ring-1 ring-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-purple-500" />
                Gemini Vision (Images)
              </h3>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`curl -X POST \\
  https://yourdomain.com/api/brutus/vision \\
  -H "x-api-key: YOUR_KEY" \\
  -d '{"imageBase64": "data:...", "prompt": "..."}'`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Enterprises Choose Brutus
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔄',
                title: 'Automatic Failover',
                description:
                  'If OpenAI is down, Gemini takes over seamlessly. Your uptime is guaranteed.',
              },
              {
                icon: '⚡',
                title: 'Edge Performance',
                description:
                  'Sub-100ms latency globally via Vercel\'s 300+ edge locations. Fast everywhere.',
              },
              {
                icon: '📊',
                title: 'Cost Transparency',
                description:
                  'Real-time usage tracking. Zero markup on AI costs. You pay providers directly.',
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description:
                  'API key auth, audit logs, SOC 2 ready. Built for regulated industries.',
              },
              {
                icon: '🌐',
                title: 'Streaming Support',
                description:
                  'Real-time responses for chatbots and live demos. Best-in-class UX.',
              },
              {
                icon: '🛠️',
                title: 'White-Label Ready',
                description:
                  'Deploy on your domain. Your brand. Enterprise license includes full customization.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl shadow-sm ring-1 ring-slate-200 hover:ring-orange-200 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Transparent Pricing</h2>
            <p className="text-lg text-slate-600">
              Pay only for what you use. No hidden fees. No markup.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Standard */}
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-slate-200">
              <div className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-2">
                Standard
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-2">$0</div>
              <div className="text-slate-600 mb-6">per month</div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited API requests',
                  'Pay only for AI usage',
                  'Community support',
                  'GitHub access',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink intent="secondary" size="lg" href="https://github.com/bespoke-ethos/brutus" className="w-full">
                Get Started
              </ButtonLink>
            </div>

            {/* Enterprise */}
            <div className="bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl p-8 shadow-2xl ring-1 ring-orange-400 transform scale-105">
              <div className="text-sm font-bold uppercase tracking-wider text-orange-100 mb-2">
                Enterprise
              </div>
              <div className="text-5xl font-bold text-white mb-2">$500</div>
              <div className="text-orange-100 mb-6">per month</div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Standard',
                  'Priority support (1hr SLA)',
                  'White-label deployment',
                  'On-premises option',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink intent="primary" size="lg" href="https://calendly.com/contact-bespokeethos/30min" className="w-full bg-white text-purple-700 hover:bg-slate-50">
                Schedule Demo
              </ButtonLink>
            </div>

            {/* Managed */}
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-slate-200">
              <div className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-2">
                Managed
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-2">Custom</div>
              <div className="text-slate-600 mb-6">pricing</div>
              <ul className="space-y-3 mb-8">
                {[
                  'Fully managed infrastructure',
                  'Dedicated Slack channel',
                  'Custom SLAs',
                  'Feature development',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink intent="secondary" size="lg" href="/contact" className="w-full">
                Contact Sales
              </ButtonLink>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800">
              🌈 LGBTQ+ owned businesses get 30% off Enterprise licenses
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-purple-950">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Deploy Brutus in 5 Minutes
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join the businesses that refuse to compromise on AI infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink intent="primary" size="lg" href="https://vercel.com/new/clone?repository-url=https://github.com/bespoke-ethos/brutus">
              Deploy to Vercel
            </ButtonLink>
            <ButtonLink intent="secondary" size="lg" href="https://github.com/bespoke-ethos/brutus">
              View on GitHub
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
