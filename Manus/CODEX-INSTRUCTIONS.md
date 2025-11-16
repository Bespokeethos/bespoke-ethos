# CODEX MASTER EXECUTION SCRIPT
## Complete Step-by-Step Instructions for AI Code Agent

**Location:** c:\vercel\manus\CODEX-INSTRUCTIONS.md  
**Purpose:** Execute complete BespokeEthos.com redesign  
**Timeline:** 3 weeks (compressed to 1-2 weeks with AI assistance)  
**Output:** Production website at bespokethos.com  

---

## 🎯 YOUR MISSION, CODEX

You are the **Code Agent** responsible for implementing a complete website redesign for BespokeEthos.com. You have 6 comprehensive guide files that other agents have prepared. Your job is to execute the code implementation (Agent 5) while coordinating with the outputs of Agents 1-4.

**Critical Success Factor:** Follow the guides EXACTLY. Every color, every animation, every spacing decision has been researched and documented. Do not improvise.

---

## 📁 FILES YOU HAVE ACCESS TO

**Location:** c:\vercel\manus\

1. `1-research-agent-COMPLETE.md` - Market research, competitor analysis, Cleveland data
2. `2-design-agent-COMPLETE.md` - Design system, components, layouts, animations
3. `3-copy-seo-agent-COMPLETE.md` - All website copy, SEO metadata, content strategy
4. `4-image-agent.md` - Image generation prompts, optimization specs
5. `5-code-agent.md` - Your primary implementation guide
6. `executive-master.md` - Strategic overview, Cleveland positioning
7. `Complete-Implementation-Guide.pdf` - 16-page reference document

**Log File:** c:\vercel\manus\faceliftlog.md (create this, log all actions)

---

## 🚀 PHASE 1: PROJECT SETUP (30 minutes)

### Step 1.1: Create Next.js 16 Project

```bash
# Open terminal in c:\vercel\
cd c:\vercel

# Create new Next.js 16 project
npx create-next-app@latest bespokethos-redesign --typescript --tailwind --app --turbopack

# Navigate into project
cd bespokethos-redesign

# Verify Next.js version
npx next --version
# Should output: 16.0.0 or higher
```

**✅ LOG THIS:**
```markdown
## [TIMESTAMP] - Codex Agent

### Phase 1.1: Project Setup
- Created Next.js 16 project with Turbopack
- TypeScript: ✓
- Tailwind CSS: ✓
- App Router: ✓
- Location: c:\vercel\bespokethos-redesign\
```

### Step 1.2: Install Dependencies

```bash
# Still in c:\vercel\bespokethos-redesign\

# Core dependencies
npm install @sanity/client@7.12.1 @sanity/image-url
npm install @pinecone-database/pinecone
npm install openai
npm install resend
npm install sharp

# UI libraries
npm install framer-motion
npm install lucide-react
npm install clsx tailwind-merge
npm install @headlessui/react

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D prettier prettier-plugin-tailwindcss
npm install -D eslint eslint-config-next

# Verify installations
npm list --depth=0
```

**✅ LOG THIS:**
```markdown
### Phase 1.2: Dependencies Installed
- @sanity/client@7.12.1: ✓
- Framer Motion (animations): ✓
- Lucide React (icons): ✓
- Sharp (image optimization): ✓
- Total packages: 22
```

### Step 1.3: Environment Variables

Create `.env.local` file in project root:

```bash
# In c:\vercel\bespokethos-redesign\
touch .env.local
```

Add these variables (get actual values from client):

```env
# Next.js
NEXT_PUBLIC_SITE_URL=https://bespokethos.com

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxxxxxxx

# OpenAI (for DALL-E image generation)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# Pinecone (Vector DB)
PINECONE_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PINECONE_ENVIRONMENT=us-east-1-aws

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_VERIFICATION=xxxxxxxxxxxxxxxxxxxx
```

**✅ LOG THIS:**
```markdown
### Phase 1.3: Environment Variables
- Created .env.local
- 11 environment variables configured
- ⚠️ Placeholder values - need client to provide actual keys
```

---

## 🎨 PHASE 2: DESIGN SYSTEM IMPLEMENTATION (1-2 hours)

### Step 2.1: Configure Tailwind with Design Tokens

**File:** `tailwind.config.ts`

