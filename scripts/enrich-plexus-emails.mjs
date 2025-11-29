#!/usr/bin/env node
/**
 * Plexus Email Enrichment Script
 * Fills in missing First Name, Last Name, and Email fields
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
  console.log('🔄 PLEXUS EMAIL ENRICHMENT\n');
  
  // Read existing data
  const csvText = fs.readFileSync(INPUT_FILE, 'utf8');
  const existingRecords = parseCSV(csvText);
  
  console.log(`📊 Loaded ${existingRecords.length} existing records`);
  
  const recordsNeedingEmail = existingRecords.filter(r => !r.Email || r.Email === '');
  console.log(`📧 ${recordsNeedingEmail.length} records need email enrichment\n`);
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const enrichedRecords = [];
  let enrichedCount = 0;
  
  try {
    const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
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
          
          // Extract data
          const data = await page.evaluate(() => {
            const companyName = document.querySelector('h1')?.textContent.trim() || '';
            
            // Try to find email in page
            let email = '';
            const emailLink = document.querySelector('a[href^="mailto:"]');
            if (emailLink) {
              email = emailLink.href.replace('mailto:', '').trim();
            }
            
            // Try to find representative name
            let firstName = '';
            let lastName = '';
            const repElements = Array.from(document.querySelectorAll('.mn-person-info, .representative, [class*="contact"]'));
            if (repElements.length > 0) {
              const fullName = repElements[0].textContent.trim();
              const nameParts = fullName.split(' ').filter(p => p);
              firstName = nameParts[0] || '';
              lastName = nameParts.slice(1).join(' ') || '';
            }
            
            return { companyName, firstName, lastName, email };
          });
          
          // Find matching record in existing data
          const existingRecord = existingRecords.find(r => 
            r['Company Name'] === data.companyName
          );
          
          if (existingRecord) {
            // Only update missing fields
            if (!existingRecord.Email || existingRecord.Email === '') {
              existingRecord.Email = data.email;
            }
            if (!existingRecord['First Name'] || existingRecord['First Name'] === '') {
              existingRecord['First Name'] = data.firstName;
            }
            if (!existingRecord['Last Name'] || existingRecord['Last Name'] === '') {
              existingRecord['Last Name'] = data.lastName;
            }
            
            if (data.email) {
              enrichedCount++;
              console.log(`   ✅ Enriched: ${data.companyName} (${data.email})`);
            }
          }
          
        } catch (error) {
          console.error(`   ❌ Error processing ${memberUrl}: ${error.message}`);
        }
        
        if ((i + 1) % 10 === 0) {
          console.log(`   Progress: ${i + 1}/${memberLinks.length}`);
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
    await browser.close();
  }
})();
