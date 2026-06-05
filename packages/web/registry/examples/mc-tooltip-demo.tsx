import { Button } from '@/components/ui/button';
import { McTooltip, McTooltipContent, McTooltipTrigger } from '../ui/mc-tooltip';

export default function McTooltipDemo() {
  return (
    <McTooltip>
      <McTooltipTrigger render={<Button variant="outline">Hover</Button>} />
      <McTooltipContent
        title="Lovely tooltip title"
        desc="There are a lot of things you can do in space."
      />
    </McTooltip>
  );
}
