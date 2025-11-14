# Quick Reference Cheat Sheet

## File Locations

- **Repo:** `c:\vercel\bespoke-ethos`
- **Environment File:** `c:\vercel\.env.local`
- **Agent Package:** `c:\vercel\manus`

## Key Commands

```bash
# Navigate to repo
cd c:\vercel\bespoke-ethos

# Install dependencies
pnpm install

# Run checks
pnpm run check

# Start dev server
pnpm dev

# Build for production
pnpm run build

# Deploy to Vercel
git push origin main
```

## Environment Variables Needed

```env
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
AIRTABLE_CONTACT_TABLE_ID=tbl...
AIRTABLE_NEWSLETTER_TABLE_ID=tbl...
RESEND_API_KEY=re_bMWQX5PK_79fyyBYKi5NZTapgFNVKQfgZ
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAcF-v3b3I3G9y3J
TURNSTILE_SECRET=0x4AAAAAAAcGA21y5AL1D92b9iH542wFkEw
SKIP_REMOTE_DATA=1
```

## Important URLs

- **Airtable Tokens:** https://airtable.com/create/tokens
- **Vercel Project:** https://vercel.com/upton-rands-projects/bespoke-ethos
- **Live Site:** https://www.bespokeethos.com
- **Contact Form:** https://www.bespokeethos.com/contact

## Testing Checklist

**Local:**
- [ ] Contact form → Email + Airtable
- [ ] Newsletter form → Airtable
- [ ] Error handling works

**Production:**
- [ ] Same tests on live site
- [ ] Verify Airtable records
- [ ] Verify emails received

## Airtable Table Structure

**Contact Submissions:**
Name, Email, Company, Use Case, Budget, Timeline, Message, Consent, Submitted At, IP Address, User Agent, Status

**Newsletter Subscribers:**
Email (primary), Subscribed At, Status, Source

## Common Issues

1. **"AIRTABLE_API_KEY not configured"** → Check `.env.local`, restart dev server
2. **401/403 from Airtable** → Verify token scopes and base access
3. **No email** → Check Resend dashboard logs
4. **Build fails** → Run `pnpm install`, check for syntax errors

## Workflow

1. Read `guides/01_Airtable_Setup.md`
2. Read `guides/02_Local_Testing_Protocol.md`
3. Read `guides/03_Deployment_and_Verification.md`
4. Fill out `templates/Verification_Report.md`
5. Commit and push

## Tools to Use

- **Browser DevTools:** Network tab, Console tab
- **curl:** Test API endpoints directly
- **Airtable Dashboard:** Verify records
- **Resend Dashboard:** Check email delivery
- **Vercel Dashboard:** Monitor deployments
