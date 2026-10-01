import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  // Injects page.data.lastModified from git history, used by the sitemap and pages.
  plugins: [lastModified()],
});
