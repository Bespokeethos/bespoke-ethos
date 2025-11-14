# Guide 3: Deployment and Verification

**Objective:** Deploy the verified code to production and ensure it works on the live site.

## Step 1: Add Environment Variables to Vercel

Before deploying, you must add your Airtable credentials to the Vercel project.

1.  Go to the [Bespoke Ethos Vercel Project](https://vercel.com/upton-rands-projects/bespoke-ethos/settings/environment-variables).
2.  Add the following environment variables. Ensure you select **all three environments** (Production, Preview, Development) for each.

| Name | Value |
| :--- | :--- |
| `AIRTABLE_API_KEY` | Your Personal Access Token |
| `AIRTABLE_BASE_ID` | Your Base ID (`app...`) |
| `AIRTABLE_CONTACT_TABLE_ID` | Your Contact Table ID (`tbl...`) |
| `AIRTABLE_NEWSLETTER_TABLE_ID` | Your Newsletter Table ID (`tbl...`) |

3.  Verify that `RESEND_API_KEY` and the `TURNSTILE` keys are already present.

## Step 2: Deploy to Production

1.  Ensure all your changes (if any) are committed.
2.  Push the `main` branch to GitHub.

```bash
# Check status to ensure no uncommitted changes
git status

# Push to deploy
git push origin main
```

3.  Go to the [Vercel Deployments](https://vercel.com/upton-rands-projects/bespoke-ethos/deployments) page and monitor the build. It should succeed.

## Step 3: Live Site Verification

Once the deployment is complete, repeat the testing protocol from **Guide 2** on the live production domains:

-   **Contact Form:** [https://www.bespokeethos.com/contact](https://www.bespokeethos.com/contact)
-   **Newsletter Form:** [https://www.bespokeethos.com](https://www.bespokeethos.com) (in the footer)

**Verification Checklist:**

-   [ ] **Contact Form:** Submits successfully, sends an email, and creates an Airtable record.
-   [ ] **Newsletter Form:** Submits successfully and creates an Airtable record.

## Step 4: Complete the Verification Report

1.  Open the `templates/Verification_Report.md` file.
2.  Fill in all the details, including:
    *   Confirmation that all tests passed.
    *   The Airtable credentials you used.
    *   Screenshots of the successful form submissions and Airtable records.
3.  Save the completed report as `Verification_Report_COMPLETED.md`.

## Step 5: Final Commit

Commit and push your completed verification report to the repository.

```bash
git add Verification_Report_COMPLETED.md
git commit -m "docs: complete Sprint 1 verification report"
git push origin main
```

**Your mission is now complete. The project is ready for the Sprint 2 handoff.**
