// ScrollArea.stories.tsx

import type { Meta, StoryObj } from '@storybook/nextjs';
import { ScrollAreaDemo, ScrollAreaHorizontalDemo } from '../registry/examples/mc-scrollarea-demo';

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

export const Horizontal: Story = {
  name: 'Horizontal Scroll',
  render: () => <ScrollAreaHorizontalDemo />,
};
