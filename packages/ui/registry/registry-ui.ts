import type { Registry } from 'shadcn/schema';

export const ui: Registry['items'] = [
  {
    name: 'mc-button',
    type: 'registry:component',
    title: 'MicroClub Button',
    description: 'A button component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-button.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
  name: 'mc-checkbox',
  type: 'registry:component',
  title: 'MicroClub Checkbox',
  description: 'A checkbox component with label and support text',
  files: [{ path: 'ui/mc-checkbox.tsx', type: 'registry:component' }],
  dependencies: ['@base-ui/react'],
},
];
