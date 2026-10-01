import {
  Accessibility,
  ArrowLeftRight,
  Braces,
  FileCode2,
  Heart,
  Palette,
  ScanEye,
  SunMoon,
} from 'lucide-react';

import { Reveal, SectionHeader } from '@/components/landing/primitives';

const FEATURES = [
  {
    icon: FileCode2,
    title: 'You own the code',
    body: 'Components are copied into components/ui as plain TSX. No black box in node_modules, no breaking upgrade.',
  },
  {
    icon: Accessibility,
    title: 'Accessible by default',
    body: 'Built on Base UI primitives, so focus management, keyboard support and ARIA come for free.',
  },
  {
    icon: Palette,
    title: 'Theme-aware tokens',
    body: 'Every component reads CSS variables. Change data-theme and the whole interface re-skins.',
  },
  {
    icon: SunMoon,
    title: 'Light and dark',
    body: 'All five themes ship a hand-tuned dark mode. Toggle a .dark class and you are done.',
  },
  {
    icon: ArrowLeftRight,
    title: 'RTL ready',
    body: 'Set "rtl": true in components.json and directional icons flip on install. Arabic UIs welcome.',
  },
  {
    icon: ScanEye,
    title: 'Visually tested',
    body: 'Every component has Storybook stories, with Chromatic visual regression on each pull request.',
  },
  {
    icon: Braces,
    title: 'Typed variants',
    body: 'class-variance-authority variants and strict TypeScript props, so your editor knows every option.',
  },
  {
    icon: Heart,
    title: 'Open source',
    body: 'MIT licensed and maintained in the open by the MicroClub dev department at USTHB.',
  },
];

export function Features() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Why mcoli-ui"
          title="Built like a library. Owned like your own code."
          description="The polish of a design system team, without the lock-in of a dependency."
        />

        <Reveal delay={100}>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group relative flex flex-col gap-3 bg-background p-6 transition-colors duration-300 hover:bg-card md:p-7"
              >
                <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5">
                  <f.icon className="size-5" />
                </span>
                <p className="font-plus-jakarta-sans text-base font-semibold text-foreground">
                  {f.title}
                </p>
                <p className="paragraph-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
