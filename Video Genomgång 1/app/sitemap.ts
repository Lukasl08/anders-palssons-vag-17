import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const sections = [
    "",
    "#om-oss",
    "#tjanster",
    "#process",
    "#fordelar",
    "#galleri",
    "#boka",
    "#faq",
    "#kontakt",
  ];

  return sections.map((section) => ({
    url: `${base}/${section}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: section === "" ? 1 : 0.7,
  }));
}
