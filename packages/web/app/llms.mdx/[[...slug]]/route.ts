import { notFound } from 'next/navigation';

import { getLLMText } from '@/lib/llms';
import { absoluteUrl } from '@/lib/site';
import { source } from '@/lib/source';

export const revalidate = false;

/** Markdown copy of a docs page, reached through the /docs/*.md rewrite in next.config.ts. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // A duplicate of the HTML page: keep it out of search results, point at the original.
      'X-Robots-Tag': 'noindex',
      Link: `<${absoluteUrl(page.url)}>; rel="canonical"`,
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
