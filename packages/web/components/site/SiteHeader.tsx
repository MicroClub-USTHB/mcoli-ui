'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Search } from 'lucide-react';

import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/ModeToggle';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { GithubIcon } from '@/components/landing/primitives';
import { REPO_URL } from '@/components/landing/themes';
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
        'inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className
      )}
    >
      <GithubIcon />
      {stars !== null ? (
        <span className="tabular-nums max-sm:hidden">{formatStars(stars)}</span>
      ) : null}
    </a>
  );
}

export interface SiteHeaderProps extends React.ComponentProps<'header'> {
  stars: number | null;
  /** Extra mobile-only control (the docs pass Fumadocs' sidebar trigger). */
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

        <div className="ms-auto flex items-center gap-1 md:gap-2">
          <SearchButton />
          <GithubLink stars={stars} />
          <span className="mx-1 hidden h-5 w-px bg-border md:block" aria-hidden />
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <ModeToggle />
          </div>
          {mobileTrigger}
        </div>
      </div>
    </header>
  );
}
