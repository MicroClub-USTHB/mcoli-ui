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
];
