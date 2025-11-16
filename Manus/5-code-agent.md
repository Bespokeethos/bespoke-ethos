# AGENT 5: CODE IMPLEMENTATION & DEPLOYMENT

**Role:** Full-Stack Development, Next.js 16 Implementation, Production Deployment  
**Dependencies:** All previous agents (Research, Design, Copy/SEO, Image)  
**Output Location:** c:\vercel\ (project root)  
**Log Actions To:** c:\vercel\manus\faceliftlog.md  

---

## MISSION

Implement complete BespokeEthos.com redesign using Next.js 16, React 19, and modern web standards. Deploy to Vercel production with zero downtime, achieving Core Web Vitals targets and positioning site as Cleveland's #1 small business automation resource.

---

## PROJECT SETUP

### Initial Next.js 16 Configuration
```bash
# c:\vercel\
npx create-next-app@latest bespokethos-redesign --typescript --tailwind --app --turbopack

cd bespokethos-redesign

# Install dependencies
npm install @sanity/client@7.12.1 @sanity/image-url
npm install @pinecone-database/pinecone
npm install openai
npm install resend
npm install sharp  # Image optimization
npm install framer-motion  # Animations
npm install lucide-react  # Icons
npm install clsx tailwind-merge  # Utility functions
npm install @headlessui/react  # Accessible components

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D prettier prettier-plugin-tailwindcss
npm install -D eslint eslint-config-next
```

### Directory Structure
```
c:\vercel\bespokethos-redesign\
├── app/
│   ├── layout.tsx (root layout)
│   ├── page.tsx (homepage)
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx (overview)
│   │   ├── cadence/
│   │   │   └── page.tsx
│   │   ├── flowstack/
│   │   │   └── page.tsx
│   │   ├── consensus-engine/
│   │   │   └── page.tsx
│   │   └── redbridging/
│   │       └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── lgbtq-discount/
│   │   └── page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/
│       ├── contact/
│       │   └── route.ts
│       └── newsletter/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNavigation.tsx
│   │   └── Navigation.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   └── CTASection.tsx
│   ├── schemas/
│   │   ├── OrganizationSchema.tsx
│   │   ├── ProductSchema.tsx
│   │   └── LocalBusinessSchema.tsx
│   └── OptimizedImage.tsx
├── lib/
│   ├── sanity.ts (CMS client)
│   ├── pinecone.ts (vector DB)
│   ├── openai.ts (embeddings/images)
│   └── utils.ts (helpers)
├── styles/
│   ├── globals.css
│   └── animations.css
├── public/
│   └── images/ (from Image Agent)
├── .env.local (secrets)
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## CORE CONFIGURATION FILES

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack (Next.js 16 feature - 5-10x faster builds)
  turbopack: {
    moduleIdStrategy: 'deterministic',
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.sanity.io', 'bespokethos.com'],
    deviceSizes: [375, 768, 1024, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
  
  // Redirects for old URLs (if migrating from existing site)
  async redirects() {
    return [
      {
        source: '/old-services',
        destination: '/services',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#1a1a2e',
          700: '#16213e',
          500: '#0f3460',
          300: '#533483',
        },
        secondary: {
          600: '#e94560',
          500: '#f39c12',
          400: '#16a085',
          300: '#9b59b6',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          400: '#a3a3a3',
          600: '#525252',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'rotate-border': 'rotateBorder 4s linear infinite',
        'glow-trail': 'glowTrail 2s ease-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        rotateBorder: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowTrail: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1)', opacity: '0.1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
```

### app/layout.tsx (Root Layout)
```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNavigation from '@/components/layout/MobileNavigation'
import { OrganizationSchema } from '@/components/schemas/OrganizationSchema'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bespokethos.com'),
  title: {
    default: 'AI Automation for Small Business | Bespoke Ethos',
    template: '%s | Bespoke Ethos'
  },
  description: 'Empower your small business with intelligent AI automation tools. LGBTQ+ owned, Cleveland-based. Cadence, Flowstack, Consensus Engine & Redbridging.',
  keywords: ['AI automation', 'small business automation', 'LGBTQ+ business', 'Cleveland AI', 'workflow automation'],
  authors: [{ name: 'Bespoke Ethos Team' }],
  creator: 'Bespoke Ethos',
  publisher: 'Bespoke Ethos',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bespokethos.com',
    siteName: 'Bespoke Ethos',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 628,
        alt: 'Bespoke Ethos - AI Automation for Small Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation for Small Business | Bespoke Ethos',
    description: 'Empower your small business with intelligent AI automation tools.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <OrganizationSchema />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileNavigation />
      </body>
    </html>
  )
}
```

