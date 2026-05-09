import type { Meta, StoryObj } from '@storybook/nextjs';
import { McSeparator } from '@/registry/ui/mc-separator';

const meta: Meta<typeof McSeparator> = {
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
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof McSeparator>;

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    size: 100,
  },
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-full space-y-4">
      <McSeparator />
      <McSeparator size={200} />
      <McSeparator size={300} />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-32 items-center gap-4">
      <span>First</span>
      <McSeparator orientation="vertical" size={24} />
      <span>Second</span>
      <McSeparator orientation="vertical" size={32} />
      <span>Third</span>
    </div>
  ),
};

export const Showcase: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="space-y-5 text-foreground">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">example</p>
          <h3 className="text-2xl font-semibold">Separator</h3>
        </div>

        <McSeparator className="w-full" />

        <div className="flex items-center gap-2 text-2xl">
          <span className="font-medium">Bloc</span>
          <McSeparator orientation="vertical" size={24} />
          <span className="font-medium">Bloc</span>
          <McSeparator orientation="vertical" size={24} />
          <span className="font-medium">Bloc</span>
        </div>
      </div>
    </div>
  ),
};
