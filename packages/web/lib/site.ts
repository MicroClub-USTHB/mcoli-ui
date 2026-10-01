import { REGISTRY_URL } from '@/registry/consts';
import { ui } from '@/registry/registry-ui';

/** Single source of truth for site-wide SEO values (metadata, sitemap, JSON-LD, manifest). */
export const site = {
  url: REGISTRY_URL,
  name: 'Mcoli UI',
  /** Home page title: brand first, then what it is (kept under 60 characters). */
  title: "Mcoli UI: MicroClub's design system for React",
  description: `Ship MicroClub's design system in one command. Five themes, light and dark, and ${ui.length} accessible React components built on Base UI and Tailwind CSS v4, copied into your project with the shadcn CLI.`,
  repo: 'https://github.com/MicroClub-USTHB/mcoli-ui',
  npm: 'https://www.npmjs.com/package/mcoli-ui',
  organization: {
    name: 'MicroClub',
    url: 'https://microclub.info',
  },
  locale: 'en_US',
  componentCount: ui.length,
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}
