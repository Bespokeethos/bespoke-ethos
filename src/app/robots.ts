import type { MetadataRoute } from "next";
import { siteHost, siteUrl } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/api/*",
          "/api/brutus",
          "/api/brutus/*",
          "/api/brutus/fs",
          "/api/brutus/fs/*",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteHost,
  };
}
