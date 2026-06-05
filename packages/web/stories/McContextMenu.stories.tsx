import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/registry/ui/mc-context-menu';

type McContextMenuStoryProps = {
  disabledReload: boolean;
  showShortcuts: boolean;
};

function McContextMenuStory({ disabledReload, showShortcuts }: McContextMenuStoryProps) {
  return (
    <div className="flex min-h-80 items-center justify-center p-10">
      <ContextMenu>
        <ContextMenuTrigger className="flex min-h-36 w-full max-w-72 items-center justify-center rounded-md border border-dashed border-border bg-card px-6 text-center text-sm leading-5 text-foreground">
          Right click this area
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>Navigation</ContextMenuLabel>
            <ContextMenuItem>
              Back
              {showShortcuts && <ContextMenuShortcut>Alt+Left</ContextMenuShortcut>}
            </ContextMenuItem>
            <ContextMenuItem>
              Forward
              {showShortcuts && <ContextMenuShortcut>Alt+Right</ContextMenuShortcut>}
            </ContextMenuItem>
            <ContextMenuItem disabled={disabledReload}>
              Reload
              {showShortcuts && <ContextMenuShortcut>Ctrl+R</ContextMenuShortcut>}
            </ContextMenuItem>
          </ContextMenuGroup>

          <ContextMenuSeparator />

          <ContextMenuSub>
            <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Save page as...</ContextMenuItem>
              <ContextMenuItem>Create shortcut...</ContextMenuItem>
              <ContextMenuItem>Developer tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator />

          <ContextMenuCheckboxItem checked>Show bookmarks bar</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>

          <ContextMenuSeparator />

          <ContextMenuGroup>
            <ContextMenuLabel inset>Density</ContextMenuLabel>
            <ContextMenuRadioGroup value="comfortable">
              <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
              <ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem>
              <ContextMenuRadioItem value="spacious">Spacious</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
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
