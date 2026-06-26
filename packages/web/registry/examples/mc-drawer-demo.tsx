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
} from '@/registry/ui/mc-drawer';

// ─── Shared trigger ───────────────────────────────────────────────────────────

function McTrigger({ children = 'Show drawer' }: { children?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <McDrawerTrigger className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        {children}
      </McDrawerTrigger>
    </div>
  );
}

// ─── Shared nav items data ────────────────────────────────────────────────────

const navItems = [
  { label: 'Account', hasArrow: true },
  { label: 'Socials', hasArrow: false },
  { label: 'Settings', hasArrow: true },
  { label: 'Help', hasArrow: true },
  { label: 'Info', hasArrow: true },
];

// ─── 1. Desktop — WITH icons (Icons=True) ────────────────────────────────────
// Items use the shared drawer nav row styles.
// top spacing uses Tailwind scale and nav items sit flush together

export function McMcDrawerDesktopWithIcons() {
  return (
    <McDrawer direction="right">
      <McTrigger>McDrawer — icons</McTrigger>

      <McDrawerContent>
        <McDrawerNav />

        {/* Nav list — top gap from the drawer nav, with items flush together */}
        <div className="flex flex-1 flex-col gap-0 overflow-y-auto px-0 pt-9">
          {/* Dark mode toggle */}
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

// ─── 2. Desktop — WITHOUT icons (Icons=False) ────────────────────────────────

export function McMcDrawerDesktopNoIcons() {
  return (
    <McDrawer direction="right">
      <McTrigger>McDrawer — no icons</McTrigger>

      <McDrawerContent>
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

// ─── 3. Mobile — bottom sheet (Edit profile) ─────────────────────────────────

export function McMcDrawerMobile() {
  return (
    <McDrawer direction="bottom">
      <McTrigger>McDrawer — mobile</McTrigger>

      <McDrawerContent>
        <div className="flex flex-col gap-6 px-4 py-6">
          <McDrawerHeader className="p-0 gap-2">
            <McDrawerTitle>Edit profile</McDrawerTitle>
            <McDrawerDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </McDrawerDescription>
          </McDrawerHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mc-drawer-email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="mc-drawer-email"
                type="email"
                defaultValue="m@example.com"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="mc-drawer-username" className="text-sm font-medium text-foreground">
                Username
              </label>
              <input
                id="mc-drawer-username"
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

// ─── Default export — all three variants side by side ─────────────────────────

export default function McMcDrawerDemo() {
  return (
    <div className="flex min-h-screen w-full flex-wrap items-center justify-center gap-4">
      <McMcDrawerDesktopWithIcons />
      <McMcDrawerDesktopNoIcons />
      <McMcDrawerMobile />
    </div>
  );
}

// ─── Toggle switch helper ─────────────────────────────────────────────────────
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
