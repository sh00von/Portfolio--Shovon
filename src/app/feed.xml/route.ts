import { getPosts } from "@/strapi/posts";

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map(
      (post) => `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>https://shovon.bd/blog/${post.slug}</link>
          <guid>https://shovon.bd/blog/${post.slug}</guid>
          <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
          <description><![CDATA[${post.excerpt || ""}]]></description>
        </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Shovon Blog</title>
        <link>https://shovon.bd/blog</link>
        <description>Writing by Minaruzzaman Shovon on engineering, software, GIS, and AI.</description>
        <language>en</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
