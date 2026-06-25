import type { MetadataRoute } from "next";

const LAST_UPDATED = new Date("2026-06-25");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shovon.bd/dev",
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shovon.bd/academic",
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://shovon.bd/projects",
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://shovon.bd/security/cve-2026-10749",
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
