import type { MetadataRoute } from "next";

const SITE_UPDATED = new Date("2026-06-27");
const CVE_10749_PUBLISHED = new Date("2026-06-01");
const CVE_57661_PUBLISHED = new Date("2026-06-26");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shovon.bd/dev",
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shovon.bd/academic",
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://shovon.bd/projects",
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://shovon.bd/security",
      lastModified: CVE_57661_PUBLISHED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://shovon.bd/security/cve-2026-10749",
      lastModified: CVE_10749_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-57661",
      lastModified: CVE_57661_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
