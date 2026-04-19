import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/mc-tooltip';

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover</Button>} />
      <TooltipContent
        title="Lovely tooltip title"
        desc="There are a lot of things you can do in space."
      />
    </Tooltip>
  );
}
