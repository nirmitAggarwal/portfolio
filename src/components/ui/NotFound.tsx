import { site } from "@/data/site";

/**
 * Full-page 404 — pixel-art "working" avatar, editorial type, two ways out.
 * Used for unknown blog articles (the only reachable not-found state in the
 * hash router — every other unknown hash resolves to the home page).
 */
export function NotFound({ attemptedPath }: { attemptedPath?: string }) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-6 pb-24 pt-32 sm:pt-36">
      <div className="flex flex-col items-center text-center">
        <p className="font-label text-[0.6875rem] text-primary">
          ERROR 404 — PAGE NOT FOUND
        </p>

        <img
          src="/images/avatar-working.webp"
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className="mt-6 w-52 select-none drop-shadow-lg sm:w-60"
        />

        <h1 className="mt-4 font-display text-3xl leading-[1.15] text-balance sm:text-4xl">
          This page doesn't exist (yet).
        </h1>

        <p className="mt-4 max-w-[46ch] leading-relaxed text-muted-foreground">
          The link may be broken — or this is still a draft on my machine.
          Either way, here's what definitely exists:
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-[0.9375rem] font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            Back home
          </a>
          <a
            href="#/blog"
            className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-[0.9375rem] font-bold text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
          >
            Browse writing
          </a>
        </div>

        {attemptedPath && (
          <p className="mt-10 font-mono text-xs text-muted-foreground/60">
            {site.url.replace(/^https?:\/\//, "")}/{attemptedPath}
          </p>
        )}
      </div>
    </main>
  );
}
