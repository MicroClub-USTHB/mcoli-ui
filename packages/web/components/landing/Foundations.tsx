'use client';

import * as React from 'react';

import { Check } from 'lucide-react';

import { useColorTheme } from '@/components/ColorThemeProvider';
import {
  CopyButton,
  Reveal,
  SectionHeader,
  ThemeScope,
  useMounted,
} from '@/components/landing/primitives';
import { THEMES, type ThemeMeta } from '@/components/landing/themes';
import { McAlert } from '@/registry/ui/mc-alert';
import { McAvatar, McAvatarFallback, McAvatarGroup } from '@/registry/ui/mc-avatar';
import { McBadge } from '@/registry/ui/mc-badge';
import { McButton } from '@/registry/ui/mc-button';
import { McInput } from '@/registry/ui/mc-input';
import { McProgress, McProgressTrack } from '@/registry/ui/mc-progress';
import { McSwitch } from '@/registry/ui/mc-switch';
import { McTabs, McTabsList, McTabsTrigger } from '@/registry/ui/mc-tabs';
import { cn } from '@/lib/utils';

// Explicit class strings so Tailwind can see every ramp step at build time.
const RAMPS: { name: string; token: string; steps: string[] }[] = [
  {
    name: 'Baby Blue',
    token: '--baby-blue-*',
    steps: [
      'bg-baby-blue-50',
      'bg-baby-blue-100',
      'bg-baby-blue-200',
      'bg-baby-blue-300',
      'bg-baby-blue-400',
      'bg-baby-blue-500',
      'bg-baby-blue-600',
      'bg-baby-blue-700',
      'bg-baby-blue-800',
      'bg-baby-blue-900',
      'bg-baby-blue-950',
      'bg-baby-blue-1000',
    ],
  },
  {
    name: 'Blue Primary',
    token: '--blue-primary-*',
    steps: [
      'bg-blue-primary-50',
      'bg-blue-primary-100',
      'bg-blue-primary-200',
      'bg-blue-primary-300',
      'bg-blue-primary-400',
      'bg-blue-primary-500',
      'bg-blue-primary-600',
      'bg-blue-primary-700',
      'bg-blue-primary-800',
      'bg-blue-primary-900',
      'bg-blue-primary-950',
    ],
  },
  {
    name: 'Purple Secondary',
    token: '--purple-secondary-*',
    steps: [
      'bg-purple-secondary-50',
      'bg-purple-secondary-100',
      'bg-purple-secondary-200',
      'bg-purple-secondary-300',
      'bg-purple-secondary-400',
      'bg-purple-secondary-500',
      'bg-purple-secondary-600',
      'bg-purple-secondary-700',
      'bg-purple-secondary-800',
      'bg-purple-secondary-900',
      'bg-purple-secondary-950',
    ],
  },
  {
    name: 'Pink',
    token: '--pink-*',
    steps: [
      'bg-pink-50',
      'bg-pink-100',
      'bg-pink-200',
      'bg-pink-300',
      'bg-pink-400',
      'bg-pink-500',
      'bg-pink-600',
      'bg-pink-700',
      'bg-pink-800',
      'bg-pink-900',
      'bg-pink-950',
    ],
  },
  {
    name: 'Cyan',
    token: '--cyan-*',
    steps: [
      'bg-cyan-50',
      'bg-cyan-100',
      'bg-cyan-200',
      'bg-cyan-300',
      'bg-cyan-400',
      'bg-cyan-500',
      'bg-cyan-600',
      'bg-cyan-700',
      'bg-cyan-800',
      'bg-cyan-900',
      'bg-cyan-950',
    ],
  },
  {
    name: 'Gray Blue',
    token: '--gray-blue-*',
    steps: [
      'bg-gray-blue-50',
      'bg-gray-blue-100',
      'bg-gray-blue-200',
      'bg-gray-blue-300',
      'bg-gray-blue-400',
      'bg-gray-blue-500',
      'bg-gray-blue-600',
      'bg-gray-blue-700',
      'bg-gray-blue-800',
      'bg-gray-blue-900',
      'bg-gray-blue-950',
      'bg-gray-blue-1000',
    ],
  },
  {
    name: 'Gray',
    token: '--gray-*',
    steps: [
      'bg-gray-50',
      'bg-gray-100',
      'bg-gray-200',
      'bg-gray-300',
      'bg-gray-400',
      'bg-gray-500',
      'bg-gray-600',
      'bg-gray-700',
      'bg-gray-800',
      'bg-gray-900',
      'bg-gray-950',
      'bg-gray-1000',
    ],
  },
  {
    name: 'Orange',
    token: '--orange-*',
    steps: [
      'bg-orange-50',
      'bg-orange-100',
      'bg-orange-200',
      'bg-orange-300',
      'bg-orange-400',
      'bg-orange-500',
      'bg-orange-600',
    ],
  },
  {
    name: 'Status',
    token: 'green · red · yellow · flashy-green',
    steps: [
      'bg-green-50',
      'bg-green-300',
      'bg-green-400',
      'bg-flashy-green-200',
      'bg-flashy-green-300',
      'bg-red-50',
      'bg-red-100',
      'bg-red-200',
      'bg-yellow-50',
      'bg-yellow-100',
      'bg-yellow-200',
    ],
  },
  {
    name: 'Accents',
    token: '--accent-*-50',
    steps: [
      'bg-accent-blue-50',
      'bg-accent-flash-50',
      'bg-accent-green-50',
      'bg-accent-magenta-50',
      'bg-accent-red-50',
      'bg-it-gradient',
    ],
  },
];

