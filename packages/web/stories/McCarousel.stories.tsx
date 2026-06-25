import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  McCarousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/registry/ui/mc-carousel';

const meta: Meta = {
  title: 'Components/McCarousel',
  component: McCarousel,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <div className="flex w-full items-center justify-center min-h-[400px] ">
      <McCarousel className="w-full max-w-xs relative">
        {/* Renders exactly 8 cards automatically */}
        <CarouselContent count={8} />
        <CarouselPrevious />
        <CarouselNext />
      </McCarousel>
    </div>
  ),
};

export const MultiView: Story = {
  render: () => (
    <div className="flex w-full items-center ml-70 justify-center min-h-[400px] ">
      <McCarousel layout="multi" className="  w-[450px] mx-auto">
        <CarouselContent count={6} />
        <CarouselPrevious />
        <CarouselNext />
      </McCarousel>
    </div>
  ),
};
