import { ArrowRight } from 'lucide-react';
import { McBadge, McBadgeGroup, McBadgeGroupText } from '../../ui/mc-badge';

export default function McBadgeGroupTrailingDemo() {
  return (
    <McBadgeGroup badgePosition="trailing">
      <McBadgeGroupText>We’ve just released a new feature</McBadgeGroupText>
      <McBadge icon={<ArrowRight />} iconPosition="end">
        New feature
      </McBadge>
    </McBadgeGroup>
  );
}
