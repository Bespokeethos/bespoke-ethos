# AGENT 3: COPY/SEO & CONTENT STRATEGY - COMPLETE GUIDE

**Role:** Content Creation, SEO Optimization, Metadata Management, Cleveland Local Positioning  
**Timeline:** 6-8 hours  
**Dependencies:** Research Agent findings, Design Agent specifications  
**Output Location:** c:\vercel\manus\copy-seo-specifications.md + page copy files  
**Log Actions To:** c:\vercel\manus\faceliftlog.md  

---

## MISSION

Write all website copy, optimize for 2025 SEO standards using Next.js 16 metadata API, position Bespoke Ethos as Cleveland's #1 small business automation platform, and implement structured data for search engine understanding.

---

## PHASE 1: SEO FOUNDATION & STRATEGY (1-2 hours)

### Core Web Vitals Impact on Rankings [web:86, web:87, web:93]

**Google Confirmed:** Sites with "Good" Core Web Vitals get ranking boost
- **LCP <2.5s:** 44% faster than average
- **INP <200ms:** 43% more responsive
- **CLS <0.1:** 44% more visually stable

**Our Target:** All three metrics in "Good" range

### Keyword Research Strategy

#### Primary Keywords (Cleveland-Specific, High Intent)

**Research Instructions:**
1. Go to Google Keyword Planner (free tool)
2. Enter each keyword below
3. Document: Search volume, competition level, CPC

**Target Keywords:**
- "Cleveland small business automation" (high intent, local)
- "AI automation for small business" (commercial intent)
- "Ohio small business software" (geographic variation)
- "workflow automation Cleveland" (commercial)
- "LGBTQ+ business Cleveland" (niche, high intent)
- "AI tools for startups" (broader, high volume)

#### Long-Tail Keywords (High Intent, Lower Competition)

- "Cleveland small business automation software"
- "affordable AI automation for Ohio businesses"
- "LGBTQ+ certified AI automation Cleveland"
- "workflow automation Cleveland Ohio costs"
- "small business time-saving automation"

#### Local SEO Keywords

- "Cleveland startup automation services"
- "Ohio City small business automation"
- "University Circle automation consultant"
- "Tremont business efficiency tools"
- "West Side Market automation"

### Keyword Mapping (Page Assignment)

| Keyword | Page | Target Position | Difficulty |
|---------|------|-----------------|------------|
| Cleveland small business automation | /blog/[post] | Top 10 | Medium |
| AI automation for small business | Homepage | Top 5 | High |
| LGBTQ+ business Cleveland | /about | Top 20 | Low |
| Workflow automation Cleveland | /services/flowstack | Top 10 | Medium |
| Ohio small business software | /blog/[post] | Top 10 | Low |

---

## PHASE 2: METADATA IMPLEMENTATION (2-3 hours)

### Next.js 16 Metadata API (All Pages)

#### Homepage (app/page.tsx)

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  // Basic Meta
  title: 'AI Automation for Cleveland Small Businesses | Bespoke Ethos',
  description: 'Save 20+ hours/week with AI automation built for Cleveland small businesses. LGBTQ+ certified, affordable pricing. Trusted by 100+ businesses.',
  
  // Keywords (for reference, not in HTML)
  keywords: [
    'AI automation',
    'Cleveland small business',
    'workflow automation',
    'LGBTQ+ business',
    'small business software',
    'automation tools',
    'Ohio automation platform'
  ],
  
  // Author & Creator
  authors: [{ name: 'Bespoke Ethos Team', url: 'https://bespokethos.com' }],
  creator: 'Bespoke Ethos',
  publisher: 'Bespoke Ethos',
  
  // Canonical
  metadataBase: new URL('https://bespokethos.com'),
  alternates: {
    canonical: 'https://bespokethos.com/',
  },
  
  // Open Graph (Social Sharing - 1200x628px images)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bespokethos.com',
    siteName: 'Bespoke Ethos',
    title: 'AI Automation for Cleveland Small Businesses | Bespoke Ethos',
    description: 'Save 20+ hours/week with AI automation. LGBTQ+ certified, Cleveland-based.',
    images: [
      {
        url: 'https://bespokethos.com/og-image.png',
        width: 1200,
        height: 628,
        alt: 'Bespoke Ethos - AI Automation Dashboard',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@bespokethos',
    creator: '@upton_rand',
    title: 'AI Automation for Cleveland Small Businesses',
    description: 'Save 20+ hours/week. LGBTQ+ certified. Cleveland-based.',
    images: ['https://bespokethos.com/twitter-image.png'],
  },
  
  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
}

