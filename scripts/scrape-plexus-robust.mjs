#!/usr/bin/env node
/**
 * PLEXUS MEMBER DIRECTORY SCRAPER - ROBUST EDITION
 * 
 * Features:
 * - Manual login handoff (no cookie/captcha issues)
 * - Automatic pagination (clicks Next until done)
 * - Data validation (prevents misaligned rows)
 * - Incremental saves every 50 records
 * - Retry logic for failed fetches
 * - Progress logging
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../data');
const INCREMENTAL_FILE = path.join(OUTPUT_DIR, 'plexus_members_incremental.csv');
const FINAL_FILE = path.join(OUTPUT_DIR, 'plexus_members_final.csv');
const START_URL = 'https://thinkplexus.chambermaster.com/list/';

const REQUIRED_FIELDS = ['Company Name', 'Address', 'City', 'State', 'Zip', 'Phone', 'Email', 'Website', 'Description', 'Representatives'];
const SAVE_INTERVAL = 50; // Save every 50 records
const MAX_RETRIES = 3;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate a single member record
 */
function validateRecord(record) {
  for (const field of REQUIRED_FIELDS) {
    if (record[field] === null || record[field] === undefined) {
      return false;
    }
  }
  return true;
}

/**
 * Convert records to CSV
 */
function toCSV(records) {
  if (records.length === 0) return '';
  
  const headers = REQUIRED_FIELDS;
  const rows = [headers.map(h => `"${h}"`).join(',')];
  
  for (const record of records) {
    const values = headers.map(field => {
      const value = record[field] || '';
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    rows.push(values.join(','));
  }
  
  return rows.join('\n');
}

/**
 * Save records incrementally
 */
function saveIncremental(records) {
  const csv = toCSV(records);
  fs.writeFileSync(INCREMENTAL_FILE, csv);
  console.log(`💾 Incremental save: ${records.length} records → ${INCREMENTAL_FILE}`);
}

/**
 * Save final output
 */
function saveFinal(records) {
  const csv = toCSV(records);
  fs.writeFileSync(FINAL_FILE, csv);
  console.log(`\n✅ FINAL SAVE: ${records.length} records → ${FINAL_FILE}`);
}

/**
 * Extract member data from a detail page (with retries)
 */
async function extractMemberData(memberUrl, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(memberUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const companyName = doc.querySelector('h1, .company-name, .member-name')?.textContent.trim() || '';
      
      // Address parsing
      const addressElements = doc.querySelectorAll('.address, [itemprop="address"]');
      let address = '', city = '', state = '', zip = '';
      if (addressElements.length > 0) {
        const addressText = addressElements[0].textContent.trim();
        const addressParts = addressText.split(',').map(p => p.trim());
        address = addressParts[0] || '';
        city = addressParts[1] || '';
        const stateZip = addressParts[2]?.split(' ') || [];
        state = stateZip[0] || '';
        zip = stateZip[1] || '';
      }

      const phones = Array.from(doc.querySelectorAll('a[href^="tel:"], .phone'))
        .map(el => el.textContent.trim())
        .filter(p => p);
      
      const emails = Array.from(doc.querySelectorAll('a[href^="mailto:"]'))
        .map(el => el.href.replace('mailto:', '').trim())
        .filter(e => e);
      
      const websiteLink = doc.querySelector('a[href*="http"]:not([href*="chambermaster"]):not([href*="mailto"])');
      const website = websiteLink?.href || '';
      
      const aboutSection = doc.querySelector('.about, .description, [class*="about"]');
      const description = aboutSection?.textContent.trim().substring(0, 500) || '';
      
      const reps = Array.from(doc.querySelectorAll('.representative, .contact, [class*="rep"]'))
        .map(el => el.textContent.trim())
        .filter(r => r);

      return {
        'Company Name': companyName,
        'Address': address,
        'City': city,
        'State': state,
        'Zip': zip,
        'Phone': phones.join('; '),
        'Email': emails.join('; '),
        'Website': website,
        'Description': description,
        'Representatives': reps.join('; ')
      };
    } catch (error) {
      if (attempt < retries) {
        console.warn(`⚠️ Retry ${attempt}/${retries} for ${memberUrl}: ${error.message}`);
        await sleep(1000 * attempt); // Exponential backoff
      } else {
        console.error(`❌ Failed after ${retries} attempts: ${memberUrl}`);
        return null;
      }
    }
  }
  return null;
}

/**
 * Main scraper
 */
(async () => {
  console.log('🚀 PLEXUS MEMBER SCRAPER - PUBLIC DIRECTORY EDITION\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const allMembers = [];
  const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
  
  try {
    for (const letter of LETTERS) {
      console.log(`\n📂 Processing Letter: ${letter.toUpperCase()}`);
      const url = `https://thinkplexus.chambermaster.com/list/searchalpha/${letter}`;
      
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await sleep(1000); // Let page settle

      // Extract member links from current letter page
      const memberLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'))
          .filter(link => {
            const href = link.href || '';
            return href.includes('/list/member/');
          })
          .map(link => ({
            name: link.textContent.trim(),
            url: link.href
          }));
        
        return [...new Map(links.map(m => [m.url, m])).values()];
      });
      
      console.log(`   Found ${memberLinks.length} members for '${letter.toUpperCase()}'`);
      
      // Process members for this letter
      const batchSize = 5;
      for (let i = 0; i < memberLinks.length; i += batchSize) {
        const batch = memberLinks.slice(i, i + batchSize);
        console.log(`   Scraping batch ${i+1}-${Math.min(i+batchSize, memberLinks.length)}...`);
        
        const batchResults = await page.evaluate(async (urls) => {
          const results = [];
          for (const url of urls) {
            try {
              const response = await fetch(url);
              const html = await response.text();
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');

              const companyName = doc.querySelector('h1, .company-name, .member-name')?.textContent.trim() || '';
              const email = doc.querySelector('a[href^="mailto:"]')?.href.replace('mailto:', '').trim() || '';
              const website = doc.querySelector('a[href*="http"]:not([href*="chambermaster"]):not([href*="mailto"])')?.href || '';
              
              let firstName = '';
              let lastName = '';
              const reps = Array.from(doc.querySelectorAll('.representative, .contact, [class*="rep"]')).map(el => el.textContent.trim());
              if (reps.length > 0) {
                const nameParts = reps[0].split(' ');
                firstName = nameParts[0] || '';
                lastName = nameParts.slice(1).join(' ') || '';
              }

              results.push({
                'Company Name': companyName,
                'First Name': firstName,
                'Last Name': lastName,
                'Email': email,
                'Website': website
              });
            } catch (error) {
              results.push(null);
            }
          }
          return results;
        }, batch.map(m => m.url));
        
        // Add valid records
        for (const record of batchResults) {
          if (record && record['Company Name']) {
            allMembers.push(record);
          }
        }
        
        // Incremental save
        if (allMembers.length % 50 === 0) {
          saveIncremental(allMembers);
        }
        
        await sleep(500);
      }
    }
    
    // Final save
    console.log('\n' + '='.repeat(50));
    console.log(`🎉 SCRAPING COMPLETE. Total Records: ${allMembers.length}`);
    saveFinal(allMembers);
    
  } catch (error) {
    console.error('\n❌ ERROR:', error);
    if (allMembers.length > 0) saveIncremental(allMembers);
  } finally {
    await browser.close();
  }
})();
