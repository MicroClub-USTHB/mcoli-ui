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
    name: 'mc-input',
    type: 'registry:component',
    title: 'MicroClub Input',
    description: 'An input component with field integration and addon support for MicroClub UI',
    files: [
      {
        path: 'ui/mc-input.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-textarea',
    type: 'registry:component',
    title: 'MicroClub Textarea',
    description: 'A multi-line text input with field integration and block addons for MicroClub UI',
    files: [
      {
        path: 'ui/mc-textarea.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: [],
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
    name: 'mc-card',
    type: 'registry:component',
    title: 'MicroClub Card',
    description: 'A card layout with header, body, and footer regions for MicroClub UI',
    files: [
      {
        path: 'ui/mc-card.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['class-variance-authority'],
  },
  {
    name: 'mc-radio-group',
    type: 'registry:component',
    title: 'MicroClub Radio Group',
    description: 'A radio group component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-radio-group.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-switch',
    type: 'registry:component',
    title: 'MicroClub Switch',
    description: 'A switch component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-switch.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-tabs',
    type: 'registry:component',
    title: 'MicroClub Tabs',
    description: 'A tabs component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-tabs.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-breadcrumb',
    type: 'registry:component',
    title: 'MicroClub Breadcrumb',
    description: 'A breadcrumb component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-breadcrumb.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
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
  {
    name: 'mc-sidebar',
    type: 'registry:component',
    title: 'MicroClub Sidebar',
    description: 'A sidebar component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-sidebar.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-combobox',
    type: 'registry:component',
    title: 'MicroClub Combobox',
    description: 'A searchable dropdown with autocomplete functionality for MicroClub UI',
    files: [
      {
        path: 'ui/mc-combobox.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-navigation-menu',
    type: 'registry:component',
    title: 'MicroClub Navigation Menu',
    description: 'A navigation menu component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-navigation-menu.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-select',
    type: 'registry:component',
    title: 'MicroClub Selector',
    description: 'A Selector component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-select.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
];
