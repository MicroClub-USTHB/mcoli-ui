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
    dependencies: ['@base-ui/react', 'lucide-react'],
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
    dependencies: ['@base-ui/react', 'lucide-react'],
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
    dependencies: [],
  },
  {
    name: 'mc-select',
    type: 'registry:component',
    title: 'MicroClub Select',
    description: 'A select component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-select.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
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
    dependencies: ['@base-ui/react', 'lucide-react'],
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
    dependencies: ['@base-ui/react', 'lucide-react'],
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
    dependencies: ['@base-ui/react', 'lucide-react'],
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
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-dialog',
    type: 'registry:component',
    title: 'MicroClub Dialog',
    description: 'A dialog component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-dialog.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-alert-dialog',
    type: 'registry:component',
    title: 'MicroClub Alert Dialog',
    description: 'An alert dialog component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-alert-dialog.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-alert',
    type: 'registry:component',
    title: 'MicroClub Alert',
    description: 'An alert component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-alert.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['lucide-react'],
  },
  {
    name: 'mc-sonner',
    type: 'registry:component',
    title: 'MicroClub Sonner',
    description: 'A toast component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-sonner.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['sonner', 'lucide-react'],
  },
  {
    name: 'mc-tooltip',
    type: 'registry:component',
    title: 'MicroClub Tooltip',
    description: 'A tooltip component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-tooltip.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-popover',
    type: 'registry:component',
    title: 'MicroClub Popover',
    description: 'A popover component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-popover.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-dropdown-menu',
    type: 'registry:component',
    title: 'MicroClub Dropdown Menu',
    description: 'A dropdown menu component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-dropdown-menu.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-context-menu',
    type: 'registry:component',
    title: 'MicroClub Context Menu',
    description: 'A context menu component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-context-menu.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-accordion',
    type: 'registry:component',
    title: 'MicroClub Accordion',
    description: 'An accordion component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-accordion.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-separator',
    type: 'registry:component',
    title: 'MicroClub Separator',
    description: 'A separator component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-separator.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-calendar',
    type: 'registry:component',
    title: 'MicroClub Calendar',
    description: 'A calendar component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-calendar.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['react-day-picker', 'date-fns', 'lucide-react'],
  },
  {
    name: 'mc-scrollarea',
    type: 'registry:component',
    title: 'MicroClub Scroll Area',
    description: 'A scroll area component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-scrollarea.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-skeleton',
    type: 'registry:component',
    title: 'MicroClub Skeleton',
    description: 'A skeleton component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-skeleton.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: [],
  },
  {
    name: 'mc-badge',
    type: 'registry:component',
    title: 'MicroClub Badge',
    description: 'A badge component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-badge.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-avatar',
    type: 'registry:component',
    title: 'MicroClub Avatar',
    description: 'An avatar component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-avatar.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-hover-card',
    type: 'registry:component',
    title: 'MicroClub Hover Card',
    description: 'A hover card component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-hover-card.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react'],
  },

  {
    name: 'mc-carousel',
    type: 'registry:component',
    title: 'MicroClub Carousel',
    description: 'A carousel component for MicroClub UI',
    files: [
      {
        path: 'ui/mc-carousel.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@base-ui/react', 'embla-carousel-react', 'lucide-react'],
  },
];
