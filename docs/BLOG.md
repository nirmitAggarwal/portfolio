# Notes & Write-ups — How the blog works

Everything about publishing articles on this site, end to end. Written for
future-you: a tutorial first, then reference.

```
you write one .md file             the site does the rest
──────────────────────────         ───────────────────────────────────────────────
src/data/posts/my-post.md      →   import.meta.glob picks it up (src/data/posts.ts)
   frontmatter + body          →   frontmatter parsed into a Post record
                               →   slug = filename (without .md)
                               →   appears in the Writing section (home page)
                               →   appears on the blog index  #/blog
                               →   gets its own page          #/blog/my-post
```

No backend, no database, no CMS. Articles are bundled into the site at build
time — which is why the whole thing deploys anywhere static (Vercel, Netlify,
GitHub Pages).

---

## Tutorial: publish an article in 5 minutes

**Step 1 — create the file.**
The filename *is* the URL. No spaces, lowercase, hyphens:

```
src/data/posts/hello-world.md     →     #/blog/hello-world
```

**Step 2 — add frontmatter** (the YAML block between the two `---` lines):

```markdown
---
title: "Hello World — my first real post"
category: "Engineering"
date: "2026-09-25"
readingTime: "5 min"
excerpt: "One sentence that sells the article in lists. Keep it under ~150 chars."
cover: /images/my-cover.png
coverAlt: "What the cover image shows"
---

Your markdown starts here…
```

**Step 3 — write the body in Markdown.** Code blocks, math, images, tables,
checklists — all supported (full guide below).

**Step 4 — run it.** `npm run dev`, open `http://localhost:5173/#/blog`.
The post is already listed. Click it, read it, fix typos, repeat.

**Step 5 — ship.** `npm run build`. Done. No component edits anywhere —
every list on the site derives from the files in `src/data/posts/`.

> **Drafts:** add `draft: true` to the frontmatter. The post disappears from
> every list but stays reachable at its direct URL with a visible
> "DRAFT PREVIEW" banner — perfect for sharing a private preview link.
> Delete the line (or set `draft: false`) to publish.

---

## Frontmatter reference

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | yes | string | Shown in lists and as the page `<h1>` |
| `category` | yes | enum | `Engineering` \| `Rust` \| `Systems` \| `Networking` \| `Projects` \| `Learning` |
| `date` | yes | `"YYYY-MM-DD"` | Sort key — newest first. **Quote it.** |
| `readingTime` | yes | string | Shown as-is, e.g. `"6 min"` |
| `excerpt` | yes | string | The list blurb. One sentence, punchy |
| `cover` | no | string | Path under `public/`, e.g. `/images/x.png`. Rendered as a horizontal banner (5:2 crop) |
| `coverAlt` | no | string | Caption/alt for the cover |
| `draft` | no | boolean | `true` hides from lists; direct URL still previews |

### The one gotcha: quote your dates

YAML treats an unquoted date as a *date object*. The engine normalizes this,
so nothing breaks — but the safe, unambiguous form is quoted:

```yaml
date: "2026-09-25"     # ✅ do this
date: 2026-09-25       # works, but parsed as a YAML date — don't rely on it
```

---

## URL scheme & navigation

| URL | What it is |
|---|---|
| `/#work`, `/#about`, … | Home page anchors (unchanged) |
| `#/blog` | Blog index — every published post, newest first |
| `#/blog/<slug>` | One article, fixed layout |
| anything else `#/blog/…` | 404 card with a link back |

Routing is a ~60-line dependency-free hash router (`src/lib/router.ts`) —
no react-router. Consequences worth knowing:

- **Deep links work** anywhere the site is deployed statically, no server
  rewrites needed (the path is always `/`; the "route" lives in the hash).
- **Scroll positions reset** on navigation between pages; in-page anchors on
  the home page scroll natively as before.
- The navbar/footer are shared; article and index pages render in place of
  `<main>`'s home content.

---

## Writing guide: what you can put in the body

The body is plain Markdown (GitHub-Flavored). Every feature, with the exact
conventions that trigger special rendering:

### Sections & text

```markdown
## A section heading

Regular paragraphs. **bold**, *italic*, ~~strikethrough~~, `inline code`,
[links](https://example.com) (open in new tabs automatically).
```

### Code blocks — GPT-style cards

Every fenced block renders as a dark card (in both themes) with a language
label and a working **Copy** button:

````markdown
```rust
pub fn lease(task: &mut Task) {
    task.state = State::Leased;
}
```
````

