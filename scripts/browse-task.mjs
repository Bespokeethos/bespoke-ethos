#!/usr/bin/env node
// Lightweight Playwright harness to run browser tasks from a JSON file.
// Usage: node scripts/browse-task.mjs [path/to/tasks.json]
// Set HEADLESS=1 to run without opening a visible browser.

import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const tasksPath = path.resolve(process.argv[2] || "scripts/browse-tasks.json");

function readTasks(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Tasks file not found: ${filePath}`);
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error(`Failed to parse tasks file: ${err.message}`);
    process.exit(1);
  }
}

function ensureDir(targetPath) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function runTask(page, task, defaults) {
  const timeout = task.timeout ?? defaults.timeout ?? 20000;
  const waitAfterNav = defaults.waitAfterNav ?? 500;
  console.log(`\n▶ ${task.name || task.url}`);

  await page.goto(task.url, { timeout, waitUntil: "networkidle" });
  if (waitAfterNav > 0) {
    await page.waitForTimeout(waitAfterNav);
  }

  for (const action of task.actions || []) {
    const actionType = action.type;
    switch (actionType) {
      case "waitForSelector":
        await page.waitForSelector(action.selector, { timeout });
        break;
      case "click":
        await page.click(action.selector, { timeout });
        break;
      case "fill":
        await page.fill(action.selector, action.text ?? "", { timeout });
        break;
      case "type":
        await page.type(action.selector, action.text ?? "", {
          delay: action.delay ?? 20,
          timeout
        });
        break;
      case "waitForTimeout":
        await page.waitForTimeout(action.ms ?? 500);
        break;
      case "screenshot": {
        const baseDir = defaults.screenshotDir || process.cwd();
        const filePath = path.isAbsolute(action.path || "")
          ? action.path
          : path.join(baseDir, action.path || "screenshot.png");
        ensureDir(filePath);
        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`  saved screenshot -> ${filePath}`);
        break;
      }
      default:
        console.warn(`  unknown action skipped: ${actionType}`);
    }
  }
}

async function main() {
  const config = readTasks(tasksPath);
  const tasks = config.tasks || [];
  if (!tasks.length) {
    console.error("No tasks found in tasks file.");
    process.exit(1);
  }

  const headless = process.env.HEADLESS === "1";
  const browser = await chromium.launch({ headless, slowMo: headless ? 0 : 50 });
  const context = await browser.newContext(config.context || {});

  try {
    for (const task of tasks) {
      const page = await context.newPage();
      await runTask(page, task, config.context || {});
      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
