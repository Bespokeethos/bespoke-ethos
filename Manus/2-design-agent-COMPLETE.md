# AGENT 2: DESIGN SYSTEM & UI/UX - COMPLETE GUIDE

**Role:** Visual Design, Component Library, Interaction Design  
**Timeline:** 6-8 hours  
**Dependencies:** Research Agent findings, brand strategy  
**Output Location:** c:\vercel\manus\design-specifications.md + design-tokens.css  
**Log Actions To:** c:\vercel\manus\faceliftlog.md  

---

## MISSION

Create a comprehensive design system that makes BespokeEthos.com look cutting-edge (2025), feel mobile-optimized, and avoid the "2010 look" that plagued the previous site. Every color, animation, spacing decision must be documented with explicit CSS/Tailwind code.

---

## PART 1: DESIGN SYSTEM FOUNDATION (2-3 hours)

### Color Palette (Explicit Hex Codes)

**Strategic Choice:** Cleveland professional + pride subtlety

```css
/* Design System: Colors */

:root {
  /* PRIMARY - Cleveland Professional */
  --color-primary-900: #1a1a2e;      /* Deep navy - Cleveland night sky */
  --color-primary-700: #16213e;      /* Dark blue - Lake Erie */
  --color-primary-500: #0f3460;      /* Rock Hall blue - Main CTA */
  --color-primary-300: #533483;      /* Pride purple - Links */

  /* SECONDARY - Cleveland Accents */
  --color-secondary-600: #e94560;    /* Sunset coral - Alerts, CTAs */
  --color-secondary-500: #f39c12;    /* Autumn orange - Highlights */
  --color-secondary-400: #16a085;    /* Shoreline teal - Success */
  --color-secondary-300: #9b59b6;    /* Pride lavender - Accents */

  /* NEUTRAL - Professional */
  --color-neutral-50: #fafafa;       /* Background */
  --color-neutral-100: #f5f5f5;      /* Section BG */
  --color-neutral-200: #e5e5e5;      /* Borders */
  --color-neutral-400: #a3a3a3;      /* Disabled text */
  --color-neutral-600: #525252;      /* Secondary text */
  --color-neutral-800: #262626;      /* Body text */
  --color-neutral-900: #171717;      /* Headings */

  /* PRIDE GRADIENT - Decorative Only (1-2px borders) */
  --pride-gradient: linear-gradient(135deg,
    #e94560 0%,    /* Red */
    #f39c12 20%,   /* Orange */
    #f1c40f 40%,   /* Yellow */
    #16a085 60%,   /* Teal */
    #533483 80%,   /* Purple */
    #9b59b6 100%   /* Lavender */
  );

  /* SPACING - 8pt Grid */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* TYPOGRAPHY - Fluid Scaling */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);
  --text-3xl: clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem);
  --text-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3rem);
  --text-5xl: clamp(3rem, 2.55rem + 2.25vw, 3.75rem);

  /* ANIMATION */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Color Usage Rules */
/* ✅ DO use pride gradient for: 1-2px borders, glows, dividers */
/* ❌ DON'T use pride gradient for: button fills, backgrounds, text */
```

### Typography System

```css
/* FONTS */
/* Primary: Inter Variable (Google Fonts) */
/* Body: Inter 400, 500, 600 */
/* Headings: Inter 600, 700, 800 */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-neutral-800);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-neutral-900);
}

h1 { font-size: var(--text-5xl); letter-spacing: -0.025em; }
h2 { font-size: var(--text-4xl); letter-spacing: -0.015em; }
h3 { font-size: var(--text-3xl); letter-spacing: -0.01em; }
h4 { font-size: var(--text-2xl); }
h5 { font-size: var(--text-xl); }
h6 { font-size: var(--text-lg); }

code, pre {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.9em;
}
```

### Spacing & Layout

```css
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-8);
  }
}

/* 8pt Grid System */
.grid-1 { gap: var(--space-1); }
.grid-2 { gap: var(--space-2); }
.grid-4 { gap: var(--space-4); }
.grid-6 { gap: var(--space-6); }
.grid-8 { gap: var(--space-8); }

/* Section Spacing */
section {
  padding: var(--space-24) var(--space-4);
}

@media (min-width: 768px) {
  section {
    padding: var(--space-24) var(--space-8);
  }
}
```

---

## PART 2: COMPONENT LIBRARY (2-3 hours)

### Button Component (ALL VARIANTS)

```tsx
// components/ui/Button.tsx
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
        bg-primary-500 text-white
        hover:bg-primary-700 hover:-translate-y-1 hover:shadow-lg
        active:translate-y-0 active:shadow-md
      `,
      secondary: `
        border-2 border-neutral-900 text-neutral-900 bg-transparent
        hover:bg-neutral-50
      `,
      ghost: `
        text-primary-500
        hover:bg-primary-50
      `,
      pride: 'btn-pride-discount', // CSS-defined
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[40px]',
      md: 'px-6 py-3 text-base min-h-[44px]',   // Touch target
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

### Pride Discount Button (CRITICAL - CORRECT IMPLEMENTATION)

```css
/* styles/components/button-pride.css */

/* ✅ CORRECT: Rotating prism glow border effect */
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
  min-height: 44px;
}

/* Rotating prism glow - OUTSIDE border (not inside) */
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
    #e94560 360deg     /* Loop back to red */
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

/* Subtle trailing glow effect on hover */
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

/* Animation: Rotating border */
@keyframes rotate-border {
  to { transform: rotate(360deg); }
}

/* Animation: Trailing glow pulse */
@keyframes glow-trail {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.1; }
}

/* Respect user's motion preference */
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

### Card Component

```tsx
// components/ui/Card.tsx
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

