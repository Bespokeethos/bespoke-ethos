import { test, expect } from "@playwright/test";

test.describe("Solutions overview", () => {
  test("shows all core offers with clean labels", async ({ page }) => {
    await page.goto("/solutions");

    const titles = ["Cadence", "Flowstack", "Chatbots", "Consensus Engine", "Redbridging"];

    for (const title of titles) {
      await expect(
        page.getByRole("heading", {
          level: 2,
          name: new RegExp(title, "i"),
        }),
      ).toBeVisible();
    }

    const badLabels = ["CadenceT", "FlowstackT", "Consensus EngineT", "RedbridgingT"];
    for (const bad of badLabels) {
      await expect(page.getByText(bad)).toHaveCount(0);
    }
  });
});
