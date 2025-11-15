import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Heading } from "@/common/heading";
import { ChangelogLayout } from "./_components/changelog-header";
import { ChangelogListWrapper as ChangelogList } from "./_components/changelog-list-wrapper";
import { sanityFetch } from "@/lib/sanity/client";
import { changelogListQuery } from "@/lib/sanity/queries";
import type {
  SanityChangelogHeader,
  SanityChangelogPost,
} from "@/lib/sanity/types";
import type { ChangelogListItem } from "./_components/changelog.fragment";

const SKIP_REMOTE_DATA = (process.env.SKIP_REMOTE_DATA ?? "").trim() === "1";

type ChangelogQueryResponse = {
  header?: SanityChangelogHeader;
  posts: SanityChangelogPost[];
};

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  if (SKIP_REMOTE_DATA) {
    return fallbackMetadata;
  }

  const data = await getChangelogData();
  if (!data?.header) {
    return fallbackMetadata;
  }

  return {
    title: data.header.title ?? fallbackMetadata.title,
    description: data.header.subtitle ?? fallbackMetadata.description,
    alternates: { canonical: "/changelog" },
  };
};

export default async function ChangelogPage() {
  if (SKIP_REMOTE_DATA) {
    return (
      <ChangelogLayout>
        <Heading
          align="left"
          className="flex-1 flex-col-reverse!"
          subtitle="Content is being migrated to Sanity."
        >
          <h1>Changelog</h1>
        </Heading>
      </ChangelogLayout>
    );
  }

  const data = await getChangelogData();
  const posts = data?.posts ?? [];
  if (!posts.length) {
    return notFound();
  }

  const mappedPosts = posts
    .map(mapSanityPostToListItem)
    .filter((post): post is ChangelogListItem => Boolean(post && post.slug));

  if (!mappedPosts.length) {
    return notFound();
  }

  const headerTitle = data?.header?.title ?? "Changelog";
  const headerSubtitle = data?.header?.subtitle ?? "Latest releases & fixes";

  return (
    <>
      <ChangelogLayout
        socialLinks={data?.header?.socialLinks?.map((link) => ({
          id: link.id,
          href: link.url,
          label: link.label,
          icon: link.iconUrl,
        }))}
        socialLinksTitle={data?.header?.socialLinksTitle}
      >
        <Heading align="left" className="flex-1 flex-col-reverse!" subtitle={headerSubtitle}>
          <h1>{headerTitle}</h1>
        </Heading>
      </ChangelogLayout>
      <div className="mx-auto max-w-(--breakpoint-md) px-8 pt-16">
        <ChangelogList changelogPosts={mappedPosts} />
      </div>
    </>
  );
}

const fallbackMetadata: Metadata = {
  title: "Changelog",
  description:
    "A changelog of Bespoke Ethos releases. Content will return once the new CMS is available.",
  alternates: { canonical: "/changelog" },
};

async function getChangelogData() {
  return sanityFetch<ChangelogQueryResponse>(changelogListQuery, {});
}

function mapSanityPostToListItem(post: SanityChangelogPost): ChangelogListItem | null {
  if (!post.slug) {
    return null;
  }

  return {
    id: post._id ?? post.slug,
    title: post.title ?? "Untitled release",
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    image: post.image
      ? {
          url: post.image.url,
          width: post.image.width,
          height: post.image.height,
          blurDataURL: post.image.blurDataURL,
          alt: post.image.alt ?? post.title,
        }
      : undefined,
    authors: (post.authors ?? []).map((author) => ({
      id: author.id ?? author.name ?? "author",
      name: author.name,
      imageUrl: author.imageUrl,
    })),
  };
}
