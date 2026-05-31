import { ArrowRight, Dot } from 'lucide-react';
import { McBadge } from '../ui/mc-badge';

export default function McBadgeDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <McBadge>Label</McBadge>
      <McBadge variant="secondary">Secondary</McBadge>
      <McBadge variant="destructive">Destructive</McBadge>
      <McBadge variant="outline">Outline</McBadge>
      <McBadge icon={<Dot />} iconPosition="start">
        Status
      </McBadge>
      <McBadge icon={<ArrowRight />} iconPosition="end">
        Learn more
      </McBadge>
      <McBadge
        groupSize="md"
        leadingBadge="New"
        leadingBadgePosition="start"
        icon={<ArrowRight />}
        iconPosition="end"
      >
        Feature released
      </McBadge>
    </div>
  );
}
