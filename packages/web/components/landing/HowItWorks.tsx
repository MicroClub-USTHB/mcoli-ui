'use client';

import * as React from 'react';
import { FileCode2, FilePlus2, Terminal } from 'lucide-react';

import { useColorTheme } from '@/components/ColorThemeProvider';
import { CopyButton, Reveal, SectionHeader, useMounted } from '@/components/landing/primitives';
import { THEMES } from '@/components/landing/themes';
import { cn } from '@/lib/utils';

type Line = { kind: 'ok' | 'info' | 'muted'; text: string };

interface Step {
  title: string;
  description: string;
  command: string;
  output: Line[];
  files: { path: string; note: string; added?: boolean }[];
}

function getSteps(themeValue: string, themeName: string): Step[] {
  return [
    {
      title: 'Bring shadcn/ui',
      description: 'mcoli-ui rides on the shadcn CLI. Already set up? Skip straight to step two.',
      command: 'npx shadcn@latest init',
      output: [
        { kind: 'ok', text: 'Preflight checks.' },
        { kind: 'ok', text: 'Writing components.json.' },
        { kind: 'ok', text: 'Project initialization completed.' },
      ],
      files: [{ path: 'components.json', note: 'registry config', added: true }],
    },
    {
      title: 'Install the design system',
      description:
        'One command writes the palette for light and dark, the type scale, radii, shadows and both brand fonts.',
      command: `npx mcoli-ui@latest init ${themeValue}`,
      output: [
        { kind: 'ok', text: 'shadcn/ui configuration detected' },
        { kind: 'info', text: `Theme selected: ${themeName}` },
        { kind: 'ok', text: `Successfully added ${themeName} mcoli-ui theme` },
        { kind: 'ok', text: 'mcoli-ui theme setup complete!' },
      ],
      files: [
        { path: 'app/globals.css', note: '300+ tokens · light & dark' },
        { path: 'font-dm-sans · font-plus-jakarta-sans', note: 'brand fonts', added: true },
      ],
    },
    {
      title: 'Add what you need',
      description:
        'Components land in your repo as plain source. Rename, restyle, delete. Nothing to upgrade, nothing locked.',
      command: 'npx mcoli-ui@latest add mc-button mc-input',
      output: [
        { kind: 'muted', text: 'Adding mc-button mcoli-ui component...' },
        { kind: 'ok', text: 'Successfully added mc-button component' },
        { kind: 'muted', text: 'Adding mc-input mcoli-ui component...' },
        { kind: 'ok', text: 'Successfully added mc-input component' },
      ],
      files: [
        { path: 'components/ui/mc-button.tsx', note: 'yours to edit', added: true },
        { path: 'components/ui/mc-input.tsx', note: 'yours to edit', added: true },
      ],
    },
  ];
}

