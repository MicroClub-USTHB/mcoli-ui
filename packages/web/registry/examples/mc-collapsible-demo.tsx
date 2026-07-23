import { McButton } from '../ui/mc-button';
import { McCollapsible, McCollapsibleContent, McCollapsibleTrigger } from '../ui/mc-collapsible';

export default function McCollapsibleDemo() {
  return (
    <McCollapsible className="w-full max-w-sm space-y-2">
      <McCollapsibleTrigger
        render={
          <McButton variant="tertiary" size="sm">
            Toggle collapse
          </McButton>
        }
      />
      <McCollapsibleContent className="rounded-lg border border-border bg-card p-4 text-sm text-card-foreground">
        This is the collapsible content.
      </McCollapsibleContent>
    </McCollapsible>
  );
}
