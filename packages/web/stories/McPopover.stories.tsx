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
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PopoverContent>;

export const TitleOnly: Story = {
  name: 'Property 1="title-only"',
  render: () => (
    <Popover>
      <PopoverTrigger render={<McButton variant="secondary">Info</McButton>} />
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
          <McButton variant="primary" size="sm">
            Popover
          </McButton>
        }
      />
      <PopoverContent align="center" className="w-40">
        Dimens
      </PopoverContent>
    </Popover>
  ),
};
