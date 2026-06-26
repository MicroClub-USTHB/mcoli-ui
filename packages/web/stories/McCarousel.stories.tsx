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
    <div className="flex w-full items-center justify-center min-h-[300px] py-6 px-12">
      <McCarousel layout="multi" orientation="horizontal" className="w-full max-w-[395px] relative">
        <CarouselContent count={6} />
        <CarouselPrevious />
        <CarouselNext />
      </McCarousel>
    </div>
  ),
};

export const VerticalMultiView: Story = {
  render: () => (
    <div className="flex w-full items-center justify-center min-h-[450px] py-12">
      <McCarousel orientation="vertical" layout="multi" className="h-[314px] w-[320px] relative">
        <CarouselContent count={5} />
        <CarouselPrevious />
        <CarouselNext />
      </McCarousel>
    </div>
  ),
};
