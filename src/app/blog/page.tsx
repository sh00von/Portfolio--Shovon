import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { Footer, Navigation } from "@/components/SiteChrome";
import { getPosts } from "@/strapi/posts";
import { hasStrapiConfig } from "@/strapi/env";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Minaruzzaman Shovon on water resources engineering, software development, GIS, AI, and cybersecurity.",
  alternates: {
    canonical: "https://shovon.bd/blog",
  },
  openGraph: {
    title: "Blog | Minaruzzaman Shovon",
    description:
      "Writing on water resources engineering, software development, GIS, AI, and cybersecurity.",
    url: "https://shovon.bd/blog",
    images: ["/og.png"],
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex min-h-screen flex-col bg-[#171717] text-[#EDEDED]">
      <Navigation active="blog" />
      <main className="mx-auto w-full max-w-2xl flex-grow px-4 pb-24 lg:max-w-[60vw]">
        <section className="mt-16 mb-14">
          <h1 className="mb-5 text-4xl font-bold tracking-tighter text-[#EDEDED] sm:text-5xl">Blog</h1>
          <p className="max-w-xl text-base leading-relaxed text-[#a1a1a1] sm:text-lg">
            Notes on engineering, software, remote sensing, and the parts where they overlap.
          </p>
        </section>

        {posts.length ? (
          <section aria-label="Blog posts">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </section>
        ) : (
          <section className="border-y border-[#333] py-10">
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-[#EDEDED]">No posts yet</h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#a1a1a1]">
              {hasStrapiConfig
                ? "Publish your first Strapi article and it will appear here automatically."
                : "Connect Strapi by setting STRAPI_URL, then publish your first article."}
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
