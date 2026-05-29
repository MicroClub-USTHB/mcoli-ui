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
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    rectangle: {
      control: 'boolean',
    },
  },
  args: {
    width: 160,
    height: 16,
    rectangle: true,
  },
  tags: ['autodocs'],
} satisfies Meta<SkeletonStoryArgs>;

export default meta;
type Story = StoryObj<SkeletonStoryArgs>;

export const Playground: Story = {
  args: {
    height: 160,
    className: 'mhnnmn',
  },

  render: (args) => (
    <div className="flex items-center justify-center p-6">
      <McSkeleton {...args} />
    </div>
  ),
};

export const ListPreview: Story = {
  render: () => (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <McSkeleton className="h-12 w-12 shrink-0 rounded-full" />
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
