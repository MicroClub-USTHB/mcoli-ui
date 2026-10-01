import Link from 'next/link';
import {
  ArrowRight,
  Boxes,
  Layers,
  MessageSquare,
  Navigation,
  Table2,
  TextCursorInput,
} from 'lucide-react';

import { Reveal } from '@/components/landing/primitives';

const CATEGORIES = [
  {
    title: 'Forms & inputs',
    icon: TextCursorInput,
    items: [
      'mc-button',
      'mc-input',
      'mc-textarea',
      'mc-input-otp',
      'mc-checkbox',
      'mc-radio-group',
      'mc-select',
      'mc-combobox',
      'mc-switch',
      'mc-slider',
      'mc-calendar',
    ],
  },
  {
    title: 'Overlays',
    icon: Layers,
    items: [
      'mc-dialog',
      'mc-alert-dialog',
      'mc-drawer',
      'mc-popover',
      'mc-tooltip',
      'mc-hover-card',
      'mc-dropdown-menu',
      'mc-context-menu',
    ],
  },
  {
    title: 'Navigation',
    icon: Navigation,
    items: ['mc-navigation-menu', 'mc-sidebar', 'mc-tabs', 'mc-breadcrumb', 'mc-pagination'],
  },
  {
    title: 'Feedback',
    icon: MessageSquare,
    items: ['mc-alert', 'mc-sonner', 'mc-progress', 'mc-skeleton'],
  },
  {
    title: 'Data display',
    icon: Table2,
    items: ['mc-data-table', 'mc-card', 'mc-badge', 'mc-avatar', 'mc-carousel'],
  },
  {
    title: 'Layout',
    icon: Boxes,
    items: ['mc-accordion', 'mc-collapsible', 'mc-separator', 'mc-scrollarea'],
  },
];

const NEW = new Set(['mc-data-table']);

export function ComponentIndex({ components }: { components: { name: string; title: string }[] }) {
  const titles = new Map(components.map((c) => [c.name, c.title.replace(/^MicroClub\s+/, '')]));
  const categorized = new Set(CATEGORIES.flatMap((c) => c.items));
  // Anything new in the registry still shows up, even before it gets a category.
  const uncategorized = components.map((c) => c.name).filter((n) => !categorized.has(n));
  const groups = [
    ...CATEGORIES.map((c) => ({ ...c, items: c.items.filter((n) => titles.has(n)) })),
    ...(uncategorized.length ? [{ title: 'More', icon: Boxes, items: uncategorized }] : []),
  ].filter((g) => g.items.length);

  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="header-xs font-bold text-foreground">The full catalog</h3>
            <p className="paragraph-sm text-muted-foreground">
              {components.length} components. Each one is a single{' '}
              <code className="font-mono text-foreground">npx mcoli-ui add</code> away.
            </p>
          </div>
          <Link
            href="/docs/components"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            View all docs
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4 bg-card p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <group.icon className="size-4" />
                  </span>
                  <p className="text-sm font-semibold text-foreground">{group.title}</p>
                  <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {group.items.length}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((name) => (
                    <li key={name}>
                      <Link
                        href={`/docs/components/${name}`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-[13px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {titles.get(name) ?? name}
                        {NEW.has(name) ? (
                          <span className="rounded-sm bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                            New
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
