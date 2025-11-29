export function OrganizationJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Bespoke Ethos",
    legalName: "Bespoke Ethos",
    url: base,
    foundingDate: "2025-10-01",
    logo: `${base}/assets/logo-light.png`,
    sameAs: ["https://www.linkedin.com/company/bespoke-ethos"],
    description:
      "NO RESOURCES. NO PROBLEM. JUST YOU AND AI. Bespoke Ethos is a Cleveland-based, NGLCC-certified, LGBTQ-owned AI automation studio that builds dependable, human-in-the-loop workflows for small businesses. We ship Workflow Automation Setup, Cadence  Your AI Concierge, Consensus Engine  Your AI Strategy Sprint, and Automation Rescue for Zapier/Make—all with approvals, documentation, and a standing 25% discount on upfront project fees for LGBTQ-owned businesses.",
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
    founder: {
      "@type": "Person",
      name: "Upton Rand",
      jobTitle: "Founder & AI Automation Consultant",
      image: `${base}/founder-upton-rand.jpg`,
      worksFor: {
        "@id": `${base}/#organization`,
      },
      sameAs: ["https://www.linkedin.com/in/upton-rand"],
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
