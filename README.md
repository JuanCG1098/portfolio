# jcg.dev — Personal Portfolio

Dark, editorial single-page portfolio for **Juan Cruz Gallardo** — full-stack developer (.NET
backend + Flutter) — built to showcase production-grade work for remote opportunities.

**Live:** https://portfolio-mauve-zeta-u6l8t16z27.vercel.app

**Author:** [Juan Cruz Gallardo](https://github.com/JuanCG1098) · juancgallardo1098@gmail.com

## Stack

- **[Next.js 14](https://nextjs.org/)** (App Router)
- **[Tailwind CSS](https://tailwindcss.com/)** for styling
- **[Framer Motion](https://www.framer.com/motion/)** for animation
- **Google Fonts** — Inter (sans) + JetBrains Mono (editorial mono accents)

## Sections

An animated intro screen leads into a single scrolling page:

`Hero` → `About` → `TechStack` → `Experience` → `CaseStudies` → `Architecture` → `Values` →
`Contact` → `Footer`

with a sticky `Navbar`, a `ScrollProgress` bar and a `BackToTop` control layered on top.

## Project structure

```
app/
  layout.js            # metadata, fonts, <body>
  page.js              # assembles all sections
  globals.css          # color palette, noise texture, marquee + scrollbar
  opengraph-image.jsx  # OG / social card
  sitemap.js           # sitemap
  components/          # Hero, About, TechStack, Experience, CaseStudies, ...
public/
  photo.jpg            # profile photo
  cv.pdf               # downloadable CV
  robots.txt
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run start` (serve build), `npm run lint`.

## Configuration

No environment variables are required to run the site. The only optional one is
`NEXT_PUBLIC_SITE_URL`, the canonical URL used for metadata, Open Graph tags, the sitemap and
`robots`. It is resolved in [`lib/site.js`](lib/site.js) as:

1. `NEXT_PUBLIC_SITE_URL` — explicit override (set this once you have a custom domain)
2. `VERCEL_PROJECT_PRODUCTION_URL` — injected automatically by Vercel for production deploys
3. `https://jcg.dev` — fallback

See [`.env.example`](.env.example) for details.

## Deploy

The site is a zero-config Next.js app and deploys to **[Vercel](https://vercel.com)** (free Hobby
tier — no card required for personal use):

1. Sign in to Vercel **with GitHub**.
2. **Add New… → Project**, then import this repository.
3. Vercel auto-detects Next.js — keep the defaults and click **Deploy**.

Every push to `main` redeploys automatically. The canonical URL resolves to the deployment URL out
of the box; set `NEXT_PUBLIC_SITE_URL` in the project's environment variables once a custom domain is
connected.

Other zero-config hosts that work the same way: **Cloudflare Pages**, **Netlify**.

## Design

Dark editorial aesthetic with a monospace accent. Palette: background `#0a0a0b`, accent `#6366f1`,
green `#3ecf8e`.

## License

Personal project — all rights reserved.
