import type { Registry } from 'shadcn/schema';
import { REGISTRY_URL } from './consts/index';

export const examples: Registry['items'] = [
  {
    name: 'mc-button-demo',
    type: 'registry:example',
    title: 'MicroClub Button Demo',
    description: 'Demo for MicroClub Button',
    files: [
      {
        path: 'examples/mc-button-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-button.json`],
  },
  {
    name: 'mc-input-demo',
    type: 'registry:example',
    title: 'MicroClub Input Demo',
    description: 'Demo for MicroClub Input',
    files: [
      {
        path: 'examples/mc-input-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-input.json`],
  },
  {
    name: 'mc-textarea-demo',
    type: 'registry:example',
    title: 'MicroClub Textarea Demo',
    description: 'Demo for MicroClub Textarea',
    files: [
      {
        path: 'examples/mc-textarea-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-textarea.json`],
  },
  {
    name: 'mc-input-otp-demo',
    type: 'registry:example',
    title: 'MicroClub Input OTP Demo',
    description: 'Demo for MicroClub Input OTP',
    files: [
      {
        path: 'examples/mc-input-otp-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-input-otp.json`],
  },
  {
    name: 'mc-checkbox-demo',
    type: 'registry:example',
    title: 'MicroClub Checkbox Demo',
    description: 'Demo for MicroClub Checkbox',
    files: [
      {
        path: 'examples/mc-checkbox-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-checkbox.json`],
  },
  {
    name: 'mc-radio-demo',
    type: 'registry:example',
    title: 'MicroClub Radio Demo',
    description: 'Demo for MicroClub Radio',
    files: [
      {
        path: 'examples/mc-radio-group-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-radio-group.json`],
  },
  {
    name: 'mc-card-demo',
    type: 'registry:example',
    title: 'MicroClub Card Demo',
    description: 'Demo for MicroClub Card',
    files: [
      {
        path: 'examples/mc-card-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-card.json`],
  },
  {
    name: 'mc-select-demo',
    type: 'registry:example',
    title: 'MicroClub Select Demo',
    description: 'Demo for MicroClub Select',
    files: [
      {
        path: 'examples/mc-select-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-select.json`],
  },
  {
    name: 'mc-combobox-demo',
    type: 'registry:example',
    title: 'MicroClub Combobox Demo',
    description: 'Demo for MicroClub Combobox',
    files: [
      {
        path: 'examples/mc-combobox-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-combobox.json`],
  },
  {
    name: 'mc-switch-demo',
    type: 'registry:example',
    title: 'MicroClub Switch Demo',
    description: 'Demo for MicroClub Switch',
    files: [
      {
        path: 'examples/mc-switch-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-switch.json`],
  },
  {
    name: 'mc-navigation-menu-demo',
    type: 'registry:example',
    title: 'MicroClub Navigation Menu Demo',
    description: 'Demo for MicroClub Navigation Menu',
    files: [
      {
        path: 'examples/mc-navigation-menu-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-navigation-menu.json`],
  },
  {
    name: 'mc-sidebar-demo',
    type: 'registry:example',
    title: 'MicroClub Sidebar Demo',
    description: 'Demo for MicroClub Sidebar',
    files: [
      {
        path: 'examples/mc-sidebar-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-sidebar.json`],
  },
  {
    name: 'mc-tabs-demo',
    type: 'registry:example',
    title: 'MicroClub Tabs Demo',
    description: 'Demo for MicroClub Tabs',
    files: [
      {
        path: 'examples/mc-tabs-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-tabs.json`],
  },
  {
    name: 'mc-breadcrumb-demo',
    type: 'registry:example',
    title: 'MicroClub Breadcrumb Demo',
    description: 'Demo for MicroClub Breadcrumb',
    files: [
      {
        path: 'examples/mc-breadcrumb-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-breadcrumb.json`],
  },
  {
    name: 'mc-pagination-demo',
    type: 'registry:example',
    title: 'MicroClub Pagination Demo',
    description: 'Demo for MicroClub Pagination',
    files: [
      {
        path: 'examples/mc-pagination-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-pagination.json`],
  },
  {
    name: 'mc-dialog-demo',
    type: 'registry:example',
    title: 'MicroClub Dialog Demo',
    description: 'Demo for MicroClub Dialog',
    files: [
      {
        path: 'examples/mc-dialog-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-dialog.json`],
  },
  {
    name: 'mc-alert-dialog-demo',
    type: 'registry:example',
    title: 'MicroClub Alert Dialog Demo',
    description: 'Demo for MicroClub Alert Dialog',
    files: [
      {
        path: 'examples/mc-alert-dialog-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-alert-dialog.json`],
  },
  {
    name: 'mc-alert-demo',
    type: 'registry:example',
    title: 'MicroClub Alert Demo',
    description: 'Demo for MicroClub Alert',
    files: [
      {
        path: 'examples/mc-alert-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-alert.json`],
  },
  {
    name: 'mc-sonner-demo',
    type: 'registry:example',
    title: 'MicroClub Sonner Demo',
    description: 'Demo for MicroClub Sonner',
    files: [
      {
        path: 'examples/mc-sonner-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-sonner.json`],
  },
  {
    name: 'mc-tooltip-demo',
    type: 'registry:example',
    title: 'MicroClub Tooltip Demo',
    description: 'Demo for MicroClub Tooltip',
    files: [
      {
        path: 'examples/mc-tooltip-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-tooltip.json`],
  },
  {
    name: 'mc-popover-demo',
    type: 'registry:example',
    title: 'MicroClub Popover Demo',
    description: 'Demo for MicroClub Popover',
    files: [
      {
        path: 'examples/mc-popover-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-popover.json`, `${REGISTRY_URL}/r/mc-button.json`],
  },
  {
    name: 'mc-dropdown-menu-demo',
    type: 'registry:example',
    title: 'MicroClub Dropdown Menu Demo',
    description: 'Demo for MicroClub Dropdown Menu',
    files: [
      {
        path: 'examples/mc-dropdown-menu-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-dropdown-menu.json`],
  },
  {
    name: 'mc-context-menu-demo',
    type: 'registry:example',
    title: 'MicroClub Context Menu Demo',
    description: 'Demo for MicroClub Context Menu',
    files: [
      {
        path: 'examples/mc-context-menu-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-context-menu.json`],
  },
  {
    name: 'mc-accordion-demo',
    type: 'registry:example',
    title: 'MicroClub Accordion Demo',
    description: 'Demo for MicroClub Accordion',
    files: [
      {
        path: 'examples/mc-accordion-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-accordion.json`],
  },
  {
    name: 'mc-collapsible-demo',
    type: 'registry:example',
    title: 'MicroClub Collapsible Demo',
    description: 'Demo for MicroClub Collapsible',
    files: [
      {
        path: 'examples/mc-collapsible-demo.tsx',
        type: 'registry:example',
      },
    ],
    dependencies: ['lucide-react'],
    registryDependencies: [`${REGISTRY_URL}/r/mc-collapsible.json`],
  },
  {
    name: 'mc-separator-demo',
    type: 'registry:example',
    title: 'MicroClub Separator Demo',
    description: 'Demo for MicroClub Separator',
    files: [
      {
        path: 'examples/mc-separator-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-separator.json`],
  },

  {
    name: 'mc-calendar-demo',
    type: 'registry:example',
    title: 'MicroClub Calendar Demo',
    description: 'Demo for MicroClub Calendar',
    files: [
      {
        path: 'examples/mc-calendar-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-calendar.json`],
  },
  {
    name: 'mc-scrollarea-demo',
    type: 'registry:example',
    title: 'MicroClub Scroll Area Demo',
    description: 'Demo for MicroClub Scroll Area',
    files: [
      {
        path: 'examples/mc-scrollarea-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-scrollarea.json`],
  },
  {
    name: 'mc-skeleton-demo',
    type: 'registry:example',
    title: 'MicroClub Skeleton Demo',
    description: 'Demo for MicroClub Skeleton',
    files: [
      {
        path: 'examples/mc-skeleton-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-skeleton.json`],
  },
  {
    name: 'mc-badge-demo',
    type: 'registry:example',
    title: 'MicroClub Badge Demo',
    description: 'Demo for MicroClub Badge',
    files: [
      {
        path: 'examples/mc-badge-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-badge.json`],
  },
  {
    name: 'mc-avatar-demo',
    type: 'registry:example',
    title: 'MicroClub Avatar Demo',
    description: 'Demo for MicroClub Avatar',
    files: [
      {
        path: 'examples/mc-avatar-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-avatar.json`],
  },
  {
    name: 'mc-drawer-demo',
    type: 'registry:example',
    title: 'MicroClub Drawer Demo',
    description: 'Demo for MicroClub drawer',
    files: [
      {
        path: 'examples/mc-drawer-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-drawer.json`],
  },
  {
    name: 'mc-hover-card-demo',
    type: 'registry:example',
    title: 'MicroClub Hover Card Demo',
    description: 'Demo for MicroClub Hover Card',
    files: [
      {
        path: 'examples/mc-hover-card-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-hover-card.json`],
  },
  {
    name: 'mc-slider-demo',
    type: 'registry:example',
    title: 'MicroClub Slider Demo',
    description: 'Demo for MicroClub Slider',
    files: [
      {
        path: 'examples/mc-slider-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-slider.json`],
  },
  {
    name: 'mc-carousel-demo',
    type: 'registry:example',
    title: 'MicroClub Carousel Demo',
    description: 'Demo for MicroClub Carousel',
    files: [
      {
        path: 'examples/mc-carousel-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${REGISTRY_URL}/r/mc-carousel.json`],
  },
];
