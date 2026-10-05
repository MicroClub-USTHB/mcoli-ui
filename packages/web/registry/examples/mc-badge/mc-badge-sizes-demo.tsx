import { McBadge } from '../../ui/mc-badge';

export default function McBadgeSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <McBadge size="sm">Small</McBadge>
      <McBadge size="md">Medium</McBadge>
      <McBadge size="lg">Large</McBadge>
    </div>
  );
}
