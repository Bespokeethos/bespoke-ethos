import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * BRUTUS AXE ENFORCER
 * 
 * "Anally wrecking the CSS execution"
 * 
 * This script ruthlessly audits the application for accessibility and CSS violations.
 * It tolerates zero errors.
 */

async function enforce() {
  console.log('🪓 BRUTUS AXE ENFORCER: Initiating ruthless CSS/A11y Audit...');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Target: Production site
  const targetUrl = 'https://bespoke-ethos.vercel.app'; 
  
  try {
    console.log(`🎯 Targeting: ${targetUrl}`);
    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    if (results.violations.length > 0) {
      console.error(`\n❌ VIOLATIONS DETECTED: ${results.violations.length}`);
      console.error('   The CSS execution is unacceptable.\n');

      results.violations.forEach((violation: any, index: number) => {
        console.error(`   [${index + 1}] ${violation.id} (${violation.impact?.toUpperCase()})`);
        console.error(`       Description: ${violation.description}`);
        console.error(`       Help: ${violation.helpUrl}`);
        console.error(`       Nodes: ${violation.nodes.length} affected elements`);
        violation.nodes.forEach((node: any) => {
            console.error(`          - ${node.html}`);
        });
        console.error('');
      });

      console.error('🔥 EXECUTION WRECKED. FIX YOUR CSS.');
      process.exit(1);
    } else {
      console.log('✅ CLEAN. The CSS execution survives... for now.');
    }

  } catch (error) {
    console.error('⚠️ Error running audit (is the server running?):', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

enforce();
