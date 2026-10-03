import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { GithubIcon, Reveal } from '@/components/landing/primitives';
import { REPO_URL } from '@/components/landing/themes';
import { McButton } from '@/registry/ui/mc-button';

export function FinalCta({ componentCount }: { componentCount: number }) {
  return (
    <section className="landing-deferred relative isolate overflow-hidden border-t border-border">
      {/* Beam: a primary hairline on the top edge, a glow falling from it, and a faint grid. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 60% at 50% 0%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-grid opacity-25 dark:opacity-50"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 70% at 50% 0%, #000 10%, transparent 70%)',
        }}
      />

      <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center md:py-28">
        <h2 className="header-sm font-extrabold text-balance text-foreground md:header-lg">
          Build your next project with Mcoli UI
        </h2>
        <p className="mt-5 max-w-xl paragraph-md text-pretty text-muted-foreground md:paragraph-lg">
          Five themes, light and dark, and {componentCount} accessible components. Free and open
          source, ready the moment you are.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <McButton
            nativeButton={false}
            size="lg"
            icon="trailing"
            iconDefinition={<ArrowRight />}
            className="w-full shadow-lg shadow-primary/20 sm:w-auto"
            render={<Link href="/docs/introduction" />}
          >
            Get started
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
            View on GitHub
          </McButton>
        </div>
      </Reveal>
    </section>
  );
}
