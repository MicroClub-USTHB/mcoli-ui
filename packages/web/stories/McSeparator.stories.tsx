import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { McSeparator } from '@/registry/ui/mc-separator';

type SeparatorStoryArgs = ComponentProps<typeof McSeparator>;

const meta = {
  title: 'Components/McSeparator',
  component: McSeparator,
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'number' },
    },
  },
  args: {
    orientation: 'horizontal',
    size: 2,
  },
  tags: ['autodocs'],
} satisfies Meta<SeparatorStoryArgs>;

export default meta;
type Story = StoryObj<SeparatorStoryArgs>;

export const Playground: Story = {
  args: {
    size: 10,
    orientation: 'vertical',
  },

  render: (args) => {
    return <McSeparator {...args} />;
  },
};

export const Showcase: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="space-y-5 text-foreground">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">example</p>
          <h3 className="text-2xl font-semibold">Separator</h3>
        </div>

        <McSeparator {...args} className="w-full" />

        <div className="flex flex-wrap items-center text-2xl">
          <span className="font-medium">Bloc</span>
          <McSeparator {...args} orientation="vertical" />
          <span className="font-medium">Bloc</span>
          <McSeparator {...args} orientation="vertical" />
          <span className="font-medium">Bloc</span>
        </div>
      </div>
    </div>
  ),
};
