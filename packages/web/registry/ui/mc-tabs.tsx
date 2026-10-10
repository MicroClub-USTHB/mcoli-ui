'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const McTabsListVariants = cva(
  'flex flex-row bg-muted rounded-lg p-[3px] size-fit data-[orientation=vertical]:flex-col',
  {
    variants: {
      variant: {
        horizontal: '',
        vertical: 'flex-col',
      },
    },
  }
);

function McTabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2 data-[orientation=vertical]:flex-row', className)}
      {...props}
    />
  );
}

function McTabsList({
  className,
  variant,
  ...props
}: TabsPrimitive.List.Props &
  VariantProps<typeof McTabsListVariants> & {
    /**
     * @deprecated Only changes the layout. Set `orientation="vertical"` on `McTabs` instead,
     * which also switches keyboard navigation to ArrowUp/ArrowDown.
     */
    variant?: 'horizontal' | 'vertical' | null;
  }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(McTabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function McTabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        'flex flex-col items-center justify-center min-h-7 min-w-19.5 px-2 py-1 rounded-md text-[14px] gap-2.5 paragraph-sm font-medium text-muted-foreground bg-transparent',
        'data-active:bg-accent',
        'data-active:ring-1 data-active:ring-inset data-active:ring-border',
        'data-active:text-accent-foreground',
        className
      )}
      {...props}
    />
  );
}

function McTabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn('flex-1 text-sm text-foreground outline-none', className)}
      {...props}
    />
  );
}

export { McTabs, McTabsList, McTabsTrigger, McTabsPanel };
