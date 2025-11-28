import { test, expect } from "@playwright/test";

// test.describe("Contact page legacy form", () => {
//   // These tests are for the legacy form and are commented out because the form has been replaced with a Jotform embed.
//   // The new form is handled by Jotform and is not tested here.
//   test("renders form and basic fields", async ({ page }) => {
//     await page.goto("/contact");

//     const heading = page.getByRole("heading", { level: 1 });
//     await expect(heading).toBeVisible();

//     // Basic form presence
//     const form = page.locator("form");
//     await expect(form).toBeVisible();

//     // Common fields
//     await expect(page.getByLabel(/name/i)).toBeVisible();
//     await expect(page.getByLabel(/email/i)).toBeVisible();
//     await expect(page.getByLabel(/message/i)).toBeVisible();
//   });

//   test("shows validation for missing required fields", async ({ page }) => {
//     await page.goto("/contact");

//     const form = page.locator("form");
//     const submit = form.getByRole("button", { name: /send|submit|contact/i });

//     await submit.click();

//     // We don't assert exact error copy, just that some helper text appears.
//     const errorText = page.getByText(/required/i).first();
//     await expect(errorText).toBeVisible();
//   });
// });

test.describe("Contact page", () => {
  test("takes a screenshot of the page", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForTimeout(1000); // wait for animation
    await page.screenshot({ path: "test-results/artifacts/contact-page.png" });
  });
});

