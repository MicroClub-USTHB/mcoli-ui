'use client';

import * as React from 'react';

import { useColorTheme } from '@/components/ColorThemeProvider';
import { CopyButton, useMounted } from '@/components/landing/primitives';
import { THEMES } from '@/components/landing/themes';
import { cn } from '@/lib/utils';

const RUNNERS = [
  { label: 'npm', bin: 'npx' },
  { label: 'pnpm', bin: 'pnpm dlx' },
  { label: 'bun', bin: 'bunx' },
  { label: 'yarn', bin: 'yarn dlx' },
] as const;

export function InstallCommand({
  className,
  showThemes = true,
}: {
  className?: string;
  showThemes?: boolean;
}) {
  const { colorTheme, setColorTheme } = useColorTheme();
  const mounted = useMounted();
  const [runner, setRunner] = React.useState<(typeof RUNNERS)[number]>(RUNNERS[0]);

  const theme = mounted ? colorTheme : 'primary';
  const command = `${runner.bin} mcoli-ui@latest init ${theme}`;

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-border bg-card/80 text-left shadow-xl backdrop-blur-xl',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <div role="tablist" aria-label="Package manager" className="flex items-center gap-0.5">
          {RUNNERS.map((r) => (
            <button
              key={r.label}
              type="button"
              role="tab"
              aria-selected={runner.label === r.label}
              onClick={() => setRunner(r)}
              className={cn(
                'rounded-md px-2.5 py-1 font-mono text-xs transition-colors',
                runner.label === r.label
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 pr-1" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <code className="min-w-0 truncate font-mono text-sm">
          <span className="text-muted-foreground select-none">$ </span>
          <span className="text-foreground">
            {runner.bin} mcoli-ui<span className="hidden sm:inline">@latest</span>{' '}
          </span>
          <span className="text-muted-foreground">init </span>
          <span className="font-semibold text-primary">{theme}</span>
        </code>
        <CopyButton value={command} />
      </div>

      {showThemes ? (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-border bg-muted/40 px-3 py-2.5">
          <span className="mr-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Theme
          </span>
          {THEMES.map((t) => {
            const active = theme === t.value;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={active}
                onClick={() => setColorTheme(t.value)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all',
                  active
                    ? 'border-primary/40 bg-background text-foreground shadow-sm'
                    : 'border-transparent text-muted-foreground hover:bg-background/70 hover:text-foreground'
                )}
              >
                <span
                  className="size-2.5 rounded-full ring-1 ring-border"
                  style={{
                    background: `linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)`,
                  }}
                  aria-hidden
                />
                {t.name}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
