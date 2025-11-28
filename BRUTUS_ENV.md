# BRUTUS ENVIRONMENT SETUP

Copy this to your `.env.local` file:

```bash
# Required for Brutus API authentication
BRUTUS_API_KEY=brutus_live_YOUR_SECRET_KEY_HERE

# OpenAI GPT-4o (Coding/Logic)
OPENAI_API_KEY=sk-YOUR_OPENAI_KEY_HERE

# Google Gemini (Vision/Multimodal)
GOOGLE_GENERATIVE_AI_API_KEY=YOUR_GOOGLE_KEY_HERE

# Existing keys (keep these as-is)
SANITY_API_TOKEN=your_existing_sanity_token
RESEND_API_KEY=your_existing_resend_key
```

## Setting up BRUTUS_API_KEY

Generate a secure random key:

```bash
node -e "console.log('brutus_live_' + require('crypto').randomBytes(32).toString('hex'))"
```

## Vercel Environment Variables

Add the same variables to Vercel:

```bash
vercel env add BRUTUS_API_KEY
vercel env add OPENAI_API_KEY
vercel env add GOOGLE_GENERATIVE_AI_API_KEY
```

Or via dashboard: https://vercel.com/YOUR_PROJECT/settings/environment-variables

## Test Local Setup

```bash
# Start dev server
npm run dev

# In another terminal:
npm run test:api
```

## Deploy

```bash
npm run deploy
```
