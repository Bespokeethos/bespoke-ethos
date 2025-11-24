export function LocalBusinessJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Bespoke Ethos",
    url: base,
    image: `${base}/assets/logo-light.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "contact@bespokeethos.com",
        areaServed: "US",
        url: `${base}/contact`,
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cleveland",
      addressRegion: "OH",
      postalCode: "44111",
      addressCountry: "US",
    },
    sameAs: ["https://www.linkedin.com/company/bespoke-ethos"],
    areaServed: "US",
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
