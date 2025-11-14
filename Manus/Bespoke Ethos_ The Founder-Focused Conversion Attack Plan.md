# Bespoke Ethos: The Founder-Focused Conversion Attack Plan

**Authored by:** Manus AI
**Date:** November 13, 2025

---

## 1. Executive Summary: The Path to 3x More Customers

Upton, your story and your productized services give you a powerful, authentic edge in a market of generic AI consultants. Your target customers—fellow small business founders—are tired of expensive, opaque solutions. They want a guide who understands their struggle, offers clear pricing, and delivers fast results. Your website is close, but it's currently held back by critical conversion blockers.

My research into your competitors and 2025's B2B conversion best practices reveals a clear path forward. The current site likely converts around **1-2%**. By implementing the data-driven changes in this plan, we can realistically target an industry-standard **3-5% conversion rate**, potentially doubling or tripling your customer acquisition from the same traffic.

**Your Core Advantages to Leverage:**

| Advantage | Competitor Weakness | How to Win |
| :--- | :--- | :--- |
| **Founder Authenticity** | Generic corporate voice | Lead with your story, not just tech. |
| **Productized Services** | Selling expensive, slow "hours" | Offer fixed-price, fast-turnaround solutions. |
| **Transparent Pricing** | Opaque "contact for quote" models | Show your prices and packages upfront. |
| **Niche Focus (LGBTQ+)** | Broad, impersonal marketing | Double down on your unique discount and community support. |
| **Local Trust (Cleveland)** | National, faceless firms | Mention your local roots to build trust with regional clients. |

This plan is structured into two sprints. **Sprint 1** is a verification and bug-fix pass for your Codex agents. **Sprint 2** is the "Final Gloss," a conversion-focused redesign that I will execute.

---

## 2. Sprint 1: Codex Agent Verification & Bug Fix

**Objective:** Verify the Airtable integration is complete and bug-free. If not, complete it. This ensures a stable foundation before the redesign.

### Step 1: Pull and Verify Latest Code

First, ensure you have the latest code. It appears the agents have not pushed their changes yet. Once they do, run these commands:

```bash
# Navigate to the project directory
cd /home/ubuntu/bespoke-ethos

# Pull the latest changes from the main branch
git pull origin main

# Check the latest commit to see what changed
git log -1 --stat
```

### Step 2: Run Local Checks

Before any manual testing, ensure the codebase is healthy.

```bash
# Install any new dependencies
pnpm install

# Run linting and TypeScript checks
pnpm run check
```

**Expected Outcome:** The `check` command should pass with zero errors or warnings. If it fails, the agents must fix the issues before proceeding.

### Step 3: The Sprint 1 Verification Checklist

This is a pass/fail checklist. The agents must ensure every item is checked before handing off.

#### **Code & Environment**
- [ ] **Airtable Variables Added:** The `.env.example` file contains `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_CONTACT_TABLE_ID`, and `AIRTABLE_NEWSLETTER_TABLE_ID`.
- [ ] **No Build Errors:** `pnpm run build` completes successfully.
- [ ] **No Console Errors:** The browser console is clean when running the site locally.

#### **Contact Form Functionality**
- [ ] **Submits Successfully:** Filling out and submitting the `/contact` form shows the "Thanks!" message.
- [ ] **Email Received:** A notification email arrives at `contact@bespokeethos.com`.
- [ ] **Airtable Record Created:** A new record appears in the "Contact Submissions" table in Airtable with all form fields correctly mapped.
- [ ] **Turnstile Works:** The form cannot be submitted without the Turnstile challenge passing.

