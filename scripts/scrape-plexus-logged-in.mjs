#!/usr/bin/env node
/**
 * Plexus Already-Logged-In Scraper
 * Assumes you're already logged in and on the directory page
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
  console.log('🔐 PLEXUS LOGGED-IN SCRAPER\n');
  
  // Read existing data
  const csvText = fs.readFileSync(INPUT_FILE, 'utf8');
  const existingRecords = parseCSV(csvText);
  
  console.log(`📊 Loaded ${existingRecords.length} existing records\n`);
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('⏸️  Please navigate to the Plexus member directory in the browser');
    console.log('⏳ Waiting 10 seconds for you to be ready...\n');
    await sleep(10000);
    
    // Now scrape all letters A-Z
    const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let enrichedCount = 0;
    let processedCount = 0;
    
    for (const letter of LETTERS) {
      console.log(`\n📂 Processing Letter: ${letter.toUpperCase()}`);
      const url = `https://thinkplexus.chambermaster.com/list/searchalpha/${letter}`;
      
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await sleep(2000);
      
      // Extract ALL links on the page
      const memberLinks = await page.evaluate(() => {
        const allLinks = Array.from(document.querySelectorAll('a'));
        const memberLinks = allLinks
          .filter(link => {
            const href = link.href || '';
            // Try multiple patterns
            return href.includes('/member/') || 
                   href.includes('/mic/') ||
                   href.includes('member-detail') ||
                   href.includes('profile');
          })
          .map(link => link.href);
        return [...new Set(memberLinks)];
      });
      
      console.log(`   Found ${memberLinks.length} potential member links`);
      
      if (memberLinks.length === 0) {
        console.log(`   ⚠️  No links found for '${letter.toUpperCase()}' - skipping`);
        continue;
      }
      
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
            const repElements = Array.from(document.querySelectorAll('.mn-person-info, .representative, [class*="contact"], [class*="rep"], .contact-name'));
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
            processedCount++;
            
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
        if (processedCount > 0 && processedCount % 20 === 0) {
          console.log('\n   🔍 DATA INTEGRITY CHECK');
          
          // Spot check 2 random recent records
          const recentRecords = existingRecords.filter(r => r.Email).slice(-20);
          if (recentRecords.length >= 2) {
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
