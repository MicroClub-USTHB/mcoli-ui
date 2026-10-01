import Link from 'next/link';

import Logo from '@/components/Logo';
import MCLogo from '@/components/MCLogo';
import { GithubIcon } from '@/components/landing/primitives';
import { REPO_URL } from '@/components/landing/themes';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Introduction', href: '/docs/introduction' },
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Theming', href: '/docs/theming' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Changelog', href: `${REPO_URL}/blob/main/CHANGELOG.md` },
      { label: 'Contributing', href: `${REPO_URL}/blob/main/CONTRIBUTING.md` },
      { label: 'Report an issue', href: `${REPO_URL}/issues` },
    ],
  },
  {
    title: 'Club',
    links: [
      { label: 'MicroClub', href: 'https://microclub.info' },
      { label: 'GitHub', href: REPO_URL },
      { label: 'License (MIT)', href: `${REPO_URL}/blob/main/LICENSE` },
    ],
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  const className = 'text-sm text-muted-foreground transition-colors hover:text-foreground';
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Link href="/" aria-label="Mcoli UI home" className="w-fit">
              <Logo height={28} />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Stop building from scratch. Elevate your UI with MicroClub DNA.
            </p>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <GithubIcon className="size-3.5" />
              MicroClub-USTHB/mcoli-ui
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-foreground">{col.title}</p>
              {col.links.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MicroClub. Released under the MIT License.
          </p>
          <a
            href="https://microclub.info"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Built by the Dev Department of
            <MCLogo size={22} />
          </a>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto -mb-[4vw] max-w-6xl px-4 select-none md:px-6"
      >
        <p className="bg-linear-to-b from-foreground/10 to-transparent bg-clip-text text-center font-plus-jakarta-sans text-[22vw] leading-none font-extrabold tracking-tighter text-transparent lg:text-[15rem]">
          mcoli
        </p>
      </div>
    </footer>
  );
}
