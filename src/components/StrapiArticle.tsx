import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { RichTextNode } from "@/strapi/posts";

function MarkdownContent({ value }: { value: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-12 mb-5 text-3xl font-bold tracking-tight text-[#EDEDED]">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-14 mb-5 text-3xl font-bold tracking-tight text-[#EDEDED]">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-[#EDEDED]">
            {children}
          </h3>
        ),
        p: ({ children }) => <p className="mb-7 text-[17px] leading-8 text-[#d4d4d4]">{children}</p>,
        ul: ({ children }) => <ul className="mb-7 list-disc space-y-3 pl-7 text-[17px] leading-8 text-[#d4d4d4]">{children}</ul>,
        ol: ({ children }) => <ol className="mb-7 list-decimal space-y-3 pl-7 text-[17px] leading-8 text-[#d4d4d4]">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto rounded-lg border border-[#333]">
            <table className="w-full border-collapse text-left text-sm text-[#d4d4d4]">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border-b border-[#333] bg-[#1a1a1a] px-4 py-3 font-semibold text-[#EDEDED]">{children}</th>,
        td: ({ children }) => <td className="border-b border-[#333] px-4 py-3 align-top">{children}</td>,
        hr: () => <hr className="my-12 border-[#333]" />,
        blockquote: ({ children }) => (
          <blockquote className="my-10 border-l-2 border-[#555] pl-6 text-xl leading-9 text-[#a1a1a1]">
            {children}
          </blockquote>
        ),
        img: ({ src, alt }) => {
          const imageSrc = typeof src === "string" ? src : "";
          if (!imageSrc.startsWith("http")) {
            return alt ? <em className="block text-center text-sm text-[#666]">{alt}</em> : null;
          }

          return (
            // Markdown image sizes are unknown at build time.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt={alt || ""} className="my-8 h-auto w-full rounded-lg border border-[#333]" />
          );
        },
        a: ({ children, href }) => {
          const external = href?.startsWith("http");
          return (
            <Link
              href={href || "#"}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-[#EDEDED] underline decoration-[#555] underline-offset-4 hover:decoration-[#EDEDED]"
            >
              {children}
            </Link>
          );
        },
        code: ({ children }) => (
          <code className="rounded bg-[#242424] px-1.5 py-0.5 text-[0.9em] text-[#EDEDED]">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="my-8 overflow-x-auto rounded-lg border border-[#333] bg-[#141414] p-5 text-sm leading-7 text-[#EDEDED] [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
            {children}
          </pre>
        ),
      }}
    >
      {value}
    </ReactMarkdown>
  );
}

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
  if (block.__component?.endsWith("rich-text")) {
    return <div key={index}>{renderValue(block.body || block.children || block.text)}</div>;
  }

  if (block.__component?.endsWith("quote")) {
    return (
      <blockquote key={index} className="my-8 border-l border-[#555] pl-5 text-lg leading-8 text-[#a1a1a1]">
        {typeof block.body === "string" ? block.body : typeof block.text === "string" ? block.text : renderValue(block.body)}
      </blockquote>
    );
  }

  if (block.__component?.endsWith("media") || block.__component?.endsWith("slider")) {
    return null;
  }

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

function renderValue(value: unknown): React.ReactNode {
  if (!value) return null;

  if (typeof value === "string") {
    return <MarkdownContent value={value} />;
  }

  if (Array.isArray(value)) {
    return value.map((block, index) => renderBlock(block as RichTextNode, index));
  }

  return null;
}

export function StrapiArticle({ value }: { value?: unknown }) {
  return renderValue(value);
}
