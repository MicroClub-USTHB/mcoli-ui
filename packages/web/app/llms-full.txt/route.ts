import { getLLMText } from '@/lib/llms';
import { source } from '@/lib/source';

export const revalidate = false;

/** Every docs page as Markdown in one file, for agents that want the whole context. */
export async function GET() {
  const pages = await Promise.all(source.getPages().map(getLLMText));

  return new Response(pages.join('\n\n---\n\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
}
