export function WebsiteJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: base,
    name: "Bespoke Ethos",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "Bespoke Ethos",
      logo: { "@type": "ImageObject", url: `${base}/assets/logo-light.png` },
    },
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
