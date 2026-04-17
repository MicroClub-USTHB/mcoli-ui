import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { McSkeleton } from '@/registry/ui/mc-skeleton';

type SkeletonStoryArgs = ComponentProps<typeof McSkeleton>;

const meta = {
  title: 'Components/McSkeleton',
  component: McSkeleton,
  argTypes: {
    className: {
      control: 'text',
    },
  },
  args: {},
  tags: ['autodocs'],
} satisfies Meta<SkeletonStoryArgs>;

export default meta;
type Story = StoryObj<SkeletonStoryArgs>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex items-center justify-center p-6">
      <McSkeleton {...args} className="h-12 w-48" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Line</p>
        <McSkeleton className="h-4 w-full" />
        <McSkeleton className="h-4 w-4/5" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Heading</p>
        <McSkeleton className="h-8 w-3/4" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Avatar</p>
        <McSkeleton className="h-12 w-12 rounded-full" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Image Block</p>
        <McSkeleton className="h-40 w-full" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Button</p>
        <McSkeleton className="h-10 w-32" />
      </div>
    </div>
  ),
};

export const CardPreview: Story = {
  render: () => (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-3 rounded-lg border border-border bg-card p-5 shadow-sm">
        <div className="space-y-2">
          <McSkeleton className="h-8 w-3/4" />
          <McSkeleton className="h-4 w-full" />
          <McSkeleton className="h-4 w-5/6" />
        </div>

        <div className="space-y-2 pt-3">
          <McSkeleton className="h-40 w-full" />
        </div>

        <div className="flex gap-2 pt-3">
          <McSkeleton className="h-10 flex-1" />
          <McSkeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  ),
};

export const ListPreview: Story = {
  render: () => (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <McSkeleton className="h-12 w-12 flex-shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <McSkeleton className="h-4 w-3/4" />
              <McSkeleton className="h-3 w-full" />
              <McSkeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Showcase: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="space-y-5 text-foreground">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">example</p>
          <h3 className="text-2xl font-semibold">Skeleton</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Use skeletons as placeholder content while data is loading. Combines pulse animation with
          rounded corners for a polished loading experience.
        </p>

        <div className="grid gap-6 pt-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Text Content</p>
            <div className="space-y-2">
              <McSkeleton className="h-4 w-full" />
              <McSkeleton className="h-4 w-5/6" />
              <McSkeleton className="h-4 w-4/5" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Image Placeholder</p>
            <McSkeleton className="h-32 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  ),
};
