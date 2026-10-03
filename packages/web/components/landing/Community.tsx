import { getImageProps } from 'next/image';
import { ArrowUpRight, BookMarked, GitPullRequest, History } from 'lucide-react';

import { Reveal } from '@/components/landing/primitives';
import { REPO_URL } from '@/components/landing/themes';
import { FAQ } from '@/consts/faq';
import type { Contributor } from '@/lib/github';
import {
  McAccordion,
  McAccordionContent,
  McAccordionItem,
  McAccordionTrigger,
} from '@/registry/ui/mc-accordion';
import { McAvatar, McAvatarFallback, McAvatarImage } from '@/registry/ui/mc-avatar';

const LINKS = [
  {
    icon: GitPullRequest,
    label: 'Contribute a component',
    hint: 'Branch, build, open a PR',
    href: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
  },
  {
    icon: History,
    label: 'Changelog',
    hint: 'Every release, in the open',
    href: `${REPO_URL}/blob/main/CHANGELOG.md`,
  },
  {
    icon: BookMarked,
    label: 'Report an issue',
    hint: 'Bugs, ideas, questions',
    href: `${REPO_URL}/issues`,
  },
];

const MAX_AVATARS = 10;

/** Optimized src/srcSet for a 40px avatar (1x and 2x) from Next's image optimizer. */
function avatarProps(src: string) {
  const { props } = getImageProps({ src, alt: '', width: 40, height: 40 });
  return { src: props.src, srcSet: props.srcSet, width: 40, height: 40 };
}

export function Community({ contributors }: { contributors: Contributor[] }) {
  const shown = contributors.slice(0, MAX_AVATARS);
  const extra = contributors.length - shown.length;

  return (
    <section className="landing-deferred py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Built by MicroClub */}
        <Reveal className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <span className="text-sm font-semibold text-primary">Open source</span>
          <h2 className="mt-3 header-xs font-bold text-balance text-card-foreground md:header-sm">
            Built by MicroClub, in the open
          </h2>
          <p className="mt-3 paragraph-md text-pretty text-muted-foreground">
            Designed and maintained by MicroClub&apos;s dev team at USTHB. Every component is
            documented and has Storybook stories before it ships.
          </p>

          {shown.length ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ul className="flex -space-x-2">
                {shown.map((c) => (
                  <li key={c.login}>
                    <a
                      href={c.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${c.login} · ${c.contributions} commits`}
                      aria-label={`${c.login} on GitHub`}
                      className="block rounded-full ring-2 ring-card transition-transform hover:z-10 hover:-translate-y-1"
                    >
                      <McAvatar size="md">
                        <McAvatarImage {...avatarProps(c.avatarUrl)} alt="" />
                        <McAvatarFallback className="text-xs">
                          {c.login.slice(0, 2).toUpperCase()}
                        </McAvatarFallback>
                      </McAvatar>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`${REPO_URL}/graphs/contributors`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {extra > 0 ? `+${extra} more · ` : ''}
                {contributors.length} contributors
              </a>
            </div>
          ) : null}

          <ul className="mt-8 grid gap-2 border-t border-border pt-6">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                    <link.icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">
                      {link.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">{link.hint}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* FAQ */}
        <Reveal delay={100} className="flex flex-col p-2 md:p-4">
          <span className="text-sm font-semibold text-primary">FAQ</span>
          <h2 className="mt-3 header-xs font-bold text-foreground md:header-sm">The fine print</h2>
          {/* hiddenUntilFound keeps closed answers in the HTML, for crawlers and find-in-page. */}
          <McAccordion defaultValue={['q-0']} hiddenUntilFound className="mt-6 w-full max-w-none">
            {FAQ.map((item, i) => (
              <McAccordionItem key={item.q} value={`q-${i}`}>
                <McAccordionTrigger>{item.q}</McAccordionTrigger>
                <McAccordionContent>
                  <p>{item.a}</p>
                </McAccordionContent>
              </McAccordionItem>
            ))}
          </McAccordion>
        </Reveal>
      </div>
    </section>
  );
}
