import type { Meta, StoryObj } from '@storybook/nextjs';

import { McSlider } from '../registry/ui/mc-slider';

const meta: Meta<typeof McSlider> = {
  title: 'Components/McSlider',
  component: McSlider,
  argTypes: {
    value: { control: 'object' },
    defaultValue: { control: 'object' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof McSlider>;

export const Default: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 100,
  },
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    disabled: true,
  },
};
