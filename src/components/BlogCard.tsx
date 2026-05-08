import Image from "next/image";
import Link from "next/link";
import type { BlogPostListItem } from "@/strapi/posts";

function formatDate(date?: string) {
  if (!date) return "Draft";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogCard({ post }: { post: BlogPostListItem }) {
  const imageUrl = post.image?.url || null;

  return (
    <Link href={`/blog/${post.slug}`} className="group block border-b border-[#333] py-8 first:border-t">
      {imageUrl ? (
        <div className="spotlight-card mb-5 overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a]">
          <Image
            src={imageUrl}
            alt={post.image?.alt || post.title}
            width={960}
            height={540}
            className="aspect-[16/9] w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
          />
        </div>
      ) : null}
      <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
        <h2 className="text-xl font-semibold leading-tight tracking-tight text-[#EDEDED] underline-offset-4 group-hover:underline decoration-[#555]">
          {post.title}
        </h2>
        <span className="flex-shrink-0 text-sm tabular-nums text-[#666]">{formatDate(post.publishedAt)}</span>
      </div>
      {post.author ? <p className="mb-2 text-xs text-[#666]">By {post.author}</p> : null}
      {post.excerpt ? <p className="max-w-xl text-sm leading-relaxed text-[#a1a1a1]">{post.excerpt}</p> : null}
      {post.categories?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <span key={category} className="tag">
              {category}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
