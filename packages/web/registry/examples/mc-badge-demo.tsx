import { ArrowRight } from 'lucide-react';
import { McBadge } from '../ui/mc-badge';

const DotIcon = ({ className }: { className?: string }) => (
  <span className={`rounded-full bg-current inline-block ${className ?? 'size-1.5'}`} />
);

export default function McBadgeDemo() {
  return (
    <div className="flex w-full flex-wrap gap-2">
      <McBadge>Label</McBadge>
      <McBadge variant="secondary">Secondary</McBadge>
      <McBadge variant="destructive">Destructive</McBadge>
      <McBadge variant="outline">Outline</McBadge>
      <McBadge icon={<DotIcon className="size-1.5" />} iconPosition="start">
        Status
      </McBadge>
      <McBadge icon={<ArrowRight />} iconPosition="end">
        Learn more
      </McBadge>
      <McBadge
        groupSize="md"
        leadingBadge="New feature"
        leadingBadgePosition="start"
        icon={<ArrowRight />}
        iconPosition="end"
      >
        We’ve just released a new feature
      </McBadge>

      <McBadge image="https://flagcdn.com/w40/au.png" imageAlt="Australia">
        Label
      </McBadge>
    </div>
  );
}
