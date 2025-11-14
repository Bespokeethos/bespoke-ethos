# Guide 2: Local Testing Protocol

**Objective:** Verify that all form submissions work correctly on your local machine.

## Step 1: Start the Development Server

1.  Open a terminal in the `bespoke-ethos` repository.
2.  Run the following commands:

```bash
# Install dependencies if you haven't already
pnpm install

# Run linting and type checks
pnpm run check

# Start the dev server
pnpm dev
```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 2: Test the Contact Form

1.  Navigate to [http://localhost:3000/contact](http://localhost:3000/contact).
2.  Open your browser's developer tools to the **Network** tab.
3.  Fill out the form with test data.
4.  Complete the Turnstile challenge.
5.  Click **"Send message"**.

**Verification Checklist:**

-   [ ] **UI:** A success message appears on the page.
-   [ ] **Network:** The `POST` request to `/api/contact` returns a `200 OK` status.
-   [ ] **Email:** An email notification arrives at `contact@bespokeethos.com`.
-   [ ] **Airtable:** A new record appears in the "Contact Submissions" table with all the correct data.
-   [ ] **Terminal:** The local server logs show a success message.

## Step 3: Test the Newsletter Form

1.  Navigate to the homepage ([http://localhost:3000](http://localhost:3000)).
2.  Scroll to the footer.
3.  Enter a test email address.
4.  Click **"Subscribe"**.

**Verification Checklist:**

-   [ ] **UI:** A success message appears below the form.
-   [ ] **Network:** The `POST` request to `/api/newsletter` returns a `200 OK` status.
-   [ ] **Airtable:** A new record appears in the "Newsletter Subscribers" table.

## Step 4: Test Error Handling

1.  **Contact Form:**
    *   Submit with an invalid email format. Verify an error message appears.
    *   Submit without completing Turnstile. Verify the submission fails.
2.  **Newsletter Form:**
    *   Submit with an empty email. Verify an error message appears.

## Step 5: Use the Testing Script (Optional)

A `curl` script is provided to test the API endpoints directly.

```bash
# In a new terminal, navigate to the package directory
cd /home/ubuntu/codex_agent_package

# Run the test script
bash scripts/test_endpoints.sh
```

This script will send test data to your local API routes and print the responses. Use it to quickly verify your endpoints are working.

**Once all local tests pass, proceed to the deployment guide.**
