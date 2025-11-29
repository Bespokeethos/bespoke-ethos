#!/usr/bin/env node
/**
 * Plexus Authenticated Email Scraper
 * Logs in and scrapes member emails from the authenticated directory
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../data/plexus_members_final.csv');
const OUTPUT_FILE = path.join(__dirname, '../data/plexus_members_enriched.csv');

const LOGIN_URL = 'https://thinkplexus.chambermaster.com/login';
const EMAIL = 'contact@gaymensfieldguide.com';
const PASSWORD = 'tuqkik-wytgow-fUxxu4';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  
  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
    const record = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx] || '';
    });
    records.push(record);
  }
  
  return records;
}

(async () => {
  console.log('🔐 PLEXUS AUTHENTICATED EMAIL SCRAPER\n');
  
  // Read existing data
  const csvText = fs.readFileSync(INPUT_FILE, 'utf8');
  const existingRecords = parseCSV(csvText);
  
  console.log(`📊 Loaded ${existingRecords.length} existing records`);
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // STEP 1: Login
    console.log('\n🔑 Logging in...');
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });
    await sleep(2000);
    
    // Fill login form
    await page.fill('input[type="email"], input[name="email"], input[id*="email"]', EMAIL);
    await page.fill('input[type="password"], input[name="password"], input[id*="password"]', PASSWORD);
    await page.click('button[type="submit"], input[type="submit"], button:has-text("Log in"), button:has-text("Sign in")');
    
    console.log('\n⏳ WAITING FOR LOGIN TO COMPLETE');
    console.log('👉 Please complete any 2FA/captcha if needed');
    console.log('⏳ Script will auto-detect when you\'re logged in...\n');
    
    // Wait for successful login (detect when we're redirected away from login page)
    await page.waitForFunction(() => {
      return !window.location.href.includes('/login');
    }, { timeout: 0 });
    
    console.log('✅ Login successful!\n');
    await sleep(2000);
    
    // STEP 2: Scrape authenticated directory
    const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let enrichedCount = 0;
    
    for (const letter of LETTERS) {
      console.log(`\n📂 Processing Letter: ${letter.toUpperCase()}`);
      const url = `https://thinkplexus.chambermaster.com/list/searchalpha/${letter}`;
      
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await sleep(1000);
      
      // Extract member links
      const memberLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'))
          .filter(link => link.href && link.href.includes('/list/member/'))
          .map(link => link.href);
        return [...new Set(links)];
      });
      
      console.log(`   Found ${memberLinks.length} members`);
      
      // Process each member
      for (let i = 0; i < memberLinks.length; i++) {
        const memberUrl = memberLinks[i];
        
        try {
          await page.goto(memberUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await sleep(500);
          
          // Extract data from AUTHENTICATED page
          const data = await page.evaluate(() => {
            const companyName = document.querySelector('h1')?.textContent.trim() || '';
            
            // Extract email (should be visible when logged in)
            let email = '';
            const emailLinks = Array.from(document.querySelectorAll('a[href^="mailto:"]'));
            if (emailLinks.length > 0) {
              email = emailLinks[0].href.replace('mailto:', '').trim();
            }
            
            // Extract representative name
            let firstName = '';
            let lastName = '';
            const repElements = Array.from(document.querySelectorAll('.mn-person-info, .representative, [class*="contact"], [class*="rep"]'));
            if (repElements.length > 0) {
              const fullName = repElements[0].textContent.trim();
              const nameParts = fullName.split(' ').filter(p => p && p.length > 1);
              firstName = nameParts[0] || '';
              lastName = nameParts.slice(1).join(' ') || '';
            }
            
            return { companyName, firstName, lastName, email };
          });
          
          // Find matching record
          const existingRecord = existingRecords.find(r => 
            r['Company Name'] === data.companyName
          );
          
          if (existingRecord) {
            // Only update missing fields
            if (data.email && (!existingRecord.Email || existingRecord.Email === '')) {
              existingRecord.Email = data.email;
              enrichedCount++;
              console.log(`   ✅ ${data.companyName}: ${data.email}`);
            }
            if (data.firstName && (!existingRecord['First Name'] || existingRecord['First Name'] === '')) {
              existingRecord['First Name'] = data.firstName;
            }
            if (data.lastName && (!existingRecord['Last Name'] || existingRecord['Last Name'] === '')) {
              existingRecord['Last Name'] = data.lastName;
            }
          }
          
        } catch (error) {
          console.error(`   ❌ Error: ${error.message}`);
        }
        
        if ((i + 1) % 10 === 0) {
          console.log(`   Progress: ${i + 1}/${memberLinks.length}`);
        }
      }
    }
    
    // STEP 3: Save enriched data
    const headers = ['Company Name', 'First Name', 'Last Name', 'Email', 'Website'];
    const csvRows = [headers.map(h => `"${h}"`).join(',')];
    
    for (const record of existingRecords) {
      const values = headers.map(field => {
        const value = record[field] || '';
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }
    
    fs.writeFileSync(OUTPUT_FILE, csvRows.join('\n'));
    
    console.log('\n' + '='.repeat(50));
    console.log(`🎉 ENRICHMENT COMPLETE`);
    console.log(`📊 Total Records: ${existingRecords.length}`);
    console.log(`📧 Emails Added: ${enrichedCount}`);
    console.log(`💾 Saved to: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('\n❌ ERROR:', error);
  } finally {
    console.log('\n⏸️ Browser will stay open for 10 seconds...');
    await sleep(10000);
    await browser.close();
  }
})();