Use a language tag (`rust`, `python`, `bash`, `text`, …) — it's shown in the
card header and drives syntax highlighting (highlight.js). `text` gives plain
mono, great for fake compiler output.

### Math — inline and display

```markdown
Inline: the probability is $p^k$ that all replicas fail.

Display:

$$
L = \lambda W
$$
```

Inline math `$…$` and display math `$$…$$` both render via KaTeX.

> ⚠️ The one math gotcha: inside a `$$…$$` block, escape backslashes in
> `	ext{…}` as `\text{…}`. Inline `$…$` needs no escaping.

### Images — cover, inline, and captions

An image on its own line becomes a bordered figure. To give it a caption,
write the alt text as `alt — caption`:

```markdown
![Inside the build — where the scheduler was written](/images/lab.webp)
```

renders the image **and** the caption "where the scheduler was written".
Everything before the ` — ` is the alt text; everything after is the caption.

- Cover image → `cover`/`coverAlt` in frontmatter (horizontal 5:2 crop)
- Inline images → anywhere in the body, same caption convention
- Images must live in `public/images/` (or any `public/` subfolder) and be
  referenced with a leading slash: `/images/name.ext`

### Tables

```markdown
| Failure mode | Before | After |
| --- | --- | --- |
| Node vanishes | lost | requeued |
```

Horizontal-scrolling bordered card on narrow screens.

### Checklists

```markdown
- [x] done thing
- [ ] thing I still need to do
```

Styled as checkbox rows — used for "what I don't understand yet" lists.

### Quotes

```markdown
> A pull quote renders in the display serif with an accent bar.
```

---

## How it works under the hood

```
src/data/posts/*.md          the content (frontmatter + markdown body)
src/data/posts.ts            the engine — glob loader, frontmatter parser,
                             sorting, draft filtering, lookup helpers
src/data/writing.ts          derives writingPosts from posts.ts — the shape
                             the home-page Writing section consumes
src/lib/router.ts            hash router: "", "#/blog", "#/blog/<slug>"
src/App.tsx                  renders home OR blog pages based on the route
src/components/blog/
  ├─ Markdown.tsx            react-markdown + GFM + KaTeX + highlight.js,
  │                         figure captions, code card w/ copy button
  ├─ BlogPostPage.tsx        the fixed article layout
  └─ BlogIndexPage.tsx       the blog index
src/styles/globals.css       .article-prose, .article-codeblock, .article-figure,
                             .article-cover, table/quote/task-list styling
```

**Data flow:** `posts.ts` globs every `./posts/*.md` at build time →
parses frontmatter → exposes `allPosts` (newest first), `publishedPosts`
(drafts filtered), `getPost(slug)`. `writing.ts` maps `publishedPosts` into
the `WritingPost` shape. Every list on the site is derived — edit a file,
everything updates.

**Fixed article format** (same for every post):

1. Category · date · reading time
2. Display title
3. Cover image (optional)
4. Markdown body
5. Prev/next article cards + back to index

**Drafts:** filtered out of `publishedPosts`, so they vanish from the Writing
section, the index, and prev/next navigation — but `getPost` still finds them,
so the direct URL renders a preview with a banner.

---

## Troubleshooting

| Symptom | Cause → fix |
|---|---|
| New post doesn't appear | Frontmatter block missing/malformed — file must *start* with `---` (no blank line before it) |
| Post missing from lists but URL works | `draft: true` is still set |
| Wrong date shown / wrong order | Quote the date: `date: "2026-09-25"` |
| Category shows wrong text | Category must be one of the six enum values, exact spelling |
| Image 404s | File must be under `public/` and referenced as `/images/…` (leading slash) |
| Caption didn't render | Caption convention is `![alt — caption](src)` with an em-dash ` — ` |
| Math shows raw `$…$` | KaTeX can't parse it — check the guide above (`\text` escaping) |
| Code card has no highlighting | Missing/unknown language tag on the fence |
| Slug shows the wrong title | The slug is the **filename**, not the frontmatter — rename the file to change the URL |

---

## Conventions for future-you

- One topic per file; the filename is forever — choose slugs carefully
- Quote ISO dates
- Write the excerpt as if a stranger decides from it alone
- Prefer `text` code blocks for compiler errors over highlighting mismatches
- Cover images: any width, roughly 2.5:1 — they're cropped to 5:2
- Sample/demo data in `hackathons.ts` & `testimonials.ts` is marked as such —
  replace when real entries exist, keeping the same shapes
