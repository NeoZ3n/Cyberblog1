# Project Context Reference

## Purpose
This is a static cybersecurity blog built with **Astro** + **Spectre theme**, designed for easy maintenance and deployment on **Cloudflare Pages**.

---

## Core Stack
- **Astro** (static site generator)
- **Spectre theme** (UI components, layout)
- **Markdown** content (blog posts)
- **Astro Content Collections** for data/schema validation
- **Cloudflare Pages** for hosting
- **GitHub** for source control

---

## Key Project Areas

### 1. Content
- **Blog posts:** `src/content/blog/*.md`
- **Author/About content:** `src/content/other/about.mdx`
- **Quick info (hero bullets):** `src/content/info.json`
- **Social links:** `src/content/socials.json`

### 2. Layout & Pages
- **Base layout:** `src/layouts/Layout.astro`
- **Homepage:** `src/pages/index.astro`
- **Blog list:** `src/pages/blog/index.astro`
- **Blog post:** `src/pages/blog/[slug].astro`
- **About page:** `src/pages/about.astro`

### 3. Components
- `src/components/Navbar.astro` (navigation)
- `src/components/Card.astro` (UI cards)
- `src/components/Icon.astro` (icon rendering)
- `src/components/ImageGlow.astro` (images)

### 4. Styling
- Global styles: `src/styles/globals.css`
- Article styles: `src/styles/article.css`
- List styles: `src/styles/article-list.css`

### 5. Deployment
- **Build command:** `npm run build`
- **Output:** `dist/`
- **Cloudflare Pages URL:** `https://cyberblog1.pages.dev`

---

## Key Commands
- Start dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

---

## Troubleshooting Notes
- If Cloudflare Pages fails due to lockfile mismatch, use `npm install --legacy-peer-deps` locally.
- Ensure `src/pages/styles/giscus.ts` has `export const prerender = true;` for static builds.

---

## Where to Add New Posts
1. Create a new Markdown file in `src/content/blog/`
2. Add valid frontmatter (title, description, pubDate, tags, etc.)
3. `git commit` and `git push` to deploy

---

## Where to Add New Pages
- Add `.astro` files in `src/pages/` for new routes.
- Use `Layout.astro` for consistent SEO/meta behavior.

---

## Notes
This project is intentionally simple, static, and avoids CMS or server-side logic. It is designed for maintainability with predictable, minimal tooling.
