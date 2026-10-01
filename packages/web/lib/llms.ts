import type { InferPageType } from 'fumadocs-core/source';

import { Index } from '@/__registry__';
import { absoluteUrl } from '@/lib/site';
import { source } from '@/lib/source';

type DocsPage = InferPageType<typeof source>;

/** Swap <ComponentPreview /> and <ComponentSource /> for the actual source, so agents see code. */
function inlineRegistrySource(markdown: string) {
  return markdown.replace(
    /<Component(?:Preview|Source)\s+name="([^"]+)"\s*\/>/g,
    (match, name: string) => {
      const code = Index[name]?.files?.[0]?.content as string | undefined;
      return code ? `\`\`\`tsx\n${code.trim()}\n\`\`\`` : match;
    }
  );
}

/** The raw file starts with YAML frontmatter; title and description are re-emitted above. */
function stripFrontmatter(raw: string) {
  return raw.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
}

/** Markdown for one docs page: title, canonical URL, description, then the MDX body. */
export async function getLLMText(page: DocsPage) {
  const body = inlineRegistrySource(stripFrontmatter(await page.data.getText('raw')));

  return [
    `# ${page.data.title}`,
    `URL: ${absoluteUrl(page.url)}`,
    page.data.description ? `\n${page.data.description}` : '',
    `\n${body}`,
  ]
    .filter(Boolean)
    .join('\n');
}
