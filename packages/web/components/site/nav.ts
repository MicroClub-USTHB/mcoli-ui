/**
 * Single source of truth for the site navigation, shared by the landing header and the docs header.
 * Every item is a real docs route, so a nav link never sends you to a different kind of page.
 */
export interface NavItem {
  label: string;
  href: string;
  description: string;
  isActive: (pathname: string) => boolean;
}

const isComponents = (p: string) => p.startsWith('/docs/components');
const isTheming = (p: string) => p.startsWith('/docs/theming');

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Docs',
    href: '/docs/introduction',
    description: 'Introduction and installation',
    isActive: (p) => p.startsWith('/docs') && !isComponents(p) && !isTheming(p),
  },
  {
    label: 'Theming',
    href: '/docs/theming',
    description: 'Tokens, five themes and dark mode',
    isActive: isTheming,
  },
  {
    label: 'Components',
    href: '/docs/components',
    description: 'Every component, ready to add',
    isActive: isComponents,
  },
];
