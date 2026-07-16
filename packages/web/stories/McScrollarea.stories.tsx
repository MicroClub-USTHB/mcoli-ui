import type { Meta, StoryObj } from '@storybook/nextjs';
import McScrollAreaDemo from '../registry/examples/mc-scrollarea-demo';

const meta: Meta = {
  title: 'Components/McScrollArea',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Vertical: Story = {
  name: 'Vertical Scroll',
  render: () => <McScrollAreaDemo />,
};