export default function HomePage() {
  // Page content here
}
```

#### Service Page (app/services/[slug]/page.tsx) - Dynamic Metadata

```typescript
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)
  
  return {
    title: `${service.name} - AI Automation | Bespoke Ethos`,
    description: service.metaDescription,
    keywords: service.keywords,
    openGraph: {
      title: `${service.name} - Automate Your Small Business`,
      description: service.metaDescription,
      url: `https://bespokethos.com/services/${params.slug}`,
      images: [
        {
          url: service.ogImage,
          width: 1200,
          height: 628,
        },
      ],
    },
    alternates: {
      canonical: `https://bespokethos.com/services/${params.slug}`,
    },
  }
}
```

### JSON-LD Structured Data

#### Organization Schema (app/layout.tsx)

```typescript
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bespoke Ethos',
    description: 'AI automation solutions for Cleveland small businesses. LGBTQ+ certified.',
    url: 'https://bespokethos.com',
    logo: 'https://bespokethos.com/logo.png',
    telephone: '+1-216-XXX-XXXX',
    email: 'hello@bespokethos.com',
    
    // Cleveland Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Cleveland',
      addressRegion: 'OH',
      postalCode: '44114',
      addressCountry: 'US',
    },
    
    // Geo Coordinates (Cleveland center)
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.4993,
      longitude: -81.6944,
    },
    
    // Social Media
    sameAs: [
      'https://linkedin.com/company/bespoke-ethos',
      'https://twitter.com/bespokethos',
      'https://facebook.com/bespokethos',
      'https://instagram.com/bespokethos',
    ],
    
    // Founder
    founder: {
      '@type': 'Person',
      name: 'Upton Rand',
    },
    
    // NGLCC Membership
    memberOf: {
      '@type': 'Organization',
      name: 'National LGBT Chamber of Commerce (NGLCC)',
      url: 'https://nglcc.org',
    },
    
    // Service Area (100-mile radius of Cleveland)
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 41.4993,
        longitude: -81.6944,
      },
      geoRadius: '100 miles',
    },
    
    // Contact Point
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+1-216-XXX-XXXX',
      email: 'hello@bespokethos.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

#### Product/Service Schema (For Each Service)

```typescript
export function ServiceSchema({ service }: { service: ServiceData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: service.name,
    description: service.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-Based',
    
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://bespokethos.com/services/${service.slug}`,
    },
    
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Sarah M.',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: 'This tool saved us 15+ hours per week!',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## PHASE 3: PAGE-BY-PAGE COPY (3-4 hours)

### HOMEPAGE COPY

#### H1 (Above Fold - Primary Keyword)
```
AI Automation for Cleveland Small Businesses
```

**Why This Works:**
- Primary keyword: "AI automation"
- Geographic: "Cleveland"
- Intent: "Small businesses"
- Under 60 characters ✓

#### Hero Subheading
```
Save 20+ hours per week on repetitive tasks. Stop wasting time, start automating. 
Bespoke Ethos: LGBTQ+ certified, Cleveland-based, trusted by 100+ small businesses.
```

**Why This Works:**
- Value prop (20+ hours)
- Benefit (stop wasting time)
- Social proof (100+)
- Brand positioning (LGBTQ+, Cleveland)

#### Hero CTA Copy
```
Primary: "Schedule Free Demo"
Secondary: "Get 25% LGBTQ+ Discount"
```

**Why This Works:**
- Action-oriented verbs (Schedule, Get)
- Clear benefits (Free, Discount)
- Specific offer (25%)
- LGBTQ+ focus

#### Feature Pills (Below Hero)
```
✓ Save 20+ hours/week
✓ No coding required
✓ Setup in minutes
🏳️‍🌈 LGBTQ+ Certified
```

**Why These:**
- Tangible benefits
- Accessibility ("No coding")
- Speed (Setup quick)
- Values (LGBTQ+)

### Services Section

#### Section H2
```
Four Powerful Tools. One Intelligent Platform.
```

#### Cadence Copy

**H3:**
```
Cadence: Brand Rhythm Management
```

**Description (60-80 words):**
```
Maintain consistent messaging across all channels with AI-driven content calendars. 
Schedule posts, manage multiple social platforms, and keep your brand voice unified—
all without the manual effort. Watch your social presence grow while you focus on 
what matters most: running your business.
```

**Why This Works:**
- Features (consistent messaging, content calendars)
- Benefit (unified voice)
- Use case (multiple platforms)
- Value prop (saves time)

#### Flowstack Copy

**H3:**
```
Flowstack: Workflow Automation Without Code
```

