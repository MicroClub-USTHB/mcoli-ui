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
    minimized: {
      control: { type: 'boolean' },
    },
  },
  args: {
    orientation: 'horizontal',
    minimized: false,
  },
  tags: ['autodocs'],
} satisfies Meta<SeparatorStoryArgs>;

export default meta;
type Story = StoryObj<SeparatorStoryArgs>;

export const Playground: Story = {
  render: (args) => {
    const isVertical = args.orientation === 'vertical';

    return (
      <div className="flex h-56 items-center justify-center p-6">
        <div className={isVertical ? 'h-36' : 'w-72'}>
          <McSeparator {...args} className={isVertical ? 'h-full' : 'w-full'} />
        </div>
      </div>
    );
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:items-center">
        <div className="rounded-xl border border-dashed border-primary/40 bg-background p-5 sm:p-7">
          <div className="flex min-h-45 items-stretch gap-6">
            <div className="flex flex-1 flex-col justify-start gap-6">
              <McSeparator className="w-full" />
              <McSeparator minimized className="w-full" />
            </div>
            <McSeparator orientation="vertical" className="h-full" />
          </div>
        </div>

        <div className="space-y-5 text-foreground">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">example</p>
            <h3 className="text-2xl font-semibold">Separator</h3>
          </div>

          <McSeparator className="w-full" />

          <div className="flex flex-wrap items-center text-2xl">
            <span className="font-medium">Bloc</span>
            <McSeparator orientation="vertical" minimized />
            <span className="font-medium">Bloc</span>
            <McSeparator orientation="vertical" minimized className="h-6" />
            <span className="font-medium">Bloc</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
