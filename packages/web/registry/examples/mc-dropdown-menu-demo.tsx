'use client';

import { Button } from '@/components/ui/button';
import {
  McDropdownMenu,
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

export default function McDropdownMenuDemo() {
  return (
    <McDropdownMenu>
      <McDropdownMenuTrigger
        render={
          <Button
            className="w-17 h-10 aria-expanded:shadow-[0_0_0_4px_var(--muted)] aria-expanded:text-primary"
            variant="outline"
          >
            Open
          </Button>
        }
      />
      <McDropdownMenuContent className="w-56">
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
  );
}