Open the file and REPLACE contents with this (from `2-design-agent-COMPLETE.md`):

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
        '3': '0.75rem',
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

**✅ LOG THIS:**
```markdown
## Phase 2.1: Tailwind Configuration
- Design tokens configured
- Color palette: Cleveland professional (navy, teal, coral)
- Typography: Inter Variable font
- Animations: fadeInUp, rotateBorder, glowTrail
- 8pt spacing grid implemented
```

### Step 2.2: Global Styles with Pride Button

**File:** `app/globals.css`

REPLACE contents with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Variables */
:root {
  /* Pride Gradient (decorative only - 1-2px borders) */
  --pride-gradient: linear-gradient(135deg,
    #e94560 0%,
    #f39c12 20%,
    #f1c40f 40%,
    #16a085 60%,
    #533483 80%,
    #9b59b6 100%
  );
}

/* Base Styles */
body {
  font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Pride Discount Button - CRITICAL IMPLEMENTATION */
/* ✅ CORRECT: Rotating prism glow OUTSIDE border (not inside) */
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
  min-height: 44px; /* Touch target */
}

/* Rotating prism glow border - OUTSIDE (not inside button) */
.btn-pride-discount::before {
  content: '';
  position: absolute;
  inset: -4px;
  background: conic-gradient(
    from 0deg,
    #e94560 0deg,
    #f39c12 60deg,
    #f1c40f 120deg,
    #16a085 180deg,
    #533483 240deg,
    #9b59b6 300deg,
    #e94560 360deg
  );
  border-radius: 14px;
  opacity: 0;
  filter: blur(8px);
  animation: rotateBorder 4s linear infinite;
  z-index: -1;
  transition: opacity 300ms cubic-bezier(0, 0, 0.2, 1);
}

.btn-pride-discount:hover::before {
  opacity: 0.7;
}

/* Trailing glow effect on hover */
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
  animation: glowTrail 2s ease-out infinite;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .btn-pride-discount::before,
  .btn-pride-discount::after {
    animation: none !important;
    opacity: 0 !important;
  }
}

/* Mobile sizing */
@media (max-width: 640px) {
  .btn-pride-discount {
    padding: 14px 24px;
    font-size: 16px;
  }
}
```

**✅ LOG THIS:**
```markdown
## Phase 2.2: Global Styles
- Pride discount button implemented (rotating prism glow)
- CSS custom properties defined
- Reduced motion support: ✓
- Mobile responsive: ✓
- Touch target 44px: ✓
```

### Step 2.3: Root Layout with Fonts

**File:** `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

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
  description: 'Empower your small business with intelligent AI automation tools. LGBTQ+ owned, Cleveland-based.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

**✅ LOG THIS:**
```markdown
## Phase 2.3: Root Layout
- Inter Variable font loaded
- JetBrains Mono for code
- Font display: swap (performance)
- Basic metadata configured
```

---

## 🧩 PHASE 3: COMPONENT LIBRARY (2-3 hours)

### Step 3.1: Create Component Directory Structure

```bash
# In c:\vercel\bespokethos-redesign\
mkdir -p components/ui
mkdir -p components/layout
mkdir -p components/sections
mkdir -p components/schemas
```

### Step 3.2: Button Component

**File:** `components/ui/Button.tsx`

```tsx
'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pride'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    loading = false,
    className, 
    disabled,
    children, 
    ...props 
  }, ref) => {
    
    const baseStyles = `
      relative font-semibold transition-all duration-300 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
      ${fullWidth ? 'w-full' : ''}
    `
    
    const variants = {
      primary: `
        bg-primary-500 text-white rounded-lg
        hover:bg-primary-700 hover:-translate-y-1 hover:shadow-lg
        active:translate-y-0 active:shadow-md
      `,
      secondary: `
        border-2 border-neutral-900 text-neutral-900 bg-transparent rounded-lg
        hover:bg-neutral-50
      `,
      ghost: `
        text-primary-500 rounded-lg
        hover:bg-primary-50
      `,
      pride: 'btn-pride-discount',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[40px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[48px]',
    }

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="inline-block mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
```

**✅ LOG THIS:**
```markdown
## Phase 3: Component Library

### Button Component
- 4 variants: primary, secondary, ghost, pride
- 3 sizes: sm (40px), md (44px touch target), lg (48px)
- Loading state with spinner
- Disabled state
- Pride variant uses custom CSS class
```

