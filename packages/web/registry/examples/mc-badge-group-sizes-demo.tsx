import { McBadge, McBadgeGroup, McBadgeGroupText } from '../ui/mc-badge';

export default function McBadgeGroupSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <McBadgeGroup size="md">
        <McBadge>New feature</McBadge>
        <McBadgeGroupText>We’ve just released a new feature</McBadgeGroupText>
      </McBadgeGroup>
      <McBadgeGroup size="lg">
        <McBadge>New feature</McBadge>
        <McBadgeGroupText>We’ve just released a new feature</McBadgeGroupText>
      </McBadgeGroup>
    </div>
  );
}
