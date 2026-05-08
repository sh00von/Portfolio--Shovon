import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shovon.bd/",
      lastModified: new Date("2026-05-08"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shovon.bd/projects",
      lastModified: new Date("2026-05-08"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
