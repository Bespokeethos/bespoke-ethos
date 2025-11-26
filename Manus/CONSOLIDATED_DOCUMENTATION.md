# Bespoke Ethos: Consolidated Project Documentation

**Author:** Manus AI  
**Date:** November 14, 2025  
**Project:** Bespoke Ethos Website Migration & Optimization

---

## Executive Summary

This document consolidates all project documentation related to the Bespoke Ethos website migration from BaseHub to Sanity.io. The website is currently deployed at [www.bespokeethos.com](https://www.bespokeethos.com) but is experiencing runtime errors due to issues with the BaseHub CMS integration. The recommended solution is to migrate to Sanity.io, a more reliable and developer-friendly headless CMS.

This consolidation includes information from multiple sprints, verification reports, market research, and technical guidance documents. All content has been preserved and organized for clarity.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Current Status](#current-status)
3. [Technical Stack](#technical-stack)
4. [Environment Configuration](#environment-configuration)
5. [Migration Plan: BaseHub to Sanity](#migration-plan-basehub-to-sanity)
6. [Airtable Integration Status](#airtable-integration-status)
7. [Market Research & Conversion Strategy](#market-research--conversion-strategy)
8. [Detailed Task Breakdown](#detailed-task-breakdown)
9. [Resources & References](#resources--references)

---

## Project Overview

**Repository:** [Uptonr3421/bespoke-ethos](https://github.com/Uptonr3421/bespoke-ethos)  
**Deployment Platform:** Vercel  
**Vercel Project ID:** `prj_8cbai6JzE169NUytyFtCpSohZVka`  
**Live Domains:**
- Primary: [www.bespokeethos.com](https://www.bespokeethos.com)
- Secondary: [bespokeethos.com](https://bespokeethos.com)
- Vercel: [bespoke-ethos-upton-rands-projects.vercel.app](https://bespoke-ethos-upton-rands-projects.vercel.app)

**Deployment Strategy:** Main branch only (no feature branches)

**Business Focus:** Bespoke Ethos is a founder-focused AI consulting service that helps small business owners leverage AI automation. The company emphasizes transparent pricing, productized services, and authentic founder-to-founder communication.

---

## Current Status

### Deployment Status

| Aspect | Status | Details |
|--------|--------|---------|
| **Site Accessibility** | ⚠️ Deployed with Error | Runtime error: "Application error: a server-side exception has occurred" (Digest: 2611423346) |
| **Latest Deployment ID** | `dpl_7C6jKZK9m72ZfVLX8MPSoM8MWJfU` | Deployed on November 14, 2025 |
| **Latest Commit** | `011ed00` | Message: "fix: add SKIP_REMOTE_DATA guards to changelog pages" |
| **Build Status** | ✅ Success | Build time: ~82 seconds |
| **Root Cause** | BaseHub CMS | Authentication and integration issues |

### Recent Changes

The following commits were made during recent debugging sessions:

1. **f54917c** - "fix: remove inline use server directive from client component"
2. **011ed00** - "fix: add SKIP_REMOTE_DATA guards to changelog pages"

Files modified:
- `src/app/_sections/newsletter/index.tsx` - Removed inline "use server"
- `src/app/changelog/page.tsx` - Added SKIP_REMOTE_DATA guards
- `src/app/changelog/[slug]/page.tsx` - Added SKIP_REMOTE_DATA guards

### What's Working ✅

- **Calendly Integration:** Functioning properly
- **Contact Form Backend:** The `/api/contact/route.ts` endpoint is fully implemented with:
  - Resend email integration (sends to `contact@bespokeethos.com`)
  - Cloudflare Turnstile verification
  - Rate limiting (10 requests/minute per IP)
  - Form and JSON POST support
- **Airtable Integration:** Contact form and newsletter submissions are being saved to Airtable (verified in Sprint 1)

### What's Broken ❌

1. **BaseHub CMS Integration:** Causing runtime errors even with `SKIP_REMOTE_DATA` guards
2. **Changelog Pages:** Cannot load due to BaseHub dependency
3. **Newsletter Section:** Relies on BaseHub, needs to be fully migrated to Airtable

---

## Technical Stack

### Core Technologies

- **Framework:** Next.js 16.0.0 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5.4.5
- **Styling:** Tailwind CSS 4.0.17
- **Node.js:** 20.x
- **Package Manager:** pnpm 10.18.2

### Key Dependencies

| Category | Package | Version | Purpose |
|----------|---------|---------|---------|
| **CMS (Active)** | @sanity/client, groq | 7.12.1 / 4.15.0 | Sanity CMS + GROQ queries for changelog and future marketing content |
| **Email** | resend | 6.4.2 | Email notifications |
| **UI Components** | @radix-ui/* | Various | Accessible UI primitives |
| **Icons** | @tabler/icons-react | 3.21.0 | Icon library |
| **Carousel** | embla-carousel-react | 8.0.4 | Carousel functionality |
| **Theming** | next-themes | 0.4.6 | Dark mode support |
| **AI Integration** | openai | 6.8.1 | OpenAI API client (embeddings + MCP agents) |

### Project Structure

```
bespoke-ethos/
├── src/
│   ├── app/
│   │   ├── changelog/          # Changelog pages (uses BaseHub - TO BE MIGRATED)
│   │   ├── _sections/          # Page sections
│   │   └── _components/        # Shared components
│   ├── lib/
│   │   └── basehub/            # BaseHub integration (TO BE REMOVED)
│   └── utils/
├── scripts/                     # Build and utility scripts
├── public/                      # Static assets
├── Guides/                      # Project guides and assets
├── Manus/                       # Manus agent documentation
├── docs/                        # Additional documentation
└── package.json                 # Dependencies
```

---

## Environment Configuration

### Current Environment Variables (Vercel)

```env
# Canonical site URL and branding
NEXT_PUBLIC_SITE_URL="https://www.bespokeethos.com"
NEXT_PUBLIC_SITE_NAME="Bespoke Ethos"

# Vercel project guardrails
REQUIRED_VERCEL_PROJECT_ID="prj_8cbai6JzE169NUytyFtCpSohZVka"

# Contact form notifications (Resend)
RESEND_API_KEY="re_bMWQX5PK_79fyyBYKi5NZTapgFNVKQfgZ"

# Cloudflare Turnstile (spam protection)
NEXT_PUBLIC_TURNSTILE_SITE_KEY="0x4AAAAAAAcF-v3b3I3G9y3J"
TURNSTILE_SECRET="0x4AAAAAAAcGA21y5AL1D92b9iH542wFkEw"

# Airtable CRM (contact + newsletter)
AIRTABLE_TOKEN="pat..."
AIRTABLE_BASE_ID="appDG8eZQE9oG8gPY"
AIRTABLE_CONTACT_TABLE_ID="tblIWtgkqJd2mhWj6"
AIRTABLE_NEWSLETTER_TABLE_ID="tbllMAx256vCwKVFq"

# Temporary workaround (TO BE REMOVED)
SKIP_REMOTE_DATA="1"

# Optional legacy integrations (TO BE REMOVED)
BASEHUB_TOKEN=""
CONTACT_EVENTS_INGEST_KEY=""
```

### Environment Variables to Add (Sanity)

```env
SANITY_PROJECT_ID=""
SANITY_DATASET=""
SANITY_API_TOKEN=""
```

---

## Migration Plan: BaseHub to Sanity

### Why Sanity?

Based on the CMS research conducted, Sanity.io is the recommended replacement for BaseHub for the following reasons:

1. **Best Next.js 16 + App Router support** - Seamless integration with modern Next.js features
2. **Free tier sufficient for small-medium sites** - Cost-effective for the current project scale
3. **OpenAI integration available** - Aligns with the project's AI focus
4. **Excellent Vercel deployment integration** - Streamlined deployment workflow
5. **Real-time preview and visual editing** - Enhanced content management experience
6. **Flexible content modeling** - Adaptable to changing requirements
7. **Active community and documentation** - Strong support ecosystem

**Setup Time:** ~2-3 hours  
**Migration Complexity:** Low-Medium  
**Cost:** Free for this project size

### Sprint 1: Sanity Setup & Initial Integration (2-3 hours)

**Goal:** Establish a basic Sanity.io project and connect it to the Next.js application.

| Task | Description | Est. Time |
|------|-------------|-----------|
| **1.1: Create Sanity Project** | Create a new Sanity project and dataset via the Sanity CLI or dashboard. | 30 mins |
| **1.2: Define Sanity Schema** | Define the schema for the changelog posts in Sanity Studio. This should include fields for title, slug, date, content, and any other relevant metadata. | 1 hour |
| **1.3: Install Sanity Client** | Install the `@sanity/client` package in the Next.js project using `pnpm add @sanity/client`. | 15 mins |
| **1.4: Connect to Sanity** | Configure the Next.js application to connect to the Sanity project using environment variables for the project ID, dataset, and API token. | 30 mins |
| **1.5: Fetch Changelog Data** | Update the changelog page to fetch data from Sanity instead of BaseHub. Test the data fetching and rendering. | 45 mins |

### Sprint 2: Full Migration & BaseHub Removal (2-3 hours)

**Goal:** Migrate all content from BaseHub to Sanity and completely remove all traces of BaseHub from the codebase.

| Task | Description | Est. Time |
|------|-------------|-----------|
| **2.1: Migrate Content** | Manually migrate the existing changelog posts from BaseHub to the new Sanity.io dataset. This can be done through the Sanity Studio interface. | 1 hour |
| **2.2: Update Changelog Page** | Update the main changelog page (`src/app/changelog/page.tsx`) to use the data fetched from Sanity. Remove all BaseHub-related code, including imports and function calls. | 45 mins |
| **2.3: Update Changelog Slug Page** | Update the individual changelog post page (`src/app/changelog/[slug]/page.tsx`) to use Sanity data. Remove all BaseHub-related code. | 45 mins |
| **2.4: Remove BaseHub Dependencies** | Uninstall the `basehub` package from `package.json` using `pnpm remove basehub`. Run `pnpm install` to update the lockfile. Delete the `basehub.config.ts` file and the `src/lib/basehub/` directory. | 15 mins |
| **2.5: Final Testing** | Thoroughly test the changelog pages locally to ensure they are functioning correctly with the new Sanity.io data source. Test both the list view and individual post views. | 30 mins |

### Post-Sprint: Cleanup & Optimization

- **Remove `SKIP_REMOTE_DATA`:** Remove the `SKIP_REMOTE_DATA` environment variable from Vercel and any related conditional code in the application.
- **Update Documentation:** Update the `README.md` and `DEPLOYMENT.md` files to reflect the new Sanity integration and remove references to BaseHub.
- **Vercel Environment Variables:** Ensure that the `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_TOKEN` environment variables are correctly set in the Vercel project settings.
- **Delete BaseHub Environment Variables:** Remove `BASEHUB_TOKEN` and `CONTACT_EVENTS_INGEST_KEY` from Vercel.

---

## Airtable Integration Status

### Verification Report Summary

A previous agent ("Codex") completed Sprint 1 verification of the Airtable integration on November 13, 2025. The following is a summary of the findings:

#### Airtable Setup ✅

- **Base Name:** Bespoke Ethos CRM
- **Base ID:** `appDG8eZQE9oG8gPY`
- **Contact Table ID:** `tblIWtgkqJd2mhWj6`
- **Newsletter Table ID:** `tbllMAx256vCwKVFq`
- **API Token:** Created with `data.records:read` and `data.records:write` scopes

#### Local Testing Results

**Contact Form:**
- ✅ Airtable record created (module-level smoke via API)
- ✅ All fields populated correctly (verified record payload)
- ✅ No console errors
- ⚠️ Form submission blocked by Turnstile in CLI environment (requires browser testing)

**Newsletter Form:**
- ✅ Airtable record created (direct POST to Leads table)
- ✅ Email field populated correctly
- ✅ No console errors
- ⚠️ UI path still needs live exercise once Turnstile is satisfied

**Code Quality:**
- ✅ `pnpm run lint` passed
- ✅ `pnpm run typecheck` passed
- ✅ `pnpm run build` succeeded (only case-sensitivity warnings)

#### Remaining Work

- **Production Deployment:** Environment variables need to be added to Vercel (if not already done)
- **Live Testing:** Contact and newsletter forms need to be tested in a browser environment with valid Turnstile keys
- **Email Verification:** Resend email delivery needs to be confirmed

### Airtable Table Structure

**Contact Submissions Table:**

| Field Name | Type | Description |
|------------|------|-------------|
| Name | Single line text | Contact's full name |
| Email | Email | Contact's email address |
| Company | Single line text | Contact's company name |
| Use Case | Long text | Description of the use case |
| Budget | Single select | Budget range (Under $1k, $1k-$3k, $3k-$10k, $10k+, Not sure yet) |
| Timeline | Single select | Project timeline (ASAP, 2-4 weeks, 1-3 months, Not sure yet) |
| Message | Long text | Additional message from the contact |
| Consent | Checkbox | Marketing consent |
| Submitted At | Date with time | Submission timestamp |
| IP Address | Single line text | Submitter's IP address |
| User Agent | Long text | Submitter's browser user agent |
| Status | Single select | Lead status (New, Contacted, Qualified, Closed) |

**Newsletter Subscribers Table:**

| Field Name | Type | Description |
|------------|------|-------------|
| Email | Email (primary field) | Subscriber's email address |
| Subscribed At | Date with time | Subscription timestamp |
| Status | Single select | Subscription status (Active, Unsubscribed) |
| Source | Single line text | Source of the subscription (e.g., "Website footer") |

---

## Market Research & Conversion Strategy

### Current Site Analysis

#### What's Working ✅

1. **Strong founder story** - Personal, relatable, authentic
2. **Clear value proposition** - "We take the busywork. You keep control."
3. **Trust signals** - NGLCC certified, Catalant vetted, 5+ years experience
4. **LGBTQ+ discount** - Unique differentiator, authentic to founder
5. **Product clarity** - 5 named products with clear benefits

#### Critical Issues ❌

1. **Generic branding** - Title says "Acme Site" (major SEO/brand issue)
2. **Weak hero** - Stock photo doesn't match the mockup design
3. **No pricing visibility** - Founders need to know costs upfront
4. **Buried CTAs** - "Get Started" competes with "Automate My #1 Task"
5. **No social proof above fold** - Testimonials exist but not prominent
6. **Newsletter form broken** - Needs Airtable integration (partially addressed)

### Pricing Reality

Based on market research:

- AI consultants charge **$200-$350/hour**
- Entry packages: **$10K-$50K**
- Small business sweet spot: **$1K-$3K** for starter projects
- **Bespoke Ethos advantage:** Can undercut with productized offerings

### What Small Business Founders Actually Want

1. **Transparent pricing** - No "contact for quote" approach
2. **Fast ROI proof** - Show time saved in hours/week
3. **No technical jargon** - Speak their pain, not tech specs
4. **Risk reduction** - Free assessment, money-back guarantee
5. **Peer validation** - Other founders' success stories

### Competitor Analysis

**Top Players Reviewed:**
- RTS Labs
- Opinosis Analytics
- Business Plus AI
- InData Labs

**What They Do Well:**
- Clear pricing tiers
- Case studies with ROI metrics
- Free consultation CTAs
- Industry-specific solutions

**What They Miss (Bespoke Ethos Opportunity):**
- No founder-to-founder authenticity
- Generic corporate voice
- No LGBTQ+ focus
- No Cleveland local advantage
- No productized AI (they sell hours, not solutions)

### Conversion Optimization Strategy

The research suggests that the current site likely converts around **1-2%**. By implementing data-driven changes, the target is an industry-standard **3-5% conversion rate**, potentially doubling or tripling customer acquisition from the same traffic.

**Key Recommendations:**

1. **Hero Section Must Have:**
   - Clear headline (problem + solution)
   - Subheadline (how it works)
   - Primary CTA (one action only)
   - Trust badge or social proof
   - Hero image showing outcome, not process

2. **Above-the-Fold Priority:**
   - Value proposition (3 seconds to understand)
   - Who it's for (qualification)
   - Primary CTA (contrast color, action verb)
   - Trust signal (certification, client logos)

3. **Pricing Section:**
   - Show at least starting prices
   - Package comparison table
   - "Most Popular" badge on mid-tier
   - Money-back guarantee if applicable

4. **Social Proof Placement:**
   - Testimonials with photo + company
   - Specific results (saved X hours/week)
   - Video testimonials > text
   - Place after value prop, before pricing

5. **CTA Strategy:**
   - Primary: "Start Free Assessment"
   - Secondary: "See Pricing"
   - Tertiary: "Book a Call"
   - Repeat primary CTA every 2 scrolls

---

## Detailed Task Breakdown

### Immediate Priority: Sanity Migration

**Status:** Not Started  
**Estimated Time:** 4-6 hours  
**Blocking Issue:** BaseHub runtime errors

See the [Migration Plan: BaseHub to Sanity](#migration-plan-basehub-to-sanity) section for detailed tasks.

### Secondary Priority: Conversion Optimization

**Status:** Planned  
**Estimated Time:** TBD  
**Dependencies:** Sanity migration must be complete

This work is outlined in the "Sprint 2: The Final Gloss Conversion Redesign" section of the `BespokeEthos_TheFounder-FocusedConversionAttackPlan.md` document. Key tasks include:

- Restructure homepage layout
- Implement new hero section with mockup design
- Add pricing transparency
- Optimize CTA placement
- Enhance social proof visibility

### Tertiary Priority: Production Testing

**Status:** Partially Complete  
**Estimated Time:** 1-2 hours  
**Dependencies:** None (can be done in parallel)

- Test contact form end-to-end in production
- Test newsletter form end-to-end in production
- Verify Resend email delivery
- Verify Airtable record creation

---

## Resources & References

### Documentation Files

The following files were consolidated to create this document:

1. **agent_instructions.md** - Instructions for AI agents taking over the project
2. **BESPOKEETHOSMARKETRESEARCH&CONVERSIONANALYSIS.md** - Market research and conversion analysis
3. **BespokeEthos_TheFounder-FocusedConversionAttackPlan.md** - Detailed conversion optimization plan
4. **cms_research.md** - Research on CMS alternatives to BaseHub
5. **COMPREHENSIVEGUIDANCEFORCODEXAGENTS.md** - Comprehensive technical guidance
6. **current_state.md** - Current project state and context
7. **QUICK_REFERENCE.md** - Quick reference cheat sheet
8. **README.md** - Codex agent briefing package
9. **sprint_roadmap.md** - Sprint roadmap for the migration
10. **user_instructions.md** - User-facing instructions for the migration
11. **Verification_Report_COMPLETED.md** - Sprint 1 verification report

### Key URLs

- **Live Site:** [www.bespokeethos.com](https://www.bespokeethos.com)
- **GitHub Repository:** [github.com/Uptonr3421/bespoke-ethos](https://github.com/Uptonr3421/bespoke-ethos)
- **Vercel Project:** [vercel.com/upton-rands-projects/bespoke-ethos](https://vercel.com/upton-rands-projects/bespoke-ethos)
- **Airtable Tokens:** [airtable.com/create/tokens](https://airtable.com/create/tokens)

### Available MCP Integrations

The following MCP servers are available for this project:

- **Vercel:** Deploy, manage environment variables, view logs
- **GitHub:** Clone, commit, push, manage repository
- **Airtable:** Read/write data, manage tables
- **Cloudflare:** Workers, R2, KV, D1
- **Stripe:** Payments (if needed in future)
- **Playwright:** Browser automation
- **Sentry:** Error monitoring
- **Canva:** Design assets
- **Gmail:** Email notifications

### Success Criteria

The migration is complete when:

1. ✅ Site loads without errors at [www.bespokeethos.com](https://www.bespokeethos.com)
2. ✅ Changelog displays content from Sanity
3. ✅ All BaseHub code is removed
4. ✅ Vercel builds succeed
5. ✅ Contact form still works with Airtable
6. ✅ Documentation is updated

---

## Next Steps

1. **Review and Approve:** Review this consolidated documentation and the accompanying task list.
2. **Begin Sprint 1:** Start the Sanity.io setup and initial integration.
3. **Provide Credentials:** Provide necessary credentials for Sanity.io as they are generated during the setup process.
4. **Complete Sprint 2:** Migrate content and remove all BaseHub dependencies.
5. **Production Testing:** Verify all functionality in the live production environment.
6. **Conversion Optimization:** Implement the conversion-focused redesign outlined in the market research.

---

**Document Version:** 1.0  
**Last Updated:** November 14, 2025
