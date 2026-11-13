import type { Registry } from 'shadcn/schema';
import { themes } from './registry-themes';

// One DESIGN.md per theme. The files are generated from the theme tokens by
// scripts/build-registry.mts; `mcoli-ui init` installs the one that matches the
// chosen theme at the project root.
export const designs: Registry['items'] = themes.map((theme) => ({
  name: `design-${theme.name}`,
  type: 'registry:item',
  title: `DESIGN.md (${theme.title})`,
  description: `DESIGN.md that describes the ${theme.title} theme to coding agents.`,
  files: [
    {
      path: `design/${theme.name}/DESIGN.md`,
      type: 'registry:file',
      target: '~/DESIGN.md',
    },
  ],
}));
