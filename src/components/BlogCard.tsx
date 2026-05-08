import Image from "next/image";
import Link from "next/link";
import { withFromParam, type SharedFrom } from "@/lib/homeVariants";
import type { BlogPostListItem } from "@/strapi/posts";

function formatDate(date?: string) {
  if (!date) return "Draft";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogCard({ post, fromVariant }: { post: BlogPostListItem; fromVariant?: SharedFrom }) {
  const imageUrl = post.image?.url || null;
  const href = withFromParam(`/blog/${post.slug}`, fromVariant);

  return (
    <Link href={href} className="group block border-b border-[#333] py-8 first:border-t lg:py-10">
      <article className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-8">
        <div className="spotlight-card overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.image?.alt || post.title}
              width={960}
              height={540}
              className="aspect-[4/3] w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
            />
          ) : (
            <div className="flex aspect-[4/3] items-end bg-[radial-gradient(circle_at_top_left,_#2a2a2a,_#171717_70%)] p-5">
              {post.categories?.[0] ? <span className="tag">{post.categories[0]}</span> : null}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#666]">
              <span className="tabular-nums">{formatDate(post.publishedAt)}</span>
              {post.author ? (
                <div className="flex items-center gap-2">
                  {post.authorImage?.url ? (
                    <Image
                      src={post.authorImage.url}
                      alt={post.authorImage.alt || post.author}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full border border-[#333] object-cover"
                    />
                  ) : null}
                  <span>By {post.author}</span>
                </div>
              ) : null}
            </div>

            <h2 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-[#EDEDED] transition-colors group-hover:text-white sm:text-[2rem]">
              {post.title}
            </h2>

            {post.excerpt ? (
              <p className="max-w-3xl text-[15px] leading-7 text-[#a1a1a1] sm:text-base">
                {post.excerpt}
              </p>
            ) : null}
          </div>

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
      </article>
    </Link>
  );
}
