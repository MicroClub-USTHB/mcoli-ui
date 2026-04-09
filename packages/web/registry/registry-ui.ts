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
    name: 'mc-input-otp',
    type: 'registry:component',
    title: 'MicroClub Input OTP',
    description: 'An OTP input component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-input-otp.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['input-otp', 'lucide-react'],
  },
  {
    name: 'mc-checkbox',
    type: 'registry:component',
    title: 'MicroClub Checkbox',
    description: 'A checkbox component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-checkbox.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },

  {
    name: 'mc-pagination',
    type: 'registry:component',
    title: 'MicroClub Pagination',
    description: 'A pagination component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-pagination.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
];
