'use client';

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

import { cn } from '@/lib/utils';

type McSeparatorProps = SeparatorPrimitive.Props & {
  size?: number;
};

export default function McSeparator({
  className,
  orientation = 'horizontal',
  size,
  ...props
}: McSeparatorProps) {
  const isVertical = orientation === 'vertical';

  return (
    <div className={cn('w-fit', isVertical ? 'h-full' : 'w-full')}>
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        style={{
          [isVertical ? 'height' : 'width']: size ? `${size}px` : undefined,
        }}
        className={cn(
          'shrink-0 border border-border',
          isVertical ? 'w-[1px]' : 'h-[1px]',
          className
        )}
        {...props}
      />
    </div>
  );
}

export { McSeparator };
