'use client';

import { Moon } from 'lucide-react';
import {
  McDrawer,
  McDrawerClose,
  McDrawerContent,
  McDrawerDescription,
  McDrawerHeader,
  McDrawerNav,
  McDrawerNavItem,
  McDrawerTitle,
  McDrawerTrigger,
} from '../ui/mc-drawer';

const navItems = [
  { label: 'Account', hasArrow: true },
  { label: 'Socials', hasArrow: false },
  { label: 'Settings', hasArrow: true },
  { label: 'Help', hasArrow: true },
  { label: 'Info', hasArrow: true },
];

function DesktopWithIcons() {
  return (
    <McDrawer direction="right">
      <McDrawerTrigger className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        Drawer — icons
      </McDrawerTrigger>

      <McDrawerContent>
        <McDrawerTitle className="sr-only">Navigation — icons</McDrawerTitle>
        <McDrawerNav />

        <div className="flex flex-1 flex-col gap-0 overflow-y-auto px-0 pt-9">
          <McDrawerNavItem icon={<Moon size={16} />} rightElement={<ToggleSwitch />}>
            Dark mode
          </McDrawerNavItem>

          {navItems.map(({ label, hasArrow }) => (
            <McDrawerNavItem key={label} icon={<Moon size={16} />} hasArrow={hasArrow}>
              {label}
            </McDrawerNavItem>
          ))}
        </div>
      </McDrawerContent>
    </McDrawer>
  );
}

function DesktopNoIcons() {
  return (
    <McDrawer direction="right">
      <McDrawerTrigger className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        Drawer — no icons
      </McDrawerTrigger>

      <McDrawerContent>
        <McDrawerTitle className="sr-only">Navigation — no icons</McDrawerTitle>
        <McDrawerNav />

        <div className="flex flex-1 flex-col gap-0 overflow-y-auto px-0 pt-9">
          <McDrawerNavItem rightElement={<ToggleSwitch />}>Dark mode</McDrawerNavItem>

          {navItems.map(({ label, hasArrow }) => (
            <McDrawerNavItem key={label} hasArrow={hasArrow}>
              {label}
            </McDrawerNavItem>
          ))}
        </div>
      </McDrawerContent>
    </McDrawer>
  );
}

function MobileSheet() {
  return (
    <McDrawer direction="bottom">
      <McDrawerTrigger className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        Drawer — mobile
      </McDrawerTrigger>

      <McDrawerContent>
        <div className="flex flex-col gap-6 px-4 py-6">
          <McDrawerHeader className="gap-2 p-0">
            <McDrawerTitle>Edit profile</McDrawerTitle>
            <McDrawerDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </McDrawerDescription>
          </McDrawerHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="drawer-email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="drawer-email"
                type="email"
                defaultValue="m@example.com"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="drawer-username" className="text-sm font-medium text-foreground">
                Username
              </label>
              <input
                id="drawer-username"
                type="text"
                defaultValue="m@example.com"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
              />
            </div>
          </div>

          <McDrawerClose className="w-full rounded-lg bg-primary py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            Save changes
          </McDrawerClose>
        </div>
      </McDrawerContent>
    </McDrawer>
  );
}

export default function DrawerDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <DesktopWithIcons />
      <DesktopNoIcons />
      <MobileSheet />
    </div>
  );
}

function ToggleSwitch() {
  return (
    <div
      role="switch"
      aria-checked="false"
      tabIndex={0}
      className="relative h-6 w-10 shrink-0 cursor-pointer rounded-full bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform" />
    </div>
  );
}
