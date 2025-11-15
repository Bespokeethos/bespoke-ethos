export interface ChangelogListItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  image?: {
    url?: string;
    width?: number;
    height?: number;
    blurDataURL?: string;
    alt?: string;
  };
  authors: Array<{
    id: string;
    name?: string;
    imageUrl?: string;
  }>;
}
