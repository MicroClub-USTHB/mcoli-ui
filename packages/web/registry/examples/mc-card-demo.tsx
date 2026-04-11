import { McButton } from '../ui/mc-button';
import { McCard, McCardHeader, McCardFooter } from '../ui/mc-card';

export default function McCardDemo() {
  return (
    <McCard className="max-w-sm">
      <McCardHeader
        title="Card Title"
        description="This is a brief description of the card content."
      />
      <McCardFooter align="end">
        <McButton variant="secondary">Cancel</McButton>
        <McButton>Confirm</McButton>
      </McCardFooter>
    </McCard>
  );
}
