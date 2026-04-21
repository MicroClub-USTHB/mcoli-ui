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

// ─── Default ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Property 1="default"',
  render: () => (
    <Popover>
      <PopoverTrigger render={<McButton variant="secondary">Open Popover</McButton>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This is a short description giving more context about this popover.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

// ─── With content ─────────────────────────────────────────────────────────────
export const WithContent: Story = {
  name: 'Property 1="with-content"',
  render: () => (
    <Popover>
      <PopoverTrigger render={<McButton variant="secondary">Settings</McButton>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Settings</PopoverTitle>
          <PopoverDescription>Manage your account preferences.</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Notifications</span>
            <span className="text-foreground font-medium">On</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Dark mode</span>
            <span className="text-foreground font-medium">System</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Language</span>
            <span className="text-foreground font-medium">English</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// ─── Side variants ────────────────────────────────────────────────────────────
export const SideTop: Story = {
  name: 'Property 1="side-top"',
  render: () => (
    <Popover>
      <PopoverTrigger render={<McButton variant="secondary">Open Top</McButton>} />
      <PopoverContent side="top">
        <PopoverHeader>
          <PopoverTitle>Opens on Top</PopoverTitle>
          <PopoverDescription>This popover appears above the trigger.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const SideRight: Story = {
  name: 'Property 1="side-right"',
  render: () => (
    <Popover>
      <PopoverTrigger render={<McButton variant="secondary">Open Right</McButton>} />
      <PopoverContent side="right">
        <PopoverHeader>
          <PopoverTitle>Opens on Right</PopoverTitle>
          <PopoverDescription>This popover appears to the right of the trigger.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const SideLeft: Story = {
  name: 'Property 1="side-left"',
  render: () => (
    <Popover>
      <PopoverTrigger render={<McButton variant="secondary">Open Left</McButton>} />
      <PopoverContent side="left">
        <PopoverHeader>
          <PopoverTitle>Opens on Left</PopoverTitle>
          <PopoverDescription>This popover appears to the left of the trigger.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

// ─── No description ───────────────────────────────────────────────────────────
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
