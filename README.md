# Nirmit Aggarwal — Portfolio

A clean, editorial personal portfolio built with **React + Vite + TypeScript + Tailwind CSS v4**.
Fully static — deployable to Vercel, Netlify or GitHub Pages.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server
npm run build      # typecheck + production build (dist/)
npm run preview    # serve the production build locally
```

Image pipeline (regenerates `public/images/` from `resources/` — favicon,
PWA icons, WebP avatars/artworks and the 1200×630 `og-image.jpg`):

```bash
node scripts/generate-favicon.mjs
```

Source images live in `resources/images/` (`avatars/`, `artworks/`); nothing
heavy ships in `public/` — only optimized WebP/PNG/JPG output.

## SEO

- **Canonical URL** — `https://theboringedit.in`, set in `index.html`
  (`<link rel="canonical">`, Open Graph, Twitter) and as `site.url` in
  `src/data/site.ts`. Keep the two in sync when changing domains.
- **Crawlers** — `public/robots.txt` allows everything and points to the sitemap.
- **Sitemap** — `public/sitemap.xml`. Blog posts are hash-routed (`#/blog/…`),
  so only the homepage is a separate indexable URL; switch to path-based
  routing if per-article SEO matters later.
- **Structured data** — JSON-LD `Person` schema in `index.html` (sameAs links
  to GitHub/LinkedIn).
- **Social sharing** — `public/images/og-image.jpg` (regenerate via the script
  above after changing the card design in `scripts/generate-favicon.mjs`).
- **Tab titles** — per-route via `src/lib/useDocumentTitle.ts`.

## Deploying

Any static host works (Vercel, Netlify, GitHub Pages, Cloudflare Pages):
upload `dist/` after `npm run build`. Point the `theboringedit.in` DNS at the
host and make sure HTTPS is on — canonical/OG URLs assume it.

## Editing content (no UI changes needed)

All content lives in `src/data/`:

> **Publishing an article?** Read [`docs/BLOG.md`](docs/BLOG.md) — the full
> guide: create `src/data/posts/<slug>.md` with frontmatter, write Markdown,
> done. Code blocks, math, tables, image captions, drafts — all covered.

| File | What it controls |
|---|---|
| `site.ts` | Name, links, email, résumé path, college |
| `phases.ts` | The three phases (Ideate / Build / Ship) copy |
| `experience.ts` | Experience timeline — add entries at the top |
| `projects.ts` | Selected work — images/links/status all optional |
| `skills.ts` | Toolbox groups |
| `openSource.ts` | Open-source contributions |
| `now.ts` | "Now" section (building / learning / exploring) |
| `writing.ts` | Derives the Writing list from markdown posts — see `docs/BLOG.md` |
| `posts/*.md` | **The blog.** One markdown file = one article (frontmatter + body) |
| `hackathons.ts` | Build log — empty shows the "coming soon" state |
| `testimonials.ts` | Empty shows the "collecting" state |

## Design system

- **Colors** — semantic tokens in `src/styles/globals.css`, derived from `resources/color_pallete.json`
  (paper `#fefefe`, ink `#262626`, accent `#fd4d25`). Light/dark via the `.dark` class on `<html>`.
- **Fonts** — Recoleta (display), Caviar Dreams (body/interface), Svetze (small labels), all self-hosted in `public/fonts/`.
- **Motion** — IntersectionObserver reveal system (`.reveal`, `.reveal-media`), shooting stars in the hero,
  clip-path color reveal in the phases section. Everything degrades gracefully under `prefers-reduced-motion`.
