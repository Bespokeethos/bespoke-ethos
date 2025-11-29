#!/usr/bin/env node
/**
 * Complete Plexus scraper - fetches all A-Z member data
 * No browser needed, runs entirely via fetch()
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'plexus_members_complete.csv');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch all member URLs for a given letter
 */
async function getMemberUrlsForLetter(letter) {
  try {
    const url = `https://thinkplexus.chambermaster.com/list/searchalpha/${letter}`;
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract member links using regex (since we can't use DOM parser in Node)
    const linkRegex = /href="(\/list\/member\/[^"]+)"/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(html)) !== null) {
      const fullUrl = `https://thinkplexus.chambermaster.com${match[1]}`;
      if (!links.includes(fullUrl)) {
        links.push(fullUrl);
      }
    }
    
    console.log(`  ${letter.toUpperCase()}: Found ${links.length} members`);
    return links;
  } catch (error) {
    console.error(`  ${letter.toUpperCase()}: Error - ${error.message}`);
    return [];
  }
}

/**
 * Extract member data from detail page
 */
async function extractMemberData(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract company name (h1 tag)
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const companyName = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
    
    // Extract email
    const emailMatch = html.match(/href="mailto:([^"]+)"/i);
    const email = emailMatch ? emailMatch[1].trim() : '';
    
    // Extract website (look for http links that aren't chambermaster)
    const websiteRegex = /href="(https?:\/\/[^"]+)"/gi;
    let website = '';
    let match;
    while ((match = websiteRegex.exec(html)) !== null) {
      if (!match[1].includes('chambermaster') && !match[1].includes('mailto')) {
        website = match[1];
        break;
      }
    }
    
    // Extract representative name (first name in representative section)
    const repMatch = html.match(/class="[^"]*representative[^"]*"[^>]*>([^<]+)</i);
    let firstName = '';
    let lastName = '';
    if (repMatch) {
      const fullName = repMatch[1].trim();
      const nameParts = fullName.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    return {
      'Company Name': companyName,
      'First Name': firstName,
      'Last Name': lastName,
      'Email': email,
      'Website': website
    };
  } catch (error) {
    console.error(`    Error processing ${url}: ${error.message}`);
    return null;
  }
}

/**
 * Main execution
 */
(async () => {
  console.log('🚀 PLEXUS COMPLETE SCRAPER\n');
  console.log('Collecting member URLs from A-Z...\n');
  
  const allUrls = [];
  
  // Collect URLs from all letters
  for (const letter of LETTERS) {
    const urls = await getMemberUrlsForLetter(letter);
    allUrls.push(...urls);
    await sleep(300); // Be nice to the server
  }
  
  // Deduplicate
  const uniqueUrls = [...new Set(allUrls)];
  console.log(`\n✅ Total unique members found: ${uniqueUrls.length}\n`);
  console.log('Extracting member data...\n');
  
  const memberData = [];
  
  // Extract data from each member page
  for (let i = 0; i < uniqueUrls.length; i++) {
    const data = await extractMemberData(uniqueUrls[i]);
    if (data) {
      memberData.push(data);
    }
    
    if ((i + 1) % 10 === 0) {
      console.log(`  Processed ${i + 1}/${uniqueUrls.length} members`);
    }
    
    await sleep(200); // Be nice to the server
  }
  
  console.log(`\n✅ Extracted ${memberData.length} member records\n`);
  
  // Convert to CSV
  const headers = ['Company Name', 'First Name', 'Last Name', 'Email', 'Website'];
  const csvRows = [headers.map(h => `"${h}"`).join(',')];
  
  for (const record of memberData) {
    const values = headers.map(field => {
      const value = record[field] || '';
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }
  
  fs.writeFileSync(OUTPUT_FILE, csvRows.join('\n'));
  console.log(`💾 Saved to: ${OUTPUT_FILE}\n`);
  console.log('🎉 Complete!');
})();
