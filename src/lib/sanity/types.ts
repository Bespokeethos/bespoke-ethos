import type { PortableTextBlock } from "@portabletext/types";

export interface SanityAuthor {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface SanityImage {
  url?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  blurDataURL?: string;
  alt?: string;
}

export interface SanityChangelogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  image?: SanityImage;
  authors: SanityAuthor[];
  body?: PortableTextBlock[];
  ogImage?: SanityImage;
  nextPost?: { title?: string; slug?: string };
}

export interface SanityChangelogHeader {
  title: string;
  subtitle?: string;
  socialLinksTitle?: string;
  socialLinks: Array<{
    id?: string;
    url?: string;
    label?: string;
    iconUrl?: string;
  }>;
}
