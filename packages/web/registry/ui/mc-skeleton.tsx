import { cn } from '@/lib/utils';

type McSkeletonProps = {
  width?: number;
  height?: number;
  rectangle?: boolean;
} & React.ComponentProps<'div'>;

function McSkeleton({ className, rectangle, width, height, ...props }: McSkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      style={{
        width,
        height,
        ...(height === width ? { marginRight: 16 } : { marginBottom: 8 }),
      }}
      className={cn('animate-pulse bg-muted', rectangle ? 'rounded-md' : 'rounded-full', className)}
      {...props}
    />
  );
}

export { McSkeleton };
