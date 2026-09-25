import { useEffect } from "react";

/**
 * Global reveal-on-scroll system.
 *
 * Elements with `.reveal` (text) or `.reveal-media` (images/artwork) start
 * hidden and animate in when they enter the viewport. Honors
 * `prefers-reduced-motion` (CSS handles the fallback: elements are simply
 * visible). Stagger via the `--reveal-delay` custom property (unitless step).
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-media").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-media");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
