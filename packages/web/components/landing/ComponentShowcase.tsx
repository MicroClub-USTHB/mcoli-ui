'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Reveal, SectionHeader } from '@/components/landing/primitives';
import { McAlert } from '@/registry/ui/mc-alert';
import {
  McAvatar,
  McAvatarBadge,
  McAvatarFallback,
  McAvatarGroup,
  McAvatarGroupCount,
} from '@/registry/ui/mc-avatar';
import { McBadge } from '@/registry/ui/mc-badge';
import { McButton } from '@/registry/ui/mc-button';
import { McInput, McInputButton } from '@/registry/ui/mc-input';
import {
  McInputOtp,
  McInputOtpGroup,
  McInputOtpSeparator,
  McInputOtpSlot,
} from '@/registry/ui/mc-input-otp';
import {
  McSelect,
  McSelectContent,
  McSelectGroup,
  McSelectItem,
  McSelectTrigger,
  McSelectValue,
} from '@/registry/ui/mc-select';
import { McSlider } from '@/registry/ui/mc-slider';
import McSonner, { toast } from '@/registry/ui/mc-sonner';
import { McSwitch } from '@/registry/ui/mc-switch';
import { McTabs, McTabsList, McTabsTrigger } from '@/registry/ui/mc-tabs';
import { cn } from '@/lib/utils';

const TEAM = [
  { value: 'yasmine', name: 'Yasmine Benali', handle: '@yasmine' },
  { value: 'rayan', name: 'Rayan Kaci', handle: '@rayan' },
  { value: 'lina', name: 'Lina Mansouri', handle: '@lina' },
  { value: 'anis', name: 'Anis Hamdi', handle: '@anis' },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
}

function MiniAvatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex size-5 items-center justify-center rounded-full bg-secondary text-[9px] font-semibold text-secondary-foreground"
    >
      {initials(name)}
    </span>
  );
}

function Tile({
  name,
  title,
  className,
  bodyClassName,
  children,
}: {
  name: string;
  title: string;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'group/tile relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-shadow duration-300 hover:shadow-lg',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border/70 px-5 py-3">
        <p className="text-sm font-semibold text-card-foreground">{title}</p>
        <Link
          href={`/docs/components/${name}`}
          className="inline-flex items-center gap-1 rounded-md font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
        >
          {name}
          <ArrowUpRight className="size-3 transition-transform group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5" />
        </Link>
      </div>
      <div className={cn('flex flex-1 flex-col justify-center p-5', bodyClassName)}>{children}</div>
    </div>
  );
}

