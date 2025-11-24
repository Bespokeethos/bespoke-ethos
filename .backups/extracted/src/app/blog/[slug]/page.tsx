import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { RichText } from "basehub/react-rich-text";
import type { Metadata } from "next";

import { Pump } from "basehub/react-pump";
import { Section } from "@/common/layout";
import { authorFragment, darkLightImageFragment } from "@/lib/basehub/fragments";
import { Heading } from "@/common/heading";
import { Avatar } from "@/common/avatar";
import {
  FaqItemComponentFragment,
  FaqRichtextComponent,
  richTextBaseComponents,
  RichTextCalloutComponent,
  richTextCalloutComponentFragment,
  richTextClasses,
} from "@/app/_components/rich-text";
import { CodeSnippet, codeSnippetFragment } from "@/app/_components/code-snippet";
import { basehub } from "basehub";
import { cx } from "class-variance-authority";
import { formatDate } from "@/utils/dates";
import { DarkLightImage } from "@/common/dark-light-image";
import { PageView } from "@/app/_components/page-view";
import { findLocalPost, localPosts } from "../_local-posts";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";

// Pre-render known slugs at build and allow ISR fallback
export const revalidate = 1800;

export const generateStaticParams = async () => {
  const data = await basehub({ cache: "no-store" }).query({
    site: {
      blog: {
        posts: {
          items: {
            _slug: true,
          },
        },
      },
    },
  });

  const remoteSlugs = data.site.blog.posts.items.map((post) => ({ slug: post._slug }));
  const localSlugs = localPosts.map((post) => ({ slug: post._slug }));

  const merged = new Map<string, { slug: string }>();
  [...remoteSlugs, ...localSlugs].forEach((entry) => merged.set(entry.slug, entry));

  return Array.from(merged.values());
};

export const generateMetadata = async ({
  params: _params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await _params;

  const local = findLocalPost(slug);
  if (local) {
    return {
      title: local._title,
      description: local.description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        images: [{ url: local.image.light.url, alt: local._title }],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        images: [local.image.light.url],
      },
    };
  }

  const data = await basehub({ draft: (await draftMode()).isEnabled }).query({
    site: {
      settings: {
        metadata: {
          titleTemplate: true,
          sitename: true,
        },
      },
      blog: {
        posts: {
          __args: {
            filter: {
              _sys_slug: { eq: slug },
            },
            first: 1,
          },
          items: {
            ogImage: { url: true },
            _id: true,
            _title: true,
            description: true,
          },
        },
      },
    },
  });

  const post = data.site.blog.posts.items[0];

  if (!post) return undefined;
  const images = [{ url: post.ogImage.url, alt: post._title }];

  return {
    title: post._title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      images,
      type: "article",
    },
    twitter: {
      images,
      card: "summary_large_image",
      site: data.site.settings.metadata.sitename,
    },
  };
};