---

## CRITICAL COMPONENTS

### Button Component (Pride Discount Button Implementation)
```tsx
// components/ui/Button.tsx
'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pride'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg font-semibold transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-700 hover:-translate-y-1 hover:shadow-lg',
      secondary: 'border-2 border-neutral-900 bg-transparent hover:bg-neutral-50',
      ghost: 'text-primary-500 hover:bg-primary-50',
      pride: 'btn-pride-discount',  // Special CSS class
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[40px]',
      md: 'px-6 py-3 text-base min-h-[44px]',  // WCAG touch target
      lg: 'px-8 py-4 text-lg min-h-[48px]',
    }

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
```

### Pride Discount Button Styles (Critical!)
```css
/* styles/animations.css */

/* CORRECT implementation of pride discount button */
.btn-pride-discount {
  position: relative;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 700;
  background: white;
  color: #1a1a2e;
  border: 2px solid #171717;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

/* Rotating prism glow border effect */
.btn-pride-discount::before {
  content: '';
  position: absolute;
  inset: -4px;
  background: conic-gradient(
    from 0deg,
    #e94560 0deg,      /* Red */
    #f39c12 60deg,     /* Orange */
    #f1c40f 120deg,    /* Yellow */
    #16a085 180deg,    /* Teal */
    #533483 240deg,    /* Purple */
    #9b59b6 300deg,    /* Lavender */
    #e94560 360deg     /* Back to red */
  );
  border-radius: 14px;
  opacity: 0;
  filter: blur(8px);
  animation: rotate-border 4s linear infinite;
  z-index: -1;
  transition: opacity 300ms cubic-bezier(0, 0, 0.2, 1);
}

.btn-pride-discount:hover::before {
  opacity: 0.7;
}

/* Subtle trailing glow effect */
.btn-pride-discount::after {
  content: '';
  position: absolute;
  inset: -6px;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms cubic-bezier(0, 0, 0.2, 1);
}

.btn-pride-discount:hover::after {
  opacity: 0.3;
  animation: glow-trail 2s ease-out infinite;
}

@keyframes rotate-border {
  to { transform: rotate(360deg); }
}

@keyframes glow-trail {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.1; }
}

/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn-pride-discount::before,
  .btn-pride-discount::after {
    animation: none !important;
  }
}
```

---

## HOMEPAGE IMPLEMENTATION

### app/page.tsx
```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import HeroSection from '@/components/sections/HeroSection'
import ServicesGrid from '@/components/sections/ServicesGrid'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'AI Automation for Small Business | Cleveland\'s LGBTQ+ Tech Leader',
  description: 'Save 20+ hours/week with AI-powered automation. LGBTQ+ certified, Cleveland-based. Trusted by 100+ small businesses. Get 25% discount today.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      
      {/* Social Proof Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Trusted by 100+ Cleveland Small Businesses
          </h2>
          <p className="text-xl text-neutral-600 text-center mb-16 max-w-3xl mx-auto">
            From West Side Market vendors to University Circle startups, Cleveland businesses choose Bespoke Ethos.
          </p>
          <TestimonialsCarousel />
        </div>
      </section>
      
      {/* Stats Section (Cleveland-specific data) */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="stat-card">
              <div className="text-5xl font-bold text-primary-500 mb-2">20+</div>
              <div className="text-lg text-neutral-600">Hours Saved Per Week</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-primary-500 mb-2">100+</div>
              <div className="text-lg text-neutral-600">Cleveland Businesses</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-primary-500 mb-2">$30K</div>
              <div className="text-lg text-neutral-600">Avg Annual Savings</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-primary-500 mb-2">24/7</div>
              <div className="text-lg text-neutral-600">Automation Running</div>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection />
    </>
  )
}
```

