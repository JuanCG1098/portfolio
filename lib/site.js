// Resolves the canonical site URL for metadata, OG tags, sitemap and robots.
// Priority:
//   1. NEXT_PUBLIC_SITE_URL    — explicit override (set this once you own a domain)
//   2. VERCEL_PROJECT_PRODUCTION_URL — auto-injected by Vercel for production deploys
//   3. https://jcg.dev          — intended production domain (fallback)
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return 'https://jcg.dev';
}
