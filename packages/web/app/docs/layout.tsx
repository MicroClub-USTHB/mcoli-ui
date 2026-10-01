import * as React from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

import { DocsHeader, StarsProvider } from '@/components/docs/DocsHeader';
import { getGithubStars } from '@/lib/github';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const base = baseOptions();
  const stars = await getGithubStars();

  return (
    <StarsProvider stars={stars}>
      <DocsLayout
        {...base}
        tree={source.pageTree}
        nav={{ ...base.nav, mode: 'top' }}
        slots={{ ...base.slots, header: DocsHeader }}
        containerProps={{
          className: 'docs-backdrop',
          // Matches the h-16 SiteHeader so the sticky sidebar and TOC sit right below it.
          style: { '--fd-header-height': '4rem' } as React.CSSProperties,
        }}
      >
        {children}
      </DocsLayout>
    </StarsProvider>
  );
}
