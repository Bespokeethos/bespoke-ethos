export function OrganizationJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bespoke Ethos",
    legalName: "Bespoke Ethos",
    url: base,
    foundingDate: "2025-10-01",
    logo: `${base}/assets/logo-light.png`,
    sameAs: ["https://www.linkedin.com/company/bespoke-ethos"],
    description:
      "Bespoke Ethos builds dependable, human-in-the-loop AI for small businesses. NGLCC-certified and Catalant-vetted, we ship auditable workflows and chatbots with documented approvals, rollback paths, and a 20% discount for LGBTQ-owned businesses.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "contact@bespokeethos.com",
        areaServed: "US",
        url: `${base}/contact`,
      },
    ],
    memberOf: {
      "@type": "Organization",
      name: "National LGBT Chamber of Commerce (NGLCC)",
      url: "https://nglcc.org/",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
