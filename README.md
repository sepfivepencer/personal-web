# Personal Web

An editorial-style personal website and blog built with React, Vite, Tailwind CSS, and Markdown.

## What is included

- Home page, writing archive, article detail pages, and about page
- Markdown-driven content from `src/content/blog/*.md`
- Site metadata and profile details in `src/content/site.ts`
- Generated `feed.xml`, `sitemap.xml`, and `robots.txt`
- Deployment fallbacks for Vercel and Netlify-style hosts

## Content editing

Update profile and site-wide settings in:

- `src/content/site.ts`

Write posts in:

- `src/content/blog/*.md`

Each post needs frontmatter like:

```md
---
title: My post title
description: A short summary for cards and SEO.
publishedAt: 2026-03-26
tags:
  - product
  - writing
featured: true
---
```

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

This will:

1. Generate `public/feed.xml`
2. Generate `public/sitemap.xml`
3. Generate `public/robots.txt`
4. Build the production app

## Before deployment

Update these placeholders first:

- `siteConfig.url`
- `siteConfig.email`
- social profile links in `src/content/site.ts`

## Deployment

The project already includes:

- `vercel.json` for SPA rewrites on Vercel
- `public/_redirects` for Netlify-style SPA fallbacks

Any static host that serves `dist/` and supports SPA fallback can deploy this site.
