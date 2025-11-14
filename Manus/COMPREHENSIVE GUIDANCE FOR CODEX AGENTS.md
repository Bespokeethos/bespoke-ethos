# COMPREHENSIVE GUIDANCE FOR CODEX AGENTS
## Bespoke Ethos Final Implementation Phase

---

## PROJECT CONTEXT SUMMARY

**Repository**: `https://github.com/Uptonr3421/bespoke-ethos`  
**Deployment Platform**: Vercel  
**Vercel Project ID**: `prj_8cbai6JzE169NUytyFtCpSohZVka`  
**Vercel Domain**: `bespoke-ethos.vercel.app`  
**Custom Domains**: `www.bespokeethos.com` and `bespokeethos.com`  
**Deployment Strategy**: Main branch only (no feature branches)  
**Tech Stack**: Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript

**Environment Variables** (all synced to Vercel):
- `BASEHUB_TOKEN` - BaseHub CMS integration (currently used)
- `RESEND_API_KEY` - Email notifications (configured for contact form)
- `AIRTABLE_API_KEY` - Available for migration from BaseHub
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET` - Cloudflare spam protection
- `CONTACT_EVENTS_INGEST_KEY` - BaseHub events persistence (optional)

---

## CURRENT STATUS ANALYSIS

### ✅ WORKING
- **Calendly Integration**: Functioning properly
- **Contact Form Backend**: `/api/contact/route.ts` is fully implemented with:
  - Resend email integration (sends to `contact@bespokeethos.com`)
  - Cloudflare Turnstile verification
  - BaseHub event persistence
  - Rate limiting (10 requests/minute per IP)
  - Form and JSON POST support

### ❌ BROKEN / NEEDS VERIFICATION
1. **Contact Form** - Backend works, but frontend may have issues
2. **Turnstiles** - Configured but status uncertain
3. **Mailing List** - Newsletter section relies on BaseHub, needs Airtable migration

---

## ANSWERS TO YOUR SPECIFIC QUESTIONS

### 1. COMPREHENSIVE STYLE GUIDE REQUEST

Based on my analysis of the codebase, here's what exists and what's missing:

#### ✅ WHAT YOU ALREADY HAVE

**Brand Foundations:**
- **Primary Brand Color**: Cyan/Turquoise (`#00D4FF` family) - visible in logo and hero mockup
- **Typography System**: 
  - Sans: `var(--font-sans)` (likely Inter or similar)
  - Mono: `var(--font-mono)`
  - Full size scale from `2xs` (11px) to `9xl` (8rem) with negative letter-spacing
- **Color System**: Dynamic accent + grayscale with full 50-950 scale
  - Accent colors: `--accent-rgb-{50-950}` (customizable via CSS variables)
  - Grayscale: `--grayscale-rgb-{50-950}`
  - Semantic colors: `text-primary/secondary/tertiary`, `surface-primary/secondary/tertiary`
- **Logo**: Available in `Guides/LOGO-optimized-blackwhitebg.png` and `LOGO-optimized-whitebg.png`
- **Voice/Tone**: From `founders-bible.txt` - "Designed for founders, by founders" - empathetic, practical, Cleveland-based

**Layout & Component Specs:**
- **Design Tokens**:
  - Spacing: Tailwind default scale
  - Border radii: `rounded-md` (standard), `rounded-9999px` (pills)
  - Shadows: Custom `neon` shadow, standard Tailwind shadows
  - Header height: `--header-height: 56px`
- **Breakpoints**: Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Navigation**: Header component exists in `src/app/_components/header`
- **Hero Effects**: 
  - `.be-hero-aurora` class with subtle gradient overlay
  - Muted natural hues (sage, slate, plum)
  - Blur + saturation filters
- **Button States**: Defined in `src/common/button.tsx`
- **Form Styling**: Consistent across contact page - rounded borders, focus states with accent colors
- **Accessibility**: Focus-visible styles with accent colors, dark mode support

**Animations:**
- Slide (down/up), scale (in/out), fade (in/out), enter/exit (left/right)
- Timing: 200-300ms with easing functions
- Pulse animation for loading states

**Dark Mode:**
- Class-based (`class="dark"`)
- Full semantic color system with `dark:` variants
- Selection and focus styles adapted for both themes

