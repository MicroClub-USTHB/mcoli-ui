import * as React from 'react';
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/notebook/page';

import { source } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import { Metadata } from 'next';

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const slug = (await params).slug;

  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{ style: 'clerk' }}
      tableOfContentPopover={{ style: 'clerk' }}
      breadcrumb={{ className: 'docs-eyebrow' }}
    >
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  // fetch post information
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  return {
    title: `Mcoli UI - ${page.data.title}`,
    description: page.data.description,
  };
}
