import Link from "next/link";
import type { RichTextNode } from "@/strapi/posts";

function renderText(node: RichTextNode, key: number) {
  let content: React.ReactNode = node.text || "";

  if (node.code) content = <code className="rounded border border-[#333] bg-[#1a1a1a] px-1.5 py-0.5 text-sm text-[#EDEDED]">{content}</code>;
  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;
  if (node.strikethrough) content = <s>{content}</s>;

  return <span key={key}>{content}</span>;
}

function renderChildren(children?: RichTextNode[]) {
  return children?.map((child, index) => {
    if (child.type === "link" && child.url) {
      const external = child.url.startsWith("http");
      return (
        <Link
          key={index}
          href={child.url}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-[#EDEDED] underline decoration-[#555] underline-offset-4 hover:decoration-[#EDEDED]"
        >
          {renderChildren(child.children)}
        </Link>
      );
    }

    return renderText(child, index);
  });
}

function renderBlock(block: RichTextNode, index: number) {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return <h2 key={index} className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-[#EDEDED]">{renderChildren(block.children)}</h2>;
      }
      return <h3 key={index} className="mt-8 mb-3 text-xl font-semibold tracking-tight text-[#EDEDED]">{renderChildren(block.children)}</h3>;
    case "quote":
      return <blockquote key={index} className="my-8 border-l border-[#555] pl-5 text-lg leading-8 text-[#a1a1a1]">{renderChildren(block.children)}</blockquote>;
    case "list":
      return <ul key={index} className="mb-6 list-disc space-y-2 pl-6 text-[#d4d4d4]">{block.children?.map(renderBlock)}</ul>;
    case "list-item":
      return <li key={index}>{renderChildren(block.children)}</li>;
    case "paragraph":
    default:
      return <p key={index} className="mb-5 leading-8 text-[#d4d4d4]">{renderChildren(block.children)}</p>;
  }
}

export function StrapiArticle({ value }: { value?: unknown }) {
  if (!value) return null;

  if (typeof value === "string") {
    return value.split(/\n{2,}/).map((paragraph, index) => (
      <p key={index} className="mb-5 leading-8 text-[#d4d4d4]">
        {paragraph}
      </p>
    ));
  }

  if (Array.isArray(value)) {
    return value.map((block, index) => renderBlock(block as RichTextNode, index));
  }

  return null;
}
