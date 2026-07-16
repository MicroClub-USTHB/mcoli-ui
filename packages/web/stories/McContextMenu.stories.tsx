import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  McContextMenu,
  McContextMenuCheckboxItem,
  McContextMenuContent,
  McContextMenuGroup,
  McContextMenuItem,
  McContextMenuLabel,
  McContextMenuRadioGroup,
  McContextMenuRadioItem,
  McContextMenuSeparator,
  McContextMenuShortcut,
  McContextMenuSub,
  McContextMenuSubContent,
  McContextMenuSubTrigger,
  McContextMenuTrigger,
} from '@/registry/ui/mc-context-menu';

type McContextMenuStoryProps = {
  disabledReload: boolean;
  showShortcuts: boolean;
};

function McContextMenuStory({ disabledReload, showShortcuts }: McContextMenuStoryProps) {
  return (
    <div className="flex min-h-80 items-center justify-center p-10">
      <McContextMenu>
        <McContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 text-center text-sm leading-5 text-muted-foreground">
          Right click this area
        </McContextMenuTrigger>
        <McContextMenuContent className="w-56">
          <McContextMenuGroup>
            <McContextMenuLabel>Navigation</McContextMenuLabel>
            <McContextMenuItem>
              Back
              {showShortcuts && <McContextMenuShortcut>Alt+Left</McContextMenuShortcut>}
            </McContextMenuItem>
            <McContextMenuItem>
              Forward
              {showShortcuts && <McContextMenuShortcut>Alt+Right</McContextMenuShortcut>}
            </McContextMenuItem>
            <McContextMenuItem disabled={disabledReload}>
              Reload
              {showShortcuts && <McContextMenuShortcut>Ctrl+R</McContextMenuShortcut>}
            </McContextMenuItem>
          </McContextMenuGroup>

          <McContextMenuSeparator />

          <McContextMenuSub>
            <McContextMenuSubTrigger>More tools</McContextMenuSubTrigger>
            <McContextMenuSubContent>
              <McContextMenuItem>Save page as...</McContextMenuItem>
              <McContextMenuItem>Create shortcut...</McContextMenuItem>
              <McContextMenuItem>Developer tools</McContextMenuItem>
            </McContextMenuSubContent>
          </McContextMenuSub>

          <McContextMenuSeparator />

          <McContextMenuCheckboxItem checked>Show bookmarks bar</McContextMenuCheckboxItem>
          <McContextMenuCheckboxItem>Show full URLs</McContextMenuCheckboxItem>

          <McContextMenuSeparator />

          <McContextMenuGroup>
            <McContextMenuLabel inset>Density</McContextMenuLabel>
            <McContextMenuRadioGroup value="comfortable">
              <McContextMenuRadioItem value="compact">Compact</McContextMenuRadioItem>
              <McContextMenuRadioItem value="comfortable">Comfortable</McContextMenuRadioItem>
              <McContextMenuRadioItem value="spacious">Spacious</McContextMenuRadioItem>
            </McContextMenuRadioGroup>
          </McContextMenuGroup>
        </McContextMenuContent>
      </McContextMenu>
    </div>
  );
}

const meta: Meta<McContextMenuStoryProps> = {
  title: 'Components/McContextMenu',
  component: McContextMenuStory,
  render: (args) => <McContextMenuStory {...args} />,
  argTypes: {
    disabledReload: { control: 'boolean' },
    showShortcuts: { control: 'boolean' },
  },
  args: {
    disabledReload: true,
    showShortcuts: true,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<McContextMenuStoryProps>;

export const Playground: Story = {};

export const WithoutShortcuts: Story = {
  args: {
    showShortcuts: false,
  },
};

export const ReloadEnabled: Story = {
  args: {
    disabledReload: false,
  },
};
