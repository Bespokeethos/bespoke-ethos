# 📦 Dependencies & Environment Reference

## ⚠️ DO NOT UPDATE UNLESS ABSOLUTELY NECESSARY

This project uses specific versions that are tested and working. Updating dependencies can break the build.

---

## 🔒 Locked Versions (DO NOT CHANGE)

### Core Framework
- **Next.js:** `16.0.0` (exact version, no caret)
- **React:** `19.2.0` (exact version, no caret)
- **React DOM:** `19.2.0` (exact version, no caret)
- **Node.js:** `20.x` (enforced by engines field)
- **pnpm:** `10.18.2` (exact version, enforced by packageManager field)

### Why These Versions?
- Next.js 16.0.0 is the latest stable with Turbopack
- React 19.2.0 is the latest stable
- Node 20.x is required by Next.js 16
- pnpm 10.18.2 is the latest stable package manager

---

## 📚 Key Dependencies

### UI Components
```json
"@radix-ui/react-accordion": "^1.2.1"
"@radix-ui/react-navigation-menu": "^1.2.1"
"@radix-ui/react-popover": "^1.1.2"
"@radix-ui/react-select": "^2.1.2"
"@radix-ui/react-tooltip": "^1.1.3"
"@tabler/icons-react": "3.21.0"
```
**Purpose:** Accessible UI components for navigation, menus, tooltips  
**Update Policy:** Only update if security vulnerability or critical bug

### Styling
```json
"tailwindcss": "^4.0.17"
"@tailwindcss/postcss": "^4.0.17"
"@tailwindcss/typography": "^0.5.19"
"tailwindcss-radix": "^4.0.2"
"sass": "^1.83.0"
```
**Purpose:** Tailwind CSS v4 with PostCSS and typography plugin  
**Update Policy:** DO NOT update Tailwind v4 until stable release

### CMS & Content
```json
"basehub": "^9.5.2"
```
**Purpose:** BaseHub CMS integration for blog/changelog  
**Update Policy:** Only update if BaseHub team recommends  
**Required Env Var:** `BASEHUB_TOKEN`

### Image Processing
```json
"sharp": "^0.34.5"
```
**Purpose:** Image optimization during build  
**Update Policy:** Only update if build fails due to sharp issues

### Carousel
```json
"embla-carousel": "^8.0.4"
"embla-carousel-react": "^8.0.4"
"embla-carousel-wheel-gestures": "^8.0.1"
```
**Purpose:** Hero slideshow on homepage  
**Update Policy:** Only update if carousel bugs occur

---

## 🌍 Environment Variables

### Required for Production Build
```bash
BASEHUB_TOKEN=bshb_pk_ykswlw1qlep768ti6hmyqrhhl5bgvpj7e8xovewkdrv8hy4wet58hgrrbf3ga4af
```
**Purpose:** Fetch blog/changelog content from BaseHub CMS  
**Location:** Set in Vercel dashboard for Production, Preview, Development  
**Note:** Build will skip blog pages if missing (not critical for main site)

### Optional
```bash
NEXT_PUBLIC_SITE_URL=https://www.bespokeethos.com
```
**Purpose:** Base URL for OG images and canonical URLs  
**Default:** Falls back to Vercel URL if not set

### Local Development Only
```bash
SKIP_REMOTE_DATA=1
```
**Purpose:** Skip BaseHub API calls during local development  
**Usage:** `pnpm run dev-skip-basehub`

---

## 🛠️ Build Tools

### Package Manager
- **pnpm 10.18.2** (enforced by `packageManager` field)
- Uses `pnpm-lock.yaml` for deterministic installs
- **DO NOT use npm or yarn** - will cause dependency conflicts

### TypeScript
```json
"typescript": "^5.4.5"
```
**Purpose:** Type checking and compilation  
**Config:** `tsconfig.json`

### Linting
```json
"eslint": "^9.14.0"
"eslint-config-next": "16.0.0"
```
**Purpose:** Code quality and consistency  
**Config:** `eslint.config.mjs`

### Formatting
```json
"prettier": "^3.2.5"
"prettier-plugin-tailwindcss": "^0.6.11"
```
**Purpose:** Code formatting with Tailwind class sorting  
**Config:** `.prettierrc` (if exists)

---

## 🚫 What NOT to Do

### ❌ DO NOT run these commands:
```bash
pnpm update          # Updates all dependencies
pnpm upgrade         # Same as update
npm install          # Wrong package manager
yarn install         # Wrong package manager
pnpm add <package>@latest  # Installs latest (might break)
```

### ✅ ONLY run these commands:
```bash
pnpm install                    # Install exact versions from lockfile
pnpm install --frozen-lockfile  # Install without updating lockfile
pnpm add <package>@<version>    # Add specific version only
```

---

## 🔄 When to Update Dependencies

### Security Vulnerabilities
If `pnpm audit` shows critical vulnerabilities:
1. Check if vulnerability affects production code
2. Update ONLY the affected package
3. Test thoroughly before deploying
4. Document the change in git commit

### Bug Fixes
If a dependency has a critical bug:
1. Check release notes for the fix
2. Update to the specific patch version
3. Test locally with `pnpm build`
4. Deploy and monitor

### Feature Needs
If you need a new feature from a dependency:
1. Check if current version supports it
2. If not, evaluate risk of updating
3. Update in a separate branch first
4. Test extensively before merging to main

---

## 📋 Dependency Update Checklist

If you MUST update a dependency:

- [ ] Read the changelog/release notes
- [ ] Check for breaking changes
- [ ] Update to specific version (not `@latest`)
- [ ] Run `pnpm install`
- [ ] Run `pnpm run check` (lint + typecheck)
- [ ] Run `pnpm build` (full build test)
- [ ] Test locally with `pnpm dev`
- [ ] Test all critical pages
- [ ] Commit with clear message: `chore(deps): update X from Y to Z`
- [ ] Deploy to production
- [ ] Monitor for errors

---

## 🐛 Common Dependency Issues

### Issue: "Cannot find module 'next'"
**Cause:** Missing dependencies or corrupted node_modules  
**Solution:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: "Sharp installation failed"
**Cause:** Sharp binary mismatch with Node version  
**Solution:**
```bash
pnpm rebuild sharp
```

### Issue: "Peer dependency warning"
**Cause:** Dependency version mismatch  
**Solution:** Ignore if build succeeds. Only fix if build fails.

### Issue: "pnpm-lock.yaml conflicts"
**Cause:** Multiple people updating dependencies  
**Solution:**
```bash
git checkout main -- pnpm-lock.yaml
pnpm install
```

---

## 📊 Dependency Audit

### Check for vulnerabilities:
```bash
pnpm audit
```

### View outdated packages (DO NOT auto-update):
```bash
pnpm outdated
```

### View dependency tree:
```bash
pnpm list --depth=1
```

---

## 🔗 Related Documentation

- [DEPLOYMENT.md](../DEPLOYMENT.md) - Full deployment guide
- [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) - Quick deployment steps
- [package.json](../package.json) - Dependency definitions
- [pnpm-lock.yaml](../pnpm-lock.yaml) - Locked versions (DO NOT EDIT)

---

## 📝 Notes

- **pnpm-lock.yaml is sacred** - Never manually edit it
- **node_modules is gitignored** - Never commit it
- **Vercel uses exact lockfile** - What works locally works in production
- **Caret (^) allows patch updates** - e.g., ^1.2.3 allows 1.2.4 but not 1.3.0
- **Exact versions have no prefix** - e.g., 16.0.0 means exactly 16.0.0
