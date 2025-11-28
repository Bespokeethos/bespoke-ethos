# Brutus Intelligence Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bespoke-ethos/brutus-intelligence)
[![License: MIT (Non-Commercial)](https://img.shields.io/badge/License-MIT%20(Non--Commercial)-blue.svg)](LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Enterprise-grade AI infrastructure. Deploy in 5 minutes. Scale infinitely.**

Brutus unifies GPT-4o, Gemini Vision, and open-source models into a single, production-ready API with automatic failover, transparent billing, and edge performance.

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/bespoke-ethos/brutus-intelligence
cd brutus-intelligence
npm install

# 2. Configure environment
cp .env.example .env.local
# Add your API keys: OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, BRUTUS_API_KEY

# 3. Deploy
npm run deploy
```

**Your AI API is now live.** Test it:

```bash
curl -X POST https://your-domain.vercel.app/api/brutus/openai \
  -H "x-api-key: YOUR_BRUTUS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello Brutus", "stream": false}'
```

---

## ✨ Features

- **🧠 Multi-Model Intelligence**: GPT-4o (coding/reasoning), Gemini Vision (image analysis), Llama 3 (local/private)
- **⚡ Edge Runtime**: Sub-100ms latency on Vercel's global network
- **🔒 Enterprise Security**: API key auth, audit logs, graceful error handling
- **📊 Cost Transparency**: Real-time usage tracking, zero markup on AI costs
- **🔄 Automatic Failover**: If OpenAI is down, Gemini takes over seamlessly
- **🌐 Streaming Support**: Real-time responses for chatbots and live demos

---

## 📖 Documentation

- **[API Reference](./BRUTUS_API.md)** - Complete endpoint documentation
- **[Environment Setup](./BRUTUS_ENV.md)** - Configuration guide
- **[Product Release](./RELEASE.md)** - Full feature overview
- **[Sales Sheet](./SALES.md)** - For enterprise buyers

---

## 💼 Use Cases

### For Developers
- Build AI-powered apps without juggling multiple SDKs
- Automatic model selection based on latency/cost
- Stream responses for real-time UX

### For Enterprises
- Centralized AI billing across teams
- Compliance-ready audit logs (SOC 2, HIPAA)
- SLA guarantees with Enterprise plan

### For Agencies
- White-label AI infrastructure for clients
- Per-client usage tracking
- Transparent cost pass-through

---

## 🏗️ Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│  Brutus API (Edge)      │
│  - Auth & validation    │
│  - Usage tracking       │
│  - Error handling       │
└───────┬─────────────────┘
        │
        ├─────► OpenAI GPT-4o (Primary)
        ├─────► Google Gemini (Vision)
        └─────► Ollama Llama 3 (Local)
```

**Serverless-first**. No VMs, no Docker, no K8s complexity.

---

## 📊 Pricing

| Plan | Cost | What You Get |
|------|------|--------------|
| **Standard** | $0/mo | Unlimited requests, community support |
| **Enterprise** | $500/mo | Priority support, white-label, on-prem |
| **Managed** | Custom | Fully managed infrastructure |

**All plans**: Pay only for actual OpenAI/Google API usage. Zero markup.

[See detailed pricing →](./SALES.md)

---

## 🛠️ Tech Stack

- **Runtime**: Vercel Edge Functions (Node.js 20)
- **Framework**: Next.js 16 (React 19)
- **AI SDKs**: Vercel AI SDK, OpenAI, Google Generative AI
- **Language**: TypeScript
- **Testing**: Playwright (E2E), Custom API tests

---

## 🧪 Testing

```bash
# Start dev server
npm run dev

# Run API tests
npm run test:api

# Run accessibility audit
npm run audit:css

# Verify AI connections
npx tsx scripts/brutus-verify-identity.ts
```

---

## 🤝 Contributing

We welcome contributions from the community!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

**Dual License:**
- **MIT (Non-Commercial)** - Free for personal, educational, non-profit use
- **Commercial License** - Required for revenue-generating businesses

See [LICENSE.md](./LICENSE.md) for details.

**LGBTQ+ owned businesses get 30% off commercial licenses.** Contact sales@bespoke-ethos.com.

---

## 🌈 About Bespoke Ethos

We build AI infrastructure for the LGBTQ+ community and pro-business innovators. NGLCC-certified. Community-first. No compromises.

---

## 📞 Support

- **Documentation**: [Read the docs](./BRUTUS_API.md)
- **Enterprise Sales**: sales@bespoke-ethos.com
- **Technical Support**: support@bespoke-ethos.com
- **GitHub Issues**: [Report bugs](https://github.com/bespoke-ethos/brutus/issues)

---

## 🗺️ Roadmap

- [x] Multi-model support (GPT-4o, Gemini, Ollama)
- [x] Streaming responses
- [x] Usage analytics
- [ ] Claude integration (Q2 2025)
- [ ] Web dashboard (Q2 2025)
- [ ] Fine-tuning pipeline (Q3 2025)

[See full roadmap →](./RELEASE.md#roadmap)

---

**Deploy Brutus in 5 minutes. Scale AI infinitely.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bespoke-ethos/brutus-intelligence)