### Form Input Component

```tsx
// components/ui/Input.tsx
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

---

## PART 3: PAGE LAYOUTS (2-3 hours)

### Homepage Mobile Layout (375px)

```
┌──────────────────────────────────┐
│ [Header - Sticky 60px]           │
│ Logo | Menu Icon                 │
├──────────────────────────────────┤
│ [HERO]                           │
│ AI Automation for Cleveland...   │
│ Small business copy...           │
│ ✓ Save 20+ hours/week            │
│ [Primary CTA Button]             │
│ [Pride Discount Button]          │
│ [Hero Image - Full Width]        │
├──────────────────────────────────┤
│ [SERVICES GRID - 1 Column]       │
│ ┌──────────────────────────────┐ │
│ │ Cadence                      │ │
│ │ [Icon]                       │ │
│ │ Brand Rhythm                 │ │
│ │ Description...               │ │
│ │ [Learn More →]               │ │
│ └──────────────────────────────┘ │
│ [Repeat for 4 services]          │
├──────────────────────────────────┤
│ [TESTIMONIALS - Carousel]        │
│ Swipeable testimonial cards      │
├──────────────────────────────────┤
│ [STATS]                          │
│ 100+ businesses | 20+ hours      │
│ $30K saved      | 24/7 running   │
├──────────────────────────────────┤
│ [CTA - 25% Discount]             │
│ [Pride Discount Button]          │
├──────────────────────────────────┤
│ [Footer]                         │
├──────────────────────────────────┤
│ [Mobile Nav - Fixed Bottom 64px] │
│ Home | Services | About | Contact│
└──────────────────────────────────┘
```

### Homepage Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Header - Sticky]                                           │
│ Logo | Home Services▾ About Contact | [CTA Button]        │
├─────────────────────────────────────────────────────────────┤
│ [HERO - Split Layout]                                       │
│ ┌──────────────────┬────────────────────────────────────┐  │
│ │ AI Automation    │ [Hero Image - Right Side]          │  │
│ │ for Cleveland    │ [Image stretches full height]      │  │
│ │ Small business   │                                    │  │
│ │ copy...          │                                    │  │
│ │                  │                                    │  │
│ │ ✓ Feature        │                                    │  │
│ │ ✓ Feature        │                                    │  │
│ │                  │                                    │  │
│ │ [Primary CTA]    │                                    │  │
│ │ [Pride CTA]      │                                    │  │
│ └──────────────────┴────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ [SOCIAL PROOF - Logo Carousel]                              │
│ [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]                 │
├─────────────────────────────────────────────────────────────┤
│ [SERVICES GRID - 4 Columns]                                 │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│ │ Cadence     │ Flowstack   │ Consensus   │ Redbridging │  │
│ │ [Icon]      │ [Icon]      │ [Icon]      │ [Icon]      │  │
│ │ Description │ Description │ Description │ Description │  │
│ │ [Learn More]│ [Learn More]│ [Learn More]│ [Learn More]│  │
│ └─────────────┴─────────────┴─────────────┴─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ [ABOUT SECTION - Image Left, Text Right]                    │
├─────────────────────────────────────────────────────────────┤
│ [TESTIMONIALS - 3 Column Grid]                              │
│ [Card] [Card] [Card]                                        │
├─────────────────────────────────────────────────────────────┤
│ [STATS - 4 Columns]                                         │
│ 100+      | 20+        | $30K     | 24/7                    │
│ Businesses| Hours Saved| Savings  | Running                 │
├─────────────────────────────────────────────────────────────┤
│ [CTA BANNER - Full Width]                                   │
│ 25% Discount for LGBTQ+ Businesses                          │
│ [Pride Discount Button]                                     │
├─────────────────────────────────────────────────────────────┤
│ [Footer - 4 Columns]                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## PART 4: ANIMATIONS & MICRO-INTERACTIONS (1 hour)

```css
/* Animation Library */

/* Fade In Up (Scroll triggered) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s cubic-bezier(0, 0, 0.2, 1);
}

/* Scale & Shadow Hover (Cards, Buttons) */
.hover-lift {
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

/* Smooth Focus (Form inputs) */
input:focus {
  box-shadow: 0 0 0 3px rgba(15, 52, 96, 0.1);
}

/* Loading Skeleton */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f5f5f5 25%,
    #e5e5e5 50%,
    #f5f5f5 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## DELIVERABLES

### 1. design-specifications.md
- Complete design system documentation
- Color palette with reasoning
- Typography scale with rationale
- Spacing system (8pt grid)
- Component specifications
- Page layouts (mobile + desktop wireframes)
- Animation specifications

### 2. design-tokens.css
- All CSS variables
- All component styles
- All animations
- Ready to import into Next.js

### 3. Component Library (Figma Optional)
- Design system in Figma (if using design tool)
- Component specifications
- Mobile vs desktop variations
- Interactive prototypes (for key flows)

### 4. Visual Moodboard
- 50-100 reference images organized by category
- Color palette swatches
- Typography examples
- Button animation references

---

**Design Agent Guide v1.0**  
*BespokeEthos.com Redesign*  
*November 15, 2025*
