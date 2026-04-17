'use client';

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

import { cn } from '@/lib/utils';

type McSeparatorProps = SeparatorPrimitive.Props & {
  size?: number;
};

export default function McSeparator({ className, orientation, size, ...props }: McSeparatorProps) {
  return (
    <div className="data-horizontal:py-4 data-vertical:mr-4 w-fit">
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        style={{
          width: size ? `${size}px` : undefined,
        }}
        className={cn('shrink-0 border border-border data-vertical:rotate-90', className)}
        {...props}
      />
    </div>
  );
}

export { McSeparator };
