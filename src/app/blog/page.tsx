import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { getAllPosts } from "./posts";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Blog | Bespoke Ethos Stories & Notes",
  description:
    "Founder-friendly guides on AI automation, Zapier/Make rescues, and on‑brand chatbots for small businesses.",
  alternates: { canonical: "/blog" },
};

export default function BlogLandingPage() {
  const posts = getAllPosts();

  return (
    <Section className="gap-6 items-start">
      <BlogListingJsonLd />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Heading subtitle="Field notes for busy founders" align="left">
          <h1>Bespoke Ethos Stories &amp; Notes</h1>
        </Heading>
        <p className="max-w-3xl text-base text-text-secondary dark:text-dark-text-secondary">
          Deep dives and dispatches on small-business automation, AI tools, and real rescues from the Bespoke Ethos workshop.
          No hype—just the playbooks we use with clients.
        </p>

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface-secondary/60 shadow-sm dark:border-dark-border dark:bg-dark-surface-secondary/60"
            >
              <Link href={`/blog/${post.slug}`} className="group flex flex-1 flex-col">
                <div className="relative h-40 w-full overflow-hidden bg-surface-primary">
                  <Image
                    src={post.hero.src}
                    alt={post.hero.alt}
                    fill
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary dark:text-dark-text-tertiary">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.readingTimeMinutes} min read
                  </p>
                  <h2 className="text-base font-semibold leading-snug text-text-primary dark:text-dark-text-primary">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary line-clamp-3">
                    {post.description}
                  </p>
                  <span className="mt-2 text-xs font-semibold text-accent-600 group-hover:underline">
                    Read story
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function BlogListingJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${base}/blog/#blog`,
    url: `${base}/blog`,
    name: "Bespoke Ethos Stories & Notes",
    description:
      "Founder-friendly guides on AI automation, Zapier/Make rescues, and on-brand chatbots for small businesses.",
    publisher: {
      "@id": `${base}/#organization`,
    },
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
