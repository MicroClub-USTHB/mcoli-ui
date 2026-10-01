import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import Logo from '@/components/Logo';
import { ThemeControls } from '@/components/docs/ThemeControls';
import { REPO_URL } from '@/components/landing/themes';

/**
 * Docs layout options. The top bar itself is the shared SiteHeader (see app/docs/layout.tsx),
 * so no `links` here: the sidebar page tree is the docs navigation, and the mobile drawer
 * stays a single list instead of repeating the header links.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo height={24} />,
      url: '/',
    },
    githubUrl: REPO_URL,
    slots: {
      themeSwitch: ThemeControls,
    },
  };
}
