import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

import { OgCard } from '@/lib/og';
import { getDocsOgImage, getDocsTitle } from '@/lib/seo';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  // The last segment is the "image.png" filename.
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const isComponent = page.slugs[0] === 'components' && page.slugs.length > 1;

  return new ImageResponse(
    <OgCard
      eyebrow={isComponent ? 'Component' : 'Documentation'}
      title={isComponent ? page.data.title : getDocsTitle(page)}
      description={page.data.description}
    />,
    { width: 1200, height: 630 }
  );
}

/** Prerender one card per docs page at build time. */
export function generateStaticParams() {
  return source.getPages().map((page) => ({ slug: getDocsOgImage(page).segments }));
}
