import { McSkeleton } from '../ui/mc-skeleton';

export default function McSkeletonDemo() {
  return (
    <div className="p-6">
      <div className="w-full max-w-sm space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <McSkeleton width={48} height={48} rectangle={false} />
            <div className="flex-1 space-y-2">
              <McSkeleton height={16} width={192} rectangle />
              <McSkeleton height={12} width={256} rectangle />
              <McSkeleton height={12} width={170} rectangle />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
