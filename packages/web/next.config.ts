import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const noindex = [{ key: 'X-Robots-Tag', value: 'noindex' }];

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone for the Docker image (see Dockerfile).
  output: 'standalone',
  // pnpm workspace: trace from the repo root so hoisted dependencies are copied too.
  outputFileTracingRoot: fileURLToPath(new URL('../..', import.meta.url)),
  // lib/og.tsx reads its fonts from disk, which tracing cannot see.
  outputFileTracingIncludes: { '/**': ['./assets/og/**/*'] },
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
