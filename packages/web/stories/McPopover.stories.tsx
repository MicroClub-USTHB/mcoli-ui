import type { Meta, StoryObj } from '@storybook/nextjs';
import { McButton } from '@/registry/ui/mc-button';

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
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof PopoverContent>;

export const TitleOnly: Story = {
  name: 'Property 1="title-only"',
  render: () => (
    <Popover>
      <PopoverTrigger render={<McButton variant="primary">Info</McButton>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Title only, no description.</PopoverTitle>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};
export const Test: Story = {
  name: 'Property 1="title-only"',
  render: () => (
    <Popover>
      <PopoverTrigger
        render={
          <McButton variant="secondary" size="md">
            Popover
          </McButton>
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
