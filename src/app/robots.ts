// /robots.txt: lets search engines crawl the site, except the chatbot API.
import type { MetadataRoute } from "next";
import { site } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
