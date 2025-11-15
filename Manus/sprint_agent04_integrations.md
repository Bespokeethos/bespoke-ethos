Agent 4 – Integrations & Automation
===================================
Mandate
-------
Own every third-party touchpoint (Airtable, Resend, Cloudflare Turnstile) so submissions, outbound comms, and data syncs are reliable and auditable. (Sources: airtable_pat.txt, airtable_create.txt, airtable_rate.txt, airtable_rate_clean.txt, resend_send.txt, turnstile_client.txt, turnstile_server.txt)

Service Playbooks
-----------------
1. Airtable API  
   - Authentication: personal access tokens are created at https://airtable.com/create/tokens, scoped to specific bases/workspaces, and behave exactly like the creating user (airtable_pat.txt). Regenerate/delete via the same panel; never share raw tokens.  
   - Record creation: `POST https://api.airtable.com/v0/{baseId}/{tableIdOrName}` accepts either a single `fields` object or up to 10 `records[]` objects. Use `Authorization: Bearer <token>` plus `Content-Type: application/json`, optionally set `typecast` for automatic casting, and request ID-keyed responses with `returnFieldsByFieldId=true` (airtable_create.txt).  
   - Rate limits: the official “API rate limits” article currently returns 404 (airtable_rate*.txt). Open a support ticket or inspect response headers to confirm actual quotas before launch; instrument retries and exponential backoff just in case.
2. Resend transactional email  
   - Endpoint: `POST https://api.resend.com/emails` with `Authorization: Bearer <RESEND_API_KEY>`. Required payload keys are `from`, `to`, and `subject`, plus one renderer (`html`, `text`, or `react`) or a `template` block with variables (resend_send.txt).  
   - Optional knobs include `cc`/`bcc`, `reply_to`, `attachments[]`, `tags[]`, and template variables; add `Idempotency-Key` headers (<=256 chars) to guard against double sends.  
   - Build a thin service wrapper that enforces approved from-addresses and surfaces Resend error codes to observability.
3. Cloudflare Turnstile  
   - Client side: load `https://challenges.cloudflare.com/turnstile/v0/api.js` (ideally after `<link rel="preconnect">` to the same host) and render widgets either implicitly (elements with `class="cf-turnstile"`) or explicitly via JS for dynamic content. Configure themes, sizes, actions, and callbacks through `data-*` attributes; the widget injects a hidden `cf-turnstile-response` field into its parent `<form>` (turnstile_client.txt lines 30-79).  
   - Server side: verify tokens with `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` sending `secret`, `response`, optional `remoteip`, and optional `idempotency_key`. Tokens are single-use and expire after 300 seconds, so refresh the widget when errors `timeout-or-duplicate` surface (turnstile_server.txt lines 14-80).  
   - Provide a shared validator that supports retries, hostname/action assertions, and timeouts; log Cloudflare error codes to help support triage.

Action Items
------------
- Draft a single `.d.ts` interface for submission payloads so Airtable writes, Resend notifications, and Turnstile validation all share the same contact schema.  
- Capture observed Airtable rate-limit headers during staging load tests and store them in this document once confirmed.  
- Pair with Agent 3 to store `AIRTABLE_PAT`, `RESEND_API_KEY`, and `TURNSTILE_SECRET_KEY` inside Vercel Production env vars with lowered-scope equivalents for Preview.