#### ⚠️ WHAT'S MISSING (NEEDS CLARIFICATION)

1. **Exact Brand Colors**: The hero mockup shows cyan/turquoise, but the CSS uses dynamic `--accent-rgb-*` variables. Need confirmation:
   - What are the exact hex values for primary/secondary brand colors?
   - Current implementation allows theme switching - is this intentional?

2. **Iconography Style**: 
   - Project uses `@tabler/icons-react` (3.21.0)
   - Hero mockup shows custom line-art icons (shop, gears, chart, coffee, etc.)
   - Are these custom SVGs or should we use Tabler icons throughout?

3. **Hero Image Composition**:
   - Mockup shows woman with laptop + floating tech icons
   - Is this a stock photo or custom asset?
   - Do you have the source files for the floating icon graphics?

4. **Pricing Table Details**: 
   - `src/config/pricing.ts` exists but needs review
   - What are the current pricing tiers and features?

5. **Performance Budgets**:
   - No explicit thresholds defined
   - Recommend: LCP < 2.5s, CLS < 0.1, image weight < 500KB per page

#### 📋 RECOMMENDED ACTIONS

**For the Codex agents:**

1. **Extract existing design tokens** from `tailwind.config.ts` and `globals.css` into a single reference document
2. **Document component patterns** by reviewing all files in `src/common/` and `src/app/_components/`
3. **Create asset inventory** from `public/` and `Guides/` directories
4. **Map content structure** from the existing page components in `src/app/`

**What you DON'T need to create from scratch:**
- Typography system (fully defined)
- Color system (architecture exists, just needs color values confirmed)
- Layout primitives (Section, Container components exist)
- Animation system (complete in Tailwind config)
- Dark mode infrastructure (working)

**What you DO need to finalize:**
- Exact brand color hex values
- Icon asset library (custom vs. Tabler)
- Hero image sourcing strategy
- Content copy for all sections
- SEO metadata templates

---

### 2. AIRTABLE MIGRATION STRATEGY

**Current State:**
- Newsletter section (`src/app/_sections/newsletter/index.tsx`) uses BaseHub `sendEvent()` API
- Contact form uses BaseHub optionally via `CONTACT_EVENTS_INGEST_KEY`
- Both can be migrated to Airtable

**Migration Plan:**

#### A. AIRTABLE BASE STRUCTURE

Create a base with these tables:

**Table 1: Contact Submissions**
- Fields:
  - `Name` (Single line text)
  - `Email` (Email)
  - `Company` (Single line text)
  - `Use Case` (Long text)
  - `Budget` (Single select: "Under $1k", "$1k-$3k", "$3k-$10k", "$10k+", "Not sure yet")
  - `Timeline` (Single select: "ASAP", "2-4 weeks", "1-3 months", "Not sure yet")
  - `Message` (Long text)
  - `Consent` (Checkbox)
  - `Submitted At` (Date with time)
  - `IP Address` (Single line text)
  - `User Agent` (Long text)
  - `Status` (Single select: "New", "Contacted", "Qualified", "Closed")

**Table 2: Newsletter Subscribers**
- Fields:
  - `Email` (Email, primary field)
  - `Subscribed At` (Date with time)
  - `Status` (Single select: "Active", "Unsubscribed")
  - `Source` (Single line text: "Website footer", "Landing page", etc.)

**Table 3: Calendar Events** (Optional - for Google Calendar sync)
- Fields:
  - `Contact Name` (Link to Contact Submissions)
  - `Email` (Email)
  - `Event Type` (Single select: "Consultation", "Follow-up", "Demo")
  - `Scheduled At` (Date with time)
  - `Google Calendar ID` (Single line text)
  - `Status` (Single select: "Scheduled", "Completed", "Cancelled")

#### B. CODE CHANGES NEEDED

**1. Contact Form API Route** (`src/app/api/contact/route.ts`):

Replace the BaseHub `sendEvent()` section (lines 170-178) with Airtable API call:

