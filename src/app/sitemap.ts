import type { MetadataRoute } from "next";
import { getPosts } from "@/strapi/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    {
      url: "https://shovon.bd/",
      lastModified: new Date("2026-05-08"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shovon.bd/dev",
      lastModified: new Date("2026-05-08"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://shovon.bd/wre",
      lastModified: new Date("2026-05-08"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://shovon.bd/projects",
      lastModified: new Date("2026-05-08"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://shovon.bd/blog",
      lastModified: new Date("2026-05-08"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://shovon.bd/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date("2026-05-08"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
