import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/registry/ui/mc-popover';

const meta: Meta<typeof PopoverContent> = {
  title: 'Components/McPopover',
  component: PopoverContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PopoverContent>;

export const Test: Story = {
  name: 'Property 1="title-only"',
  render: () => (
    <Popover>
      <PopoverTrigger
        render={
          <button
            className="
        flex items-center justify-center
        h-9
        px-6 py-2
        gap-2.5
        rounded-lg
        border border-border
        bg-background
        shadow-sm
        transition-all
        duration-300
        font-sans
        text-sm
        font-semibold
        leading-5
        text-center
        text-foreground
        ease-out
        hover:bg-accent/50
        data-[state=open]:bg-background
        data-[state=open]:shadow-sm
      "
          >
            Popover Here
          </button>
        }
      />
      <PopoverContent>
        <PopoverHeader className="mb-4">
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>

        <div className="flex flex-col gap-2 pl-4">
          <div className="flex items-center gap-2">
            <label htmlFor="width" className="w-1/2 text-sm font-medium">
              Width
            </label>
            <input
              id="width"
              defaultValue="100%"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="height" className="w-1/2 text-sm font-medium">
              Height
            </label>
            <input
              id="width"
              defaultValue="100%"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="height" className="w-1/2 text-sm font-medium">
              Height
            </label>
            <input
              id="width"
              defaultValue="100%"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="height" className="w-1/2 text-sm font-medium">
              Height
            </label>
            <input
              id="width"
              defaultValue="100%"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
