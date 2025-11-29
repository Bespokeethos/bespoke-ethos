import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Newsletter } from "./_sections/newsletter";
import { Providers } from "./providers";
import { OrganizationJsonLd } from "./_components/seo/organization-jsonld";
import { WebsiteJsonLd } from "./_components/seo/website-jsonld";
import { LocalBusinessJsonLd } from "./_components/seo/localbusiness-jsonld";

const rawSkipSetting = (process.env.SKIP_REMOTE_DATA ?? "").trim();
const SKIP_REMOTE_DATA = rawSkipSetting ? rawSkipSetting !== "0" : true;

const DEFAULT_SITE_URL = "https://www.bespokeethos.com";

const metadataBaseUrl = (() => {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (raw) {
    try {
      return new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    } catch {
      // fall through to default
    }
  }

  return new URL(DEFAULT_SITE_URL);
})();

const FALLBACK_METADATA = {
  sitename: "Bespoke Ethos",
  titleTemplate: "%s | Bespoke Ethos",
  defaultTitle:
    "BespokeEthos AI Consulting - Ship Working Code, Not Slide Decks | Fixed-Price Cleveland AI Automation",
  defaultDescription:
    "We Take the Busywork—you Keep Control. Bespoke Ethos builds small-business AI automation in Cleveland, OH, including AI Strategy Sprint™, our flagship premium chatbot, plus a standing 25% discount on upfront project fees for LGBTQ-owned businesses. Email contact@bespokeethos.com or visit our FAQ and contact pages to get started.",
  favicon: {
    url: "/assets/favicon.png",
    mimeType: "image/png",
  },
  ogImageUrl: "/assets/generated/logo-square-dark.png",
  appleTouchIcon: "/apple-touch-icon.png",
  manifest: "/site.webmanifest",
};

// Inter for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "sans-serif",
  ],
});

// Playfair Display as accent / hero font (serif)
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
  weight: ["400", "500", "600", "700"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: {
      default: FALLBACK_METADATA.defaultTitle,
      template: FALLBACK_METADATA.titleTemplate,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    applicationName: FALLBACK_METADATA.sitename,
    metadataBase: metadataBaseUrl,
    description: FALLBACK_METADATA.defaultDescription,
    icons: [
      {
        url: FALLBACK_METADATA.favicon.url,
        rel: "icon",
        type: FALLBACK_METADATA.favicon.mimeType,
      },
      { url: FALLBACK_METADATA.appleTouchIcon, rel: "apple-touch-icon" },
    ],
    manifest: FALLBACK_METADATA.manifest,
    openGraph: {
      type: "website",
      title: FALLBACK_METADATA.defaultTitle,
      description: FALLBACK_METADATA.defaultDescription,
      url: DEFAULT_SITE_URL,
      images: [
        {
          url: FALLBACK_METADATA.ogImageUrl,
          alt: "Bespoke Ethos - Cleveland AI automation for small business",
        },
      ],
      siteName: FALLBACK_METADATA.sitename,
    },
    twitter: {
      card: "summary_large_image",
      images: [FALLBACK_METADATA.ogImageUrl],
      site: FALLBACK_METADATA.sitename,
    },
  };
};

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`min-h-svh max-w-[100vw] bg-surface-primary text-text-primary dark:bg-dark-surface-primary dark:text-dark-text-primary ${inter.variable} ${playfair.variable} font-sans`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <Header />
          <main id="main-content" className="min-h-[calc(100svh-var(--header-height))]">
            {children}
          </main>
          <Newsletter />
          <Footer />
          <OrganizationJsonLd />
          <WebsiteJsonLd />
          <LocalBusinessJsonLd />
        </Providers>
      </body>
    </html>
  );
}
