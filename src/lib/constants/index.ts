const FALLBACK_HOST = "www.bespokeethos.com";

// Prefer an explicit public site URL if provided,
// otherwise fall back to the canonical custom domain.
const publicUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = publicUrl || `https://${FALLBACK_HOST}`;
export const siteHost = new URL(siteUrl).host;
