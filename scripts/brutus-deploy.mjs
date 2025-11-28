#!/usr/bin/env node

/**
 * BRUTUS VERCEL DEPLOYMENT
 * Autonomous deployment to production
 */

import { execSync } from 'child_process';

function exec(command) {
    console.log(`🔧 ${command}`);
    execSync(command, { stdio: 'inherit' });
}

console.log('🚀 BRUTUS DEPLOYMENT PROTOCOL\n');

// 1. Check environment variables
console.log('Step 1: Verifying environment...');
const requiredEnvVars = [
    'OPENAI_API_KEY',
    'GOOGLE_GENERATIVE_AI_API_KEY',
    'BRUTUS_API_KEY',
];

const missing = requiredEnvVars.filter(key => !process.env[key]);
if (missing.length > 0) {
    console.warn(`⚠️  Missing local env vars: ${missing.join(', ')}`);
    console.warn('   These must be set in Vercel dashboard or via `vercel env add`\n');
}

// 2. Build check
console.log('\nStep 2: Running preflight checks...');
exec('npm run typecheck');

// 3. Deploy to production
console.log('\nStep 3: Deploying to Vercel...');
exec('vercel deploy --prod');

console.log('\n✅ BRUTUS DEPLOYED. API ENDPOINTS LIVE.');
console.log('\nTest with:');
console.log('  curl -X POST https://YOUR_DOMAIN/api/brutus/openai \\');
console.log('    -H "x-api-key: YOUR_KEY" \\');
console.log('    -H "Content-Type: application/json" \\');
console.log('    -d \'{"prompt": "Hello Brutus"}\'');
