import type { InferPageType } from 'fumadocs-core/source';

import { FAQ } from '@/consts/faq';
import { absoluteUrl, site } from '@/lib/site';
import { source } from '@/lib/source';

type DocsPage = InferPageType<typeof source>;

/** Per-page Open Graph image, served by app/og/docs/[...slug]/route.tsx. */
export function getDocsOgImage(page: DocsPage) {
  const segments = [...page.slugs, 'image.png'];
  return { segments, url: `/og/docs/${segments.join('/')}` };
}

/** Component pages get "React component" in the title so it matches what people search for. */
export function getDocsTitle(page: DocsPage) {
  const isComponent = page.slugs[0] === 'components' && page.slugs.length > 1;
  return isComponent ? `${page.data.title} React component` : page.data.title;
}

const organization = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.organization.name,
  url: site.organization.url,
  logo: absoluteUrl('/icon.svg'),
  sameAs: [site.repo],
};

/** Home page graph: the site, the organization behind it, the source code it ships and its FAQ. */
export function getHomeJsonLd() {
  // The docs change whenever a component does, so the newest docs edit (from git) dates the code.
  const lastModified = source
    .getPages()
    .map((page) => page.data.lastModified?.getTime() ?? 0)
    .reduce((a, b) => Math.max(a, b), 0);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        alternateName: ['mcoli-ui', 'Micro Club UI'],
        description: site.description,
        inLanguage: 'en',
        publisher: { '@id': `${site.url}/#organization` },
      },
      organization,
      {
        '@type': 'SoftwareSourceCode',
        name: site.name,
        description: site.description,
        url: site.url,
        codeRepository: site.repo,
        sameAs: [site.repo, site.npm],
        programmingLanguage: ['TypeScript', 'React'],
        runtimePlatform: 'Node.js',
        license: 'https://opensource.org/licenses/MIT',
        isAccessibleForFree: true,
        ...(lastModified ? { dateModified: new Date(lastModified).toISOString() } : {}),
        author: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        mainEntity: FAQ.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

/** Docs page graph: the article itself plus its breadcrumb trail. */
export function getDocsJsonLd(page: DocsPage, breadcrumbs: { name: string; url?: string }[]) {
  const url = absoluteUrl(page.url);
  const trail = [{ name: 'Docs', url: absoluteUrl('/docs/introduction') }, ...breadcrumbs];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: getDocsTitle(page),
        description: page.data.description,
        url,
        mainEntityOfPage: url,
        image: absoluteUrl(getDocsOgImage(page).url),
        inLanguage: 'en',
        ...(page.data.lastModified ? { dateModified: page.data.lastModified.toISOString() } : {}),
        author: { '@id': `${site.url}/#organization` },
        publisher: organization,
        isPartOf: { '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          ...(item.url ? { item: item.url } : {}),
        })),
      },
    ],
  };
}
