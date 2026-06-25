import type { MetadataRoute } from "next";

const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Bytespider",
  "CCBot",
  "meta-externalagent",
  "Applebot-Extended",
  "FacebookBot",
  "PerplexityBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://shovon.bd/sitemap.xml",
  };
}
