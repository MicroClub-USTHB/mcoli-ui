import * as React from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { source } from '@/lib/source';
import LogoIcon from '@/components/LogoIcon';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <div className="transition-opacity hover:opacity-80">
            <LogoIcon />
          </div>
        ),
        transparentMode: 'top',
        children: [
          <div key="theme-switcher" className="mr-1">
            <ThemeSwitcher />
          </div>,
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}