```typescript
// Add to imports at top
// Note: No Airtable SDK needed - use fetch API

// Replace BaseHub persistence section with:
const airtableApiKey = process.env.AIRTABLE_API_KEY;
const airtableBaseId = process.env.AIRTABLE_BASE_ID;
const airtableTableId = process.env.AIRTABLE_CONTACT_TABLE_ID;

if (airtableApiKey && airtableBaseId && airtableTableId) {
  try {
    await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Company: sanitize(data.company),
            "Use Case": sanitize(data.useCase),
            Budget: sanitize(data.budget),
            Timeline: sanitize(data.timeline),
            Message: sanitize(data.message || "(no message)"),
            Consent: Boolean(sanitize(data.consent)),
            "Submitted At": now,
            "IP Address": ip,
            "User Agent": userAgent,
            Status: "New",
          },
        }),
      }
    );
    console.info("[CONTACT_FORM_SUBMISSION] Saved to Airtable successfully");
  } catch (e) {
    console.error("[CONTACT_FORM_SUBMISSION] Failed to save to Airtable:", e);
  }
}
```

**2. Newsletter Section** (`src/app/_sections/newsletter/index.tsx`):

Complete rewrite needed - remove BaseHub Pump and create a new API route:

Create `/src/app/api/newsletter/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableId = process.env.AIRTABLE_NEWSLETTER_TABLE_ID;

    if (!airtableApiKey || !airtableBaseId || !airtableTableId) {
      console.error("Airtable credentials not configured");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Email: email,
            "Subscribed At": new Date().toISOString(),
            Status: "Active",
            Source: "Website footer",
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Airtable API error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

Update `src/app/_sections/newsletter/index.tsx`:

```typescript
"use client";
import * as React from "react";
import { Section } from "@/common/layout";
import { Input } from "@/common/input";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <Section
      className="bg-surface-secondary dark:bg-dark-surface-secondary py-10!"
      container="full"
    >
      <div className="container mx-auto flex flex-col gap-4 px-6 lg:flex-row lg:justify-between">
        <div className="flex flex-1 flex-col items-start gap-1">
          <h5 className="text-xl font-medium lg:text-2xl">Stay Updated</h5>
          <p className="text text-text-tertiary dark:text-dark-text-tertiary lg:text-lg">
            Get AI insights and updates delivered to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === "loading"}
              className="rounded-md border border-border bg-surface-primary px-3 py-2 outline-none ring-0 focus:border-accent-primary/60 dark:border-dark-border dark:bg-dark-surface-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </div>
          {status === "success" && (
            <p className="text-sm text-success">Thanks for subscribing!</p>
          )}
          {status === "error" && (
            <p className="text-sm text-error">Failed to subscribe. Please try again.</p>
          )}
        </form>
      </div>
    </Section>
  );
}
```

**3. Environment Variables to Add:**

Add to `.env.local` and Vercel:
```
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_CONTACT_TABLE_ID=tblXXXXXXXXXXXXXX
AIRTABLE_NEWSLETTER_TABLE_ID=tblXXXXXXXXXXXXXX
```

#### C. GOOGLE CALENDAR INTEGRATION (OPTIONAL)

**Free Option**: Use Zapier free tier or Make.com (formerly Integromat)
- Trigger: New record in Airtable "Contact Submissions"
- Action: Create Google Calendar event
- Limitation: 100 tasks/month on free tier

**Code Option**: Use Google Calendar API directly
- Requires OAuth setup (more complex)
- No task limits
- Need to add `googleapis` package

**Recommendation**: Start with Zapier/Make.com for MVP, migrate to code if volume increases.

---

### 3. TESTING REQUIREMENTS

Based on the question "Write tests for @filename", here's what needs testing:

#### PRIORITY 1: CRITICAL PATH TESTS

**Contact Form** (`src/app/api/contact/route.ts`):
- ✅ Email validation
- ✅ Rate limiting (10 req/min per IP)
- ✅ Turnstile verification
- ✅ Resend email sending
- ⚠️ Airtable persistence (add after migration)
- ✅ Form redirect on success/error

**Newsletter API** (new file):
- Email validation
- Airtable persistence
- Error handling
- Duplicate email handling

#### PRIORITY 2: COMPONENT TESTS

**Contact Page** (`src/app/contact/page.tsx`):
- Form renders all fields
- Required field validation
- Turnstile widget loads
- Success/error messages display

**Newsletter Section** (`src/app/_sections/newsletter/index.tsx`):
- Form submission
- Loading states
- Success/error messages

#### PRIORITY 3: INTEGRATION TESTS

**End-to-End Contact Flow**:
1. User fills form
2. Turnstile verification passes
3. Email sent via Resend
4. Record created in Airtable
5. Success message shown
6. Email arrives at `contact@bespokeethos.com`

**End-to-End Newsletter Flow**:
1. User enters email
2. Record created in Airtable
3. Success message shown
4. No duplicate entries

#### TEST FRAMEWORK RECOMMENDATION

Since you're using Next.js 16, use:
- **Vitest** for unit/integration tests (faster than Jest)
- **Playwright** for E2E tests (you have the MCP server configured!)

Add to `package.json`:
```json
"devDependencies": {
  "vitest": "^2.0.0",
  "@vitejs/plugin-react": "^4.3.0",
  "@playwright/test": "^1.47.0"
}
```

---

## FINAL IMPLEMENTATION CHECKLIST

### Phase 1: Airtable Setup (Do First)
- [ ] Create Airtable base with 2-3 tables
- [ ] Get API key and IDs
- [ ] Add environment variables to Vercel
- [ ] Test API connection with curl/Postman

### Phase 2: Code Migration
- [ ] Update contact form API route for Airtable
- [ ] Create newsletter API route
- [ ] Update newsletter section component
- [ ] Remove BaseHub dependencies (optional - can coexist)
- [ ] Test locally with `pnpm dev`

### Phase 3: Testing & Verification
- [ ] Submit test contact form
- [ ] Verify email arrives at `contact@bespokeethos.com`
- [ ] Verify record appears in Airtable
- [ ] Submit test newsletter signup
- [ ] Verify record appears in Airtable
- [ ] Test Turnstile verification

### Phase 4: Deployment
- [ ] Push to main branch
- [ ] Verify Vercel build succeeds
- [ ] Test on production domains
- [ ] Monitor Vercel logs for errors

### Phase 5: Optional Enhancements
- [ ] Set up Zapier/Make.com for Google Calendar
- [ ] Add email confirmation for newsletter signups
- [ ] Create Airtable views for status tracking
- [ ] Set up Airtable automations for notifications

---

## FREE TOOLS RECOMMENDATION

To meet your "free packages ftw" requirement:

**Email Notifications**: 
- ✅ Resend (3,000 emails/month free) - ALREADY CONFIGURED
- Alternative: SendGrid (100 emails/day free)

**Spam Protection**:
- ✅ Cloudflare Turnstile (unlimited, free) - ALREADY CONFIGURED
- Better than reCAPTCHA (more privacy-friendly)

**Database/CRM**:
- ✅ Airtable (1,200 records/base, unlimited bases on free tier)
- Perfect for low-volume startup

**Calendar Integration**:
- ✅ Zapier (100 tasks/month free)
- ✅ Make.com (1,000 operations/month free) - BETTER OPTION
- ✅ Google Calendar API (free, unlimited) - BEST IF YOU CODE IT

**Monitoring**:
- ✅ Vercel Analytics (included with deployment)
- ✅ Sentry (5,000 errors/month free) - YOU HAVE MCP ACCESS

---

## QUESTIONS FOR YOU (OWNER)

Before the Codex agents proceed, please clarify:

1. **Brand Colors**: What are the exact hex values for your primary brand color? (The cyan in your logo)
2. **Airtable Base**: Do you already have an Airtable base set up, or should we create one from scratch?
3. **Google Calendar**: Is auto-adding to Google Calendar a must-have or nice-to-have?
4. **BaseHub**: Do you want to completely remove BaseHub, or keep it for CMS content while using Airtable for forms?
5. **Testing Priority**: Which is more important - getting it working fast, or having comprehensive tests?

---

## READY FOR HANDOFF

Once you answer the questions above, the Codex agents can:
1. Create the Airtable base structure
2. Update the code for both forms
3. Write tests
4. Deploy to production

Estimated time: 2-4 hours for full implementation + testing.

**No blockers identified** - all dependencies are already installed, environment is configured, and the architecture is sound.