### components/sections/HeroSection.tsx
```tsx
'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="hero-section min-h-screen flex items-center px-4 lg:px-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          className="text-content space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
            AI Automation for Cleveland Small Businesses
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl">
            Stop wasting time on repetitive tasks. Bespoke Ethos delivers AI-powered automation 
            that helps Cleveland businesses save 20+ hours per week and $30K annually.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 text-sm text-neutral-700">
            <span className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
              ✓ Save 20+ hours/week
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
              ✓ No coding required
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
              ✓ Setup in minutes
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
              🏳️‍🌈 LGBTQ+ Certified
            </span>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button variant="primary" size="lg">
              Schedule Free Demo
            </Button>
            <Button variant="pride" size="lg">
              Get 25% LGBTQ+ Discount
            </Button>
          </div>
          
          {/* Trust Signal */}
          <p className="text-sm text-neutral-500 mt-6">
            Trusted by 100+ Cleveland businesses • NGLCC Certified • Cleveland Tech Council Member
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="hero-image relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/images/hero/hero-ai-automation-dashboard.png"
            alt="AI automation dashboard showing workflow connections between Gmail, Slack, Salesforce and Airtable for small business efficiency"
            width={800}
            height={600}
            priority
            quality={90}
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
```

---

## SERVICE INTEGRATIONS

### Sanity CMS Integration
```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-11-15',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ query for blog posts
export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "author": author->name,
      "categories": categories[]->title,
      mainImage
    }
  `)
}

// GROQ query for services
export async function getServices() {
  return client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      name,
      slug,
      shortDescription,
      features,
      pricing,
      icon
    }
  `)
}
```

