import type { PortableTextBlock } from "next-sanity";
import { client } from "./client";
import { hasSanityConfig } from "../env";
import { postBySlugQuery, postSlugsQuery, postsQuery } from "./queries";

export type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
};

export type BlogPostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  categories?: string[];
  mainImage?: SanityImage;
};

export type BlogPost = BlogPostListItem & {
  body?: PortableTextBlock[];
};

export async function getPosts(): Promise<BlogPostListItem[]> {
  if (!hasSanityConfig) return [];
  return client.fetch(postsQuery, {}, { next: { revalidate: 60, tags: ["post"] } });
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  if (!hasSanityConfig) return [];
  return client.fetch(postSlugsQuery, {}, { next: { revalidate: 60, tags: ["post"] } });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasSanityConfig) return null;
  return client.fetch(postBySlugQuery, { slug }, { next: { revalidate: 60, tags: ["post"] } });
}
