import { ArrowRight } from 'lucide-react';
import { McBadge, McBadgeGroup, McBadgeGroupText } from '../../ui/mc-badge';

export default function McBadgeGroupDemo() {
  return (
    <McBadgeGroup>
      <McBadge>New feature</McBadge>
      <McBadgeGroupText icon={<ArrowRight />}>We’ve just released a new feature</McBadgeGroupText>
    </McBadgeGroup>
  );
}
