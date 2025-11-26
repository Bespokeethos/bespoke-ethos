# Guide 4: Troubleshooting Common Issues

This guide covers common problems you may encounter during testing and their solutions.

## Issue 1: "AIRTABLE_TOKEN not configured"

**Symptoms:**
- API route returns error about missing Airtable configuration
- Terminal shows "Missing required environment variables"

**Solution:**
1. Verify `c:\vercel\.env.local` contains `AIRTABLE_TOKEN`
2. Restart your dev server (`Ctrl+C` then `pnpm dev`)
3. Check that the key starts with `pat` (personal access token format)

## Issue 2: "Failed to save to Airtable" or 401/403 Errors

**Symptoms:**
- Form submits but no Airtable record appears
- Network tab shows 401 Unauthorized or 403 Forbidden from Airtable API

**Possible Causes & Solutions:**

**A. Wrong Base ID or Table ID**
- Go to Airtable → Help → API Documentation
- Verify the IDs match exactly (case-sensitive)
- Base ID format: `appXXXXXXXXXXXXXX`
- Table ID format: `tblXXXXXXXXXXXXXX`

**B. Insufficient Token Scopes**
- Go to https://airtable.com/create/tokens
- Click on your token
- Verify scopes include: `data.records:read` and `data.records:write`
- Verify the token has access to your base

**C. Field Name Mismatch**
- Field names in Airtable must EXACTLY match the code
- Check capitalization and spacing
- Common mistake: "Subscribed At" vs "SubscribedAt"

## Issue 3: Turnstile Verification Fails

**Symptoms:**
- Contact form won't submit
- Console error about Turnstile

**Solution:**
1. Check `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is in `.env.local`
2. Check `TURNSTILE_SECRET` is in `.env.local`
3. Try in incognito mode (browser extensions can interfere)
4. For local testing, you may need to temporarily bypass Turnstile

## Issue 4: Email Not Received

**Symptoms:**
- Form submits successfully
- Airtable record created
- But no email arrives

**Solution:**
1. Check spam/junk folder
2. Verify `RESEND_API_KEY` is correct in `.env.local`
3. Go to Resend dashboard → Logs to see delivery status
4. Verify the email is being sent to `contact@bespokeethos.com`

## Issue 5: TypeScript or Build Errors

**Symptoms:**
- `pnpm run check` fails
- Build errors in terminal

**Solution:**
1. Run `pnpm install` to ensure dependencies are up to date
2. Check for syntax errors in modified files
3. Run `pnpm run lint --fix` to auto-fix linting issues
4. If errors persist, check the git diff to see what changed

## Issue 6: Newsletter Form Not Visible

**Symptoms:**
- Can't find the newsletter form on homepage

**Solution:**
- Scroll to the footer of the homepage
- The form should be at the bottom
- If missing, check that `src/app/_sections/newsletter/index.tsx` exists

## Issue 7: Local Dev Server Won't Start

**Symptoms:**
- `pnpm dev` fails or hangs
- Port 3000 already in use

**Solution:**
1. Kill any existing Node processes: `taskkill /F /IM node.exe` (Windows)
2. Try a different port: `pnpm dev -- -p 3001`
3. Delete `.next` folder and try again: `rmdir /S .next` then `pnpm dev`

## Debugging Tips

**Use Browser DevTools:**
- Network tab: See API requests/responses
- Console tab: See JavaScript errors
- Application tab: Check cookies and storage

**Use curl for Direct API Testing:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","name":"Test"}'
```

**Check Server Logs:**
- The terminal running `pnpm dev` shows all API route logs
- Look for `[CONTACT_FORM_SUBMISSION]` or `[NEWSLETTER_SUBSCRIPTION]` messages

**Verify Airtable API Directly:**
```bash
curl "https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

This should return your table's records if credentials are correct.

## Still Stuck?

1. Read the error message carefully
2. Search the error message online
3. Check Airtable API documentation
4. Check Next.js documentation
5. Document the issue in your verification report
