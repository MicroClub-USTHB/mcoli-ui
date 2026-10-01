import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const noindex = [{ key: 'X-Robots-Tag', value: 'noindex' }];

const nextConfig: NextConfig = {
  images: {
    // Contributor avatars on the landing page, served through the image optimizer so they get
    // long-lived cache headers and sizes that match the 40px slot.
    remotePatterns: [{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }],
  },
  async rewrites() {
    return [
      // Markdown copy of any docs page for AI tools: /docs/components/mc-button.md
      { source: '/docs/:path*.md', destination: '/llms.mdx/:path*' },
    ];
  },
  async headers() {
    return [
      // Machine endpoints: reachable by the shadcn CLI and the search dialog, never indexed.
      { source: '/api/:path*', headers: noindex },
      { source: '/r/:path*', headers: noindex },
    ];
  },
};

export default withMDX(nextConfig);