const TYPE_MS = 32;
const LINE_MS = 420;
const HOLD_MS = 2600;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function HowItWorks() {
  const { colorTheme } = useColorTheme();
  const mounted = useMounted();
  const reducedMotion = usePrefersReducedMotion();
  const theme = THEMES.find((t) => t.value === (mounted ? colorTheme : 'primary')) ?? THEMES[0];
  const steps = getSteps(theme.value, theme.name);

  const [active, setActive] = React.useState(1);
  const [tick, setTick] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const step = steps[active];
  const typeDuration = step.command.length * TYPE_MS;
  const total = typeDuration + step.output.length * LINE_MS;
  const elapsed = reducedMotion ? total : tick;

  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Drive typing + output, then auto-advance to the next step.
  React.useEffect(() => {
    if (reducedMotion || !inView) return;
    if (tick >= total + HOLD_MS) {
      if (paused) return;
      setActive((a) => (a + 1) % steps.length);
      setTick(0);
      return;
    }
    const id = window.setTimeout(() => setTick((t) => t + 40), 40);
    return () => window.clearTimeout(id);
  }, [tick, total, paused, inView, reducedMotion, steps.length]);

  const select = (index: number) => {
    setActive(index);
    setTick(0);
  };

  const typed = step.command.slice(0, Math.floor(elapsed / TYPE_MS));
  const typingDone = elapsed >= typeDuration;
  const visibleLines = typingDone
    ? Math.min(step.output.length, Math.floor((elapsed - typeDuration) / LINE_MS) + 1)
    : 0;
  const finished = elapsed >= total;

  return (
    <section id="install" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="How it works"
          title="From an empty repo to MicroClub UI in three commands"
          description="No wrapper package, no runtime theme provider. The CLI writes plain CSS variables and plain TSX into your project, then gets out of the way."
        />

        <div
          ref={rootRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10"
        >
          <Reveal>
            <ol className="flex flex-col gap-2">
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={isActive}
                      className={cn(
                        'relative w-full overflow-hidden rounded-xl border p-5 text-left transition-all duration-300',
                        isActive
                          ? 'border-border bg-card shadow-md'
                          : 'border-transparent hover:bg-muted/60'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={cn(
                            'flex size-8 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold transition-colors',
                            isActive
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border text-muted-foreground'
                          )}
                        >
                          {i + 1}
                        </span>
                        <div className="min-w-0 space-y-1">
                          <p className="font-plus-jakarta-sans text-base font-semibold text-foreground">
                            {s.title}
                          </p>
                          <p className="paragraph-sm text-muted-foreground">{s.description}</p>
                          <code className="block truncate pt-1 font-mono text-xs text-primary">
                            {s.command}
                          </code>
                        </div>
                      </div>
                      {isActive && !reducedMotion ? (
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-0 h-0.5 bg-primary/70"
                          style={{
                            width: `${Math.min(100, (elapsed / (total + HOLD_MS)) * 100)}%`,
                          }}
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-4">
            {/* Terminal */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Terminal className="size-3.5" />
                  <span className="font-mono">~/my-app</span>
                </div>
                <CopyButton value={step.command} className="size-7" />
              </div>
              <div className="min-h-[15rem] p-5 font-mono text-[13px] leading-6" aria-live="polite">
                <p className="text-foreground">
                  <span className="text-primary select-none">❯ </span>
                  {typed}
                  {!typingDone ? (
                    <span className="landing-caret ml-px inline-block h-4 w-[7px] translate-y-0.5 bg-foreground" />
                  ) : null}
                </p>
                <div className="mt-2 space-y-0.5">
                  {step.output.slice(0, visibleLines).map((line) => (
                    <p
                      key={line.text}
                      className={cn(
                        'animate-in fade-in slide-in-from-bottom-1 duration-300',
                        line.kind === 'muted' ? 'text-muted-foreground' : 'text-foreground'
                      )}
                    >
                      <span
                        className={cn(
                          'mr-2 select-none',
                          line.kind === 'ok' && 'text-success',
                          line.kind === 'info' && 'text-info',
                          line.kind === 'muted' && 'text-muted-foreground'
                        )}
                      >
                        {line.kind === 'ok' ? '✔' : line.kind === 'info' ? 'ℹ' : '◌'}
                      </span>
                      {line.text}
                    </p>
                  ))}
                </div>
                {finished ? (
                  <p className="mt-2 text-foreground animate-in fade-in duration-300">
                    <span className="text-primary select-none">❯ </span>
                    <span className="landing-caret inline-block h-4 w-[7px] translate-y-0.5 bg-foreground" />
                  </p>
                ) : null}
              </div>
            </div>

            {/* Files touched */}
            <div className="rounded-2xl border border-border bg-card/60 p-4">
              <p className="mb-3 text-xs font-medium text-muted-foreground">Files changed</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {step.files.map((f) => (
                  <li
                    key={f.path}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 transition-opacity duration-500',
                      finished ? 'opacity-100' : 'opacity-40'
                    )}
                  >
                    {f.added ? (
                      <FilePlus2 className="size-4 shrink-0 text-success" />
                    ) : (
                      <FileCode2 className="size-4 shrink-0 text-primary" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-mono text-xs text-foreground">{f.path}</p>
                      <p className="text-[11px] text-muted-foreground">{f.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
