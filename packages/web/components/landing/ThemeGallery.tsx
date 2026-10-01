'use client';

import * as React from 'react';
import { Check, Sparkles } from 'lucide-react';

import { useColorTheme } from '@/components/ColorThemeProvider';
import {
  CopyButton,
  Reveal,
  SectionHeader,
  ThemeScope,
  useMounted,
} from '@/components/landing/primitives';
import { THEMES, type ThemeMeta } from '@/components/landing/themes';
import { McBadge } from '@/registry/ui/mc-badge';
import { McButton } from '@/registry/ui/mc-button';
import { McInput } from '@/registry/ui/mc-input';
import { McProgress, McProgressTrack } from '@/registry/ui/mc-progress';
import { McSwitch } from '@/registry/ui/mc-switch';
import { cn } from '@/lib/utils';

const SWATCHES = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-muted',
  'bg-card',
  'bg-foreground',
] as const;

function ThemeCard({
  theme,
  active,
  onApply,
}: {
  theme: ThemeMeta;
  active: boolean;
  onApply: () => void;
}) {
  const [on, setOn] = React.useState(true);

  return (
    <ThemeScope
      theme={theme.value}
      className={cn(
        'group/theme relative flex w-[15.5rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 lg:w-auto',
        active
          ? 'border-primary shadow-xl ring-4 ring-ring/40'
          : 'border-border hover:-translate-y-1 hover:shadow-lg'
      )}
    >
      <div className="flex items-start justify-between gap-2 p-4 pb-3">
        <div>
          <p className="font-plus-jakarta-sans text-base font-bold text-foreground">{theme.name}</p>
          <p className="text-xs text-muted-foreground">{theme.description}</p>
        </div>
        {active ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
            <Check className="size-3" /> Active
          </span>
        ) : null}
      </div>

      <div className="flex gap-1 px-4" aria-hidden>
        {SWATCHES.map((cls) => (
          <span key={cls} className={cn('h-6 flex-1 rounded-sm border border-border', cls)} />
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-4">
        <div className="flex gap-2">
          <McButton size="sm" className="flex-1">
            Join
          </McButton>
          <McButton size="sm" variant="secondary" className="flex-1">
            Later
          </McButton>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground">Notifications</span>
          <McSwitch size="sm" checked={on} onCheckedChange={(v) => setOn(Boolean(v))} />
        </div>

        <McInput placeholder="you@microclub.info" aria-label="Email" />

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Seats filled</span>
            <span className="font-medium text-foreground">72%</span>
          </div>
          <McProgress value={72} size="xs">
            <McProgressTrack className="rounded-full" />
          </McProgress>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <McBadge>Workshop</McBadge>
          <McBadge variant="outline">48h</McBadge>
        </div>
      </div>

      <div className="flex items-center gap-1 border-t border-border bg-muted/50 py-1.5 pr-1.5 pl-3">
        <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
          init <span className="text-primary">{theme.value}</span>
        </code>
        <CopyButton value={`npx mcoli-ui@latest init ${theme.value}`} className="size-7" />
        <button
          type="button"
          onClick={onApply}
          disabled={active}
          className="rounded-md px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-background disabled:opacity-50"
        >
          {active ? 'Applied' : 'Apply'}
        </button>
      </div>
    </ThemeScope>
  );
}

export function ThemeGallery() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const mounted = useMounted();

  return (
    <section
      id="themes"
      className="relative scroll-mt-16 border-y border-border bg-muted/30 py-24 md:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-dots opacity-40 mask-fade-x" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Themes"
          title="Five departments. One design system."
          description="Every MicroClub department gets its own palette, radius and mood. The markup below is identical in every card. Only data-theme changes."
        />

        <Reveal delay={80} className="mt-6 flex justify-center">
          <code className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs text-muted-foreground shadow-xs">
            <Sparkles className="size-3.5 text-primary" />
            <span>
              {'<html data-theme="'}
              <span className="text-primary">{mounted ? colorTheme : 'primary'}</span>
              {'">'}
            </span>
          </code>
        </Reveal>

        <Reveal delay={160}>
          <div className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {THEMES.map((t) => (
              <ThemeCard
                key={t.value}
                theme={t}
                active={mounted && colorTheme === t.value}
                onApply={() => setColorTheme(t.value)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
