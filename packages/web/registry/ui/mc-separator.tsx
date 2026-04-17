'use client';

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

import { cn } from '@/lib/utils';

type McSeparatorProps = SeparatorPrimitive.Props & {
  minimized?: boolean;
};

export default function McSeparator({
  className,
  orientation,
  minimized = false,
  ...props
}: McSeparatorProps) {
  return (
    <div className="data-horizontal:py-4 data-vertical:mr-4">
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        className={cn(
          'shrink-0 border border-border data-vertical:rotate-90 data-vertical:self-stretch',
          minimized
            ? 'data-horizontal:w-6 data-vertical:w-6'
            : 'data-horizontal:w-61 data-vertical:w-39.5',
          className
        )}
        {...props}
      />
    </div>
  );
}

export { McSeparator };