### Step 3.3: Card Component

**File:** `components/ui/Card.tsx`

```tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div
      className={`
        rounded-lg border border-neutral-200 bg-white p-6
        transition-all duration-300 ease-out
        ${hoverable ? 'hover:border-primary-300 hover:-translate-y-1 hover:shadow-lg' : 'shadow-sm'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
```

### Step 3.4: Input Component

**File:** `components/ui/Input.tsx`

```tsx
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-neutral-800 mb-2">
            {label}
            {props.required && <span className="text-secondary-600 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full h-12 px-4 text-base
            border-2 border-neutral-200 rounded-lg
            focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
            focus:outline-none
            transition-all duration-200
            disabled:bg-neutral-100 disabled:cursor-not-allowed
            ${error ? 'border-secondary-600' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-secondary-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-neutral-600">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
```

**✅ LOG THIS:**
```markdown
### Card Component
- Hoverable variant with lift effect
- Border + shadow styling
- Flexible children

### Input Component
- Label with required indicator
- Error state styling
- Helper text support
- 48px height (touch-friendly)
- Focus ring animation
```

---

## 📄 PHASE 4: HOMEPAGE IMPLEMENTATION (2-3 hours)

### Step 4.1: Homepage Metadata & Structure

**File:** `app/page.tsx`

Copy ALL content from `3-copy-seo-agent-COMPLETE.md` Section "PHASE 3: PAGE-BY-PAGE COPY"

```tsx
import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'AI Automation for Cleveland Small Businesses | Bespoke Ethos',
  description: 'Save 20+ hours/week with AI automation built for Cleveland small businesses. LGBTQ+ certified, affordable pricing. Trusted by 100+ businesses.',
  keywords: [
    'AI automation',
    'Cleveland small business',
    'workflow automation',
    'LGBTQ+ business',
    'small business software',
  ],
  openGraph: {
    title: 'AI Automation for Cleveland Small Businesses',
    description: 'Save 20+ hours/week. LGBTQ+ certified. Cleveland-based.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 628,
      },
    ],
  },
}

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 lg:px-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              AI Automation for Cleveland Small Businesses
            </h1>
            <p className="text-xl text-neutral-600">
              Save 20+ hours per week on repetitive tasks. Stop wasting time, start automating. 
              Bespoke Ethos: LGBTQ+ certified, Cleveland-based, trusted by 100+ small businesses.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="px-4 py-2 bg-neutral-100 rounded-full">
                ✓ Save 20+ hours/week
              </span>
              <span className="px-4 py-2 bg-neutral-100 rounded-full">
                ✓ No coding required
              </span>
              <span className="px-4 py-2 bg-neutral-100 rounded-full">
                ✓ Setup in minutes
              </span>
              <span className="px-4 py-2 bg-neutral-100 rounded-full">
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
          </div>

          {/* Hero Image - PLACEHOLDER */}
          <div className="relative h-96 bg-neutral-200 rounded-2xl">
            <p className="absolute inset-0 flex items-center justify-center text-neutral-600">
              Hero Image: hero-ai-automation-dashboard.png
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Four Powerful Tools. One Intelligent Platform.
          </h2>
          <p className="text-xl text-neutral-600 text-center mb-16 max-w-3xl mx-auto">
            Everything you need to automate, optimize, and scale your small business.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Cards - PLACEHOLDER */}
            {['Cadence', 'Flowstack', 'Consensus Engine', 'Redbridging'].map((service) => (
              <div key={service} className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="w-16 h-16 bg-neutral-200 rounded-lg mb-4"></div>
                <h3 className="text-xl font-bold mb-2">{service}</h3>
                <p className="text-neutral-600 mb-4">Description here...</p>
                <a href="#" className="text-primary-500 font-semibold">Learn More →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-500 mb-2">20+</div>
              <div className="text-lg text-neutral-600">Hours Saved Per Week</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-500 mb-2">100+</div>
              <div className="text-lg text-neutral-600">Cleveland Businesses</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-500 mb-2">$30K</div>
              <div className="text-lg text-neutral-600">Avg Annual Savings</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-500 mb-2">24/7</div>
              <div className="text-lg text-neutral-600">Automation Running</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
```

**✅ LOG THIS:**
```markdown
## Phase 4: Homepage Implementation

### Metadata
- Title: 50-60 chars ✓
- Description: 150-160 chars ✓
- OG image: 1200x628px specified
- Keywords mapped

### Sections Implemented
- Hero (split layout desktop, stacked mobile)
- Services grid (4 columns desktop, 1 mobile)
- Stats (4 columns, centered)
- Pride discount button used in hero
```

---

## 🖼️ PHASE 5: IMAGE PLACEHOLDER SYSTEM (30 minutes)

Since Image Agent will generate images later, create placeholder system:

**File:** `components/ImagePlaceholder.tsx`

```tsx
interface ImagePlaceholderProps {
  filename: string
  width: number
  height: number
  alt: string
}

export function ImagePlaceholder({ filename, width, height, alt }: ImagePlaceholderProps) {
  return (
    <div 
      className="bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-600 p-4 text-center"
      style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
    >
      <div>
        <p className="font-semibold mb-2">Image Placeholder</p>
        <p className="text-sm">{filename}</p>
        <p className="text-xs mt-2">{alt}</p>
      </div>
    </div>
  )
}
```

**✅ LOG THIS:**
```markdown
## Phase 5: Image Placeholders
- Created placeholder component
- Shows filename and alt text
- Maintains proper dimensions
- Will be replaced by Image Agent's outputs
```

---

## 🚀 PHASE 6: TESTING & DEPLOYMENT (1-2 hours)

### Step 6.1: Local Development Testing

```bash
# In c:\vercel\bespokethos-redesign\

# Start development server
npm run dev

# Open browser to http://localhost:3000
# Test:
# 1. Homepage loads
# 2. Pride discount button shows rotating glow on hover
# 3. Responsive at 375px, 768px, 1024px, 1920px
# 4. All buttons have 44px+ height
# 5. Touch targets functional on mobile
```

**✅ LOG THIS:**
```markdown
## Phase 6.1: Local Testing
- Dev server running: http://localhost:3000
- Homepage rendering: ✓
- Pride button animation: ✓
- Mobile responsive (375px): ✓
- Touch targets (44px): ✓
```

### Step 6.2: Build for Production

```bash
# Test production build
npm run build

# Check for errors
# If successful, continue to deployment
```

### Step 6.3: Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Set environment variables (one by one)
vercel env add RESEND_API_KEY production
vercel env add OPENAI_API_KEY production
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
# ... continue for all variables in .env.local

# Deploy to preview
vercel

# After testing preview, deploy to production
vercel --prod

# Set custom domain
vercel domains add bespokethos.com
```

**✅ LOG THIS:**
```markdown
## Phase 6.3: Vercel Deployment
- Production build: ✓
- Vercel CLI linked: ✓
- Environment variables set: 11/11
- Preview deployment: https://[preview-url].vercel.app
- Production deployment: bespokethos.com
- SSL certificate: Auto-provisioned ✓
```

---

## 📊 PHASE 7: PERFORMANCE VALIDATION (30 minutes)

### Step 7.1: Lighthouse Audit

```bash
# Run Lighthouse in Chrome DevTools
# 1. Open https://bespokethos.com in Chrome
# 2. DevTools > Lighthouse tab
# 3. Select: Mobile, Performance + Accessibility + Best Practices + SEO
# 4. Generate report
```

**Target Scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**✅ LOG THIS:**
```markdown
## Phase 7.1: Lighthouse Audit
- Performance: [score]/100
- Accessibility: [score]/100
- Best Practices: [score]/100
- SEO: [score]/100

### Core Web Vitals
- LCP: [X.X]s (Target: <2.5s)
- INP: [XX]ms (Target: <200ms)
- CLS: [0.XX] (Target: <0.1)
```

### Step 7.2: Mobile Testing

Test on actual devices or simulators:
- iPhone 13 (375x812)
- Samsung Galaxy S21 (360x800)
- iPad (768x1024)

**Checklist:**
- ✅ Navigation functional
- ✅ Pride button animates smoothly
- ✅ Touch targets 44px+
- ✅ Text readable (16px+)
- ✅ Forms usable
- ✅ Images load properly

---

## 📝 FINAL DELIVERABLES CHECKLIST

```markdown
## CODEX COMPLETION CHECKLIST

### Phase 1: Setup
- ✅ Next.js 16 project created
- ✅ 22 dependencies installed
- ✅ Environment variables configured

### Phase 2: Design System
- ✅ Tailwind configured with design tokens
- ✅ Pride discount button CSS implemented
- ✅ Global styles applied
- ✅ Fonts loaded (Inter Variable)

### Phase 3: Components
- ✅ Button component (4 variants)
- ✅ Card component
- ✅ Input component
- ✅ Layout components (pending)

### Phase 4: Pages
- ✅ Homepage with metadata
- ✅ Hero section
- ✅ Services grid
- ✅ Stats section
- ⏳ Service pages (pending)
- ⏳ About page (pending)
- ⏳ Contact page (pending)

### Phase 5: Images
- ✅ Placeholder system created
- ⏳ Actual images (pending Image Agent)

### Phase 6: Deployment
- ✅ Local development tested
- ✅ Production build successful
- ✅ Vercel deployment live
- ✅ Custom domain configured

### Phase 7: Performance
- ✅ Lighthouse audit completed
- ✅ Core Web Vitals: LCP, INP, CLS
- ✅ Mobile testing on 3+ devices
- ✅ Accessibility validation

### Outstanding Tasks
- ⏳ Implement remaining pages (Services, About, Contact)
- ⏳ Add actual images from Image Agent
- ⏳ Integrate Sanity CMS
- ⏳ Implement contact form with Resend
- ⏳ Add Cloudflare Turnstile
- ⏳ SEO: Sitemap, robots.txt
- ⏳ Analytics: Google Analytics 4
```

---

## 🆘 TROUBLESHOOTING GUIDE

### Issue: Pride Button Not Animating

**Check:**
1. Is `globals.css` imported in `app/layout.tsx`?
2. Is `.btn-pride-discount` class applied to button?
3. Browser supports `conic-gradient`? (All modern browsers do)
4. Check DevTools > Console for errors

**Fix:**
```bash
# Rebuild CSS
npm run build
```

### Issue: Fonts Not Loading

**Check:**
1. Next.js font optimization in `app/layout.tsx`
2. CSS variables applied: `--font-inter`
3. Check Network tab for font requests

**Fix:**
```typescript
// Verify font import
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Important for performance
})
```

### Issue: Tailwind Classes Not Working

**Check:**
1. Content paths in `tailwind.config.ts`
2. CSS imported in `app/layout.tsx`
3. Build process completed

**Fix:**
```bash
# Rebuild
npm run dev
# Or for production
npm run build
```

---

## 📞 NEXT STEPS AFTER CODEX COMPLETION

### For Other Agents:

**Image Agent:**
1. Run DALL-E prompts from `4-image-agent.md`
2. Generate 25-30 images
3. Place in `c:\vercel\bespokethos-redesign\public\images\`
4. Replace `ImagePlaceholder` components with `next/image`

**Copy/SEO Agent:**
1. Implement metadata for all pages
2. Add JSON-LD schemas
3. Generate sitemap.xml
4. Configure robots.txt
5. Write blog posts

**Final Integration:**
1. Sanity CMS setup (content management)
2. Resend email integration (contact form)
3. Cloudflare Turnstile (CAPTCHA)
4. Google Analytics tracking
5. Final Lighthouse audit (95+ target)

---

## ✅ COMPLETION CRITERIA

**Codex work is COMPLETE when:**

1. ✅ Production website live at bespokethos.com
2. ✅ Pride discount button animates correctly (rotating prism glow)
3. ✅ Homepage fully functional (hero, services, stats)
4. ✅ Mobile responsive (375px to 1920px)
5. ✅ Touch targets 44px minimum (WCAG AA)
6. ✅ Lighthouse Performance 95+
7. ✅ Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
8. ✅ All actions logged to faceliftlog.md
9. ✅ Code pushed to Git repository
10. ✅ Vercel deployment successful

---

**END OF CODEX INSTRUCTIONS**

*If you need clarification on any step, refer to the detailed guides:*
- Design details: `2-design-agent-COMPLETE.md`
- Copy/content: `3-copy-seo-agent-COMPLETE.md`
- Full implementation: `5-code-agent.md`
- Strategic context: `executive-master.md`

**Log everything. Execute precisely. Cleveland small businesses are counting on this.**
