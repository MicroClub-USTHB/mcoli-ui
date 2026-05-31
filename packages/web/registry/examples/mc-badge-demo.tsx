import { McBadge } from '../ui/mc-badge';

export function McBadgeDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <McBadge>Label</McBadge>
      <McBadge variant="secondary">Secondary</McBadge>
      <McBadge variant="destructive">Destructive</McBadge>
      <McBadge variant="outline">Outline</McBadge>
    </div>
  );
}