const SEMANTIC = [
  { token: 'background', cls: 'bg-background' },
  { token: 'foreground', cls: 'bg-foreground' },
  { token: 'primary', cls: 'bg-primary' },
  { token: 'secondary', cls: 'bg-secondary' },
  { token: 'accent', cls: 'bg-accent' },
  { token: 'muted', cls: 'bg-muted' },
  { token: 'card', cls: 'bg-card' },
  { token: 'border', cls: 'bg-border' },
  { token: 'success', cls: 'bg-success' },
  { token: 'warning', cls: 'bg-warning' },
  { token: 'destructive', cls: 'bg-destructive' },
  { token: 'info', cls: 'bg-info' },
];

const SEMANTIC_TOKENS = SEMANTIC.map((s) => s.token);

const HEADINGS = [
  { cls: 'header-xl', spec: '72 / 90' },
  { cls: 'header-lg', spec: '60 / 72' },
  { cls: 'header-md', spec: '36 / 44' },
  { cls: 'header-sm', spec: '30 / 38' },
  { cls: 'header-xs', spec: '24 / 32' },
];

const PARAGRAPHS = [
  { cls: 'paragraph-xl', spec: '20 / 30' },
  { cls: 'paragraph-lg', spec: '18 / 28' },
  { cls: 'paragraph-md', spec: '16 / 24' },
  { cls: 'paragraph-sm', spec: '14 / 20' },
  { cls: 'paragraph-xs', spec: '12 / 18' },
];

const SHADOWS = [
  'shadow-xs',
  'shadow-sm',
  'shadow-md',
  'shadow-lg',
  'shadow-xl',
  'shadow-2xl',
  'shadow-3xl',
];
const RADII = ['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl'];
const STROKES = [
  { name: '0.5px', cls: 'border-[0.5px]' },
  { name: '1px', cls: 'border' },
  { name: '1.5px', cls: 'border-[1.5px]' },
  { name: '2px', cls: 'border-2' },
];
const BLURS = [
  { name: 'none', cls: 'backdrop-blur-none' },
  { name: 'sm · 2px', cls: 'backdrop-blur-sm' },
  { name: 'md · 4px', cls: 'backdrop-blur-md' },
  { name: 'lg · 7px', cls: 'backdrop-blur-lg' },
  { name: 'xl · 9px', cls: 'backdrop-blur-xl' },
];

