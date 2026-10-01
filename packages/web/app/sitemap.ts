import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';
import { source } from '@/lib/source';

/**
 * Every public page with its canonical URL. lastModified comes from git history, and is
 * omitted rather than guessed when unknown: Google only trusts lastmod that is accurate.
 * priority/changeFrequency are left out because Google ignores them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: absoluteUrl(page.url),
    ...(page.data.lastModified ? { lastModified: page.data.lastModified } : {}),
  }));

  return [{ url: absoluteUrl('/') }, ...docs];
}
