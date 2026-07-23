import type { ComponentProps } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { McCollapsible, McCollapsibleContent, McCollapsibleTrigger } from '../ui/mc-collapsible';

export default function McCollapsibleDemo(props: ComponentProps<typeof McCollapsible>) {
  return (
    <McCollapsible {...props} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="paragraph-sm font-semibold text-foreground">
          @peduarte starred 3 repositories
        </h4>
        <McCollapsibleTrigger className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50">
          <ChevronsUpDown className="size-4" />
          <span className="sr-only">Toggle repositories</span>
        </McCollapsibleTrigger>
      </div>
      <div className="paragraph-sm rounded-md border border-border bg-background px-4 py-2 text-primary">
        @radix-ui/primitives
      </div>
      <McCollapsibleContent className="space-y-2">
        <div className="paragraph-sm rounded-md border border-border bg-background px-4 py-2 text-primary">
          @radix-ui/colors
        </div>
        <div className="paragraph-sm rounded-md border border-border bg-background px-4 py-2 text-primary">
          @stitches/react
        </div>
      </McCollapsibleContent>
    </McCollapsible>
  );
}
