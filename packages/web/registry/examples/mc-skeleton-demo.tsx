import { McSkeleton } from '../ui/mc-skeleton';

export function McSkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <McSkeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <McSkeleton className="h-4 w-[250px]" />
        <McSkeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
