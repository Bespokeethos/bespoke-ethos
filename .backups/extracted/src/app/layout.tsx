import type { Metadata, Viewport } from "next";

import { draftMode } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Newsletter } from "./_sections/newsletter";
import { Providers } from "./providers";
import { basehub } from "basehub";
import { OrganizationJsonLd } from "./_components/seo/organization-jsonld";
import { WebsiteJsonLd } from "./_components/seo/website-jsonld";
import { LocalBusinessJsonLd } from "./_components/seo/localbusiness-jsonld";

const SKIP_REMOTE_DATA = process.env.SKIP_REMOTE_DATA === "1";

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
  defaultTitle: "Cleveland AI Automation for Small Business | Bespoke Ethos",
  defaultDescription:
    "Auditable AI workflows, chatbots, and decision clarity for small businesses. Reclaim 15+ hours per week with human-in-the-loop approvals and rollback paths.",
  favicon: {
    url: "/favicon.ico",
    mimeType: "image/x-icon",
  },
  ogImageUrl: "/og-image.png",
  appleTouchIcon: "/apple-touch-icon.png",
  manifest: "/site.webmanifest",
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  fallback: [
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["monaco", "monospace"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  if (SKIP_REMOTE_DATA) {
    return {
      title: {
        default: FALLBACK_METADATA.defaultTitle,
        template: FALLBACK_METADATA.titleTemplate,
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
        images: [
          { url: FALLBACK_METADATA.ogImageUrl, alt: "Bespoke Ethos — Cleveland AI automation for small business" },
        ],
        siteName: FALLBACK_METADATA.sitename,
      },
      twitter: {
        card: "summary_large_image",
        images: [FALLBACK_METADATA.ogImageUrl],
        site: FALLBACK_METADATA.sitename,
      },
    };
  }

  try {
    const data = await basehub({ cache: "no-store", draft: (await draftMode()).isEnabled }).query({
      site: {
        settings: {
          metadata: {
            sitename: true,
            titleTemplate: true,
            defaultTitle: true,
            defaultDescription: true,
            favicon: {
              url: true,
              mimeType: true,
            },
            ogImage: {
              url: true,
            },
            xAccount: {
              url: true,
            },
          },
        },
      },
    });

    const images = [
      { url: data.site.settings.metadata.ogImage.url, alt: "Bespoke Ethos — Cleveland AI automation for small business" },
    ];

    let xAccount: string | undefined = undefined;

    if (data.site.settings.metadata.xAccount) {
      try {
        const xUrl = new URL(data.site.settings.metadata.xAccount.url);
        const split = xUrl.pathname.split("/");

        xAccount = split[split.length - 1];
      } catch {
        // invalid url noop
      }
    }

    return {
      title: {
        default: data.site.settings.metadata.defaultTitle,
        template: data.site.settings.metadata.titleTemplate,
      },
      applicationName: data.site.settings.metadata.sitename,
      metadataBase: metadataBaseUrl,
      description: data.site.settings.metadata.defaultDescription,
      icons: [
        {
          url: data.site.settings.metadata.favicon.url,
          rel: "icon",
          type: data.site.settings.metadata.favicon.mimeType,
        },
        { url: FALLBACK_METADATA.appleTouchIcon, rel: "apple-touch-icon" },
      ],
      manifest: FALLBACK_METADATA.manifest,
      openGraph: { type: "website", images, siteName: data.site.settings.metadata.sitename },
      twitter: {
        card: "summary_large_image",
        images,
        site: data.site.settings.metadata.sitename,
        creator: xAccount,
      },
    };
  } catch {
    return {
      title: {
        default: FALLBACK_METADATA.defaultTitle,
        template: FALLBACK_METADATA.titleTemplate,
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
      ],
      openGraph: {
        type: "website",
        images: [
          { url: FALLBACK_METADATA.ogImageUrl, alt: "Bespoke Ethos — Cleveland AI automation for small business" },
        ],
        siteName: FALLBACK_METADATA.sitename,
      },
      twitter: {
        card: "summary_large_image",
        images: [FALLBACK_METADATA.ogImageUrl],
        site: FALLBACK_METADATA.sitename,
      },
    };
  }
};

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`min-h-svh max-w-[100vw] bg-surface-primary text-text-primary dark:bg-dark-surface-primary dark:text-dark-text-primary ${geistMono.variable} ${geist.variable} font-sans`}
      >
        <Providers>
          <Header />
          <main className="min-h-[calc(100svh-var(--header-height))]">{children}</main>
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
