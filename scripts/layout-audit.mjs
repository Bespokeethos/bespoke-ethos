#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { chromium, firefox, webkit, devices } from "playwright";

const ROUTES = [
  "/",
  "/solutions",
  "/solutions/flowstack",
  "/solutions/chatbots",
  "/solutions/consensus-engine",
  "/solutions/redbridging",
  "/solutions/a-la-carte",
  "/solutions/essentials",
  "/products/cadence",
  "/pricing",
  "/enterprise",
  "/case-studies",
  "/blog",
  "/faq",
  "/help",
  "/lgbtq-discount",
  "/contact",
];

const ipadDevice = devices["iPad Pro 11"];
const iphoneDevice = devices["iPhone 12 Pro"];

const VIEWPORTS = [
  {
    name: "desktop-chromium",
    browserType: chromium,
    contextOptions: {
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1.25,
    },
  },
  {
    name: "ipad-firefox",
    browserType: firefox,
    contextOptions: {
      viewport: { width: ipadDevice.viewport.width, height: ipadDevice.viewport.height },
      userAgent: ipadDevice.userAgent,
      deviceScaleFactor: ipadDevice.deviceScaleFactor,
      hasTouch: true,
    },
  },
  {
    name: "iphone-webkit",
    browserType: webkit,
    contextOptions: {
      ...iphoneDevice,
    },
  },
];

const BASE_URL =
  process.env.LAYOUT_AUDIT_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.bespokeethos.com";

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputDir = path.join(process.cwd(), "test-results", "layout-audit", timestamp);

function slugify(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/[\\/?#]+/g, "__");
}

function summarizeDiagnostics(data) {
  const issues = [];
  if (data.horizontalOverflow > 4) {
    issues.push(
      `Horizontal overflow of ${data.horizontalOverflow.toFixed(1)}px (body overflow-x: ${data.bodyOverflowX}).`,
    );
  }
  if (data.clippedInteractive.length) {
    issues.push(
      `Clipped interactive elements: ${data.clippedInteractive
        .map((item) => `"${item.text || "(no text)"}" at (${item.rect.x.toFixed(0)},${item.rect.y.toFixed(
          0,
        )})`)
        .join(", ")}`,
    );
  }
  return issues;
}

async function captureScreens(page, absolutePath) {
  try {
    await page.screenshot({ path: absolutePath, fullPage: true });
    return [absolutePath];
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("larger than 32767")) {
      throw error;
    }

    const viewportSize = page.viewportSize();
    if (!viewportSize) throw error;
    const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const segments = Math.max(1, Math.ceil(documentHeight / viewportSize.height));
    const paths = [];

    for (let i = 0; i < segments; i++) {
      const scrollY = i * viewportSize.height;
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(250);
      const segmentedPath = absolutePath.replace(/\.png$/, `--part${String(i + 1).padStart(2, "0")}.png`);
      await page.screenshot({ path: segmentedPath, fullPage: false });
      paths.push(segmentedPath);
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    return paths;
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const auditEntries = [];

  for (const viewport of VIEWPORTS) {
    const browser = await viewport.browserType.launch({ headless: true });
    const context = await browser.newContext(viewport.contextOptions);
    const page = await context.newPage();

    for (const route of ROUTES) {
      const url = new URL(route, BASE_URL).toString();
      const filename = `${slugify(route)}.png`;
      const viewportDir = path.join(outputDir, viewport.name);
      const screenshotPath = path.join(viewportDir, filename);
      await mkdir(viewportDir, { recursive: true });

      const record = {
        viewport: viewport.name,
        route,
        url,
        screenshots: [],
      };

      try {
        const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
        if (!response || response.status() >= 400) {
          throw new Error(`HTTP status ${response?.status() ?? "unknown"}`);
        }

        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1500);
        const shotPaths = await captureScreens(page, screenshotPath);
        record.screenshots = shotPaths.map((p) => path.relative(process.cwd(), p).replace(/\\/g, "/"));

        const diagnostics = await page.evaluate(() => {
          const horizontalOverflow = Math.max(
            0,
            document.documentElement.scrollWidth - window.innerWidth,
          );
          const bodyOverflowX = window.getComputedStyle(document.body).overflowX;
          const clippedInteractive = [];
          const overflowDetails = [];

          const describe = (el) => {
            const tag = el.tagName.toLowerCase();
            const id = el.id ? `#${el.id}` : "";
            const className = el.className && typeof el.className === "string" ? el.className : "";
            const classToken = className
              ? "." + className.trim().split(/\\s+/).filter(Boolean).join(".")
              : "";
            return `${tag}${id}${classToken}`;
          };

          if (horizontalOverflow > 4) {
            for (const el of document.body.querySelectorAll("*")) {
              const rect = el.getBoundingClientRect();
              if (rect.right > window.innerWidth + 1 || rect.left < -1) {
                overflowDetails.push({
                  selector: describe(el),
                  rect: {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                  },
                });
              }
              if (overflowDetails.length >= 6) break;
            }
          }
          for (const el of document.querySelectorAll("a, button")) {
            const rect = el.getBoundingClientRect();
            const clipped =
              rect.right > window.innerWidth + 1 ||
              rect.left < -1 ||
              rect.top < -1;
            if (clipped) {
              const text = (el.textContent || el.getAttribute("aria-label") || "").trim();
              if (text.toLowerCase().includes("skip to main")) continue;
              const snippet = text.slice(0, 60);
              clippedInteractive.push({
                text: snippet,
                rect: {
                  x: rect.x,
                  y: rect.y,
                  width: rect.width,
                  height: rect.height,
                },
              });
            }
          }

          return {
            horizontalOverflow,
            bodyOverflowX,
            clippedInteractive,
            overflowDetails,
            viewport: { width: window.innerWidth, height: window.innerHeight },
            scrollSize: {
              width: document.documentElement.scrollWidth,
              height: document.documentElement.scrollHeight,
            },
          };
        });

        record.diagnostics = diagnostics;
        record.notes = summarizeDiagnostics(diagnostics);
      } catch (error) {
        record.error = error instanceof Error ? error.message : String(error);
      }

      auditEntries.push(record);
      console.log(`[${viewport.name}] ${route} -> ${record.error ? record.error : "ok"}`);
    }

    await browser.close();
  }

  const reportPath = path.join(outputDir, "report.json");
  await writeFile(
    reportPath,
    JSON.stringify(
      {
        baseUrl: BASE_URL,
        generatedAt: new Date().toISOString(),
        routes: ROUTES,
        viewports: VIEWPORTS.map((v) => v.name),
        entries: auditEntries,
      },
      null,
      2,
    ),
  );

  console.log(`Layout audit artifacts saved to ${outputDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
