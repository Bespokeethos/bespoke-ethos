import { siteUrl } from "@/lib/constants";
import type { MetadataRoute } from "next";

export const revalidate = 1800; // 30 minutes - adjust as needed

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/products/cadence`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/solutions/flowstack`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/solutions/chatbots`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/solutions/consensus-engine`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/solutions/redbridging`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  return staticRoutes;
}
