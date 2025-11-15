import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Heading } from "@/common/heading";
import { ChangelogLayout } from "../_components/changelog-header";
import { ButtonLink } from "@/common/button";
import { richTextClasses } from "@/app/_components/rich-text";
import { formatDate } from "@/utils/dates";
import { sanityFetch } from "@/lib/sanity/client";
import { changelogPostQuery, changelogSlugsQuery } from "@/lib/sanity/queries";
import type { SanityChangelogPost } from "@/lib/sanity/types";
import { notFound } from "next/navigation";

const SKIP_REMOTE_DATA = (process.env.SKIP_REMOTE_DATA ?? "").trim() === "1";

interface ChangelogPageParams {
  params: Promise<{ slug: string }>;
}

export const revalidate = 1800;

export const generateStaticParams = async () => {
  if (SKIP_REMOTE_DATA) {
    return [];
  }

  const slugs = await sanityFetch<Array<{ slug: string }>>(changelogSlugsQuery, {});
  return slugs?.map(({ slug }) => ({ slug })) ?? [];
};

export const generateMetadata = async ({ params: awaitedParams }: ChangelogPageParams): Promise<Metadata> => {
  const params = await awaitedParams;

  if (SKIP_REMOTE_DATA) {
    return fallbackMetadata(params.slug);
  }

  const post = await sanityFetch<SanityChangelogPost>(changelogPostQuery, { slug: params.slug });
  if (!post) {
    return fallbackMetadata(params.slug);
  }

  return {
    title: post.title ?? fallbackMetadata(params.slug).title,
    description: post.excerpt ?? fallbackMetadata(params.slug).description,
    alternates: { canonical: `/changelog/${params.slug}` },
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bespokeethos.com"}/changelog/${params.slug}`,
      images: post.ogImage?.url ? [{ url: post.ogImage.url, alt: post.ogImage.alt ?? post.title }] : undefined,
    },
  };
};

export default async function ChangelogPage({ params: awaitedParams }: ChangelogPageParams) {
  const params = await awaitedParams;

  if (SKIP_REMOTE_DATA) {
    return (
      <ChangelogLayout>
        <div className="flex flex-col gap-1">
          <Link className="text-text-tertiary dark:text-dark-text-tertiary flex w-max items-center gap-1 text-sm hover:underline md:text-sm" href="/changelog">
            Back to changelog
          </Link>
          <Heading align="left">
            <h1>Changelog entry</h1>
          </Heading>
          <p className="text-text-tertiary dark:text-dark-text-tertiary text-sm md:text-base">
            Changelog detail pages are temporarily disabled while we migrate to Sanity. The URL {params.slug} will become active once the new CMS is live.
          </p>
        </div>
      </ChangelogLayout>
    );
  }

  const post = await sanityFetch<SanityChangelogPost>(changelogPostQuery, { slug: params.slug });
  if (!post) {
    return notFound();
  }

  return (
    <>
      <ChangelogLayout>
        <div className="flex flex-col gap-1">
          <Link className="text-text-tertiary dark:text-dark-text-tertiary flex w-max items-center gap-1 text-sm hover:underline md:text-sm" href="/changelog">
            Back to changelog
          </Link>
          <Heading align="left">
            <h1>{post.title}</h1>
          </Heading>
          {post.publishedAt ? (
            <p className="text-text-tertiary dark:text-dark-text-tertiary text-sm md:text-base">
              {formatDate(post.publishedAt ?? "")}
            </p>
          ) : null}
        </div>
      </ChangelogLayout>

      <div className="mx-auto flex max-w-(--breakpoint-md) flex-col gap-8 px-8 pt-16 pb-20">
        {post.image?.url ? (
          <Image
            priority
            alt={post.image.alt ?? post.title ?? "Changelog image"}
            blurDataURL={post.image.blurDataURL}
            className="h-auto w-full rounded-xl"
            height={post.image.height ?? 512}
            placeholder={post.image.blurDataURL ? "blur" : "empty"}
            src={post.image.url}
            style={post.image.aspectRatio ? { aspectRatio: String(post.image.aspectRatio) } : undefined}
            width={post.image.width ?? 960}
          />
        ) : null}

        {post.excerpt ? (
          <p className="text-text-secondary dark:text-dark-text-secondary text-sm md:text-base">
            {post.excerpt}
          </p>
        ) : null}

        {post.body ? (
          <div className={richTextClasses}>
            <PortableText
              components={portableTextComponents}
              value={post.body as PortableTextBlock[]}
            />
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          {post.authors?.length ? (
            <div className="flex items-center gap-2">
              {post.authors.map((author) => (
                <span className="flex items-center gap-2" key={author.id}>
                  {author.imageUrl ? (
                    <Image
                      alt={author.name ?? "Author"}
                      className="size-8 rounded-full border-2 border-surface-primary object-cover dark:border-dark-surface-primary"
                      height={32}
                      src={author.imageUrl}
                      width={32}
                    />
                  ) : null}
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{author.name}</p>
                </span>
              ))}
            </div>
          ) : null}

          {post.nextPost?.slug ? (
            <ButtonLink
              className="text-text-tertiary dark:text-dark-text-tertiary text-sm hover:underline"
              href={`/changelog/${post.nextPost.slug}`}
              icon={<ArrowRightIcon />}
              iconSide="right"
              intent="secondary"
            >
              {post.nextPost.title ?? "Next entry"}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </>
  );
}

const portableTextComponents: PortableTextComponents = {
  types: {
    code: ({ value }) => {
      if (!value?.code) {
        return null;
      }

      return (
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface-secondary p-4 text-sm dark:border-dark-border dark:bg-dark-surface-secondary">
          <code>{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a
          className="text-accent-600 underline decoration-accent-500/40 hover:decoration-accent-500 dark:text-accent-400"
          href={href}
          rel="noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    },
  },
};

function fallbackMetadata(slug: string): Metadata {
  return {
    title: "Changelog entry",
    description: "Changelog content will return once the Sanity migration is complete.",
    alternates: { canonical: `/changelog/${slug}` },
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bespokeethos.com"}/changelog/${slug}`,
    },
  };
}
