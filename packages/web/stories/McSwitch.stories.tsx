import type { Meta, StoryObj } from '@storybook/nextjs';
import { McSwitch } from '@/registry/ui/mc-switch';

const meta: Meta<typeof McSwitch> = {
  title: 'Components/McSwitch',
  component: McSwitch,
};

export default meta;
type Story = StoryObj<typeof McSwitch>;

export const Default: Story = {};
