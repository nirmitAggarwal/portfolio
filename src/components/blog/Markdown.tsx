import * as React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Blog markdown renderer — fixed, GPT-style article formatting:
 *   · GFM: tables, task lists, strikethrough
 *   · math: inline $...$ and display $$...$$ via KaTeX
 *   · code: fenced blocks with language label + highlight.js theming
 *   · images: standalone images become bordered figures; if the alt text is
 *     "caption — text" or the next line is an italic *Fig. …* paragraph,
 *     it renders as the figure caption.
 */

/** Recursively pull plain text out of highlighted-code React nodes (for copy). */
function nodeText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (React.isValidElement(node)) {
    return nodeText(
      (node.props as { children?: React.ReactNode }).children,
    );
  }
  return "";
}

/** GPT-style code card: dark background, language label, copy button. */
function Codeblock({
  lang,
  raw,
  children,
}: {
  lang: string;
  raw: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(raw).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      },
      () => {},
    );
  };

  return (
    <div className="article-codeblock">
      <div className="article-codeblock-bar">
        <span className="article-codeblock-lang">{lang}</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="article-codeblock-copy"
        >
          {copied ? (
            <Check className="size-3.5" aria-hidden />
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>{children}</pre>
    </div>
  );
}

function extractCaption(alt: string | undefined): {
  altText: string;
  caption?: string;
} {
  if (!alt) return { altText: "" };
  // Convention: ![alt text — caption text](src) → caption shown under image
  const m = /^(.*?)\s+—\s+(.*)$/.exec(alt);
  if (m) return { altText: m[1] || m[2], caption: m[2] };
  return { altText: alt };
}

export function Markdown({ children }: { children: string }) {
  const components: Components = {
    img: ({ node: _node, src, alt, ...rest }) => {
      const { altText, caption } = extractCaption(alt);
      return (
        <figure className="article-figure">
          <img
            src={typeof src === "string" ? src : undefined}
            alt={altText}
            loading="lazy"
            {...rest}
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    },
    table: ({ node: _node, ...props }) => (
      <div className="article-table-wrap">
        <table {...props} />
      </div>
    ),
    a: ({ node: _node, ...props }) => (
      <a {...props} target="_blank" rel="noreferrer" />
    ),
    pre: ({ children }) => {
      // children is the single <code> element; read its language class.
      const codeEl = React.Children.toArray(children)[0] as
        | React.ReactElement<{ className?: string }>
        | undefined;
      const className = codeEl?.props?.className ?? "";
      const lang = /language-([\w-]+)/.exec(className)?.[1] ?? "text";
      return (
        <Codeblock lang={lang} raw={nodeText(children)}>
          {children}
        </Codeblock>
      );
    },
  };

  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, [rehypeHighlight, { detect: false }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

/** Fixed header block every article page shares. */
export function ArticleHeader({
  category,
  title,
  date,
  readingTime,
  className,
}: {
  category: string;
  title: string;
  date: string;
  readingTime: string;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-border pb-10", className)}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-label text-[0.6875rem] text-primary">
          {category}
        </span>
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        <time className="font-mono text-xs text-muted-foreground" dateTime={date}>
          {formatDate(date)}
        </time>
        <span className="font-mono text-xs text-muted-foreground/70">
          {readingTime}
        </span>
      </div>
      <h1 className="mt-6 max-w-[24ch] font-display text-4xl leading-[1.08] text-balance sm:text-5xl md:text-[3.5rem]">
        {title}
      </h1>
    </header>
  );
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
}
