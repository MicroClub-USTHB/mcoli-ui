import type { Meta, StoryObj } from '@storybook/nextjs';
import ScrollAreaDemo from '../registry/examples/mc-scrollarea-demo';

const meta: Meta = {
  title: 'Components/ScrollArea',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Vertical: Story = {
  name: 'Vertical Scroll',
  render: () => <ScrollAreaDemo />,
};
