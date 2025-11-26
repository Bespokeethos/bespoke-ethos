# 🚀 Deployment Quick Start

## The Simple Way (Recommended)

### Every Single Time You Want to Deploy:

```bash
# 1. Make sure you're on main branch
git checkout main

# 2. Stage all your changes
git add -A

# 3. Commit with a clear message
git commit -m "feat: describe what you changed"

# 4. Push to GitHub (this triggers automatic deployment)
git push origin main

# 5. Wait 2-5 minutes - Vercel deploys automatically
# Check status: https://vercel.com/dashboard
```

---

## That's It! 🎉

**Vercel watches the `main` branch and auto-deploys every push.**

No manual triggers. No extra steps. Just push to `main`.

---

## Important Rules

1. ✅ **ONLY push to `main` branch**
2. ✅ **ALWAYS commit before pushing**
3. ❌ **NEVER create other branches** (guardrails will block them)
4. ❌ **NEVER force push** (unless rolling back)

---

## If Something Goes Wrong

### Build Failed?
1. Check Vercel logs: https://vercel.com/dashboard
2. Look for error message
3. Fix the error locally
4. Commit and push again

### Need to Rollback?
```bash
# Find the last good commit
git log --oneline

# Revert to it
git revert <commit-hash>
git push origin main
```

---

## Environment Variables

Already set in Vercel (no action needed for typical deploys):
- Core site: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`
- Forms: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, Airtable keys
- CMS: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`
- Search (if enabled): `OPENAI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`, `PINECONE_PROJECT_NAME`, `PINECONE_HOST`, `EMBEDDING_MODEL`

---

## Project Info

- **Vercel Project:** bespoke-ethos
- **Project ID:** prj_8cbai6JzE169NUytyFtCpSohZVka
- **Production URL:** https://www.bespokeethos.com
- **GitHub Repo:** https://github.com/Uptonr3421/bespoke-ethos

---

## Questions?

See full deployment guide: [DEPLOYMENT.md](../DEPLOYMENT.md)