#### **Newsletter Form Functionality**
- [ ] **Submits Successfully:** Submitting an email in the footer newsletter form shows a success message.
- [ ] **Airtable Record Created:** A new record appears in the "Newsletter Subscribers" table in Airtable.
- [ ] **Handles Duplicates:** Attempting to subscribe with the same email does not create a duplicate record (Airtable's primary key on the email field should handle this).

**If any of these checks fail, the Codex agents must fix them before the final gloss can begin.**

---

## 3. Sprint 2: The "Final Gloss" Conversion Redesign

**Objective:** Restructure the homepage layout to align with data-driven best practices that convert small business founders. This is the plan I will execute after Sprint 1 is verified.

### The New Homepage Layout (Section by Section)

#### **Section 1: The Hero (Above the Fold)**
*Goal: Grab attention, state the value prop, and provide a single, clear call-to-action.*

- **Headline:** `NO RESOURCES. NO PROBLEM. JUST YOU AND AI.` (Keep as is - it's strong).
- **Sub-headline:** `Unlock your potential. Partner with AI designed for founders, by a founder.` (More personal).
- **Primary CTA:** A single, high-contrast button: `[ Start Your Free Assessment ]`.
- **Secondary CTA:** A text link next to it: `See Pricing →`.
- **Hero Image:** Replace the current stock photo with the `hero_mockup-styleguide.png` design.
- **Trust Bar:** Move the NGLCC, Catalant, and LGBTQ+ discount badges directly below the CTA buttons.

#### **Section 2: Social Proof (As Seen On)**
*Goal: Build immediate trust by showing that peers have succeeded.*

- **Headline:** `Trusted by Founders Like You`
- **Content:** Display 3-4 of your best client testimonials prominently. Each should have a headshot, name, company, and a specific result (e.g., "Saved us 10+ hours a week").

#### **Section 3: The Problem (Empathy)**
*Goal: Show the visitor you understand their specific pain points.*

- **Headline:** `Does This Sound Familiar?`
- **Content:** A checklist of common founder frustrations.
  - `☐ Drowning in busywork, not building the business`
  - `☐ Enterprise AI tools are too expensive and complex`
  - `☐ Off-the-shelf automations break or don't fit`
  - `☐ Know you need AI, but don't know where to start`

#### **Section 4: The Solution (Your Products)**
*Goal: Present your services as clear, tangible solutions to their problems.*

- **Headline:** `Your AI Toolkit for Growth`
- **Content:** Use a card-based layout to feature your top 2-3 offerings and the free assessment.
  - **Card 1: Cadence™** - "Your AI Second Brain." - *Starting at $997/mo*
  - **Card 2: Flowstack™** - "Automate Your #1 Bottleneck." - *Starting at $1,497*
  - **Card 3: Free Assessment** - "Not Sure Where to Start?" - *Free 30-Min Call*

#### **Section 5: The Founder Story**
*Goal: Build a personal connection and establish your authority.*

- **Action:** Keep the existing "My First Business Almost Broke Me" section. It is excellent and highly effective.

#### **Section 6: Why You? (The Differentiator)**
*Goal: Clearly show why you are the better choice over expensive consultants.*

- **Headline:** `The Founder-Friendly Advantage`
- **Content:** A simple comparison table.

| Feature | Typical AI Consultant | Bespoke Ethos |
| :--- | :--- | :--- |
| **Pricing** | $200-$350/hour | Fixed, Productized Packages |
| **Entry Cost** | $10,000 - $50,000 | Starting at $997 |
| **Timeline** | Months | Weeks |
| **Approach** | Corporate & Complex | Founder-led & Practical |
| **Community** | None | 25% LGBTQ+ Founder Discount |

#### **Section 7: Final Call-to-Action**
*Goal: Make a final, compelling offer before the footer.*

- **Headline:** `Ready to Reclaim Your Time?`
- **Sub-headline:** `Book a free, no-pressure 30-minute assessment to discover your #1 automation opportunity.`
- **CTA:** A large, centered button: `[ Start My Free Assessment ]`

---

## 4. Implementation Guide for Codex Agents (Without MCP)

This section translates my MCP-powered workflow into steps your agents can take using standard web tools and APIs.

### **Airtable Setup & Integration**

1.  **Create the Base:** Manually log in to Airtable and create a new base named `Bespoke Ethos CRM`.
2.  **Create Tables:** Inside the base, create the two tables (`Contact Submissions`, `Newsletter Subscribers`) with the exact field names and types specified in the Sprint 1 prompt.
3.  **Get Credentials:**
    *   Find your **API Key** in your Airtable Account settings.
    *   Find the **Base ID** and **Table IDs** in the Airtable API documentation for your new base.
4.  **API Calls:** Use the native `fetch` API in your Next.js API routes. The Airtable API is a standard REST API. Here is a template:

    ```typescript
    // Example for adding a contact record in /api/contact/route.ts
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_CONTACT_TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: { /* Your form data here */ } }),
      }
    );
    ```

### **Vercel Management**

1.  **Environment Variables:** Manually log in to the Vercel dashboard, navigate to the `bespoke-ethos` project settings, and add the Airtable credentials there.
2.  **Check Deployments:** Monitor build status and logs directly in the Vercel dashboard after pushing to the `main` branch.

### **Asset Generation (e.g., Hero Image)**

1.  **Canva:** Manually log in to Canva to create any required graphics, such as the pricing table or new social proof images.
2.  **Image Generation:** If you need new AI-generated assets, use the `pnpm run generate:images` script in the repo, which uses the OpenAI API key configured in your environment.

By following this plan, your agents can complete all necessary backend work, paving the way for the final conversion-focused redesign. I am ready to begin the "Final Gloss" sprint as soon as Sprint 1 is verified.
