'use client';

import Link from 'next/link';

import { Reveal, SectionHeader } from '@/components/landing/primitives';
import { REPO_URL } from '@/components/landing/themes';
import {
  McAccordion,
  McAccordionContent,
  McAccordionItem,
  McAccordionTrigger,
} from '@/registry/ui/mc-accordion';

const QUESTIONS = [
  {
    q: 'Why copy components instead of installing a package?',
    a: 'Because you will want to change them. Copied source means no wrapper APIs, no version pinning and no waiting on a release to fix a padding. mcoli-ui is a registry, the same model shadcn/ui made popular.',
  },
  {
    q: 'Do I need shadcn/ui first?',
    a: 'Yes. The CLI checks for a components.json and stops if it is missing. Run npx shadcn@latest init once, then npx mcoli-ui init.',
  },
  {
    q: 'Can I use it outside MicroClub projects?',
    a: 'Absolutely. It is MIT licensed. The themes carry the MicroClub identity, but the tokens are plain CSS variables you can retune.',
  },
  {
    q: 'Can I switch themes later?',
    a: 'Run npx mcoli-ui init with another theme name. Since every component reads the same variables, the new palette, radii and fonts apply everywhere at once.',
  },
  {
    q: 'Which stack does it target?',
    a: 'React 19, Tailwind CSS v4 and Base UI, built and tested with Next.js. It works wherever the shadcn CLI and Tailwind v4 do.',
  },
];

export function Faq() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-6">
          <SectionHeader
            align="start"
            eyebrow="FAQ"
            title="The fine print"
            description="Anything else? Open an issue on GitHub and the MicroClub dev team will pick it up."
          />
          <Reveal delay={80}>
            <Link
              href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Want to contribute a component? →
            </Link>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <McAccordion defaultValue={['q-0']} className="w-full max-w-none">
            {QUESTIONS.map((item, i) => (
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
