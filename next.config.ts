import path from "node:path";
import { fileURLToPath } from "node:url";
import { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      // Turnstile + JSON-LD scripts
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.cloudflare.com",
      // Styles are inline via Tailwind runtime classes
      "style-src 'self' 'unsafe-inline'",
      // Images from self and trusted HTTPS origins
      "img-src 'self' https: data: blob:",
      // Fonts from self + data URLs
      "font-src 'self' data:",
      // XHR/fetch destinations (Turnstile verify + Sanity APIs)
      "connect-src 'self' https://challenges.cloudflare.com https://*.sanity.io https://vitals.vercel-insights.com https://www.google-analytics.com",
      // Embeds (Turnstile iframes)
      "frame-src https://challenges.cloudflare.com https://*.cloudflare.com",
      // Forms are local only
      "form-action 'self'",
      // Auto-upgrade mixed content
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=*, geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=*, publickey-credentials-get=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Allow static assets (like ad creatives) to be embedded from other origins.
  { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
];

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
  },
  async headers() {
    const headerConfigs: { source: string; headers: { key: string; value: string }[] }[] = [];

    const isProd = process.env.VERCEL_ENV === "production";

    // Always send an X-Robots-Tag header so search engines and LLMs
    // have an explicit directive. Production is fully crawlable;
    // non-production remains noindex to avoid duplicate content.
    headerConfigs.push({
      source: "/:path*",
      headers: [
        {
          key: "X-Robots-Tag",
          value: isProd
            ? "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            : "noindex, nofollow",
        },
      ],
    });

    // Security headers for all environments
    headerConfigs.push({ source: "/:path*", headers: securityHeaders });

    // Extra CORS hardening for API routes (same-origin only)
    headerConfigs.push({
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "https://www.bespokeethos.com" },
        { key: "Vary", value: "Origin" },
      ],
    });

    return headerConfigs;
  },
  async redirects() {
    return [
      { source: "/case-studies", destination: "/solutions", permanent: true },
      { source: "/case-studies/:path*", destination: "/solutions", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/calendar", destination: "/calendar/index.html" },
      { source: "/calendar/", destination: "/calendar/index.html" },
    ];
  },
} satisfies NextConfig;

export default withBundleAnalyzer(nextConfig);
