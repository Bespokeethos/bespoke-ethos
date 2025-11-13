# Vercel Deploy Webhook

Use this webhook to trigger production deployments of Bespoke Ethos.

- **Endpoint:** `https://www.bespokeethos.com/api/webhook`
- **Secret:** `cx1tKi1Nwxj7sTrpbG8rNY8O`
- **Branch:** `main`

## Usage

Send an HTTP `POST` request with the header `X-Vercel-Signature` containing the shared secret, or include the secret in the payload if the caller supports it.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Vercel-Signature: cx1tKi1Nwxj7sTrpbG8rNY8O" \
  https://www.bespokeethos.com/api/webhook
```

> ⚠️ Never commit production secrets to a public repository. Rotate the secret if it is exposed outside trusted channels.
