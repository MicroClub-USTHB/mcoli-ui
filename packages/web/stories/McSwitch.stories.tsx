import type { Meta, StoryObj } from '@storybook/nextjs';
import { McSwitch } from '@/registry/ui/mc-switch';

const meta: Meta<typeof McSwitch> = {
  title: 'Components/McSwitch',
  component: McSwitch,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof McSwitch>;

export const Playground: Story = {
  args: {
    size: 'default',
  },
};
