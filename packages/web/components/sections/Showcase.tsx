'use client';

import * as React from 'react';

import { McButton } from '@/components/ui/mc-button';
import { McCard } from '@/registry/ui/mc-card';
import { McInput, McInputButton } from '@/registry/ui/mc-input';
import { McSwitch } from '@/registry/ui/mc-switch';
import {
  McAvatar,
  McAvatarImage,
  McAvatarFallback,
  McAvatarGroup,
  McAvatarGroupCount,
  McAvatarBadge,
} from '@/registry/ui/mc-avatar';
import { McAlert } from '@/registry/ui/mc-alert';
import { McBadge } from '@/registry/ui/mc-badge';
import { McTabs, McTabsList, McTabsTrigger } from '@/registry/ui/mc-tabs';
import {
  McSelect,
  McSelectContent,
  McSelectGroup,
  McSelectItem,
  McSelectTrigger,
  McSelectValue,
} from '@/registry/ui/mc-select';
import McSonner, { toast } from '@/registry/ui/mc-sonner';

const tabs = [
  { value: 'form', label: 'Form' },
  { value: 'feedback', label: 'Feedback' },
] as const;

const TEAM = [
  { value: 'olivia', name: 'Olivia Rhye', handle: '@olivia', color: '#FDE68A' },
  { value: 'phoenix', name: 'Phoenix Baker', handle: '@phoenix', color: '#BFDBFE' },
  { value: 'lana', name: 'Lana Steiner', handle: '@lana', color: '#DDD6FE' },
  { value: 'demi', name: 'Demi Wilkinson', handle: '@demi', color: '#FBCFE8' },
];

function MiniAvatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden
      className="flex size-5 items-center justify-center rounded-full text-[10px] font-semibold text-slate-700"
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

function DemoCard({
  token,
  title,
  desc,
  wide,
  className,
  children,
}: {
  token: string;
  title: string;
  desc?: string;
  wide?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <McCard
      className={`rounded-2xl shadow-sm flex flex-col gap-4 overflow-hidden p-6 ${
        wide ? 'md:col-span-2' : ''
      } ${className ?? ''}`}
    >
      <div className="flex items-center justify-between border-b border-border/50 pb-2">
        <h3 className="header-xs font-semibold text-foreground">{title}</h3>
        <span className="text-[10px] font-mono text-muted-foreground">{token}</span>
      </div>
      {desc ? <p className="text-xs text-muted-foreground">{desc}</p> : null}
      {children}
    </McCard>
  );
}