export default async function BlogPage({ params: _params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await _params;
  // Local fallback: render static posts without BaseHub
  const local = findLocalPost(slug);
  if (local) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
    const postUrl = `${siteUrl}/blog/${slug}`;
    const images = [local.image.light.url];
    const blogPosting = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: local._title,
      description: local.description,
      datePublished: local.publishedAt,
      isAccessibleForFree: true,
      image: images,
      url: postUrl,
      mainEntityOfPage: postUrl,
      author: { "@type": "Person", name: local.authors[0]?._title || "Bespoke Ethos" },
      publisher: {
        "@type": "Organization",
        name: "Bespoke Ethos",
        logo: { "@type": "ImageObject", url: `${siteUrl}/assets/googlelogo.png` },
      },
    } as const;
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: local._title, item: postUrl },
      ],
    } as const;
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        {/* Local posts skip analytics ingestion */}
        <Section>
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: local._title }]} />
          <Heading subtitle={local.description}>
            <h1>{local._title}</h1>
          </Heading>
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex max-w-(--breakpoint-lg) items-center justify-center gap-12 text-base">
              {local.authors.map((author) => (
                <figure key={author._id} className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={author.image.url} alt={author.image.alt} className="size-11 rounded-full border" />
                  {author._title}
                </figure>
              ))}
            </div>
            <div className="flex divide-x divide-border text-sm font-normal text-text-tertiary dark:divide-dark-border dark:text-dark-text-tertiary">
              <p className="pr-2">{new Date(local.publishedAt).toLocaleDateString()}</p>
              <span className="pl-2">
                {local.categories.map((category) => (
                  <span key={category} className="mr-1 capitalize">
                    {category}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </Section>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={local.image.light.url}
          alt={local.image.light.alt}
          className="h-full max-h-[720px] w-full object-cover"
          style={{ aspectRatio: local.image.light.aspectRatio as any }}
        />
        <Section>
          <div className="prose prose-zinc max-w-prose text-start dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: local.html }} />
          </div>
        </Section>
      </>
    );
  }
  return (
    <main>
      <Pump
        queries={[
          {
            site: {
              generalEvents: { ingestKey: true },
              blog: {
                posts: {
                  __args: {
                    filter: {
                      _sys_slug: {
                        eq: slug,
                      },
                    },
                    first: 1,
                  },
                  items: {
                    _title: true,
                    description: true,
                    authors: authorFragment,
                    publishedAt: true,
                    image: darkLightImageFragment,
                    categories: true,
                    body: {
                      json: {
                        __typename: true,
                        blocks: {
                          __typename: true,
                          on_FaqItemComponent: FaqItemComponentFragment,
                          on_RichTextCalloutComponent: richTextCalloutComponentFragment,
                          on_CodeSnippetComponent: codeSnippetFragment,
                        },
                        content: 1,
                        toc: 1,
                      },
                    },
                  },
                },
              },
            },
          },
        ]}
      >
        {async ([
          {
            site: {
              generalEvents,
              blog: { posts },
            },
          },
        ]) => {
          "use server";
          const blogpost = posts.items.at(0);

          if (!blogpost) return notFound();

          // JSON-LD: BlogPosting + BreadcrumbList
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
          const postUrl = `${siteUrl}/blog/${slug}`;
          const images = blogpost.image?.light?.url ? [blogpost.image.light.url] : [`${siteUrl}/og-image.png`];
          const blogPosting = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blogpost._title,
            description: blogpost.description,
            datePublished: blogpost.publishedAt,
            isAccessibleForFree: true,
            image: images,
            url: postUrl,
            mainEntityOfPage: postUrl,
            author: { "@type": "Person", name: "Upton Rand" },
            publisher: {
              "@type": "Organization",
              name: "Bespoke Ethos",
              logo: { "@type": "ImageObject", url: `${siteUrl}/assets/googlelogo.png` },
            },
          } as const;
          const breadcrumb = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
              { "@type": "ListItem", position: 3, name: blogpost._title, item: postUrl },
            ],
          } as const;

          return (
            <>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
              <PageView ingestKey={generalEvents.ingestKey} />
              <Section>
                <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: blogpost._title }]} />
                <Heading subtitle={blogpost.description}>
                  <h1>{blogpost._title}</h1>
                </Heading>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex max-w-(--breakpoint-lg) items-center justify-center gap-12 text-base">
                    {blogpost.authors.map((author) => (
                      <figure key={author._id} className="flex items-center gap-2">
                        <Avatar key={author._id} {...author.image} alt="" className="size-11!" />
                        {author._title}
                      </figure>
                    ))}
                  </div>
                  <div className="flex divide-x divide-border text-sm font-normal text-text-tertiary dark:divide-dark-border dark:text-dark-text-tertiary">
                    <p className="pr-2">{formatDate(blogpost.publishedAt)}</p>
                    <span className="pl-2">
                      {blogpost.categories.map((category) => (
                        <span key={category} className="mr-1 capitalize">
                          {category}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </Section>
              <DarkLightImage
                {...blogpost.image}
                priority
                withPlaceholder
                className="h-full max-h-[720px] w-full object-cover "
                style={{ aspectRatio: blogpost.image.light.aspectRatio }}
              />
              <Section>
                <div
                  className={cx(
                    richTextClasses,
                    "[&>p:first-child]:text-2xl [&>p:first-child]:font-light",
                  )}
                >
                  <RichText
                    blocks={blogpost.body.json.blocks}
                    components={{
                      ...richTextBaseComponents,
                      FaqItemComponent: FaqRichtextComponent,
                      RichTextCalloutComponent: RichTextCalloutComponent,
                      CodeSnippetComponent: CodeSnippet,
                    }}
                  >
                    {blogpost.body.json.content}
                  </RichText>
                </div>
              </Section>
            </>
          );
        }}
      </Pump>
    </main>
  );
}
