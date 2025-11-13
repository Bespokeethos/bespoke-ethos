# Website Fixes Summary

## Issues Identified from Screenshots and Requirements

### 1. Homepage Product Cards (Cadence Card)
**Problem**: Wrong card showing (Consensus Engine instead of Cadence as first card)
**Current State**: 
- `page.tsx` shows Consensus Engine card first
- Slideshow timing is 6000ms (6 seconds) for all cards
**Required Fix**:
- First card must be Cadence (man in tool room working on chair)
- Cadence card should show for 9000ms (9 seconds)
- Other cards use default 6000ms timing
- Available Cadence assets:
  - `/assets/generated/cadence-hero.png`
  - `/assets/generated/hero-cadence-desktop.webp`
  - `/assets/generated/cadence-asset1.png`
  - `/assets/generated/cadence-asset2.png`

### 2. Card Text Legibility
**Problem**: Text on cards not clearly readable
**Current State**: Basic overlay in slideshow.tsx
**Required Fix**:
- Improve text contrast with better overlays
- CSS already has `.cadence-card` styles for text readability
- Apply similar treatment to all cards

### 3. Mobile Layout - Empty Space Under Header
**Problem**: Large negative space on mobile under header
**Current State**: Unknown spacing issue
**Required Fix**:
- Reduce padding/margin on mobile homepage
- Check hero section padding

### 4. Trust Badges in Header
**Problem**: Not displaying prominently or consistently
**Required Fix**:
- Make badges more visible
- Ensure proper rendering on desktop and mobile
- Check header component

### 5. LGBTQ Discount Button Rainbow Halo
**Problem**: Animated rainbow gradient halo is missing
**Current State**: 
- CSS animation exists: `rainbow-ring-rotate` and `.lgbtq-rainbow-ring`
- Component has the classes applied
**Required Fix**:
- Verify animation is working
- May need to check if styles are being applied correctly

### 6. Open Graph (OG) Images
**Problem**: Using old template OG images instead of brand icon
**Current State**: Layout.tsx has OG metadata setup
**Required Fix**:
- Update all OG images to use brand icon
- Check `/public` for correct brand icon asset
- Update metadata in layout.tsx

### 7. Theme Settings - Light Mode Only
**Problem**: Need to lock site to light mode only
**Current State**: Theme switcher exists
**Required Fix**:
- Remove dark mode switcher from footer
- Force light mode only
- Check providers.tsx and theme-switcher.tsx

## Files to Modify
1. `src/app/page.tsx` - Fix Cadence card order and timing
2. `src/app/_sections/hero/slideshow.tsx` - Update timing logic and text overlays
3. `src/app/_components/header/index.tsx` - Fix trust badges
4. `src/app/_components/footer/index.tsx` - Remove theme switcher
5. `src/app/layout.tsx` - Update OG images
6. `src/app/providers.tsx` - Force light mode
7. `src/app/globals.css` - Verify rainbow animation styles
