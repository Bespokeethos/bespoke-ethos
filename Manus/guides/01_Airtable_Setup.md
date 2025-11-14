# Guide 1: Airtable Setup

**Objective:** Create the Airtable base and get all necessary credentials.

## Step 1: Create the Airtable Base

1.  Go to [https://airtable.com](https://airtable.com) and log in.
2.  Click **"Create a base"**.
3.  Name the base **"Bespoke Ethos CRM"**.

## Step 2: Create the 'Contact Submissions' Table

1.  Rename the default table to **"Contact Submissions"**.
2.  Create the following fields with the exact names and types:

| Field Name | Field Type |
| :--- | :--- |
| Name | Single line text |
| Email | Email |
| Company | Single line text |
| Use Case | Long text |
| Budget | Single select (Options: "Under $1k", "$1k-$3k", "$3k-$10k", "$10k+", "Not sure yet") |
| Timeline | Single select (Options: "ASAP", "2-4 weeks", "1-3 months", "Not sure yet") |
| Message | Long text |
| Consent | Checkbox |
| Submitted At | Created time |
| IP Address | Single line text |
| User Agent | Long text |
| Status | Single select (Options: "New", "Contacted", "Qualified", "Closed") |

## Step 3: Create the 'Newsletter Subscribers' Table

1.  Click **"+"** to add a new table.
2.  Name it **"Newsletter Subscribers"**.
3.  Set the primary field to be the **Email** field (type: Email).
4.  Create the following additional fields:

| Field Name | Field Type |
| :--- | :--- |
| Subscribed At | Created time |
| Status | Single select (Options: "Active", "Unsubscribed") |
| Source | Single line text |

## Step 4: Get Your Credentials

1.  **Personal Access Token (API Key):**
    *   Go to [https://airtable.com/create/tokens](https://airtable.com/create/tokens).
    *   Click **"Create new token"**.
    *   Name: `Bespoke Ethos Production`
    *   Scopes: `data.records:read`, `data.records:write`
    *   Access: Grant access to the **"Bespoke Ethos CRM"** base.
    *   Click **"Create token"** and copy the key immediately.

2.  **Base ID and Table IDs:**
    *   Go to your new base.
    *   Click **Help** > **API documentation**.
    *   The **Base ID** (starts with `app...`) is in the introduction section.
    *   The **Table IDs** (start with `tbl...`) are listed for each table.

## Step 5: Configure Your Local Environment

1.  Open the existing `.env.local` file at `c:\vercel\.env.local`.
2.  Add your Airtable credentials to this file:

```env
# .env.local

# Airtable
AIRTABLE_API_KEY="YOUR_PERSONAL_ACCESS_TOKEN"
AIRTABLE_BASE_ID="YOUR_BASE_ID"
AIRTABLE_CONTACT_TABLE_ID="YOUR_CONTACT_TABLE_ID"
AIRTABLE_NEWSLETTER_TABLE_ID="YOUR_NEWSLETTER_TABLE_ID"

# Resend (Provided by Upton)
RESEND_API_KEY="re_bMWQX5PK_79fyyBYKi5NZTapgFNVKQfgZ"

# Turnstile (Already in repo)
NEXT_PUBLIC_TURNSTILE_SITE_KEY="0x4AAAAAAAcF-v3b3I3G9y3J"
TURNSTILE_SECRET="0x4AAAAAAAcGA21y5AL1D92b9iH542wFkEw"

# Testing Flag
SKIP_REMOTE_DATA=1
```

**You are now ready to proceed to the local testing protocol.**
