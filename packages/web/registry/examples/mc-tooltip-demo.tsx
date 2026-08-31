import { McButton } from '@/components/ui/mc-button';
import { McTooltip, McTooltipContent, McTooltipTrigger } from '../ui/mc-tooltip';

export default function McTooltipDemo() {
  return (
    <McTooltip>
      <McTooltipTrigger render={<McButton variant="secondary">Hover</McButton>} />
      <McTooltipContent
        title="Lovely tooltip title"
        desc="There are a lot of things you can do in space."
      />
    </McTooltip>
  );
}
