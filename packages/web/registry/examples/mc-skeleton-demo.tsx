import { McSkeleton } from '../ui/mc-skeleton';

export default function McSkeletonDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <McSkeleton className="h-12 w-12 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <McSkeleton className="h-4 w-3/4" />
              <McSkeleton className="h-3 w-full" />
              <McSkeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
