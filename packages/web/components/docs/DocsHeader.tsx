'use client';

import * as React from 'react';
import { useNotebookLayout } from 'fumadocs-ui/layouts/notebook';
import { PanelLeft } from 'lucide-react';

import { SiteHeader } from '@/components/site/SiteHeader';
import { cn } from '@/lib/utils';

const StarsContext = React.createContext<number | null>(null);

/** Hands the server-fetched star count to the header slot, which only receives header props. */
export function StarsProvider({
  stars,
  children,
}: {
  stars: number | null;
  children: React.ReactNode;
}) {
  return <StarsContext.Provider value={stars}>{children}</StarsContext.Provider>;
}

/**
 * Notebook `slots.header`: the same SiteHeader as the landing page, placed across the
 * whole first grid row. On mobile it swaps the landing menu for Fumadocs' sidebar drawer.
 */
export function DocsHeader({ className, ...props }: React.ComponentProps<'header'>) {
  const stars = React.useContext(StarsContext);
  const { slots } = useNotebookLayout();
  const Trigger = slots.sidebar?.trigger;

  return (
    <SiteHeader
      {...props}
      stars={stars}
      contentClassName="max-w-[97rem]"
      // Spans every grid column; inline-size containment keeps its content width from
      // inflating the layout's min-content side columns.
      className={cn(
        'col-[1/-1] row-start-1 top-(--fd-docs-row-1) z-30 [contain:inline-size]',
        className
      )}
      mobileTrigger={
        Trigger ? (
          <Trigger
            aria-label="Open navigation"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            <PanelLeft className="size-4.5" />
          </Trigger>
        ) : null
      }
    />
  );
}
