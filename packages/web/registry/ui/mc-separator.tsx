'use client';

import { Separator, Separator as SeparatorPrimitive } from '@base-ui/react/separator';

import { cn } from '@/lib/utils';

function McSeparator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <div className="py-4  ">
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        className={cn(
          'shrink-0  border border-border data-horizontal:w-61 data-vertical:w-39.5 data-vertical:rotate-90  data-vertical:self-stretch',
          className
        )}
        {...props}
      />
    </div>
  );
}

export { McSeparator };
