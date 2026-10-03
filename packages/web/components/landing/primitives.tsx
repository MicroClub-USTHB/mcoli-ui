'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Check, Copy } from 'lucide-react';

import type { ThemePalette } from '@/components/ColorThemeProvider';
import { cn } from '@/lib/utils';

export function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Renders children inside a different color theme than the page.
 * Theme CSS keys dark values on `.dark[data-theme=…]`, so the scope carries
 * its own `.dark` class mirroring the page mode.
 */
export function ThemeScope({
  theme,
  mode,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  theme: ThemePalette;
  /** Force a mode regardless of the page's; defaults to following the page. */
  mode?: 'light' | 'dark';
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mode ? mode === 'dark' : mounted && resolvedTheme === 'dark';

  return (
    <div
      data-theme={theme}
      className={cn(isDark && 'dark', 'bg-background text-foreground', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function useCopy(timeout = 1600) {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), timeout);
      } catch {
        // Clipboard can be unavailable (insecure context, denied permission).
      }
    },
    [timeout]
  );

  return { copied, copy };
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={copied ? 'Copied' : 'Copy command'}
      className={cn(
        'relative inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      <Copy
        className={cn(
          'absolute size-4 transition-all duration-200',
          copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
        )}
      />
      <Check
        className={cn(
          'absolute size-4 text-success transition-all duration-200',
          copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        )}
      />
    </button>
  );
}

/** Fades children up once they scroll into view. No-op under reduced motion (see globals.css). */
export function Reveal({
  className,
  delay = 0,
  children,
  ...props
}: React.ComponentProps<'div'> & { delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn('landing-reveal', className)}
      {...props}
    >
      {children}
    </div>
  );
}

/** Card shell whose hover glow follows the cursor, via --x/--y written straight to the node. */
export function Spotlight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Written to CSS vars instead of state to avoid re-renders on every pointer move.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--x', `${e.clientX - rect.left}px`);
    node.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={className}>
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'start';
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-2xl items-center text-center' : 'max-w-xl',
        className
      )}
    >
      <span className="text-sm font-semibold text-primary">{eyebrow}</span>
      <h2 className="header-sm md:header-md font-bold text-balance text-foreground">{title}</h2>
      {description ? (
        <p className="paragraph-md md:paragraph-lg text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn('size-4', className)}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
