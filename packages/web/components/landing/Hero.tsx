import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

import { AppPreview } from '@/components/landing/AppPreview';
import { InstallCommand } from '@/components/landing/InstallCommand';
import { McButton } from '@/registry/ui/mc-button';

const STACK = ['React 19', 'Next.js', 'Tailwind CSS v4', 'Base UI', 'shadcn CLI', 'TypeScript'];

export function Hero({ componentCount }: { componentCount: number }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop: theme-tinted glow over a fading grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid opacity-30 mask-radial dark:opacity-80"
      />
      <div
        aria-hidden
        className="landing-glow absolute top-[-14rem] left-1/2 -z-10 h-[34rem] w-[56rem] max-w-[140vw] rounded-full bg-primary/25 blur-[120px]"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 text-center sm:pt-32 md:px-6">
        <h1 className="max-w-4xl text-[2.6rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-foreground sm:header-lg md:header-xl md:leading-[1.05] font-plus-jakarta-sans">
          Ship the MicroClub design system{' '}
          <span className="text-gradient-primary">in one command.</span>
        </h1>

        <p className="mt-6 max-w-2xl paragraph-lg text-pretty text-muted-foreground md:paragraph-xl">
          Tokens, five themes and {componentCount} accessible React components, copied straight into
          your codebase by the shadcn CLI. No package to upgrade. You own every line.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
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
            variant="secondary"
            size="lg"
            icon="leading"
            iconDefinition={<BookOpen />}
            className="w-full sm:w-auto"
            render={<Link href="/docs/components" />}
          >
            Browse {componentCount} components
          </McButton>
        </div>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          {[`${componentCount} components`, '5 themes', 'light & dark', 'MIT'].map((item, i) => (
            <span key={item} className="inline-flex items-center gap-2">
              {i > 0 ? <span className="size-1 rounded-full bg-border" aria-hidden /> : null}
              {item}
            </span>
          ))}
        </p>

        <InstallCommand className="mt-10 max-w-xl" />

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
          {STACK.map((item, i) => (
            <li key={item} className="flex items-center gap-5">
              {i > 0 ? <span className="size-1 rounded-full bg-border" aria-hidden /> : null}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 px-4 md:mt-20 md:px-6">
        <div className="mask-fade-b max-h-[520px] overflow-hidden sm:max-h-[640px]">
          <AppPreview />
        </div>
      </div>
    </section>
  );
}
