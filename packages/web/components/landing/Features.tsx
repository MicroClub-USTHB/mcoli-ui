'use client';

import * as React from 'react';
import { Check, ChevronRight, FileCode2, Folder } from 'lucide-react';

import { Reveal, SectionHeader } from '@/components/landing/primitives';
import { McButton } from '@/registry/ui/mc-button';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------- */
/* Tile shell                                                                                   */
/* -------------------------------------------------------------------------------------------- */

function BentoTile({
  title,
  body,
  visual,
  className,
  visualClassName,
}: {
  title: string;
  body: string;
  visual: React.ReactNode;
  className?: string;
  visualClassName?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Cursor-following glow, written straight to CSS vars to avoid re-renders.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--x', `${e.clientX - rect.left}px`);
    node.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        'group/tile relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl dark:shadow-[inset_0_-24px_80px_-24px_rgb(255_255_255/0.07)]',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)',
        }}
      />
      <div
        className={cn(
          'relative min-h-52 flex-1 overflow-hidden transition-transform duration-500 ease-out group-hover/tile:-translate-y-1',
          visualClassName
        )}
      >
        {visual}
      </div>
      <div className="relative px-6 pt-2 pb-6">
        <h3 className="font-plus-jakarta-sans text-lg font-bold text-card-foreground">{title}</h3>
        <p className="mt-1.5 max-w-[46ch] paragraph-sm text-pretty text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------- */
/* 1. You own every line                                                                        */
/* -------------------------------------------------------------------------------------------- */

const FILES = ['mc-avatar.tsx', 'mc-badge.tsx', 'mc-button.tsx', 'mc-card.tsx', 'mc-input.tsx'];

const k = 'text-primary';
const s = 'text-success';
const m = 'text-muted-foreground';

function CodeLine({
  n,
  diff,
  className,
  children,
}: {
  n: number;
  diff?: '+' | '-';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex gap-4 px-4 leading-6',
        className,
        diff === '+' && 'bg-success/10',
        diff === '-' && 'bg-destructive/10'
      )}
    >
      <span className="w-5 shrink-0 text-end text-muted-foreground/60 select-none">{n}</span>
      <span
        className={cn(
          'w-2 shrink-0 select-none',
          diff === '+' && 'text-success',
          diff === '-' && 'text-destructive'
        )}
      >
        {diff}
      </span>
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}

