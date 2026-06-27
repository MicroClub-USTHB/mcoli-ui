// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../web/registry/ui/mc-carousel';

// --- Storybook Configuration ---
const meta: Meta = {
  title: 'Components/ShadcnCarousels',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex w-full items-center justify-center min-h-[400px] p-12 bg-background">
        <Story />
      </div>
    ),
  ],
};
export default meta;

// --- Component 1: Carousel Demo ---
export function CarouselDemo() {
  return (
    <Carousel>
      <CarouselContent className="max-w-63 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" h-71.5  w-63  ">
            <div className="  ">
              <div className="">
                <div className="flex aspect-square  items-center justify-center ">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// --- Component 2: Carousel Size ---
export function CarouselSize() {
  return (
    <Carousel opts={{ align: 'start' }} className="ml-30 max-w-[381px]">
      <CarouselContent className="gap-2.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-auto min-w-[117px] min-h-[157px]   ">
            <span className="text-3xl font-semibold">{index + 1}</span>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
// --- Component 3: Carousel Orientation ---
export function CarouselOrientation() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="w-full "
    >
      <CarouselContent className="h-75">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2  pt-1 ">
            <div className=" ">
              <div>
                <div className="flex items-center justify-center    ">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
