import { getSiteUrl } from '../lib/site';

export default function sitemap() {
  return [
    {
      url: getSiteUrl(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
