import { useEffect } from "react";
import { site } from "@/data/site";
import { publishedPosts, getPost, type Post } from "@/data/posts";
import type { Route } from "@/lib/router";

const BASE = `${site.name} — ${site.role}`;

/**
 * Per-route document head manager (title + meta + JSON-LD).
 *
 * index.html ships the static tags for the first paint / non-JS crawlers;
 * this hook re-applies them on every client-side navigation so the head
 * stays correct after moving between home, the blog index and articles
 * (e.g. social renderers that execute JS pick up per-post tags).
 *
 * NOTE: blog posts are hash-routed (`#/blog/…`), so search engines treat
 * them as ONE document — the canonical link always stays the bare origin
 * and only the homepage is listed in public/sitemap.xml.
 */

// Mirrors the static tags in index.html — keep the two in sync.
const HOME_DESCRIPTION =
  "Nirmit Aggarwal — software engineer in progress. I build software to understand how things work: distributed systems, Rust, backend infrastructure.";
const BLOG_INDEX_DESCRIPTION =
  "Engineering notes and project post-mortems — distributed systems, Rust and networking, published straight from markdown.";
const DEFAULT_IMAGE = `${site.url}/images/og-image.jpg`;
const HOME_URL = `${site.url}/`;

const LD_BLOG_SCRIPT_ID = "ld-blog-posting";

type HeadState = {
  title: string;
  description: string;
  image: string;
  url: string;
  indexable: boolean;
  ogType: "website" | "article";
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = url;
}

/** Create, update or remove a JSON-LD script in <head>. */
function setJsonLd(id: string, data: object | null) {
  const existing = document.getElementById(id);
  if (!data) {
    existing?.remove();
    return;
  }
  const script = (existing ?? document.createElement("script")) as HTMLScriptElement;
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
}

/** Article schema for a published post (Person JSON-LD lives in index.html). */
function blogPostingLd(post: Post): object {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover ? `${site.url}${post.cover}` : DEFAULT_IMAGE,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/#/blog/${post.slug}`,
    keywords: post.category,
  };
}

function applyHead(head: HeadState, blogLd: object | null) {
  document.title = head.title;

  setMeta("name", "description", head.description);
  setMeta(
    "name",
    "robots",
    head.indexable ? "index, follow" : "noindex, nofollow",
  );
  setCanonical(HOME_URL);

  setMeta("property", "og:type", head.ogType);
  setMeta("property", "og:title", head.title);
  setMeta("property", "og:description", head.description);
  setMeta("property", "og:url", head.url);
  setMeta("property", "og:image", head.image);

  setMeta("name", "twitter:title", head.title);
  setMeta("name", "twitter:description", head.description);
  setMeta("name", "twitter:image", head.image);

  setJsonLd(LD_BLOG_SCRIPT_ID, blogLd);
}

/** Keep the document head in sync with the current route. */
export function useDocumentTitle(route: Route) {
  useEffect(() => {
    if (route.name === "home") {
      applyHead(
        {
          title: BASE,
          description: HOME_DESCRIPTION,
          image: DEFAULT_IMAGE,
          url: HOME_URL,
          indexable: true,
          ogType: "website",
        },
        null,
      );
      return;
    }
    if (route.name === "blogIndex") {
      applyHead(
        {
          title: `Writing — ${site.name}`,
          description: BLOG_INDEX_DESCRIPTION,
          image: DEFAULT_IMAGE,
          url: `${HOME_URL}#/blog`,
          indexable: true,
          ogType: "website",
        },
        null,
      );
      return;
    }
    // blogPost: look up the slug for a specific title
    const post = getPost(route.slug);
    if (post) {
      applyHead(
        {
          title: `${post.title} — ${site.name}`,
          description: post.excerpt,
          image: post.cover ? `${site.url}${post.cover}` : DEFAULT_IMAGE,
          url: `${site.url}/#/blog/${post.slug}`,
          // Drafts are preview-only — keep them out of search indexes.
          indexable: !post.draft,
          ogType: "article",
        },
        post.draft ? null : blogPostingLd(post),
      );
    } else {
      applyHead(
        {
          title: `Article not found — ${site.name}`,
          description: BLOG_INDEX_DESCRIPTION,
          image: DEFAULT_IMAGE,
          url: HOME_URL,
          indexable: false,
          ogType: "website",
        },
        null,
      );
    }
  }, [route]);
}

/** Build a blog href for sitemaps/sharing (path-form, for future use). */
export function blogPostUrl(slug: string): string {
  return `${site.url}/#/blog/${slug}`;
}

/** Convenience for tests/tooling: all published post titles. */
export function publishedTitles(): string[] {
  return publishedPosts.map((p) => p.title);
}
