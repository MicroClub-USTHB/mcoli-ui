import type { ThemePalette } from '@/components/ColorThemeProvider';

export interface ThemeMeta {
  name: string;
  value: ThemePalette;
  /** Same one-liners the CLI prints in `npx mcoli-ui init` */
  description: string;
  /** Light-mode brand pair, used for swatches before a scoped preview mounts */
  swatch: [string, string];
}

export const THEMES: ThemeMeta[] = [
  {
    name: 'Primary',
    value: 'primary',
    description: 'Professional and modern',
    swatch: ['#0006B1', '#E6E9FF'],
  },
  {
    name: 'Secondary',
    value: 'secondary',
    description: 'Creative and bold',
    swatch: ['#6A0DAD', '#FDDDFF'],
  },
  {
    name: 'Game Dev',
    value: 'game-dev',
    description: 'Fun and energetic',
    swatch: ['#D04F99', '#FACC15'],
  },
  {
    name: 'Robotics',
    value: 'robotics',
    description: 'Technical and precise',
    swatch: ['#001EFF', '#00D3FF'],
  },
  {
    name: 'IT',
    value: 'it',
    description: 'Clean and professional',
    swatch: ['#34D399', '#BEFFD4'],
  },
];

export const REPO_URL = 'https://github.com/MicroClub-USTHB/mcoli-ui';
