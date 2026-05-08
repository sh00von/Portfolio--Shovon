import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/posts";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as SanityImage;
      if (!image?.asset) return null;
      return (
        <figure className="my-10">
          <Image
            src={urlFor(image).width(1200).height(760).fit("max").url()}
            alt={image.alt || ""}
            width={1200}
            height={760}
            className="h-auto w-full rounded-xl border border-[#333] object-contain"
          />
          {image.alt ? <figcaption className="mt-3 text-center text-xs text-[#666]">{image.alt}</figcaption> : null}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="mb-5 leading-8 text-[#d4d4d4]">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-[#EDEDED]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-[#EDEDED]">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l border-[#555] pl-5 text-lg leading-8 text-[#a1a1a1]">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6 text-[#d4d4d4]">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6 text-[#d4d4d4]">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = String((value as { href?: string })?.href || "#");
      const external = href.startsWith("http");
      return (
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-[#EDEDED] underline decoration-[#555] underline-offset-4 hover:decoration-[#EDEDED]"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="rounded border border-[#333] bg-[#1a1a1a] px-1.5 py-0.5 text-sm text-[#EDEDED]">{children}</code>
    ),
  },
};

export function PortableArticle({ value }: { value: Parameters<typeof PortableText>[0]["value"] }) {
  return <PortableText value={value} components={components} />;
}
