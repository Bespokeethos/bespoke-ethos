import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test("renders form and basic fields", async ({ page }) => {
    await page.goto("/contact");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // Basic form presence
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Common fields
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test("shows validation for missing required fields", async ({ page }) => {
    await page.goto("/contact");

    const form = page.locator("form");
    const submit = form.getByRole("button", { name: /send|submit|contact/i });

    await submit.click();

    // We don't assert exact error copy, just that some helper text appears.
    const errorText = page.getByText(/required/i).first();
    await expect(errorText).toBeVisible();
  });
});

