import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { BLOG_POSTS, getPostBySlug } from "../posts";

export const revalidate = 1800;

type Params = {
  slug: string;
};

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
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

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Section className="gap-8 items-start">
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

        <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary">
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