const TABS = [
  { value: 'preview', label: 'Preview' },
  { value: 'color', label: 'Color' },
  { value: 'type', label: 'Typography' },
  { value: 'elevation', label: 'Elevation' },
  { value: 'shape', label: 'Shape' },
  { value: 'blur', label: 'Blur' },
] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-medium text-muted-foreground">{children}</p>;
}

/** Reads resolved token values so swatches show the active theme's real hex. */
function useTokenValues(tokens: readonly string[]) {
  const mounted = useMounted();
  const [values, setValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!mounted) return;
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      setValues(
        Object.fromEntries(tokens.map((t) => [t, style.getPropertyValue(`--${t}`).trim()]))
      );
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    return () => observer.disconnect();
  }, [mounted, tokens]);

  return values;
}

function ColorPanel() {
  const values = useTokenValues(SEMANTIC_TOKENS);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div>
        <Label>Semantic · follows the active theme</Label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
          {SEMANTIC.map((s) => (
            <div
              key={s.token}
              className="overflow-hidden rounded-xl border border-border bg-background"
            >
              <div className={cn('h-14 border-b border-border', s.cls)} />
              <div className="px-2.5 py-2">
                <p className="truncate text-xs font-medium text-foreground">{s.token}</p>
                <p className="truncate font-mono text-[10px] text-muted-foreground uppercase">
                  {values[s.token] || '—'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label>Raw palette · shared by every theme</Label>
        <div className="flex flex-col gap-2.5">
          {RAMPS.map((ramp) => (
            <div key={ramp.name} className="grid grid-cols-[7.5rem_1fr] items-center gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground">{ramp.name}</p>
                <p className="truncate font-mono text-[10px] text-muted-foreground">{ramp.token}</p>
              </div>
              <div className="flex h-8 overflow-hidden rounded-md border border-border">
                {ramp.steps.map((cls) => (
                  <div
                    key={cls}
                    title={cls.replace('bg-', '--')}
                    className={cn('flex-1 transition-transform hover:z-10 hover:scale-y-125', cls)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypePanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div className="flex flex-col gap-3">
        <div className="flex-1 rounded-xl border border-border bg-background p-6">
          <p className="font-plus-jakarta-sans text-7xl font-extrabold text-foreground">Aa</p>
          <p className="mt-4 text-sm font-semibold text-foreground">Plus Jakarta Sans</p>
          <p className="font-mono text-[11px] text-muted-foreground">headings · header-*</p>
        </div>
        <div className="flex-1 rounded-xl border border-border bg-background p-6">
          <p className="font-dm-sans text-7xl font-medium text-foreground">Aa</p>
          <p className="mt-4 text-sm font-semibold text-foreground">DM Sans</p>
          <p className="font-mono text-[11px] text-muted-foreground">body · paragraph-*</p>
        </div>
      </div>
      <div className="min-w-0 space-y-6">
        <div>
          <Label>Headings</Label>
          <div className="divide-y divide-border rounded-xl border border-border bg-background">
            {HEADINGS.map((h) => (
              <div
                key={h.cls}
                className="flex items-center justify-between gap-4 overflow-hidden px-5 py-3"
              >
                <p className={cn(h.cls, 'truncate font-bold text-foreground')}>Join the club</p>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {h.cls} · {h.spec}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label>Paragraphs</Label>
          <div className="divide-y divide-border rounded-xl border border-border bg-background">
            {PARAGRAPHS.map((p) => (
              <div key={p.cls} className="flex items-center justify-between gap-4 px-5 py-2.5">
                <p className={cn(p.cls, 'truncate text-foreground')}>
                  Build, ship and learn with MicroClub.
                </p>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {p.cls} · {p.spec}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ElevationPanel() {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-xl bg-muted/50 p-6 sm:grid-cols-4 lg:grid-cols-7 md:p-10">
      {SHADOWS.map((s) => (
        <div key={s} className="flex flex-col items-center gap-3">
          <div
            className={cn(
              'flex aspect-square w-full max-w-24 items-center justify-center rounded-xl border border-border/50 bg-background',
              s
            )}
          >
            <span className="text-xs font-bold text-foreground">
              {s.replace('shadow-', '').toUpperCase()}
            </span>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">{s}</p>
        </div>
      ))}
    </div>
  );
}

function ShapePanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <Label>Radius · varies by theme</Label>
        <div className="grid grid-cols-5 gap-3">
          {RADII.map((r) => (
            <div
              key={r}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-4"
            >
              <div
                className={cn(
                  'flex size-14 items-center justify-center border border-primary/30 bg-primary/10',
                  r
                )}
              >
                <div className={cn('size-7 bg-primary', r)} />
              </div>
              <p className="font-mono text-[10px] text-muted-foreground">
                {r.replace('rounded-', '')}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label>Stroke</Label>
        <div className="grid grid-cols-4 gap-3">
          {STROKES.map((s) => (
            <div
              key={s.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-4"
            >
              <div
                className={cn(
                  'flex size-14 items-center justify-center rounded-xl border-foreground/80',
                  s.cls
                )}
              >
                <div className={cn('size-7 rounded-md border-primary/60 bg-primary/5', s.cls)} />
              </div>
              <p className="font-mono text-[10px] text-muted-foreground">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlurPanel() {
  return (
    <div className="relative flex min-h-[20rem] items-center overflow-hidden rounded-xl border border-border bg-background p-4 sm:p-8">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div
        aria-hidden
        className="absolute top-1/2 left-[8%] size-48 -translate-y-1/2 rounded-full bg-primary sm:size-64"
      />
      <div
        aria-hidden
        className="absolute top-1/2 right-[8%] size-44 -translate-y-1/2 rotate-12 rounded-3xl bg-chart-3 sm:size-60"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-0 h-14 w-full -translate-y-1/2 -rotate-3 bg-chart-1"
      />
      <div className="relative grid w-full grid-cols-2 gap-3 md:grid-cols-5">
        {BLURS.map((b) => (
          <div
            key={b.name}
            className={cn(
              'flex h-36 flex-col items-center justify-end rounded-xl border border-border/60 bg-background/30 p-3 shadow-xl backdrop-saturate-150',
              b.cls
            )}
          >
            <span className="rounded-md bg-background/85 px-2 py-1 font-mono text-[10px] text-foreground">
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------- */
/* Theme picker: each option renders in its own theme, so all five identities sit side by side  */
/* -------------------------------------------------------------------------------------------- */

const SWATCHES = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-muted', 'bg-foreground'] as const;

function ThemeOption({
  theme,
  active,
  onSelect,
}: {
  theme: ThemeMeta;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className="group w-[13.5rem] shrink-0 snap-start rounded-2xl text-start focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:w-auto"
    >
      <ThemeScope
        theme={theme.value}
        className={cn(
          'flex h-full flex-col gap-3 rounded-2xl border p-4 transition-all duration-300',
          active
            ? 'border-primary shadow-lg ring-4 ring-ring/40'
            : 'border-border shadow-xs group-hover:-translate-y-0.5 group-hover:shadow-md'
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-plus-jakarta-sans text-base font-bold text-foreground">
              {theme.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">{theme.description}</p>
          </div>
          {active ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
              <Check className="size-3" /> Active
            </span>
          ) : null}
        </div>
        <div className="flex gap-1" aria-hidden>
          {SWATCHES.map((cls) => (
            <span key={cls} className={cn('h-5 flex-1 rounded-sm border border-border', cls)} />
          ))}
        </div>
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            Join
          </span>
          <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            Later
          </span>
        </div>
      </ThemeScope>
    </button>
  );
}

/* -------------------------------------------------------------------------------------------- */
/* Preview tab: a composed screen in the active theme                                           */
/* -------------------------------------------------------------------------------------------- */

function PreviewPanel() {
  const [notify, setNotify] = React.useState(true);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-plus-jakarta-sans text-lg font-bold text-foreground">
              Join the workshop
            </p>
            <p className="text-sm text-muted-foreground">Intro to design systems · Saturday</p>
          </div>
          <McBadge>Free</McBadge>
        </div>
        <McInput label="Email" type="email" placeholder="you@microclub.info" />
        <label className="flex items-center justify-between gap-3 text-sm text-foreground">
          Remind me the day before
          <McSwitch checked={notify} onCheckedChange={(v) => setNotify(Boolean(v))} />
        </label>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Seats filled</span>
            <span className="font-medium text-foreground">72%</span>
          </div>
          <McProgress value={72} size="xs">
            <McProgressTrack className="rounded-full" />
          </McProgress>
        </div>
        <div className="flex gap-2">
          <McButton className="flex-1">Reserve a seat</McButton>
          <McButton variant="secondary">Details</McButton>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <McAlert
          variant="success"
          title="Seat reserved"
          description="We sent the details to your inbox."
          className="w-full max-w-none"
        />
        <McAlert
          variant="default"
          title="Bring a laptop"
          description="We will build a themed UI together, from scratch."
          className="w-full max-w-none"
        />
        <div className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-border bg-background p-5">
          <div>
            <p className="text-sm font-semibold text-foreground">48 attending</p>
            <p className="text-xs text-muted-foreground">Across the club</p>
          </div>
          <McAvatarGroup>
            {['YB', 'RK', 'LM', 'AH'].map((i) => (
              <McAvatar key={i}>
                <McAvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                  {i}
                </McAvatarFallback>
              </McAvatar>
            ))}
          </McAvatarGroup>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------- */
/* Section                                                                                      */
/* -------------------------------------------------------------------------------------------- */

export function ThemesAndFoundations() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const mounted = useMounted();
  const [tab, setTab] = React.useState<string>('preview');
  const active = mounted ? colorTheme : 'primary';

  return (
    <section
      id="themes"
      className="relative scroll-mt-16 border-y border-border bg-muted/30 py-20 md:py-24"
    >
      <div aria-hidden className="absolute inset-0 bg-dots opacity-40 mask-fade-x" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Themes & foundations"
          title="Five themes. One design system."
          description="Pick a theme to re-skin this page. Every token below, from color and type to elevation and blur, follows it in light and dark."
        />

        <Reveal delay={80}>
          <div
            role="group"
            aria-label="Theme"
            className="-mx-4 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-1 pb-4 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
          >
            {THEMES.map((t) => (
              <ThemeOption
                key={t.value}
                theme={t}
                active={active === t.value}
                onSelect={() => setColorTheme(t.value)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
              <McTabs value={tab} onValueChange={(v) => setTab(String(v))}>
                <div className="max-w-full overflow-x-auto">
                  <McTabsList>
                    {TABS.map((t) => (
                      <McTabsTrigger key={t.value} value={t.value} className="px-3">
                        {t.label}
                      </McTabsTrigger>
                    ))}
                  </McTabsList>
                </div>
              </McTabs>
              <div className="flex items-center gap-1 rounded-lg border border-border bg-background py-1 ps-3 pe-1">
                <code className="font-mono text-xs text-muted-foreground">
                  init <span className="font-semibold text-primary">{active}</span>
                </code>
                <CopyButton value={`npx mcoli-ui@latest init ${active}`} className="size-7" />
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div key={tab} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                {tab === 'preview' && <PreviewPanel />}
                {tab === 'color' && <ColorPanel />}
                {tab === 'type' && <TypePanel />}
                {tab === 'elevation' && <ElevationPanel />}
                {tab === 'shape' && <ShapePanel />}
                {tab === 'blur' && <BlurPanel />}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
