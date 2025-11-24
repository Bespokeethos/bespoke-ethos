#!/usr/bin/env node
/**
 * Build-time environment validation script
 * Warns about missing optional API keys without failing the build
 */

const log = (m) => process.stdout.write(`[build-env] ${m}\n`);
const warn = (m) => process.stdout.write(`[build-env][WARN] ${m}\n`);

// Define environment variables and their criticality
const envVars = {
  // Critical for runtime API functionality (warn if missing)
  OPENAI_API_KEY: {
    required: false,
    description: 'OpenAI API key for /api/chat and /api/dev-coder endpoints',
    routes: ['/api/chat', '/api/dev-coder'],
  },
  AI_GATEWAY_URL: {
    required: false,
    description: 'AI Gateway URL (alternative to direct OpenAI)',
    routes: ['/api/chat', '/api/brutus'],
  },
  AI_GATEWAY_API_KEY: {
    required: false,
    description: 'AI Gateway API key (alternative to direct OpenAI)',
    routes: ['/api/chat', '/api/brutus'],
  },
  AIRTABLE_API_KEY: {
    required: false,
    description: 'Airtable API key for contact form and newsletter',
    routes: ['/api/contact', '/api/newsletter'],
  },
  AIRTABLE_BASE_ID: {
    required: false,
    description: 'Airtable base ID',
    routes: ['/api/contact', '/api/newsletter'],
  },
  AIRTABLE_CONTACT_TABLE_ID: {
    required: false,
    description: 'Airtable contact table ID',
    routes: ['/api/contact'],
  },
  AIRTABLE_NEWSLETTER_TABLE_ID: {
    required: false,
    description: 'Airtable newsletter table ID',
    routes: ['/api/newsletter'],
  },
  RESEND_API_KEY: {
    required: false,
    description: 'Resend API key for email notifications',
    routes: ['/api/contact'],
  },
  PINECONE_API_KEY: {
    required: false,
    description: 'Pinecone API key for vector search',
    routes: ['/api/search/internal'],
  },
  PINECONE_HOST: {
    required: false,
    description: 'Pinecone host URL',
    routes: ['/api/search/internal'],
  },
  EMBEDDING_MODEL: {
    required: false,
    description: 'OpenAI embedding model for vector search',
    routes: ['/api/search/internal'],
  },
  SANITY_PROJECT_ID: {
    required: false,
    description: 'Sanity project ID for CMS content',
    routes: ['Multiple routes'],
  },
  SANITY_DATASET: {
    required: false,
    description: 'Sanity dataset name',
    routes: ['Multiple routes'],
  },
};

log('Checking build-time environment variables...');

let hasWarnings = false;
const warnings = [];

// Check each environment variable
for (const [key, config] of Object.entries(envVars)) {
  const value = (process.env[key] ?? '').trim();
  
  if (!value) {
    hasWarnings = true;
    warnings.push({
      key,
      description: config.description,
      routes: config.routes,
    });
  }
}

// Special check for OpenAI configuration
const hasOpenAI = Boolean((process.env.OPENAI_API_KEY ?? '').trim());
const hasGateway = Boolean(
  (process.env.AI_GATEWAY_URL ?? '').trim() &&
  (process.env.AI_GATEWAY_API_KEY ?? '').trim()
);

if (!hasOpenAI && !hasGateway) {
  warn('No OpenAI or AI Gateway configuration detected.');
  warn('The following API routes will fail at runtime:');
  warn('  - /api/chat (streaming chat endpoint)');
  warn('  - /api/dev-coder (code assistance endpoint)');
  warn('  - /api/brutus (automation assistant endpoint)');
  warn('  - /api/search/internal (vector search with embeddings)');
  warn('');
  warn('To fix: Set either OPENAI_API_KEY or both AI_GATEWAY_URL + AI_GATEWAY_API_KEY');
  warn('');
}

// Check Airtable configuration
const hasAirtableBase = Boolean(
  (process.env.AIRTABLE_API_KEY ?? '').trim() &&
  (process.env.AIRTABLE_BASE_ID ?? '').trim()
);

if (!hasAirtableBase) {
  warn('Airtable configuration incomplete.');
  warn('The following features will be degraded:');
  warn('  - /api/contact (form submissions will not be saved)');
  warn('  - /api/newsletter (subscriptions will not be saved)');
  warn('');
  warn('To fix: Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID');
  warn('');
}

// Check Sanity configuration
const hasSanity = Boolean(
  (process.env.SANITY_PROJECT_ID ?? '').trim() &&
  (process.env.SANITY_DATASET ?? '').trim()
);

if (!hasSanity) {
  warn('Sanity CMS configuration incomplete.');
  warn('Content from Sanity will not be available unless SKIP_REMOTE_DATA=1');
  warn('');
  warn('To fix: Set SANITY_PROJECT_ID and SANITY_DATASET');
  warn('');
}

// Summary
if (hasWarnings) {
  warn('──────────────────────────────────────────────────────────');
  warn('Build will proceed, but some API routes may fail at runtime.');
  warn('This is expected for local development or CI builds.');
  warn('Ensure production environment has all required variables set.');
  warn('──────────────────────────────────────────────────────────');
} else {
  log('All environment variables configured ✓');
}

log('Build environment check complete.');

// Always exit successfully - this is a warning-only script
process.exit(0);
