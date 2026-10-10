import { REGISTRY_URL } from '@/registry/consts';
import { ui } from '@/registry/registry-ui';

/** Single source of truth for site-wide SEO values (metadata, sitemap, JSON-LD, manifest). */
export const site = {
  url: REGISTRY_URL,
  name: 'Mcoli UI',
  /** Home page title: brand first, then what it is (kept under 60 characters). */
  title: "Mcoli UI: Micro Club's design system for React",
  description: `Ship Micro Club's design system in one command: ${ui.length} accessible React components and five themes, copied in with the shadcn CLI.`,
  repo: 'https://github.com/MicroClub-USTHB/mcoli-ui',
  npm: 'https://www.npmjs.com/package/mcoli-ui',
  organization: {
    name: 'Micro Club',
    url: 'https://microclub.info',
  },
  locale: 'en_US',
  componentCount: ui.length,
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}
