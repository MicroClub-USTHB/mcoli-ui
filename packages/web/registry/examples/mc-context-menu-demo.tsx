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

export default function McContextMenuDemo() {
  return (
    <McContextMenu>
      <McContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-lg border border-dashed border-border bg-card text-sm text-muted-foreground">
        Right click here
      </McContextMenuTrigger>
      <McContextMenuContent className="w-56">
        <McContextMenuGroup>
          <McContextMenuLabel>Actions</McContextMenuLabel>
          <McContextMenuItem>
            Back
            <McContextMenuShortcut>Alt+Left</McContextMenuShortcut>
          </McContextMenuItem>
          <McContextMenuItem>
            Forward
            <McContextMenuShortcut>Alt+Right</McContextMenuShortcut>
          </McContextMenuItem>
          <McContextMenuItem disabled>Reload</McContextMenuItem>
        </McContextMenuGroup>
        <McContextMenuSub>
          <McContextMenuSubTrigger>More tools</McContextMenuSubTrigger>
          <McContextMenuSubContent>
            <McContextMenuItem>Save page as...</McContextMenuItem>
            <McContextMenuItem>Create shortcut...</McContextMenuItem>
            <McContextMenuItem>Inspect</McContextMenuItem>
          </McContextMenuSubContent>
        </McContextMenuSub>
        <McContextMenuSeparator />
        <McContextMenuCheckboxItem checked>Show bookmarks</McContextMenuCheckboxItem>
        <McContextMenuCheckboxItem>Show full URLs</McContextMenuCheckboxItem>
        <McContextMenuSeparator />
        <McContextMenuGroup>
          <McContextMenuLabel inset>Density</McContextMenuLabel>
          <McContextMenuRadioGroup value="comfortable">
            <McContextMenuRadioItem value="compact">Compact</McContextMenuRadioItem>
            <McContextMenuRadioItem value="comfortable">Comfortable</McContextMenuRadioItem>
          </McContextMenuRadioGroup>
        </McContextMenuGroup>
      </McContextMenuContent>
    </McContextMenu>
  );
}
