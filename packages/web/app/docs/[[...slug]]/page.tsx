import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/notebook/page';

import { getMDXComponents } from '@/components/mdx';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDocsJsonLd, getDocsOgImage, getDocsTitle } from '@/lib/seo';
import { absoluteUrl, site } from '@/lib/site';
import { source } from '@/lib/source';

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const slug = (await params).slug;

  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const breadcrumbs = getBreadcrumbItems(page.url, source.pageTree, { includePage: true }).map(
    (item) => ({
      name: typeof item.name === 'string' ? item.name : page.data.title,
      url: item.url ? absoluteUrl(item.url) : undefined,
    })
  );

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{ style: 'clerk' }}
      tableOfContentPopover={{ style: 'clerk' }}
      breadcrumb={{ className: 'docs-eyebrow' }}
    >
      <JsonLd data={getDocsJsonLd(page, breadcrumbs)} />
      <DocsTitle className="font-plus-jakarta-sans text-3xl font-extrabold tracking-[-0.02em] text-balance md:header-md">
        {page.data.title}
      </DocsTitle>
      <DocsDescription className="paragraph-lg text-pretty text-fd-muted-foreground">
        {page.data.description}
      </DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

/** Prerender every docs page at build time: faster pages and metadata always in <head>. */
export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  const title = getDocsTitle(page);
  const description = page.data.description ?? site.description;
  const image = getDocsOgImage(page).url;

  // Metadata merges shallowly, so openGraph/twitter are complete objects here.
  return {
    title,
    description,
    alternates: { canonical: page.url },
    openGraph: {
      type: 'article',
      url: page.url,
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(page.data.lastModified ? { modifiedTime: page.data.lastModified.toISOString() } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
