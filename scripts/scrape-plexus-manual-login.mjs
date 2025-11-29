#!/usr/bin/env node
/**
 * Plexus Manual Login Email Scraper
 * Opens browser, waits for you to log in, then scrapes emails
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../data/plexus_members_final.csv');
const OUTPUT_FILE = path.join(__dirname, '../data/plexus_members_enriched.csv');

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
  console.log('🔐 PLEXUS MANUAL LOGIN EMAIL SCRAPER\n');
  
  // Read existing data
  const csvText = fs.readFileSync(INPUT_FILE, 'utf8');
  const existingRecords = parseCSV(csvText);
  
  console.log(`📊 Loaded ${existingRecords.length} existing records\n`);
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Open login page
    console.log('🌐 Opening Plexus login page...');
    await page.goto('https://thinkplexus.chambermaster.com/login');
    
    console.log('\n' + '='.repeat(60));
    console.log('🔑 AUTOMATIC LOGIN');
    console.log('='.repeat(60));
    console.log('\n📧 Email: contact@gaymensfieldguide.com');
    console.log('🔒 Password: ********\n');
    
    // Fill in login form
    try {
      await page.fill('input[type="email"], input[name="email"], input[id*="email"], input[placeholder*="email" i]', 'contact@gaymensfieldguide.com');
      await sleep(500);
      await page.fill('input[type="password"], input[name="password"], input[id*="password"], input[placeholder*="password" i]', 'tuqkik-wytgow-fUxxu4');
      await sleep(500);
      
      // Click login button
      await page.click('button[type="submit"], input[type="submit"], button:has-text("Log in"), button:has-text("Sign in"), button:has-text("Login")');
      console.log('✅ Login form submitted\n');
    } catch (error) {
      console.log('⚠️ Auto-login failed, please log in manually');
    }
    
    console.log('⏳ Waiting for successful login...\n');
    
    // Wait for login to complete (URL changes away from /login)
    await page.waitForFunction(() => {
      return !window.location.href.includes('/login');
    }, { timeout: 0 });
    
    console.log('✅ Login detected!\n');
    await sleep(2000);
    
    // Click Directory button in top navigation
    console.log('🔘 Clicking Directory button...');
    await page.click('a:has-text("Directory"), button:has-text("Directory"), [href*="directory"], [href*="/list"]');
    await sleep(2000);
    
    // Wait for member directory to load
    console.log('⏳ Waiting for member directory to load...\n');
    await page.waitForFunction(() => {
      const memberLinks = document.querySelectorAll('a[href*="/list/member/"]');
      return memberLinks.length > 5;
    }, { timeout: 60000 });
    
    console.log('✅ Member directory loaded! Starting scrape...\n');
    await sleep(2000);
    
    // Now scrape all letters A-Z
    const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let enrichedCount = 0;
    
    for (const letter of LETTERS) {
      console.log(`\n📂 Processing Letter: ${letter.toUpperCase()}`);
      const url = `https://thinkplexus.chambermaster.com/list/searchalpha/${letter}`;
      
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await sleep(1500);
      
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
          await sleep(300);
          
          // Extract data
          const data = await page.evaluate(() => {
            const companyName = document.querySelector('h1')?.textContent.trim() || '';
            
            // Extract ALL email links
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
            // Check if record already has all fields
            const hasAllFields = existingRecord['First Name'] && 
                                 existingRecord['Last Name'] && 
                                 existingRecord.Email && 
                                 existingRecord.Website;
            
            if (hasAllFields) {
              console.log(`   ⏭️  Skipping ${data.companyName} (already complete)`);
              continue;
            }
            
            // Only update missing fields
            let updated = false;
            if (data.email && (!existingRecord.Email || existingRecord.Email === '')) {
              existingRecord.Email = data.email;
              enrichedCount++;
              updated = true;
            }
            if (data.firstName && (!existingRecord['First Name'] || existingRecord['First Name'] === '')) {
              existingRecord['First Name'] = data.firstName;
              updated = true;
            }
            if (data.lastName && (!existingRecord['Last Name'] || existingRecord['Last Name'] === '')) {
              existingRecord['Last Name'] = data.lastName;
              updated = true;
            }
            
            if (updated) {
              console.log(`   ✅ ${data.companyName}: ${data.email || 'name only'}`);
            }
          }
          
        } catch (error) {
          console.error(`   ❌ Error: ${error.message}`);
        }
        
        if ((i + 1) % 10 === 0) {
          console.log(`   Progress: ${i + 1}/${memberLinks.length}`);
        }
        
        // Data integrity check every 20 records
        if ((i + 1) % 20 === 0) {
          console.log('\n   🔍 DATA INTEGRITY CHECK');
          
          // Spot check 2 random recent records
          const recentRecords = existingRecords.slice(-20);
          const spotChecks = [
            recentRecords[Math.floor(Math.random() * recentRecords.length)],
            recentRecords[Math.floor(Math.random() * recentRecords.length)]
          ];
          
          for (const record of spotChecks) {
            const hasEmail = record.Email && record.Email !== '';
            const hasFirstName = record['First Name'] && record['First Name'] !== '';
            const hasLastName = record['Last Name'] && record['Last Name'] !== '';
            const hasWebsite = record.Website && record.Website !== '';
            
            console.log(`   📋 ${record['Company Name']}`);
            console.log(`      Email: ${hasEmail ? '✅' : '❌'} ${record.Email || 'MISSING'}`);
            console.log(`      Name: ${hasFirstName && hasLastName ? '✅' : '❌'} ${record['First Name']} ${record['Last Name']}`);
            console.log(`      Website: ${hasWebsite ? '✅' : '❌'} ${record.Website || 'MISSING'}`);
          }
          console.log('');
        }
      }
    }
    
    // Save enriched data
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