function OwnCodeVisual() {
  return (
    <div className="absolute inset-x-6 top-6 bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-border bg-background shadow-lg">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="ms-2 rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground">
          mc-button.tsx
        </span>
        <span className="ms-auto inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          <span className="size-1.5 rounded-full bg-success" /> Your repo
        </span>
      </div>

      <div className="flex h-full">
        <div className="hidden w-44 shrink-0 border-e border-border p-3 text-xs sm:block">
          <p className="mb-1 flex items-center gap-1.5 text-muted-foreground">
            <Folder className="size-3.5" /> components/ui
          </p>
          <ul className="space-y-0.5 ps-3">
            {FILES.map((f) => (
              <li
                key={f}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-1.5 py-1 font-mono text-[11px]',
                  f === 'mc-button.tsx' ? 'bg-primary/10 text-foreground' : 'text-muted-foreground'
                )}
              >
                <FileCode2 className="size-3 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-3 pb-16 font-mono text-[12px]">
          <CodeLine n={10}>
            <span className={k}>const</span> buttonVariants = <span className={k}>cva</span>(
          </CodeLine>
          <CodeLine n={11} diff="-">
            {'  '}
            <span className={s}>&apos;inline-flex items-center rounded-lg&apos;</span>,
          </CodeLine>
          <CodeLine n={11} diff="+">
            {'  '}
            <span className={s}>&apos;inline-flex items-center rounded-full&apos;</span>,
          </CodeLine>
          <CodeLine n={12}>
            {'  '}
            {'{'} variants: {'{'}
          </CodeLine>
          <CodeLine n={13}>
            {'    '}variant: {'{'}
          </CodeLine>
          <CodeLine n={14}>
            {'      '}primary: <span className={s}>&apos;bg-primary text-primary-…&apos;</span>,
          </CodeLine>
          <CodeLine n={15} className="max-sm:hidden">
            {'      '}secondary: <span className={s}>&apos;bg-secondary …&apos;</span>,
          </CodeLine>
          <CodeLine n={16} className="max-sm:hidden">
            {'      '}tertiary: <span className={s}>&apos;bg-primary-foreground …&apos;</span>,
          </CodeLine>
          <CodeLine n={17} className="max-md:hidden">
            {'    '}
            {'}'},
          </CodeLine>
          <CodeLine n={18} className="max-md:hidden">
            {'    '}size: {'{'}
          </CodeLine>
          <CodeLine n={19} className="max-md:hidden">
            {'      '}sm: <span className={s}>&apos;px-3.5 py-2 text-sm&apos;</span>,
          </CodeLine>
          <CodeLine n={20} className="max-md:hidden">
            {'      '}lg: <span className={s}>&apos;px-[1.125rem] py-2.5 text-base&apos;</span>,
          </CodeLine>
          <CodeLine n={21} className="max-md:hidden">
            <span className={m}>{'      // add your own, it is your file'}</span>
          </CodeLine>

          <div className="mx-4 mt-auto rounded-xl border border-dashed border-border bg-muted/40 p-4 font-dm-sans">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Preview</p>
            <div className="flex flex-wrap items-center gap-3">
              <McButton size="sm" className="rounded-full">
                Join the club
              </McButton>
              <McButton size="sm" variant="secondary" className="rounded-full">
                Learn more
              </McButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------- */
/* 2. Accessible by default                                                                     */
/* -------------------------------------------------------------------------------------------- */

const KEYS = ['Tab', '↑', '↓', '↵', 'Esc'];
const MENU = ['Profile', 'Team settings', 'Sign out'];

function A11yVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-6 pt-6">
      <div className="flex gap-1.5" aria-hidden>
        {KEYS.map((key) => (
          <kbd
            key={key}
            className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-border border-b-[3px] bg-background px-2 font-mono text-xs text-foreground"
          >
            {key}
          </kbd>
        ))}
      </div>
      <div
        className="w-full max-w-[13rem] rounded-xl border border-border bg-popover p-1 shadow-lg"
        aria-hidden
      >
        {MENU.map((item, i) => (
          <div
            key={item}
            className={cn(
              'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm',
              i === 1
                ? 'bg-accent text-accent-foreground ring-2 ring-ring ring-offset-1 ring-offset-popover'
                : 'text-popover-foreground'
            )}
          >
            {item}
            {i === 1 ? <ChevronRight className="size-3.5" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------- */
/* 3. Typed variants                                                                            */
/* -------------------------------------------------------------------------------------------- */

const VARIANTS = ['primary', 'secondary', 'tertiary', 'link'];

function TypedVisual() {
  return (
    <div className="flex h-full items-start px-6 pt-8">
      <div className="relative w-full font-mono text-[13px]">
        <div className="rounded-xl border border-border bg-background px-4 py-3 shadow-xs">
          <span className="text-muted-foreground">{'<'}</span>
          <span className="text-primary">McButton</span>{' '}
          <span className="text-foreground">variant</span>
          <span className="text-muted-foreground">=&quot;</span>
          <span className="landing-caret inline-block h-4 w-[7px] translate-y-0.5 bg-foreground" />
        </div>
        <div className="absolute top-full left-24 z-10 mt-1.5 w-48 overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
          {VARIANTS.map((v, i) => (
            <div
              key={v}
              className={cn(
                'flex items-center gap-2 px-2.5 py-1.5',
                i === 0 ? 'bg-primary/10 text-foreground' : 'text-popover-foreground'
              )}
            >
              <span className="flex size-4 items-center justify-center rounded-sm bg-secondary text-[9px] font-bold text-secondary-foreground">
                T
              </span>
              {v}
              {i === 0 ? <Check className="ms-auto size-3.5 text-primary" /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------- */
/* Section                                                                                      */
/* -------------------------------------------------------------------------------------------- */

export function Features() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Why mcoli-ui"
          title="Built like a library. Owned like your own code."
          description="The polish of a design system team, without the lock-in of a dependency."
        />

        <Reveal delay={100}>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[20rem]">
            <BentoTile
              className="md:col-span-4 md:row-span-2"
              visualClassName="min-h-[26rem] md:min-h-[22rem]"
              visual={<OwnCodeVisual />}
              title="You own every line"
              body="Components land in components/ui as plain TSX. Change a class, add a variant, ship it. No wrapper API and no upgrade to wait for."
            />
            <BentoTile
              className="md:col-span-2"
              visual={<A11yVisual />}
              title="Accessible by default"
              body="Built on Base UI primitives, so keyboard support, focus management and ARIA come wired in."
            />
            <BentoTile
              className="md:col-span-2"
              visual={<TypedVisual />}
              title="Typed to the last variant"
              body="Variants are built with class-variance-authority and strict props, so your editor completes every option."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
