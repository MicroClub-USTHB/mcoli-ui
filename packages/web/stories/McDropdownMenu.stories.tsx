import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  McDropdownMenu,
  McDropdownMenuCheckboxItem,
  McDropdownMenuContent,
  McDropdownMenuGroup,
  McDropdownMenuItem,
  McDropdownMenuLabel,
  McDropdownMenuPortal,
  McDropdownMenuSeparator,
  McDropdownMenuSub,
  McDropdownMenuSubContent,
  McDropdownMenuSubTrigger,
  McDropdownMenuTrigger,
} from '@/registry/ui/mc-dropdown-menu';

type DropdownStoryArgs = React.ComponentProps<typeof McDropdownMenu> & {
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
};

const meta = {
  title: 'Components/McDropdownMenu',
  component: McDropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the dropdown is open.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Controls the alignment of the dropdown content.',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Controls the side where the dropdown opens.',
    },
  },
  args: {
    open: false,
    align: 'start',
    side: 'bottom',
  },
} satisfies Meta<DropdownStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

function AccountMenu({
  open,
  align = 'start',
  side = 'bottom',
}: {
  open?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  return (
    <div className="flex min-h-[260px] items-start justify-center py-10">
      <McDropdownMenu open={open}>
        <McDropdownMenuTrigger
          render={
            <Button className="w-17 h-10 active:primary shadow-[0_0_0_4px_muted]" variant="outline">
              Open
            </Button>
          }
        />
        <McDropdownMenuContent className="w-56" align={align} side={side}>
          <McDropdownMenuGroup className="h-auto">
            <McDropdownMenuLabel>My Account</McDropdownMenuLabel>
            <McDropdownMenuItem>Profile</McDropdownMenuItem>
            <McDropdownMenuItem>Settings</McDropdownMenuItem>
          </McDropdownMenuGroup>
          <McDropdownMenuSeparator />
          <McDropdownMenuGroup className="h-auto">
            <McDropdownMenuItem>Team</McDropdownMenuItem>
            <McDropdownMenuSub>
              <McDropdownMenuSubTrigger>Invite users</McDropdownMenuSubTrigger>
              <McDropdownMenuPortal>
                <McDropdownMenuSubContent>
                  <McDropdownMenuItem>Email</McDropdownMenuItem>
                  <McDropdownMenuItem>Message</McDropdownMenuItem>
                  <McDropdownMenuSeparator />
                  <McDropdownMenuItem>More...</McDropdownMenuItem>
                </McDropdownMenuSubContent>
              </McDropdownMenuPortal>
            </McDropdownMenuSub>
          </McDropdownMenuGroup>
          <McDropdownMenuSeparator />
          <McDropdownMenuGroup className="h-auto">
            <McDropdownMenuItem variant="destructive">Log out</McDropdownMenuItem>
          </McDropdownMenuGroup>
        </McDropdownMenuContent>
      </McDropdownMenu>
    </div>
  );
}

function PreferencesMenu({ open }: { open?: boolean }) {
  const [statusBar, setStatusBar] = React.useState(true);
  const [activityBar, setActivityBar] = React.useState(false);
  const [Panel, setPanel] = React.useState(false);

  return (
    <div className="flex min-h-[260px] items-start justify-center py-10">
      <McDropdownMenu open={open}>
        <McDropdownMenuTrigger
          render={
            <Button className="w-17 h-10 active:primary shadow-[0_0_0_4px_muted]" variant="outline">
              Open
            </Button>
          }
        />
        <McDropdownMenuContent className="w-56" align="end">
          <McDropdownMenuGroup className="h-auto">
            <McDropdownMenuLabel>Preferences</McDropdownMenuLabel>
            <McDropdownMenuSeparator />
            <McDropdownMenuCheckboxItem
              checked={statusBar}
              onCheckedChange={(checked) => setStatusBar(Boolean(checked))}
            >
              Status Bar
            </McDropdownMenuCheckboxItem>
            <McDropdownMenuCheckboxItem
              checked={activityBar}
              onCheckedChange={(checked) => setActivityBar(Boolean(checked))}
            >
              Activity bar
            </McDropdownMenuCheckboxItem>
            <McDropdownMenuCheckboxItem
              checked={Panel}
              onCheckedChange={(checked) => setPanel(Boolean(checked))}
            >
              Panel
            </McDropdownMenuCheckboxItem>
          </McDropdownMenuGroup>
        </McDropdownMenuContent>
      </McDropdownMenu>
    </div>
  );
}

export const Playground: Story = {
  render: (args: DropdownStoryArgs) => (
    <AccountMenu open={args.open} align={args.align} side={args.side} />
  ),
};

export const WithSubmenu: Story = {
  render: () => <AccountMenu />,
};

export const WithSelectionControls: Story = {
  render: () => <PreferencesMenu />,
};
