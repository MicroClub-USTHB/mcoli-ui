'use client';

import type { ThemeSwitchProps } from 'fumadocs-ui/layouts/shared/slots/theme-switch';

import { ModeToggle } from '@/components/ModeToggle';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { cn } from '@/lib/utils';

/** Replaces Fumadocs' theme switch slot with the landing's palette picker + light/dark switch. */
export function ThemeControls({ className }: ThemeSwitchProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <ThemeSwitcher />
      <ModeToggle />
    </div>
  );
}