function Showcase() {
  const [tab, setTab] = React.useState<string>('form');
  const [notify, setNotify] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [member, setMember] = React.useState<string | null>(null);

  const selectedMember = TEAM.find((m) => m.value === member) ?? null;

  return (
    <section className="w-full max-w-[1200px] mx-auto space-y-8 sm:space-y-10 px-4">
      {/* Section header */}
      <div className="space-y-2 text-center sm:text-left mb-6">
        <h2 className="header-sm md:header-md font-bold text-foreground">Showcase</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Interactive previews of some mcoli-ui primitive, themed and ready to ship.
        </p>
      </div>

      {/* Category tabs */}
      <McTabs value={tab} onValueChange={(value) => setTab(String(value))}>
        <div className="flex justify-center">
          <McTabsList className="flex-wrap justify-center">
            {tabs.map((t) => (
              <McTabsTrigger key={t.value} value={t.value}>
                {t.label}
              </McTabsTrigger>
            ))}
          </McTabsList>
        </div>
      </McTabs>

      {/* PANELS */}
      <div className="min-h-[440px]">
        {tab === 'form' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DemoCard
              token="mc-input"
              title="Text fields"
              desc="Labels, addons and inline validation."
            >
              <div className="flex flex-col gap-4">
                <McInput
                  label="Email address"
                  type="email"
                  placeholder="you@microclub.info"
                  description="We only send updates about new components."
                  addonEnd={
                    <McInputButton variant="attached" className="font-medium">
                      Subscribe
                    </McInputButton>
                  }
                />
                <McInput
                  label="Username"
                  placeholder="adel"
                  error="This username is already taken."
                />
                <McInput
                  label="Password"
                  type={show ? 'text' : 'password'}
                  placeholder="Your secret passphrase"
                  description="At least 8 characters, one symbol."
                  addonEnd={
                    <McInputButton variant="ghost" onClick={() => setShow((s) => !s)}>
                      {show ? 'Hide' : 'Show'}
                    </McInputButton>
                  }
                />
              </div>
            </DemoCard>

            <DemoCard token="mc-button" title="Buttons" desc="Four variants across the size scale.">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-3">
                  <McButton variant="primary" size="md">
                    Primary
                  </McButton>
                  <McButton variant="secondary" size="md">
                    Secondary
                  </McButton>
                  <McButton variant="tertiary" size="md">
                    Tertiary
                  </McButton>
                  <McButton variant="link" size="md">
                    Link
                  </McButton>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <McButton variant="secondary" size="sm">
                    Small
                  </McButton>
                  <McButton variant="primary" size="lg">
                    Large
                  </McButton>
                  <McButton variant="secondary" size="md" isLoading>
                    Saving
                  </McButton>
                </div>
              </div>
            </DemoCard>

            <DemoCard token="mc-switch" title="Toggle" desc="An accessible on and off control.">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-foreground">Push notifications</p>
                  <p className="text-xs text-muted-foreground">Get told when a new theme drops.</p>
                </div>
                <McSwitch
                  checked={notify}
                  onCheckedChange={(checked) => setNotify(Boolean(checked))}
                />
              </div>
            </DemoCard>

            <DemoCard token="mc-select" title="Select" desc="Grouped options with avatar previews.">
              <div className="w-full max-w-xs">
                <McSelect value={member} onValueChange={setMember}>
                  <McSelectTrigger
                    variant="avatar-leading"
                    leadingAvatar={
                      selectedMember ? (
                        <MiniAvatar name={selectedMember.name} color={selectedMember.color} />
                      ) : null
                    }
                  >
                    <McSelectValue placeholder="Assign to a teammate">
                      {selectedMember ? (
                        <span className="font-medium">{selectedMember.name}</span>
                      ) : null}
                    </McSelectValue>
                  </McSelectTrigger>
                  <McSelectContent>
                    <McSelectGroup>
                      {TEAM.map((m) => (
                        <McSelectItem
                          key={m.value}
                          value={m.value}
                          leadingAvatar={<MiniAvatar name={m.name} color={m.color} />}
                          supportingText={m.handle}
                        >
                          {m.name}
                        </McSelectItem>
                      ))}
                    </McSelectGroup>
                  </McSelectContent>
                </McSelect>
              </div>
            </DemoCard>
          </div>
        )}

        {tab === 'feedback' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DemoCard token="mc-alert" title="Alerts" desc="Semantic feedback for every state.">
              <div className="flex flex-col gap-3">
                <McAlert
                  variant="success"
                  title="Deployed successfully"
                  description="mcoli-ui v1.0 is live on the registry."
                />
                <McAlert
                  variant="default"
                  title="Heads up"
                  description="A new theme engine is in preview."
                />
                <McAlert
                  variant="destructive"
                  title="Subscription failed"
                  description="We couldn't process your payment method."
                />
              </div>
            </DemoCard>

            <DemoCard
              token="mc-sonner"
              title="Toasts"
              desc="Transient notifications with optional actions."
            >
              <div className="flex flex-wrap gap-3">
                <McButton variant="secondary" size="sm" onClick={() => toast('Event created')}>
                  Simple
                </McButton>
                <McButton
                  variant="secondary"
                  size="sm"
                  onClick={() => toast.success('Saved', { description: 'Your changes are live.' })}
                >
                  Success
                </McButton>
                <McButton
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    toast.warning('Low storage', { description: 'You are almost out of space.' })
                  }
                >
                  Warning
                </McButton>
                <McButton
                  variant="secondary"
                  size="sm"
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
            </DemoCard>

            <DemoCard token="mc-avatar" title="Avatars" desc="Groups, fallbacks and live status.">
              <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
                <McAvatar>
                  <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
                  <McAvatarFallback>CN</McAvatarFallback>
                </McAvatar>
                <McAvatar>
                  <McAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                  <McAvatarFallback>ER</McAvatarFallback>
                  <McAvatarBadge className="bg-green-600 dark:bg-green-800" />
                </McAvatar>
                <McAvatarGroup className="grayscale">
                  <McAvatar>
                    <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
                    <McAvatarFallback>CN</McAvatarFallback>
                  </McAvatar>
                  <McAvatar>
                    <McAvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                    <McAvatarFallback>LR</McAvatarFallback>
                  </McAvatar>
                  <McAvatar>
                    <McAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                    <McAvatarFallback>ER</McAvatarFallback>
                  </McAvatar>
                  <McAvatarGroupCount>+3</McAvatarGroupCount>
                </McAvatarGroup>
              </div>
            </DemoCard>

            <DemoCard token="mc-badge" title="Badges" desc="Status, counts and labels.">
              <div className="flex flex-wrap gap-2 content-start">
                <McBadge variant="default" size="md">
                  Primary
                </McBadge>
                <McBadge variant="secondary" size="md">
                  Secondary
                </McBadge>
                <McBadge variant="ghost" size="md">
                  Ghost
                </McBadge>
                <McBadge variant="outline" size="md">
                  Outline
                </McBadge>
                <McBadge variant="destructive" size="md">
                  Destructive
                </McBadge>
              </div>
            </DemoCard>
          </div>
        )}
      </div>

      <McSonner />
    </section>
  );
}

export { Showcase };
