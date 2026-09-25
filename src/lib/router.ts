import { useEffect, useState } from "react";

/**
 * Minimal hash router — no dependency, strictly frontend.
 *
 * Routes:
 *   (empty hash or "#section")  → home (single-page portfolio)
 *   "#/blog"                    → blog index
 *   "#/blog/<slug>"             → one article
 *
 * Plain anchors like "#work" keep working as in-page scroll targets on home.
 */

export type Route =
  | { name: "home" }
  | { name: "blogIndex" }
  | { name: "blogPost"; slug: string };

export function parseRoute(hash: string): Route {
  const raw = hash.replace(/^#/, "");
  if (!raw.startsWith("/blog")) return { name: "home" };
  const parts = raw.split("/").filter(Boolean); // ["blog", ...slug parts]
  if (parts.length === 1) return { name: "blogIndex" };
  return { name: "blogPost", slug: parts.slice(1).join("/") };
}

/** Subscribe to the current hash route. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    parseRoute(window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

/** Programmatic navigation (same as clicking a link). */
export function navigate(hash: string) {
  if (window.location.hash === hash) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = hash;
  }
}

export const blogIndexHref = "#/blog";
export const blogHref = (slug: string) => `#/blog/${slug}`;
