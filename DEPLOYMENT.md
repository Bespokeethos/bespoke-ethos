# Deployment Guide for Bespoke Ethos Marketing Website

## 🎯 Quick Reference

**Repository:** https://github.com/Uptonr3421/bespoke-ethos  
**Vercel Project ID:** `prj_8cbai6JzE169NUytyFtCpSohZVka`  
**Production Domains:** www.bespokeethos.com, bespokeethos.com  
**Deployment Branch:** `main` (ONLY)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

1. **You are on the `main` branch**
   ```bash
   git branch  # Should show: * main
   ```

2. **All changes are committed**
   ```bash
   git status  # Should show: "nothing to commit, working tree clean"
   ```

3. **Environment variables are set in Vercel:**
   - Core site + branding: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`
   - Forms: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, Airtable keys
   - CMS: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, optional `SANITY_API_TOKEN`
   - Search (optional but recommended): `OPENAI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`, `PINECONE_PROJECT_NAME`, `PINECONE_HOST`, `EMBEDDING_MODEL`

---

## 🚀 Standard Deployment Process

### Step 1: Make Your Changes
Edit files as needed in your local environment.

### Step 2: Test Locally (Optional but Recommended)
```bash
pnpm install
pnpm build
pnpm dev  # Test at http://localhost:3000
```

### Step 3: Commit Your Changes
```bash
git add -A
git commit -m "feat: describe your changes here"
```

### Step 4: Push to GitHub
```bash
git push origin main
```

### Step 5: Vercel Auto-Deploys
- Vercel GitHub integration automatically detects the push
- Build starts immediately
- Deployment completes in 2-5 minutes
- Check status at: https://vercel.com/dashboard

---

## 🔒 Deployment Guardrails

**Enforced by `.github/workflows/guard.yml`:**

✅ **ALLOWED:**
- Pushes to `main` branch
- Deployments to Vercel project `prj_8cbai6JzE169NUytyFtCpSohZVka`

❌ **BLOCKED:**
- Any branch other than `main`
- Pull requests (preview only, no production deploy)

---

## 📦 Dependencies & Environment

**CRITICAL:** Do not update dependencies unless absolutely necessary. See [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) for details.

**Locked Versions:**
- Node.js: `20.x` (enforced)
- pnpm: `10.18.2` (enforced)
- Next.js: `16.0.0` (exact)
- React: `19.2.0` (exact)

**Required Environment Variables:**
- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`
- `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_CONTACT_TABLE_ID`, `AIRTABLE_NEWSLETTER_TABLE_ID`
- `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`
- `OPENAI_API_KEY` (for embeddings + MCP agents)
- `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`, `PINECONE_PROJECT_NAME`, `PINECONE_HOST`, `EMBEDDING_MODEL`

**Sync secrets from `.env.local`:**
1. Run `vercel env ls` in `C:\vercel` to confirm you are targeting the correct project.
2. For each key in `.env.local` (at minimum `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, Airtable, Sanity, OpenAI, Pinecone) run `vercel env add <KEY> production` and paste the value when prompted.
3. Repeat the `vercel env add` step for `preview` and `development`.
4. Re-deploy (Dashboard "Redeploy" or `vercel --prod`) so the build picks up the new secrets.
5. Keep `.env.local` out of git; it remains the authoritative source for local testing.

**Installation Command:**
```bash
pnpm install --frozen-lockfile  # ALWAYS use this, never just 'pnpm install'
```

---

## 🛠️ Build Configuration

**Framework:** Next.js 16.0.0 with Turbopack  
**Package Manager:** pnpm  
**Node Version:** 20.x  
**Build Command:** `pnpm build` (runs `node scripts/ci-build.mjs`)  
**Output Directory:** `.next`

### Build Process:
1. Image optimization (logos, hero images)
2. TypeScript compilation
3. Next.js static generation
4. Sanity CMS data fetching for changelog (honors `SKIP_REMOTE_DATA` and `SANITY_*` envs)

---

## 🐛 Common Issues & Solutions

### Issue: Middleware deprecation warning
**Status:** Known issue with Next.js 16.0.0. Does not break builds. Middleware uses correct `NextRequest` signature.

### Issue: "Link" component not found
**Solution:** Ensure `import Link from "next/link";` is present in all files using `<Link>` components.

### Issue: Deployment goes to wrong Vercel project
**Solution:** Check Vercel dashboard settings. Project ID should be `prj_8cbai6JzE169NUytyFtCpSohZVka`.

---

## 📋 Post-Deployment Verification

After deployment completes:

1. **Check production site:** https://www.bespokeethos.com
2. **Verify key pages:**
   - Homepage: Hero copy, clickable slides
   - Cadence page: Text readability, pricing
   - Trust badges: Visible on light theme
   - Mobile logo: Orange drop icon in header
3. **Test mobile responsiveness**
4. **Check OG images and favicon**

---

## 🔄 Rollback Process

If deployment fails or introduces bugs:

1. **Find last working commit:**
   ```bash
   git log --oneline
   ```

2. **Revert to previous commit:**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

3. **Or force rollback:**
   ```bash
   git reset --hard <commit-hash>
   git push origin main --force
   ```

---

## 📞 Support

For deployment issues:
- Check Vercel build logs: https://vercel.com/dashboard
- Review GitHub Actions: https://github.com/Uptonr3421/bespoke-ethos/actions
- Contact Vercel support: https://vercel.com/support

---

## 📝 Notes

- **Never create new branches** - All work happens on `main`
- **Vercel auto-deploys on push** - No manual trigger needed
- **Build time:** ~2-5 minutes
- **BaseHub CMS:** Required for blog/changelog pages (optional for main site)
- **Middleware warning:** Cosmetic only, does not affect functionality