### Resend Email Integration
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json()
    
    // Send email to team
    await resend.emails.send({
      from: 'Contact Form <contact@bespokethos.com>',
      to: 'hello@bespokethos.com',
      replyTo: email,
      subject: `New Contact Form: ${name} from ${company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    
    // Send confirmation to user
    await resend.emails.send({
      from: 'Bespoke Ethos <hello@bespokethos.com>',
      to: email,
      subject: 'Thanks for contacting Bespoke Ethos!',
      html: `
        <h2>Thanks for reaching out, ${name}!</h2>
        <p>We received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, check out our <a href="https://bespokethos.com/blog">blog</a> for automation tips.</p>
        <p>Best,<br/>The Bespoke Ethos Team</p>
      `,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
```

### Cloudflare Turnstile (CAPTCHA)
```tsx
// components/forms/ContactForm.tsx
'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Get Turnstile token
    const turnstileToken = await window.turnstile.getResponse()
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, turnstileToken }),
    })
    
    if (response.ok) {
      alert('Message sent! We\'ll be in touch soon.')
      setFormData({ name: '', email: '', company: '', message: '' })
    }
    
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-neutral-800 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full h-12 px-4 text-base border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-neutral-800 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full h-12 px-4 text-base border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
        />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-neutral-800 mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full h-12 px-4 text-base border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-neutral-800 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 text-base border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
        />
      </div>
      
      {/* Cloudflare Turnstile */}
      <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}></div>
      
      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

---

## PERFORMANCE OPTIMIZATION

### Image Optimization Strategy
```tsx
// components/OptimizedImage.tsx
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className 
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      placeholder="blur"
      blurDataURL={`/_next/image?url=${src}&w=16&q=10`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading={priority ? 'eager' : 'lazy'}
      className={className}
    />
  )
}
```

### Code Splitting & Lazy Loading
```tsx
// app/page.tsx
import dynamic from 'next/dynamic'

// Lazy load non-critical sections
const TestimonialsCarousel = dynamic(() => import('@/components/sections/TestimonialsCarousel'))
const CTASection = dynamic(() => import('@/components/sections/CTASection'))

export default function HomePage() {
  return (
    <>
      <HeroSection /> {/* Critical - load immediately */}
      <ServicesGrid /> {/* Important - load immediately */}
      <TestimonialsCarousel /> {/* Below fold - lazy load */}
      <CTASection /> {/* Below fold - lazy load */}
    </>
  )
}
```

---

## DEPLOYMENT TO VERCEL

### Environment Variables (.env.local)
```bash
# Next.js
NEXT_PUBLIC_SITE_URL=https://bespokethos.com

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxx

# OpenAI (DALL-E, Embeddings)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# Pinecone (Vector DB)
PINECONE_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PINECONE_ENVIRONMENT=us-east-1-aws

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_VERIFICATION=xxxxxxxxxxxxxxxxxxxx
```

### Vercel Deployment Steps
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Link project
cd c:\vercel\bespokethos-redesign
vercel link

# 4. Set environment variables (production)
vercel env add RESEND_API_KEY production
vercel env add OPENAI_API_KEY production
vercel env add PINECONE_API_KEY production
# ... (repeat for all env vars)

# 5. Deploy to preview
vercel

# 6. Test preview URL thoroughly

# 7. Deploy to production
vercel --prod

# 8. Set custom domain
vercel domains add bespokethos.com
vercel domains add www.bespokethos.com

# 9. Verify deployment
vercel inspect bespokethos.com
```

### Post-Deployment Checklist
- ✅ Custom domain configured (bespokethos.com)
- ✅ SSL certificate auto-provisioned
- ✅ All environment variables set
- ✅ Lighthouse score >90 (all metrics)
- ✅ Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
- ✅ Sitemap accessible (/sitemap.xml)
- ✅ Robots.txt accessible (/robots.txt)
- ✅ Contact form tested and working
- ✅ All images loading properly (WebP/AVIF)
- ✅ Mobile responsive (375px to 1920px)
- ✅ Accessibility audit (WAVE tool, 0 errors)
- ✅ Google Search Console verified
- ✅ Google Analytics tracking

---

## LOGGING REQUIREMENTS

**Format (faceliftlog.md):**
```markdown
## [TIMESTAMP] - Code Agent

### Project Setup
- ✅ Next.js 16 initialized with Turbopack
- ✅ Dependencies installed (22 packages)
- ✅ Directory structure created
- ✅ Tailwind configured with design tokens
- ✅ Environment variables configured

### Components Implemented
1. Button Component
   - Variants: primary, secondary, ghost, pride
   - Pride button: Rotating prism glow effect (CORRECT implementation)
   - Touch targets: 44px minimum (WCAG 2.1 AA)

2. HeroSection Component
   - Framer Motion animations
   - Responsive grid layout
   - Cleveland-specific copy

3. ServicesGrid Component
   - 4 service cards (Cadence, Flowstack, Consensus, Redbridging)
   - Custom SVG icons
   - Hover animations (subtle lift + shadow)

[Continue for all components]

### Integrations Completed
- ✅ Sanity CMS: GROQ queries for blog + services
- ✅ Resend: Contact form + confirmation emails
- ✅ Cloudflare Turnstile: WCAG 2.1 AA CAPTCHA
- ✅ Next.js Image: WebP/AVIF optimization
- ✅ Framer Motion: Micro-animations

### Performance Metrics (Lighthouse)
- Performance: 96/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

### Core Web Vitals (Production)
- LCP: 1.8s (Target: <2.5s) ✅
- INP: 120ms (Target: <200ms) ✅
- CLS: 0.02 (Target: <0.1) ✅

### Deployment
- ✅ Deployed to Vercel production
- ✅ Custom domain: bespokethos.com
- ✅ SSL certificate provisioned
- ✅ All environment variables set
- ✅ Sitemap submitted to Google Search Console

### Issues Resolved
1. Pride button gradient not rotating
   - Solution: Fixed z-index stacking context
2. Mobile navigation overlapping content
   - Solution: Added pb-16 to main content on mobile
3. Image optimization causing layout shift
   - Solution: Added explicit width/height to all images
```

---

## DELIVERABLES

1. **Complete Next.js 16 codebase** in c:\vercel\bespokethos-redesign\
2. **Deployed production site** at bespokethos.com
3. **Performance report** with Lighthouse scores
4. **Documentation** for ongoing maintenance

---

**Code Agent Guide v1.0**  
*Project: BespokeEthos.com Facelift*  
*Created: November 15, 2025*  
*Cleveland Small Business Market*
