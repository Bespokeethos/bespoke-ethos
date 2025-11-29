import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'plexus_members.csv');
const START_URL = 'https://thinkplexus.chambermaster.com/list/';

(async () => {
  console.log('🚀 Starting Autonomous Plexus Scraper...');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: false }); // Headless false to see it working
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log(`📍 Navigating to ${START_URL}...`);
    await page.goto(START_URL, { waitUntil: 'domcontentloaded' });

    console.log('🛑 PAUSED: Please log in to Plexus in the browser window.');
    console.log('👉 Navigate to the "Member Directory" or "List" page where members are visible.');
    console.log('⏳ Waiting for member cards (.mn-member-info, .member-card, etc.) to appear...');

    // Wait for the user to log in and navigate to the list
    await page.waitForFunction(() => {
        const cards = document.querySelectorAll('.mn-member-info, .member-card, .search-result');
        return cards.length > 5; // Wait until we see at least 5 members
    }, { timeout: 0 }); // No timeout, wait as long as needed

    console.log('✅ Member list detected! Starting extraction...');

    // Inject the scraping logic (adapted from scraper.js)
    const members = await page.evaluate(async () => {
      console.log('Starting extraction inside page...');
      
      // 1. Find all member links
      let memberLinks = [];
      
      // Try multiple selectors
      const resultLinks = Array.from(document.querySelectorAll('a'))
          .filter(link => {
              const href = link.href || '';
              const text = link.textContent.trim();
              return (href.includes('/mic/member') || 
                      href.includes('member/view') || 
                      (link.closest('.mn-member-info, .member-card, .search-result') && text.length > 0));
          })
          .map(link => ({
              name: link.textContent.trim(),
              url: link.href
          }));

      memberLinks = resultLinks;

      // Fallback search
      if (memberLinks.length === 0) {
          memberLinks = Array.from(document.querySelectorAll('a[href*="member"]'))
              .filter(link => !link.href.includes('search') && link.textContent.trim().length > 0)
              .map(link => ({
                  name: link.textContent.trim(),
                  url: link.href
              }));
      }

      // Deduplicate
      const uniqueMembers = [...new Map(memberLinks.map(m => [m.url, m])).values()];
      
      if (uniqueMembers.length === 0) return [];

      // Helper to extract data from a single page
      async function extractMemberData(memberUrl) {
          try {
              const response = await fetch(memberUrl);
              const html = await response.text();
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');

              const companyName = doc.querySelector('h1, .company-name, .member-name')?.textContent.trim() || '';
              
              // Address
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

              const phones = Array.from(doc.querySelectorAll('a[href^="tel:"], .phone')).map(el => el.textContent.trim()).filter(p => p);
              const emails = Array.from(doc.querySelectorAll('a[href^="mailto:"]')).map(el => el.href.replace('mailto:', '').trim()).filter(e => e);
              const websiteLink = doc.querySelector('a[href*="http"]:not([href*="chambermaster"]):not([href*="mailto"])');
              const website = websiteLink?.href || '';
              const aboutSection = doc.querySelector('.about, .description, [class*="about"]');
              const description = aboutSection?.textContent.trim().substring(0, 500) || '';
              const reps = Array.from(doc.querySelectorAll('.representative, .contact, [class*="rep"]')).map(el => el.textContent.trim()).filter(r => r);

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
              console.error(`Error processing ${memberUrl}:`, error);
              return null;
          }
      }

      // Process in batches
      const results = [];
      const batchSize = 5;
      
      for (let i = 0; i < uniqueMembers.length; i += batchSize) {
          const batch = uniqueMembers.slice(i, i + batchSize);
          const batchPromises = batch.map(m => extractMemberData(m.url));
          const batchResults = await Promise.all(batchPromises);
          
          batchResults.forEach(r => {
              if (r) results.push(r);
          });
          
          // Small delay
          await new Promise(resolve => setTimeout(resolve, 500));
      }

      return results;
    });

    console.log(`✅ Extracted ${members.length} members.`);

    // Convert to CSV
    if (members.length > 0) {
      const headers = Object.keys(members[0]);
      const csvRows = [headers.map(h => `"${h}"`).join(',')];

      for (const row of members) {
        const values = headers.map(header => {
          const value = row[header] || '';
          return `"${String(value).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
      }

      fs.writeFileSync(OUTPUT_FILE, csvRows.join('\n'));
      console.log(`💾 Saved to ${OUTPUT_FILE}`);
    } else {
      console.log('⚠️ No members found to save.');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
})();
