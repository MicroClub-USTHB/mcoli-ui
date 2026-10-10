import * as React from 'react';

import { cn } from '@/lib/utils';

type McSkeletonProps = {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  rectangle?: boolean;
} & React.ComponentProps<'div'>;

function McSkeleton({ className, rectangle, width, height, style, ...props }: McSkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      style={{ width, height, ...style }}
      className={cn('animate-pulse bg-muted', rectangle ? 'rounded-md' : 'rounded-full', className)}
      {...props}
    />
  );
}

export { McSkeleton };
