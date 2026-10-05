import { McBadge } from '../ui/mc-badge';

export default function McBadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <McBadge variant="default">Default</McBadge>
      <McBadge variant="primary">Primary</McBadge>
      <McBadge variant="secondary">Secondary</McBadge>
      <McBadge variant="destructive">Destructive</McBadge>
      <McBadge variant="outline">Outline</McBadge>
      <McBadge variant="ghost">Ghost</McBadge>
    </div>
  );
}
