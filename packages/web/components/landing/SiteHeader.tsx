import Link from 'next/link';

import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/ModeToggle';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { GithubIcon } from '@/components/landing/primitives';
import { REPO_URL } from '@/components/landing/themes';

const NAV = [
  { label: 'Docs', href: '/docs/introduction' },
  { label: 'Components', href: '/docs/components' },
  { label: 'Theming', href: '/docs/theming' },
  { label: 'Themes', href: '#themes' },
];

function formatStars(stars: number) {
  return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars);
}

export function SiteHeader({ stars }: { stars: number | null }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Mcoli UI home" className="transition-opacity hover:opacity-80">
            <Logo height={28} />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/docs/introduction"
            className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            Docs
          </Link>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <GithubIcon />
            <span className="sr-only sm:not-sr-only">
              {stars !== null ? formatStars(stars) : 'GitHub'}
            </span>
          </a>
          <span className="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden />
          <ThemeSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
