import type { Meta, StoryObj } from '@storybook/nextjs';

import { McButton } from '@/registry/ui/mc-button';
import {
  McCollapsible,
  McCollapsibleContent,
  McCollapsibleTrigger,
} from '@/registry/ui/mc-collapsible';

const meta: Meta<typeof McCollapsible> = {
  title: 'Components/McCollapsible',
  component: McCollapsible,
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <McCollapsible {...args} className="w-full max-w-sm space-y-2">
      <McCollapsibleTrigger
        render={
          <McButton variant="tertiary" size="sm">
            Toggle collapse
          </McButton>
        }
      />
      <McCollapsibleContent className="rounded-lg border border-border bg-card p-4 text-sm text-card-foreground">
        This is the collapsible content.
      </McCollapsibleContent>
    </McCollapsible>
  ),
};

export default meta;

type Story = StoryObj<typeof McCollapsible>;

export const Playground: Story = {};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
