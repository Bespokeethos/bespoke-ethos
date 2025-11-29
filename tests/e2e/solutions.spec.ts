import { test, expect } from "@playwright/test";

test.describe("Solutions overview", () => {
  test("shows all core offers with clean labels", async ({ page }) => {
    await page.goto("/solutions");

    const titles = ["AI Strategy Sprint", "Workflow Automation Setup", "Chatbots", "AI Research Assistant", "Automation Rescue"];

    for (const title of titles) {
      await expect(
        page.getByRole("heading", {
          level: 2,
          name: new RegExp(title, "i"),
        }),
      ).toBeVisible();
    }

    const badLabels = ["Cadence", "Flowstack", "Consensus Engine", "Redbridging"];
    for (const bad of badLabels) {
      await expect(page.getByText(bad)).toHaveCount(0);
    }
  });
});
