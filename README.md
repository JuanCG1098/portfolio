# jcg.dev — Personal Portfolio

Dark, editorial single-page portfolio for **Juan Cruz Gallardo** — full-stack developer (.NET
backend + Flutter) — built to showcase production-grade work for remote opportunities.

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

No environment variables are required to run the site. See [`.env.example`](.env.example) for
placeholders reserved for future use (analytics, contact form).

## Design

Dark editorial aesthetic with a monospace accent. Palette: background `#0a0a0b`, accent `#6366f1`,
green `#3ecf8e`.

## License

Personal project — all rights reserved.
