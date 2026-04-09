'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const McTabsListVariants = cva('flex bg-muted rounded-lg p-[3px] size-fit', {
  variants: {
    variant: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
  },
});

function McTabs({ ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}

function McTabsList({
  className,
  variant,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof McTabsListVariants>) {
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
        'flex flex-col items-center justify-center h-7 w-19.5 px-2 py-1 rounded-md text-[14px] gap-2.5 font-medium text-muted-foreground bg-transparent border border-transparent',
        'data-active:bg-accent',
        'data-active:border-t',
        'data-active:border-border',
        'data-active:text-accent-foreground',
        className
      )}
      {...props}
    />
  );
}

export { McTabs, McTabsList, McTabsTrigger };