export function ComponentShowcase() {
  const [member, setMember] = React.useState<string | null>('lina');
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [tab, setTab] = React.useState<string>('members');
  const [otp, setOtp] = React.useState('481');
  const selected = TEAM.find((m) => m.value === member) ?? null;

  return (
    <section id="components" className="relative scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Components"
          title="Real components, not screenshots"
          description="Everything on this page is the actual registry source, the same files the CLI copies into your project. Click around; switch the theme up top."
        />

        <Reveal delay={100}>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            <Tile name="mc-input" title="Sign in" className="lg:col-span-2 lg:row-span-2">
              <div className="flex flex-col gap-4">
                <McInput label="Email" type="email" placeholder="you@microclub.info" />
                <McInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  defaultValue="hackathon2026"
                  addonEnd={
                    <McInputButton variant="ghost" onClick={() => setShowPassword((v) => !v)}>
                      {showPassword ? 'Hide' : 'Show'}
                    </McInputButton>
                  }
                />
                <McInput label="Username" defaultValue="admin" error="This username is taken." />
                <label className="flex items-center justify-between gap-3 text-sm text-foreground">
                  Keep me signed in
                  <McSwitch checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                </label>
                <McButton className="w-full" onClick={() => toast.success('Welcome back!')}>
                  Sign in
                </McButton>
              </div>
            </Tile>

            <Tile name="mc-input-otp" title="Verify your email" className="lg:col-span-2">
              <p className="mb-4 text-sm text-muted-foreground">Enter the 6-digit code we sent.</p>
              <McInputOtp maxLength={6} value={otp} onChange={setOtp}>
                <McInputOtpGroup>
                  <McInputOtpSlot index={0} />
                  <McInputOtpSlot index={1} />
                  <McInputOtpSlot index={2} />
                </McInputOtpGroup>
                <McInputOtpSeparator />
                <McInputOtpGroup>
                  <McInputOtpSlot index={3} />
                  <McInputOtpSlot index={4} />
                  <McInputOtpSlot index={5} />
                </McInputOtpGroup>
              </McInputOtp>
            </Tile>

            <Tile name="mc-sonner" title="Toasts" className="lg:col-span-2">
              <p className="mb-4 text-sm text-muted-foreground">Fire one off.</p>
              <div className="flex flex-wrap gap-2">
                <McButton
                  size="sm"
                  variant="secondary"
                  onClick={() => toast.success('Saved', { description: 'Your changes are live.' })}
                >
                  Success
                </McButton>
                <McButton
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    toast.warning('Seats running low', { description: '4 spots left.' })
                  }
                >
                  Warning
                </McButton>
                <McButton
                  size="sm"
                  variant="secondary"
                  destructive
                  onClick={() =>
                    toast.error('Upload failed', {
                      description: 'Please try again.',
                      action: { label: 'Retry', onClick: () => {} },
                    })
                  }
                >
                  Error
                </McButton>
              </div>
            </Tile>

            <Tile name="mc-select" title="Assign a mentor" className="lg:col-span-2">
              <McSelect value={member} onValueChange={setMember}>
                <McSelectTrigger
                  variant="avatar-leading"
                  leadingAvatar={selected ? <MiniAvatar name={selected.name} /> : null}
                >
                  <McSelectValue placeholder="Pick a teammate">
                    {selected ? <span className="font-medium">{selected.name}</span> : null}
                  </McSelectValue>
                </McSelectTrigger>
                <McSelectContent>
                  <McSelectGroup>
                    {TEAM.map((m) => (
                      <McSelectItem
                        key={m.value}
                        value={m.value}
                        leadingAvatar={<MiniAvatar name={m.name} />}
                        supportingText={m.handle}
                      >
                        {m.name}
                      </McSelectItem>
                    ))}
                  </McSelectGroup>
                </McSelectContent>
              </McSelect>
            </Tile>

            <Tile name="mc-slider" title="Team size" className="lg:col-span-2" bodyClassName="pt-2">
              <McSlider defaultValue={[4]} min={1} max={6} step={1} unity="members" border />
            </Tile>

            <Tile name="mc-alert" title="Alerts" className="lg:col-span-3">
              <div className="flex flex-col gap-3 [&>*]:w-full [&>*]:max-w-none">
                <McAlert
                  variant="success"
                  title="Registration confirmed"
                  description="Your team is in. See you at the opening ceremony."
                />
                <McAlert
                  variant="destructive"
                  title="Submission closed"
                  description="The deadline passed at 23:59. Contact the jury for an extension."
                />
              </div>
            </Tile>

            <Tile
              name="mc-tabs"
              title="Team"
              className="lg:col-span-3"
              bodyClassName="justify-start"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <McTabs value={tab} onValueChange={(v) => setTab(String(v))}>
                    <McTabsList>
                      <McTabsTrigger value="members">Members</McTabsTrigger>
                      <McTabsTrigger value="mentors">Mentors</McTabsTrigger>
                    </McTabsList>
                  </McTabs>
                  <McAvatarGroup>
                    {TEAM.slice(0, 3).map((m) => (
                      <McAvatar key={m.value}>
                        <McAvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                          {initials(m.name)}
                        </McAvatarFallback>
                      </McAvatar>
                    ))}
                    <McAvatarGroupCount className="text-xs">+28</McAvatarGroupCount>
                  </McAvatarGroup>
                </div>
                <ul className="flex flex-col gap-3">
                  {(tab === 'members' ? TEAM.slice(0, 3) : TEAM.slice(2)).map((m, i) => (
                    <li key={m.value} className="flex items-center gap-3">
                      <McAvatar size="md">
                        <McAvatarFallback className="bg-secondary text-sm font-semibold text-secondary-foreground">
                          {initials(m.name)}
                        </McAvatarFallback>
                        {i === 0 ? <McAvatarBadge className="bg-success" /> : null}
                      </McAvatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{m.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{m.handle}</p>
                      </div>
                      <McBadge variant={tab === 'mentors' ? 'default' : 'outline'}>
                        {tab === 'mentors' ? 'Mentor' : i === 0 ? 'Lead' : 'Member'}
                      </McBadge>
                    </li>
                  ))}
                </ul>
              </div>
            </Tile>
          </div>
        </Reveal>
      </div>
      <McSonner />
    </section>
  );
}
