'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  CalendarDays,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Trophy,
  TrendingUp,
  Users,
} from 'lucide-react';

import { McAvatar, McAvatarFallback, McAvatarGroup } from '@/registry/ui/mc-avatar';
import { McBadge } from '@/registry/ui/mc-badge';
import { McButton } from '@/registry/ui/mc-button';
import { McCard } from '@/registry/ui/mc-card';
import { McProgress, McProgressCircle, McProgressTrack } from '@/registry/ui/mc-progress';
import { McSwitch } from '@/registry/ui/mc-switch';
import { cn } from '@/lib/utils';

// react-day-picker is ~22 KiB and this card is decorative (hidden on mobile), so it loads after
// first paint. The placeholder matches the rendered calendar's size to avoid layout shift.
const McCalendar = dynamic(() => import('@/registry/ui/mc-calendar').then((m) => m.McCalendar), {
  ssr: false,
  loading: () => <div aria-hidden className="h-[318px] w-[262px]" />,
});

const NAV = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: CalendarDays, label: 'Events' },
  { icon: Users, label: 'Members' },
  { icon: Trophy, label: 'Hackathons' },
  { icon: Settings, label: 'Settings' },
];

const REGISTRATIONS = [
  { name: 'Yasmine B.', team: 'Null Pointers', status: 'Confirmed' },
  { name: 'Rayan K.', team: 'Bit Flippers', status: 'Pending' },
  { name: 'Lina M.', team: 'Stack Smash', status: 'Confirmed' },
  { name: 'Anis H.', team: 'Kernel Panic', status: 'Waitlist' },
];

function initials(name: string) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
}

function Stat({
  label,
  value,
  delta,
  progress,
}: {
  label: string;
  value: string;
  delta: string;
  progress: number;
}) {
  return (
    <McCard className="gap-3 rounded-xl p-4 shadow-xs">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <span className="font-plus-jakarta-sans text-2xl font-bold text-foreground">{value}</span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
          <TrendingUp className="size-3" />
          {delta}
        </span>
      </div>
      <McProgress value={progress} size="xs" aria-label={label}>
        <McProgressTrack className="rounded-full" />
      </McProgress>
    </McCard>
  );
}

export function AppPreview() {
  const [date, setDate] = React.useState<Date | undefined>(() => new Date());
  const [open, setOpen] = React.useState(true);

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Halo behind the window */}
      <div
        aria-hidden
        className="absolute inset-x-10 -top-6 bottom-10 -z-10 rounded-[2rem] bg-primary/20 blur-3xl"
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-3xl ring-1 ring-foreground/5">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-warning/70" />
            <span className="size-3 rounded-full bg-success/70" />
          </div>
          <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 font-mono text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" aria-hidden />
            events.microclub.info
          </div>
          <div className="w-12" aria-hidden />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-border bg-sidebar p-3 md:flex">
            <div className="mb-3 flex items-center gap-2 px-2 py-1">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary font-plus-jakarta-sans text-xs font-bold text-primary-foreground">
                MC
              </span>
              <span className="text-sm font-semibold text-sidebar-foreground">MicroClub</span>
            </div>
            {NAV.map((item) => (
              <span
                key={item.label}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm',
                  item.active
                    ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </span>
            ))}
            <div className="mt-auto rounded-xl border border-sidebar-border bg-background p-3">
              <p className="text-xs font-semibold text-foreground">Storage</p>
              <p className="mb-2 text-[11px] text-muted-foreground">6.2 of 10 GB used</p>
              <McProgress value={62} size="xs" aria-label="Storage used">
                <McProgressTrack className="rounded-full" />
              </McProgress>
            </div>
          </aside>

          {/* Main */}
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <p className="font-plus-jakarta-sans text-lg font-bold text-foreground sm:text-xl">
                    Hackathon 2026
                  </p>
                  <McBadge variant="secondary">Live</McBadge>
                </div>
                <p className="text-sm text-muted-foreground">USTHB · 48h · 62 teams competing</p>
              </div>
              <div className="flex items-center gap-2">
                <McButton variant="secondary" size="sm" icon="only" iconDefinition={<Search />}>
                  Search
                </McButton>
                <McButton size="sm" icon="leading" iconDefinition={<Plus />}>
                  New event
                </McButton>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Registrations" value="248" delta="+12%" progress={82} />
              <Stat label="Teams formed" value="62" delta="+8" progress={64} />
              <McCard
                direction="row"
                className="hidden items-center gap-4 rounded-xl p-4 shadow-xs sm:flex"
              >
                <McProgress value={74} size="sm" aria-label="Check-ins">
                  <McProgressCircle showValue />
                </McProgress>
                <div className="min-w-0 space-y-0.5 whitespace-nowrap">
                  <p className="text-xs font-medium text-muted-foreground">Check-ins</p>
                  <p className="text-sm font-semibold text-foreground">184 / 248</p>
                </div>
              </McCard>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
              <McCard className="gap-0 rounded-xl p-0 shadow-xs">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">Latest registrations</p>
                  <McAvatarGroup>
                    {REGISTRATIONS.slice(0, 3).map((r) => (
                      <McAvatar key={r.name} size="xs">
                        <McAvatarFallback className="bg-secondary text-[10px] text-secondary-foreground">
                          {initials(r.name)}
                        </McAvatarFallback>
                      </McAvatar>
                    ))}
                  </McAvatarGroup>
                </div>
                <ul className="divide-y divide-border">
                  {REGISTRATIONS.map((r) => (
                    <li key={r.name} className="flex items-center gap-3 px-4 py-2.5">
                      <McAvatar size="sm">
                        <McAvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                          {initials(r.name)}
                        </McAvatarFallback>
                      </McAvatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{r.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{r.team}</p>
                      </div>
                      <McBadge
                        variant={
                          r.status === 'Confirmed'
                            ? 'default'
                            : r.status === 'Pending'
                              ? 'outline'
                              : 'secondary'
                        }
                      >
                        {r.status}
                      </McBadge>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Registrations open</p>
                    <p className="text-xs text-muted-foreground">Closes when 64 teams are in.</p>
                  </div>
                  <McSwitch
                    aria-label="Registrations open"
                    checked={open}
                    onCheckedChange={(v) => setOpen(Boolean(v))}
                  />
                </div>
              </McCard>

              <McCard className="hidden w-fit gap-0 rounded-xl p-2 shadow-xs sm:flex">
                <McCalendar mode="single" selected={date} onSelect={setDate} />
              </McCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
