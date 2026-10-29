// /sitemap.xml: tells search engines which pages exist. Add new pages here.
import type { MetadataRoute } from "next";
import { site } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects/world-model`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
