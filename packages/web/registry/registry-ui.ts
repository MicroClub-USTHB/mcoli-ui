import type { Registry } from 'shadcn/schema';
import { REGISTRY_URL } from './consts';

export const ui: Registry['items'] = [
  {
    name: 'mc-button',
    type: 'registry:ui',
    title: 'Micro Club Button',
    description: 'A button component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-button.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react', 'class-variance-authority'],
  },
  {
    name: 'mc-input',
    type: 'registry:ui',
    title: 'Micro Club Input',
    description: 'An input component with field integration and addon support for Micro Club UI',
    files: [
      {
        path: 'ui/mc-input.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-textarea',
    type: 'registry:ui',
    title: 'Micro Club Textarea',
    description:
      'A multi-line text input with field integration and block addons for Micro Club UI',
    files: [
      {
        path: 'ui/mc-textarea.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: [],
  },
  {
    name: 'mc-input-otp',
    type: 'registry:ui',
    title: 'Micro Club Input OTP',
    description: 'An OTP input component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-input-otp.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['input-otp', 'lucide-react'],
  },
  {
    name: 'mc-checkbox',
    type: 'registry:ui',
    title: 'Micro Club Checkbox',
    description: 'A checkbox component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-checkbox.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react', 'class-variance-authority'],
  },
  {
    name: 'mc-radio-group',
    type: 'registry:ui',
    title: 'Micro Club Radio Group',
    description: 'A radio group component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-radio-group.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'class-variance-authority'],
  },
  {
    name: 'mc-card',
    type: 'registry:ui',
    title: 'Micro Club Card',
    description: 'A card layout with header, body, and footer regions for Micro Club UI',
    files: [
      {
        path: 'ui/mc-card.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['class-variance-authority'],
  },
  {
    name: 'mc-select',
    type: 'registry:ui',
    title: 'Micro Club Select',
    description: 'A select component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-select.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-combobox',
    type: 'registry:ui',
    title: 'Micro Club Combobox',
    description: 'A searchable dropdown with autocomplete functionality for Micro Club UI',
    files: [
      {
        path: 'ui/mc-combobox.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-switch',
    type: 'registry:ui',
    title: 'Micro Club Switch',
    description: 'A switch component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-switch.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-navigation-menu',
    type: 'registry:ui',
    title: 'Micro Club Navigation Menu',
    description: 'A navigation menu component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-navigation-menu.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react', 'class-variance-authority'],
  },
  {
    name: 'mc-sidebar',
    type: 'registry:ui',
    title: 'Micro Club Sidebar',
    description: 'A sidebar component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-sidebar.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react', 'class-variance-authority'],
    registryDependencies: [`${REGISTRY_URL}/r/mc-button.json`, `${REGISTRY_URL}/r/mc-tooltip.json`],
  },
  {
    name: 'mc-tabs',
    type: 'registry:ui',
    title: 'Micro Club Tabs',
    description: 'A tabs component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-tabs.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'class-variance-authority'],
  },
  {
    name: 'mc-breadcrumb',
    type: 'registry:ui',
    title: 'Micro Club Breadcrumb',
    description: 'A breadcrumb component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-breadcrumb.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-pagination',
    type: 'registry:ui',
    title: 'Micro Club Pagination',
    description: 'A pagination component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-pagination.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-dialog',
    type: 'registry:ui',
    title: 'Micro Club Dialog',
    description: 'A dialog component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-dialog.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
    registryDependencies: [`${REGISTRY_URL}/r/mc-button.json`],
  },
  {
    name: 'mc-alert-dialog',
    type: 'registry:ui',
    title: 'Micro Club Alert Dialog',
    description: 'An alert dialog component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-alert-dialog.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
    registryDependencies: [`${REGISTRY_URL}/r/mc-button.json`],
  },
  {
    name: 'mc-alert',
    type: 'registry:ui',
    title: 'Micro Club Alert',
    description: 'An alert component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-alert.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['lucide-react'],
  },
  {
    name: 'mc-sonner',
    type: 'registry:ui',
    title: 'Micro Club Sonner',
    description: 'A toast component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-sonner.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['sonner', 'lucide-react'],
  },
  {
    name: 'mc-tooltip',
    type: 'registry:ui',
    title: 'Micro Club Tooltip',
    description: 'A tooltip component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-tooltip.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-popover',
    type: 'registry:ui',
    title: 'Micro Club Popover',
    description: 'A popover component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-popover.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-dropdown-menu',
    type: 'registry:ui',
    title: 'Micro Club Dropdown Menu',
    description: 'A dropdown menu component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-dropdown-menu.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-context-menu',
    type: 'registry:ui',
    title: 'Micro Club Context Menu',
    description: 'A context menu component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-context-menu.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-data-table',
    type: 'registry:ui',
    title: 'Micro Club Data Table',
    description: 'A data table component with sorting, selection and pagination for Micro Club UI',
    files: [
      {
        path: 'ui/mc-data-table.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@tanstack/react-table', 'lucide-react'],
    registryDependencies: [
      `${REGISTRY_URL}/r/mc-button.json`,
      `${REGISTRY_URL}/r/mc-checkbox.json`,
      `${REGISTRY_URL}/r/mc-tooltip.json`,
    ],
  },
  {
    name: 'mc-accordion',
    type: 'registry:ui',
    title: 'Micro Club Accordion',
    description: 'An accordion component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-accordion.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'lucide-react'],
  },
  {
    name: 'mc-collapsible',
    type: 'registry:ui',
    title: 'Micro Club Collapsible',
    description: 'A collapsible component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-collapsible.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-separator',
    type: 'registry:ui',
    title: 'Micro Club Separator',
    description: 'A separator component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-separator.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-progress',
    type: 'registry:ui',
    title: 'Micro Club Progress',
    description: 'A progress component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-progress.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['lucide-react', 'class-variance-authority'],
  },
  {
    name: 'mc-calendar',
    type: 'registry:ui',
    title: 'Micro Club Calendar',
    description: 'A calendar component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-calendar.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['react-day-picker', 'date-fns', 'lucide-react'],
    registryDependencies: [`${REGISTRY_URL}/r/mc-button.json`, `${REGISTRY_URL}/r/mc-popover.json`],
  },
  {
    name: 'mc-scrollarea',
    type: 'registry:ui',
    title: 'Micro Club Scroll Area',
    description: 'A scroll area component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-scrollarea.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-skeleton',
    type: 'registry:ui',
    title: 'Micro Club Skeleton',
    description: 'A skeleton component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-skeleton.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: [],
  },
  {
    name: 'mc-badge',
    type: 'registry:ui',
    title: 'Micro Club Badge',
    description: 'A badge component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-badge.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react', 'class-variance-authority'],
  },
  {
    name: 'mc-avatar',
    type: 'registry:ui',
    title: 'Micro Club Avatar',
    description: 'An avatar component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-avatar.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-drawer',
    type: 'registry:ui',
    title: 'Micro Club Drawer',
    description: 'A drawer component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-drawer.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['vaul'],
    // Sizes behind the w-drawer, h-drawer-nav and h-drawer-item utilities.
    cssVars: {
      theme: {
        'spacing-drawer': '26.6875rem',
        'spacing-drawer-nav': '4.5rem',
        'spacing-drawer-item': '4.125rem',
      },
    },
  },
  {
    name: 'mc-hover-card',
    type: 'registry:ui',
    title: 'Micro Club Hover Card',
    description: 'A hover card component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-hover-card.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-slider',
    type: 'registry:ui',
    title: 'Micro Club Slider',
    description: 'A slider component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-slider.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@base-ui/react'],
  },
  {
    name: 'mc-carousel',
    type: 'registry:ui',
    title: 'Micro Club Carousel',
    description: 'A carousel component for Micro Club UI',
    files: [
      {
        path: 'ui/mc-carousel.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['embla-carousel-react', 'lucide-react'],
    registryDependencies: [`${REGISTRY_URL}/r/mc-button.json`],
  },
];