**Description (60-80 words):**
```
Connect your favorite tools and automate complex workflows in minutes. 
From email marketing to lead management, Flowstack handles the repetitive work. 
No coding, no technical skills needed. Just describe what you want to automate, 
and watch your productivity soar.
```

**Why This Works:**
- Primary use (workflow automation)
- Accessibility (no code)
- Time to value (minutes)
- Inclusive language

#### Consensus Engine Copy

**H3:**
```
Consensus Engine: Smarter Team Decisions
```

**Description (60-80 words):**
```
Make better decisions faster with AI-facilitated consensus building. 
Gather team input, analyze options, and reach decisions without endless meetings. 
Perfect for growing teams navigating complex choices across locations.
```

**Why This Works:**
- Benefit (faster, better decisions)
- Use case (team collaboration)
- Problem solved (endless meetings)
- Scalability (works remotely)

#### Redbridging Copy

**H3:**
```
Redbridging: AI You Can Trust
```

**Description (60-80 words):**
```
Ensure your AI systems are accurate, fair, and aligned with your values. 
Redbridging monitors AI performance in real-time, catches errors before they matter, 
and keeps your business compliant. Sleep well knowing your automation is trustworthy.
```

**Why This Works:**
- Trust/safety angle
- Real benefit (compliance)
- Emotional appeal (sleep well)
- Specificity (real-time monitoring)

### SERVICES PAGES

#### Flowstack Service Page Structure

**URL:** `/services/flowstack`

**H1:**
```
Flowstack: Workflow Automation Without Code
```

**Subheading (H2):**
```
Connect Your Tools. Automate Your Business. Save 20+ Hours Per Week.
```

**Opening Paragraph:**
```
Manual workflows waste time. Flowstack automates the repetitive tasks 
that eat up your day—from email follow-ups to lead management to data entry. 
Connect the tools you already use, set up workflows in minutes, and watch 
your productivity multiply. No coding. No complications. Just automation 
that actually works for small businesses.
```

**H2: What Is Flowstack?**
```
Flowstack is an AI-powered workflow automation platform designed specifically 
for small business owners who don't have IT departments. Think of it as a 
tireless assistant that handles your routine tasks 24/7, so you can focus 
on growing your business.

Built for Cleveland small businesses and startups, Flowstack makes automation 
accessible—no technical skills required.
```

**H2: Key Features**

**H3: Visual Workflow Builder**
```
Drag-and-drop interface makes automation intuitive. No coding needed. 
Just point-and-click to connect your tools.
```

**H3: 500+ Integrations**
```
Connect Gmail, Slack, Airtable, Salesforce, Stripe, Shopify, QuickBooks, 
and 490+ other apps. If it has an API, we connect it.
```

**H3: AI-Assisted Setup**
```
Describe your workflow in plain English. Our AI suggests the best automation 
strategy and sets it up for you.
```

**H3: Real-Time Monitoring**
```
See every action as it happens. Debug issues instantly with detailed logs 
and error notifications.
```

**H2: Use Cases**

**H3: Lead Management Automation**
```
New form submission → Add to CRM → Send welcome email → Notify sales team

Your leads are captured, qualified, and followed up automatically. 
Never miss a lead again.
```

**H3: Social Media Scheduling**
```
Blog post published → Share on Twitter → Post to LinkedIn → Update analytics

Amplify your reach without manual posting.
```

**H3: Invoice Processing**
```
Invoice received → Extract data → Update accounting → Email for approval

Process invoices in seconds instead of minutes.
```

**H3: Customer Onboarding**
```
Customer signs up → Create account → Send welcome kit → Schedule call

Automate your entire customer onboarding flow.
```

**H2: Pricing**
```
[Pricing table with transparent monthly pricing]

No setup fees. Cancel anytime. 14-day free trial.
```

**H2: Ready to Automate?**
```
Start your free 14-day trial. No credit card required. 
Setup takes minutes. Results are immediate.

[CTA Button: "Start Free Trial"]
[Secondary Link: "Schedule Demo"]
```

### ABOUT PAGE COPY

**H1:**
```
About Bespoke Ethos: Cleveland's LGBTQ+ AI Automation Leader
```

**H2: Our Mission**
```
We empower small businesses with intelligent automation tools that level the playing 
field. Founded by LGBTQ+ entrepreneurs in Cleveland, we combine cutting-edge AI with 
deep community commitment.

Our mission: Help Cleveland's small businesses compete with enterprises 
by putting powerful automation within reach—affordably, accessibly, and with pride.
```

