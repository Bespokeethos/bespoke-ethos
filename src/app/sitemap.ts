import { siteUrl } from "@/lib/constants";
import { basehub } from "basehub";
import type { MetadataRoute } from "next";


export const revalidate = 1800; // 30 minutes - adjust as needed

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await basehub().query({
      site: {
        pages: {
          items: {
            pathname: true,
          },
        },

        changelog: {
          posts: {
            items: {
              _slug: true,
            },
          },
        },
      },
    });

  let index = 1;
  const formattedPages = data.site.pages.items.map(
    (page) =>
      ({
        url: `${siteUrl}${page.pathname}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: index++,
      }) satisfies MetadataRoute.Sitemap[number],
  );



  const formattedChangelogPosts = data.site.changelog.posts.items.map(
    (post) =>
      ({
        url: `${siteUrl}/changelog/${post._slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: index++,
      }) satisfies MetadataRoute.Sitemap[number],
  );

    const routes = [...formattedPages, ...formattedChangelogPosts];
    return routes;
  } catch {
    // Graceful fallback when remote data is unavailable
    const staticRoutes: MetadataRoute.Sitemap = [
      { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
      { url: `${siteUrl}/solutions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${siteUrl}/products/cadence`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${siteUrl}/solutions/flowstack`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${siteUrl}/solutions/chatbots`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${siteUrl}/solutions/consensus-engine`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${siteUrl}/solutions/redbridging`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${siteUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
      { url: `${siteUrl}/help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
      { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
      { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
      { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
      { url: `${siteUrl}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },

    ];
    return staticRoutes;
  }
}
