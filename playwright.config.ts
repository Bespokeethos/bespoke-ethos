import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm start",
    url: "http://127.0.0.1:3000",
    timeout: 120_000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "desktop-widescreen",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "desktop-standard",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: "tablet-landscape",
      use: {
        ...devices["iPad Pro 11"],
        isMobile: false,
      },
    },
    {
      name: "mobile-large",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "mobile-small-rounded",
      use: {
        ...devices["iPhone 12"],
      },
    },
  ],
});
