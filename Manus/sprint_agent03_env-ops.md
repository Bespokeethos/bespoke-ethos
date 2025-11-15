Agent 3 – Environment & Delivery Ops
====================================
Mandate
-------
Lock down configuration management across local dev, Vercel previews, and production so secrets, public envs, and runtime expectations stay consistent. (Sources: next_env.txt, vercel_env_vars.txt)

Environment Management Playbook
--------------------------------
1. Local files and precedence  
   - Next.js loads `.env`, `.env.local`, `.env.development`, `.env.production`, and their `.local` variants in a defined order; `.env.local` should be gitignored and override the base defaults (next_env.txt).  
   - Server-only variables stay private by default; anything prefixed with `NEXT_PUBLIC_` is inlined into client bundles at build time, so build jobs must run in the target environment when those values differ.  
   - For runtime-only needs (e.g., rotating API tokens), expose them via Route Handlers instead of leaking them to the client bundle.
2. Access from code  
   - Favor the typed `import { env } from 'next-runtime-env'` helpers (or a custom zod-based validator) over ad-hoc `process.env` access to surface misconfigurations early (next_env.txt).  
   - Document which modules run on the server (default) versus client (`'use client'`) so engineers know whether an env variable is reachable.
3. Vercel environment classes  
   - Use Vercel’s three scopes (Development, Preview, Production) for secrets; `vercel dev` automatically injects Development envs, while `vercel env pull` hydrates a local `.env` file with whatever scope you choose (vercel_env_vars.txt lines 861-889).  
   - Lock critical secrets (Sanity tokens, Turnstile secret, Resend API keys) to Production and set safer variants for Preview/Development when possible.  
   - Keep `.env.example` synchronized with every required key so onboarding is scripted.
4. Automation  
   - Script `vercel env pull .env.local` in onboarding docs and CI so new contributors always mirror remote configuration.  
   - Tie environment changes to change management tickets; Vercel’s audit log plus git history on `.env` templates should explain every new key.

Risks & Follow-ups
------------------
- Coordinate with Agent 4 on whether Airtable service tokens live in Vercel KV, Edge Config, or standard env vars.  
- Ensure no `NEXT_PUBLIC_` secrets sneak in by adding lint rules/tests that scan bundle output for known tokens.
