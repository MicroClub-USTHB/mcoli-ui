import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { InstallCommand } from '@/components/landing/InstallCommand';
import { GithubIcon, Reveal } from '@/components/landing/primitives';
import { REPO_URL } from '@/components/landing/themes';
import { McButton } from '@/registry/ui/mc-button';

export function FinalCta() {
  return (
    <section className="px-4 pb-24 md:px-6 md:pb-32">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-2xl sm:px-12 md:py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-grid opacity-30 mask-radial dark:opacity-60"
        />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]"
        />

        <h2 className="mx-auto max-w-3xl header-sm font-extrabold text-balance text-foreground md:header-lg">
          Bring MicroClub DNA to your next project
        </h2>
        <p className="mx-auto mt-5 max-w-xl paragraph-md text-muted-foreground md:paragraph-lg">
          Stop rebuilding buttons for every club event. Pick a theme, run one command, and start
          shipping.
        </p>

        <InstallCommand showThemes={false} className="mx-auto mt-10 max-w-lg" />

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <McButton
            nativeButton={false}
            size="lg"
            icon="trailing"
            iconDefinition={<ArrowRight />}
            className="w-full sm:w-auto"
            render={<Link href="/docs/installation" />}
          >
            Read the install guide
          </McButton>
          <McButton
            nativeButton={false}
            size="lg"
            variant="secondary"
            icon="leading"
            iconDefinition={<GithubIcon />}
            className="w-full sm:w-auto"
            render={<a href={REPO_URL} target="_blank" rel="noopener noreferrer" />}
          >
            Star on GitHub
          </McButton>
        </div>
      </Reveal>
    </section>
  );
}
