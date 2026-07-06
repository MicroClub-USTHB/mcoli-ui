import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  McCarousel,
  McCarouselContent,
  McCarouselItem,
  McCarouselPrevious,
  McCarouselNext,
} from '@/registry/ui/mc-carousel';

function CarouselDemo() {
  return (
    <div className="flex w-full items-center justify-center">
      <McCarousel className="w-full max-w-xs">
        <McCarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <McCarouselItem key={index}>
              <div className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </div>
            </McCarouselItem>
          ))}
        </McCarouselContent>
        <McCarouselPrevious />
        <McCarouselNext />
      </McCarousel>
    </div>
  );
}

const meta: Meta<typeof CarouselDemo> = {
  title: 'Components/McCarousel',
  component: CarouselDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CarouselDemo>;

export const Default: Story = {};
