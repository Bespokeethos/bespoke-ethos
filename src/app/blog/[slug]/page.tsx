import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { BLOG_POSTS, getPostBySlug } from "../posts";

export const revalidate = 1800;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return {};

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const url = `${base}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      images: [
        {
          url: post.hero.src,
          alt: post.hero.alt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <Section className="gap-8 items-start">
      <BlogPostJsonLd slug={post.slug} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title },
        ]}
      />
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="flex flex-col gap-4">
          <Heading align="left" subtitle={new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}>
            <h1>{post.title}</h1>
          </Heading>
          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
            {post.readingTimeMinutes} min read · Bespoke Ethos Stories &amp; Notes
          </p>
        </header>

        <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary be-image-frame">
          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            fill
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {post.content()}
      </article>
    </Section>
  );
}

function BlogPostJsonLd({ slug }: { slug: string }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const post = getPostBySlug(slug);
  if (!post) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${base}/blog/${post.slug}#blogposting`,
    url: `${base}/blog/${post.slug}`,
    headline: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: `${base}${post.hero.src}`,
    },
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Bespoke Ethos",
      "@id": `${base}/#organization`,
    },
    publisher: {
      "@id": `${base}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/blog/${post.slug}`,
    },
  } as const;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
