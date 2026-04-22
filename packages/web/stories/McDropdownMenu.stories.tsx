import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/registry/ui/mc-dropdown-menu';

type DropdownStoryArgs = React.ComponentProps<typeof DropdownMenu> & {
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
};

const meta = {
  title: 'Components/McDropdownMenu',
  component: DropdownMenu,
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
      <DropdownMenu open={open}>
        <DropdownMenuTrigger
          render={
            <Button className="w-17 h-10 active:primary shadow-[0_0_0_4px_muted]" variant="outline">
              Open
            </Button>
          }
        />
        <DropdownMenuContent className="w-56" align={align} side={side}>
          <DropdownMenuGroup className="h-auto">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="h-auto">
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="h-auto">
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function PreferencesMenu({ open }: { open?: boolean }) {
  const [statusBar, setStatusBar] = React.useState(true);
  const [activityBar, setActivityBar] = React.useState(false);
  const [Panel, setPanel] = React.useState(false);

  return (
    <div className="flex min-h-[260px] items-start justify-center py-10">
      <DropdownMenu open={open}>
        <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup className="h-auto">
            <DropdownMenuLabel>Preferences</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={statusBar}
              onCheckedChange={(checked) => setStatusBar(Boolean(checked))}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activityBar}
              onCheckedChange={(checked) => setActivityBar(Boolean(checked))}
            >
              Activity bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={Panel}
              onCheckedChange={(checked) => setPanel(Boolean(checked))}
            >
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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
