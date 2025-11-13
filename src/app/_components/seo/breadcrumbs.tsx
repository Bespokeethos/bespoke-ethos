import React from "react";
import Link from "next/link";

type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.href ? `${base}${c.href}` : undefined,
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-text-tertiary dark:text-dark-text-tertiary">
        {items.map((c, i) => (
          <span key={`${c.name}-${i}`}>
            {i > 0 ? " / " : null}
            {c.href ? (
              <Link href={c.href} className="hover:underline">
                {c.name}
              </Link>
            ) : (
              <span>{c.name}</span>
            )}
          </span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    </>
  );
}
