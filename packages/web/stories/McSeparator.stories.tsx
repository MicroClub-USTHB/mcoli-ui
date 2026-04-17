import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { McSeparator } from '@/registry/ui/mc-separator';
import { Divide } from 'lucide-react';

type SeparatorStoryArgs = ComponentProps<typeof McSeparator>;

const meta = {
  title: 'Components/McSeparator',
  component: McSeparator,
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
  tags: ['autodocs'],
} satisfies Meta<SeparatorStoryArgs>;

export default meta;
type Story = StoryObj<SeparatorStoryArgs>;

export const Playground: Story = {
  render: (args) =>
    args.orientation === 'vertical' ? (
      <McSeparator {...args} />
    ) : (
      <McSeparator className="my-4 " {...args} />
    ),
};

export const Showcase: Story = {
  render: () => <></>,
};
