import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer, Navigation } from "@/components/SiteChrome";
import { StrapiArticle } from "@/components/StrapiArticle";
import { getPostBySlug, getPostSlugs } from "@/strapi/posts";

type Props = {
  params: Promise<{ slug: string }>;
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const imageUrl = post.image?.url || null;
  const hasBody = typeof post.body === "string" ? post.body.length > 0 : Array.isArray(post.body) && post.body.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#171717] text-[#EDEDED]">
      <Navigation active="blog" />
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
        </article>
      </main>
      <Footer backHome />
    </div>
  );
}
