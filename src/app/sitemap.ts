import { siteUrl } from "@/lib/constants";
import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/app/blog/posts";

export const revalidate = 1800; // 30 minutes

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },

    // Core marketing pages
    { url: `${siteUrl}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/solutions/a-la-carte`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/solutions/essentials`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/solutions/flowstack`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/solutions/chatbots`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/solutions/consensus-engine`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/solutions/redbridging`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/products/cadence`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Trust / depth pages
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/lgbtq-discount`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // Blog index and legal
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${siteUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },

    // Enterprise pages
    { url: `${siteUrl}/enterprise/automation-fabric`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/enterprise/cloud-chatbot`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/enterprise/decision-room`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/enterprise/reliability-ops`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // AI Chat
    { url: `${siteUrl}/chat`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