**H2: Our Story**
```
[Founder narrative about starting in Cleveland, recognizing the gap in the market, 
building Cadence, Flowstack, Consensus Engine, Redbridging]

Today, 100+ Cleveland small businesses use our platform to save thousands of 
hours and dollars annually. We're just getting started.
```

**H2: Why Cleveland?**
```
Cleveland has incredible entrepreneurs building amazing businesses. 
We built Bespoke Ethos here because this is our home. We shop at West Side Market. 
We work in Ohio City offices. We believe in this community—and we're committed 
to helping it thrive.
```

**H2: Our Values**

**H3: Community First**
```
25% of profits support LGBTQ+ and minority-owned small businesses.
```

**H3: Accessibility Over Exclusivity**
```
Powerful tools shouldn't require a CS degree or enterprise budgets. 
We make AI accessible to everyone.
```

**H3: Cleveland Proud, Globally Connected**
```
Rooted in NEO, serving businesses nationwide.
```

**H2: Our Team**
```
[Team member cards: Photo, name, title, bio]
```

**H2: Certifications**
```
✓ NGLCC Certified LGBTQ+ Business Enterprise
✓ Cleveland Tech Council Member
✓ Ohio Minority Supplier Development Council
✓ JumpStart Portfolio Company
```

---

## PHASE 4: CONTACT PAGE COPY (30 minutes)

**H1:**
```
Let's Talk About Your Business
```

**Subheading:**
```
Schedule a free 30-minute consultation. No sales pitch, just expert advice 
tailored to your business.
```

**What to Expect:**
```
✓ Free workflow audit
✓ Custom automation recommendations
✓ Transparent pricing with no surprises
✓ 25% LGBTQ+ discount eligibility
✓ Same-day response guarantee
```

**Contact Form Fields:**
- Name (required)
- Email (required)
- Company (optional)
- How many employees? (optional)
- What would you like to automate? (textarea, required)
- [Cloudflare Turnstile]
- [Submit Button]

---

## PHASE 5: BLOG POST STRATEGY (1 hour)

### SEO Blog Post Template

**Structure:**
```markdown
# [Primary Keyword + Benefit] - [Format]

## Introduction (150-200 words)
[Hook with primary keyword in first 100 words]
[Address reader pain point]
[Preview what they'll learn]

## Table of Contents
- [Section 1]
- [Section 2]
- [Section 3]
- [Key Takeaways]

## [Section 1 with Secondary Keyword] (300-400 words)
[Explanation with examples]
[Internal link to relevant service page]

## [Section 2] (300-400 words)
[Continue content]

## [Section 3] (300-400 words)
[Conclusion with CTA]

## Key Takeaways
- Bullet summary of key points

## Ready to Automate?
[Service-specific CTA]
```

### Blog Post #1: "Top 10 Cleveland Small Businesses Using AI Automation"

**Target Keyword:** "Cleveland small business automation"
**Meta Description:** "See how 10 Cleveland businesses save 20+ hours/week with AI automation. Real case studies, real results, real ROI."
**Word Count:** 1,500-2,000

**Structure:**
1. Introduction
2. Cadence: Cleveland Coffee Shop (Social Media)
3. Flowstack: Tremont Boutique (Inventory + Email)
4. Consensus Engine: University Circle Startup (Remote Team Decisions)
5. Redbridging: Cleveland Clinic Tech (AI Compliance)
6. [Continue for 10 businesses]
7. Common Themes Across Successful Automation
8. Getting Started with Your Own Automation
9. CTA

---

## DELIVERABLES

### 1. copy-seo-specifications.md

- All metadata (titles, descriptions, OG images)
- All page copy (homepage, services, about, contact)
- Blog post strategy + initial 3 posts
- Keyword mapping
- SEO checklist per page
- Schema implementation details

### 2. All Page Copy (Markdown Files)

- homepage-copy.md
- services-copy.md
- about-copy.md
- contact-copy.md
- blog-posts.md

### 3. SEO Checklist

For each page:
- ✅ Title 50-60 characters
- ✅ Description 150-160 characters
- ✅ One H1 with primary keyword
- ✅ H2-H6 proper hierarchy
- ✅ Primary keyword in first 100 words
- ✅ Internal links (3-5 per page)
- ✅ Images with descriptive alt text
- ✅ Meta robots tag set
- ✅ Canonical URL configured
- ✅ Open Graph tags implemented
- ✅ JSON-LD schema included

---

**Copy/SEO Agent Guide v1.0**  
*BespokeEthos.com Redesign*  
*Cleveland-First Positioning*  
*November 15, 2025*
