'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { ChevronRight, Menu, Search, X } from 'lucide-react';

import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/ModeToggle';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { GithubIcon } from '@/components/landing/primitives';
import { REPO_URL } from '@/components/landing/themes';
import { NAV_ITEMS } from '@/components/site/nav';
import { cn } from '@/lib/utils';

function formatStars(stars: number) {
  return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars);
}

const iconButton =
  'inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

function SearchButton() {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  if (!enabled) return null;

  return (
    <>
      <button
        type="button"
        data-search-full=""
        onClick={() => setOpenSearch(true)}
        className="group hidden h-9 w-56 items-center gap-2 rounded-lg border border-border bg-muted/40 ps-3 pe-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground md:inline-flex lg:w-64"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 text-start">Search docs…</span>
        <span className="flex gap-0.5">
          {hotKey.map((key, i) => (
            <kbd
              key={i}
              className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[11px] text-muted-foreground"
            >
              {key.display}
            </kbd>
          ))}
        </span>
      </button>
      <button
        type="button"
        data-search=""
        aria-label="Search docs"
        onClick={() => setOpenSearch(true)}
        className={cn(iconButton, 'md:hidden')}
      >
        <Search className="size-4.5" />
      </button>
    </>
  );
}

function GithubLink({ stars, className }: { stars: number | null; className?: string }) {
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={stars !== null ? `GitHub, ${stars} stars` : 'GitHub'}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className
      )}
    >
      <GithubIcon />
      {stars !== null ? <span className="tabular-nums">{formatStars(stars)}</span> : null}
    </a>
  );
}

/** Landing-only mobile menu; the docs use Fumadocs' sidebar drawer instead. */
function MobileMenu({ stars }: { stars: number | null }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(iconButton, 'md:hidden')}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        // The header's backdrop-filter is the containing block here, so this sizes to the
        // viewport below the bar instead of using position: fixed.
        <div className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 animate-in fade-in duration-200"
          />
          <div
            id={panelId}
            className="relative border-b border-border bg-background shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <nav aria-label="Main" className="flex flex-col gap-1 p-3">
              {NAV_ITEMS.map((item) => {
                const active = item.isActive(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors',
                      active ? 'bg-muted' : 'hover:bg-muted/60'
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {item.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <GithubLink stars={stars} className="-ms-2.5" />
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export interface SiteHeaderProps extends React.ComponentProps<'header'> {
  stars: number | null;
  /** Mobile trigger to show instead of the landing menu (the docs pass the sidebar trigger). */
  mobileTrigger?: React.ReactNode;
  /** Max width of the bar's content, so it lines up with the page below. */
  contentClassName?: string;
}

export function SiteHeader({
  stars,
  mobileTrigger,
  contentClassName,
  className,
  ...props
}: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-6',
          contentClassName
        )}
      >
        <Link
          href="/"
          aria-label="Mcoli UI home"
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          <Logo height={26} />
        </Link>

        <nav aria-label="Main" className="ms-4 hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-1 md:gap-2">
          <SearchButton />
          <GithubLink stars={stars} className="max-md:hidden" />
          <span className="mx-1 hidden h-5 w-px bg-border md:block" aria-hidden />
          <div className="hidden items-center gap-2 md:flex">
            <ThemeSwitcher />
            <ModeToggle />
          </div>
          {mobileTrigger ?? <MobileMenu stars={stars} />}
        </div>
      </div>
    </header>
  );
}
