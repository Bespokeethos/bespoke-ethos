import { NextConfig } from "next";

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
      // Images from self, BaseHub CDN and data URIs
      "img-src 'self' https: data: blob:",
      // Fonts from self + data URLs
      "font-src 'self' data:",
      // XHR/fetch destinations (BaseHub API + Turnstile verify)
      "connect-src 'self' https://api.basehub.com https://challenges.cloudflare.com",
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
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=*, geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=*, publickey-credentials-get=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
];

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ hostname: "assets.basehub.com" }, { hostname: "basehub.earth" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Extra CORS hardening for API routes (same-origin only)
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://www.bespokeethos.com" },
          { key: "Vary", value: "Origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/case-studies", destination: "/solutions", permanent: true },
      { source: "/case-studies/:path*", destination: "/solutions", permanent: true },
    ];
  },
} satisfies NextConfig;

export default nextConfig;
