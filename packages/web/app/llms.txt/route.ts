import { llms } from 'fumadocs-core/source';

import { absoluteUrl, site } from '@/lib/site';
import { source } from '@/lib/source';

export const revalidate = false;

/** llms.txt: a Markdown map of the docs for coding agents and AI tools. */
export function GET() {
  const header = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    'Install a theme, then add components:',
    '',
    '```bash',
    'npx shadcn@latest init',
    'npx mcoli-ui@latest init primary',
    'npx mcoli-ui@latest add mc-button',
    '```',
    '',
    `Themes: primary, secondary, game-dev, robotics, it. Full text of every page: ${absoluteUrl('/llms-full.txt')}`,
    `Any docs page is also available as Markdown by adding .md to its URL.`,
    '',
  ].join('\n');

  return new Response(`${header}\n${llms(source).index()}`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
}
