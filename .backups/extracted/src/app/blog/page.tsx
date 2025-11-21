import { draftMode } from "next/headers";
import Link from "next/link";

import { Pump } from "basehub/react-pump";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { SearchContent as Search } from "@/common/search";
import { SearchHitsProvider } from "@/context/search-hits-context";
import { type AvatarFragment, avatarFragment } from "@/lib/basehub/fragments";

import { BlogpostCard, blogpostCardFragment } from "./_components/blogpost-card";
import { PageView } from "../_components/page-view";
import type { Metadata } from "next";
import { basehub } from "basehub";
import { localPosts } from "./_local-posts";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import { notFound } from "next/navigation";

// Allow the blog index to render even if BaseHub is temporarily empty at build
export const revalidate = 1800;

const fallbackMetadata: Metadata = {
  title: "Blog | Bespoke Ethos",
  description:
    "Insights on automation, chatbots, decision clarity, and automation rescue tailored for small business owners.",
};

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  try {
    const data = await basehub({ draft: (await draftMode()).isEnabled }).query({
      site: {
        blog: {
          metadata: {
            title: true,
            description: true,
          },
        },
      },
    });

    const title = data.site.blog.metadata.title ?? fallbackMetadata.title;
    const description = data.site.blog.metadata.description ?? fallbackMetadata.description;

    return { title, description, alternates: { canonical: "/blog" } };
  } catch {
    return { ...fallbackMetadata, alternates: { canonical: "/blog" } };
  }
};

export default async function BlogPage() {
  return (
    <Pump
      queries={[
        {
          _componentInstances: {
            blogPost: {
              _searchKey: true,
            },
          },
          collections: {
            authors: {
              items: {
                _id: true,
                image: avatarFragment,
              },
            },
          },
          site: {
            generalEvents: { ingestKey: true },
            blog: {
              _analyticsKey: true,
              mainTitle: true,
              featuredPosts: blogpostCardFragment,
              listTitle: true,
              posts: {
                __args: { orderBy: "publishedAt__DESC" },
                items: blogpostCardFragment,
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          _componentInstances: { blogPost },
          site: { blog, generalEvents },
          collections: { authors },
        },
      ]) => {
        "use server";
        const { posts } = blog;

        // Optional ownership filter: show only posts matching an author or hide all by flag.
        const authorFilter = (process.env.NEXT_PUBLIC_BLOG_AUTHOR || "").toLowerCase().trim();
        const hideAll = process.env.NEXT_PUBLIC_BLOG_HIDE === "1";

        const filteredItems = hideAll
          ? []
          : authorFilter
            ? posts.items.filter((post) =>
                post.authors?.some((a) => (a as any)?._title?.toLowerCase().includes(authorFilter)),
              )
            : posts.items;

        const localCards = localPosts.map((p) => ({
          _id: p._id,
          _title: p._title,
          _slug: p._slug,
          description: p.description,
          publishedAt: p.publishedAt,
          authors: p.authors as any,
          image: p.image as any,
          categories: p.categories,
        }));
        const hasContent = filteredItems.length > 0 || localCards.length > 0;

        return (
          <Section className="gap-16">
            <BlogJsonLd />
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
            <PageView ingestKey={generalEvents.ingestKey} />
            <div className="grid grid-cols-1 gap-5 self-stretch md:grid-cols-2">
              <Heading align="left">
                <h2>{blog.mainTitle}</h2>
              </Heading>
              <SearchHitsProvider
                authorsAvatars={authors.items.reduce(
                  (acc: Record<string, AvatarFragment>, author) => {
                    acc[author._id] = author.image;

                    return acc;
                  },
                  {},
                )}
              >
                <Search _searchKey={blogPost._searchKey} />
              </SearchHitsProvider>
              {blog.featuredPosts
                ?.slice(0, 3)
                .map((post) => <BlogpostCard key={post._id} type="card" {...post} />)}
            </div>
            <div className="w-full space-y-3">
              <Heading align="left">
                <h3 className="text-xl! lg:text-2xl!">{blog.listTitle}</h3>
              </Heading>
              {hasContent ? (
                <div className="-mx-4 flex flex-col self-stretch">
                  {[...localCards, ...filteredItems].map((post) => (
                    <BlogpostCard key={post._id} {...(post as any)} className="-mx-4" />
                  ))}
                </div>
              ) : (
                <div className="-mx-4 flex flex-col gap-3 self-stretch rounded-lg border border-border p-6 text-text-secondary dark:border-dark-border dark:text-dark-text-secondary">
                  <p className="text-base">Founder insights are coming soon.</p>
                  <div className="flex gap-3">
                    <Link className="text-accent-600 hover:underline" href="/contact">
                      Contact us
                    </Link>
                    <Link className="text-accent-600 hover:underline" href="/book">
                      Book a free assessment
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Section>
        );
      }}
    </Pump>
  );
}

function BlogJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bespokeethos.com";
  const json = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Bespoke Ethos Blog",
    url: `${base}/blog`,
    publisher: { "@type": "Organization", name: "Bespoke Ethos" },
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
