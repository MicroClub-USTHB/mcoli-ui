import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The search API is not content. /r/*.json stays crawlable (noindex is sent as a
      // header instead) so the shadcn CLI and crawlers can still read the registry.
      disallow: '/api/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
