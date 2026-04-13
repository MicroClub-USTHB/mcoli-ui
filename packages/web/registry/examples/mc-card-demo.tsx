import { McButton } from '../ui/mc-button';
import { McCard, McCardContent, McCardHeader, McCardFooter } from '../ui/mc-card';

export default function McCardDemo() {
  return (
    <McCard className="max-w-sm">
      <McCardHeader
        title="Card Title"
        description="This is a brief description of the card content."
      />
      <McCardContent>
        <p className="text-sm text-muted-foreground">
          This is the card content area. You can place any content here.
        </p>
      </McCardContent>
      <McCardFooter align="end">
        <McButton variant="secondary">Cancel</McButton>
        <McButton>Confirm</McButton>
      </McCardFooter>
    </McCard>
  );
}
