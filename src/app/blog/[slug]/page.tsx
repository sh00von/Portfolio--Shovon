import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Footer, Navigation } from "@/components/SiteChrome";
import { StrapiArticle } from "@/components/StrapiArticle";
import { resolveFromVariant, resolveHomePath } from "@/lib/homeVariants";
import { getPostBySlug, getPostSlugs } from "@/strapi/posts";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

function formatDate(date?: string) {
  if (!date) return "Draft";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: { index: false, follow: false },
    };
  }

  const imageUrl = post.image?.url || "/og.png";

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://shovon.bd/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://shovon.bd/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { from } = await searchParams;
  const post = await getPostBySlug(slug);
  const homePath = resolveHomePath(from);
  const fromVariant = resolveFromVariant(homePath);

  if (!post) notFound();

  const imageUrl = post.image?.url || null;
  const hasBody = typeof post.body === "string" ? post.body.length > 0 : Array.isArray(post.body) && post.body.length > 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author,
        }
      : undefined,
    mainEntityOfPage: `https://shovon.bd/blog/${post.slug}`,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="blog-post-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation active="blog" homePath={homePath} fromVariant={fromVariant} />
      <main className="mx-auto w-full max-w-2xl flex-grow px-4 pb-24 lg:max-w-[60vw]">
        <article className="mt-16">
          <div className="mb-8">
            <p className="mb-4 text-sm tabular-nums text-[#666]">{formatDate(post.publishedAt)}</p>
            <h1 className="mb-5 text-4xl font-bold tracking-tighter text-[#EDEDED] sm:text-5xl">{post.title}</h1>
            {post.author ? (
              <div className="mb-4 flex items-center gap-3 text-sm text-[#666]">
                {post.authorImage?.url ? (
                  <Image
                    src={post.authorImage.url}
                    alt={post.authorImage.alt || post.author}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border border-[#333] object-cover"
                  />
                ) : null}
                <span>By {post.author}</span>
              </div>
            ) : null}
            {post.excerpt ? <p className="text-lg leading-relaxed text-[#a1a1a1]">{post.excerpt}</p> : null}
            {post.categories?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span key={category} className="tag">
                    {category}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.image?.alt || post.title}
              width={1200}
              height={675}
              priority
              className="mb-10 aspect-[16/9] w-full rounded-xl border border-[#333] object-cover"
            />
          ) : null}

          <div className="border-t border-[#333] pt-10">
            {hasBody ? (
              <StrapiArticle value={post.body} />
            ) : (
              <p className="text-[#a1a1a1]">This post does not have body content yet.</p>
            )}
          </div>

          {post.author ? (
            <aside className="mt-12 rounded-2xl border border-[#333] bg-[#1a1a1a] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {post.authorImage?.url ? (
                  <Image
                    src={post.authorImage.url}
                    alt={post.authorImage.alt || post.author}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full border border-[#333] object-cover"
                  />
                ) : null}
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#666]">Written by</p>
                  <p className="mt-1 text-xl font-semibold text-[#EDEDED]">{post.author}</p>
                  {post.authorBio ? <p className="mt-2 max-w-2xl leading-7 text-[#a1a1a1]">{post.authorBio}</p> : null}
                  {post.authorEmail ? (
                    <p className="mt-3 text-sm text-[#888]">
                      <a className="transition-colors hover:text-[#EDEDED]" href={`mailto:${post.authorEmail}`}>
                        {post.authorEmail}
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </aside>
          ) : null}
        </article>
      </main>
      <Footer backHome homePath={homePath} />
    </div>
  );
}
