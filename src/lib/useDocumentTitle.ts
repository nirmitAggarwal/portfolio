import { useEffect } from "react";
import { site } from "@/data/site";
import { publishedPosts, getPost } from "@/data/posts";
import type { Route } from "@/lib/router";

const BASE = `${site.name} — ${site.role}`;

/** Keep the browser tab title in sync with the current route. */
export function useDocumentTitle(route: Route) {
  useEffect(() => {
    if (route.name === "home") {
      document.title = BASE;
      return;
    }
    if (route.name === "blogIndex") {
      document.title = `Writing — ${site.name}`;
      return;
    }
    // blogPost: look up the slug for a specific title
    const post = getPost(route.slug);
    if (post) {
      document.title = `${post.title} — ${site.name}`;
    } else {
      document.title = `Article not found — ${site.name}`;
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
