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
    <Carousel className="w-full max-w-[12rem] sm:max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1 ">
              <div className="">
                <div className="flex aspect-square h-50 items-center justify-center p-5">
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
    <Carousel
      opts={{ align: 'start' }}
      className="w-full max-w-[407px]" // exactly fits 3 × 125px cards + 2 × 16px gaps
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-auto w-[125px] h-[165px]">
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
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[300px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 pt-1 ">
            <div className="p-1">
              <div>
                <div className="flex items-center justify-center p-6">
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
