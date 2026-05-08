import { hasStrapiConfig, strapiToken, strapiUrl } from "./env";

type StrapiMedia = {
  url?: string;
  alternativeText?: string | null;
  formats?: Record<string, { url?: string }>;
};

type StrapiEntity<T> = {
  id: number;
  documentId?: string;
  attributes?: T;
} & T;

type StrapiCollection<T> = {
  data?: Array<StrapiEntity<T>>;
};

type StrapiSingle<T> = {
  data?: StrapiEntity<T> | null;
};

type StrapiPostAttributes = {
  title?: string;
  slug?: string;
  description?: string;
  excerpt?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: StrapiEntity<{ name?: string; title?: string; slug?: string }> | {
    data?: StrapiEntity<{ name?: string; title?: string; slug?: string }> | null;
  };
  author?: StrapiEntity<{ name?: string; title?: string }> | {
    data?: StrapiEntity<{ name?: string; title?: string }> | null;
  };
  body?: unknown;
  content?: unknown;
  blocks?: unknown;
  cover?: StrapiMedia | { data?: StrapiEntity<StrapiMedia> | null };
  mainImage?: StrapiMedia | { data?: StrapiEntity<StrapiMedia> | null };
};

export type BlogPostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  categories?: string[];
  image?: {
    url: string;
    alt?: string;
  };
  author?: string;
};

export type RichTextNode = {
  __component?: string;
  type?: string;
  level?: number;
  children?: RichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  body?: unknown;
  title?: string;
  file?: StrapiMedia | { data?: StrapiEntity<StrapiMedia> | null };
  files?: Array<StrapiMedia | { data?: StrapiEntity<StrapiMedia> | null }>;
  image?: StrapiMedia | { data?: StrapiEntity<StrapiMedia> | null };
  images?: Array<StrapiMedia | { data?: StrapiEntity<StrapiMedia> | null }>;
};

export type BlogPost = BlogPostListItem & {
  body?: unknown;
};

function unwrapEntity<T>(entity: StrapiEntity<T>): T & { id: number; documentId?: string } {
  return {
    id: entity.id,
    documentId: entity.documentId,
    ...(entity.attributes || entity),
  } as T & { id: number; documentId?: string };
}

function absoluteMediaUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${strapiUrl}${url}`;
}

function unwrapMedia(media?: StrapiPostAttributes["cover"]) {
  if (!media) return undefined;
  const value = "data" in media ? media.data : media;
  if (!value) return undefined;
  const image = unwrapEntity(value as StrapiEntity<StrapiMedia>);
  const url = absoluteMediaUrl(image.formats?.large?.url || image.formats?.medium?.url || image.url);
  if (!url) return undefined;
  return {
    url,
    alt: image.alternativeText || undefined,
  };
}

function unwrapRelation<T>(relation?: StrapiEntity<T> | { data?: StrapiEntity<T> | null }) {
  if (!relation) return undefined;
  const value = "data" in relation ? relation.data : relation;
  return value ? unwrapEntity(value as StrapiEntity<T>) : undefined;
}

function normalizePost(entity: StrapiEntity<StrapiPostAttributes>): BlogPost {
  const post = unwrapEntity(entity);
  const image = unwrapMedia(post.cover || post.mainImage);
  const category = unwrapRelation(post.category);
  const author = unwrapRelation(post.author);
  const categoryName = category?.name || category?.title;

  return {
    id: String(post.documentId || post.id),
    title: post.title || "Untitled",
    slug: post.slug || String(post.documentId || post.id),
    excerpt: post.description || post.excerpt,
    publishedAt: post.publishedAt || post.createdAt,
    categories: categoryName ? [categoryName] : undefined,
    image,
    author: author?.name || author?.title,
    body: post.blocks || post.body || post.content,
  };
}

async function strapiFetch<T>(path: string): Promise<T | null> {
  if (!hasStrapiConfig) return null;

  const response = await fetch(`${strapiUrl}${path}`, {
    headers: {
      ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
    },
    next: {
      revalidate: 60,
      tags: ["post"],
    },
  });

  if (!response.ok) {
    console.error(`Strapi request failed: ${response.status} ${response.statusText}`);
    return null;
  }

  return response.json() as Promise<T>;
}

export async function getPosts(): Promise<BlogPostListItem[]> {
  const query = "/api/articles?populate=*&sort=publishedAt:desc";
  const payload = await strapiFetch<StrapiCollection<StrapiPostAttributes>>(query);
  return payload?.data?.map(normalizePost) || [];
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  const payload = await strapiFetch<StrapiCollection<StrapiPostAttributes>>("/api/articles?fields[0]=slug");
  return payload?.data?.map((entity) => ({ slug: normalizePost(entity).slug })) || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
  const payload = await strapiFetch<StrapiCollection<StrapiPostAttributes> | StrapiSingle<StrapiPostAttributes>>(query);
  const entity = Array.isArray(payload?.data) ? payload.data[0] : payload?.data;
  return entity ? normalizePost(entity) : null;
}
