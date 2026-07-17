'use client';

import * as React from 'react';
import { Check, Palette } from 'lucide-react';
import { useColorTheme, ThemePalette } from './ColorThemeProvider';

import {
  McDropdownMenu,
  McDropdownMenuContent,
  McDropdownMenuItem,
  McDropdownMenuTrigger,
} from '@/components/ui/mc-dropdown-menu';
import { cn } from '@/lib/utils';

const themes: { name: string; value: ThemePalette; color: string }[] = [
  { name: 'Primary', value: 'primary', color: 'bg-[#0006B1]' },
  { name: 'Secondary', value: 'secondary', color: 'bg-[#6A0DAD]' },
  { name: 'Game Dev', value: 'game-dev', color: 'bg-[#D04F99]' },
  { name: 'Robotics', value: 'robotics', color: 'bg-[#001EFF]' },
  { name: 'IT', value: 'it', color: 'bg-[#25C059]' },
];

export function ThemeSwitcher() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <McDropdownMenu>
      <McDropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0">
        <Palette className="size-4.5" />
        <span className="sr-only">Toggle Color Palette</span>
      </McDropdownMenuTrigger>
      <McDropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
        {themes.map((t) => (
          <McDropdownMenuItem
            key={t.value}
            onClick={() => setColorTheme(t.value)}
            className="flex items-center justify-between cursor-pointer rounded-lg my-0.5"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn('size-3.5 rounded-full shadow-sm border border-border/50', t.color)}
              />
              <span
                className={
                  mounted && colorTheme === t.value
                    ? 'font-semibold'
                    : 'font-medium text-muted-foreground'
                }
              >
                {t.name}
              </span>
            </div>
            {mounted && colorTheme === t.value && <Check className="size-4 text-primary" />}
          </McDropdownMenuItem>
        ))}
      </McDropdownMenuContent>
    </McDropdownMenu>
  );
}
