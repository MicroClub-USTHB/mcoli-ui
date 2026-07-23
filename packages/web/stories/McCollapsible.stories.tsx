import type { Meta, StoryObj } from '@storybook/nextjs';

import McCollapsibleDemo from '@/registry/examples/mc-collapsible-demo';

const meta: Meta<typeof McCollapsibleDemo> = {
  title: 'Components/McCollapsible',
  component: McCollapsibleDemo,
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
  },
};

export default meta;

type Story = StoryObj<typeof McCollapsibleDemo>;

export const Playground: Story = {};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
