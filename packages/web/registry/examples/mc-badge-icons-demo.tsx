import { ArrowRight, ArrowUp, Plus, X } from 'lucide-react';
import { McBadge, McBadgeDot } from '../ui/mc-badge';

export default function McBadgeIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <McBadge icon={<McBadgeDot />}>Dot</McBadge>
      <McBadge icon={<ArrowUp />}>Icon left</McBadge>
      <McBadge icon={<ArrowRight />} iconPosition="end">
        Icon right
      </McBadge>
      <McBadge icon={<X />} iconPosition="end">
        Close
      </McBadge>
      <McBadge icon={<Plus />} iconOnly aria-label="Add" />
    </div>
  );
}
