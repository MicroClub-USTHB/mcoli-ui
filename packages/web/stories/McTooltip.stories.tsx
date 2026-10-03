import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McTooltip,
  McTooltipTrigger,
  McTooltipContent,
  McTooltipProvider,
} from '../registry/ui/mc-tooltip';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

type McTooltipStoryArgs = {
  side: Side;
  align: Align;
  arrow: boolean;
  open: boolean;
};

const TITLE = 'Lovely tooltip title';
const DESCRIPTION =
  'There are a lot of things you can do in space, and space essentially is unlimited resources.';

const meta: Meta<McTooltipStoryArgs> = {
  title: 'Components/McTooltip',
  argTypes: {
    side: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    arrow: { control: 'boolean' },
    open: { control: 'boolean', description: 'Keep the tooltip open.' },
  },
  args: { side: 'top', align: 'center', arrow: true, open: true },
  // Grey canvas so the white tooltip is visible.
  decorators: [
    (Story) => (
      <div className="w-fit rounded-lg bg-[#e5e5e5] p-6">
        <McTooltipProvider delay={0}>
          <Story />
        </McTooltipProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<McTooltipStoryArgs>;

function Example({
  side,
  align,
  arrow = true,
  open,
  label = 'Hover me',
}: Partial<McTooltipStoryArgs> & { label?: string }) {
  return (
    <McTooltip open={open || undefined}>
      <McTooltipTrigger className="flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm">
        {label}
      </McTooltipTrigger>
      <McTooltipContent
        side={side}
        align={align}
        arrow={arrow}
        title={TITLE}
        description={DESCRIPTION}
      />
    </McTooltip>
  );
}

export const Playground: Story = {
  render: (args) => (
    // Room on every side so the tooltip doesn't flip.
    <div className="flex h-[420px] w-[720px] items-center justify-center">
      <Example {...args} />
    </div>
  ),
};

const PLACEMENTS: { side: Side; align: Align }[] = [
  { side: 'top', align: 'center' },
  { side: 'bottom', align: 'center' },
  { side: 'right', align: 'center' },
  { side: 'top', align: 'start' },
  { side: 'bottom', align: 'start' },
  { side: 'left', align: 'center' },
  { side: 'top', align: 'end' },
  { side: 'bottom', align: 'end' },
];

// Push each trigger to the cell edge opposite its tooltip so every tooltip fits in its own cell.
const CELL_POSITION: Record<Side, string> = {
  top: 'items-end justify-center',
  bottom: 'items-start justify-center',
  left: 'items-center justify-end',
  right: 'items-center justify-start',
};

export const AllPlacements: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-[repeat(3,360px)] gap-6">
      {PLACEMENTS.map(({ side, align }) => (
        <div key={`${side}-${align}`} className={`flex h-[170px] w-[360px] ${CELL_POSITION[side]}`}>
          <Example side={side} align={align} open label={`${side} ${align}`} />
        </div>
      ))}
      <div className="flex h-[170px] w-[360px] items-end justify-center">
        <Example arrow={false} open label="no arrow" />
      </div>
    </div>
  ),
};

export const WithoutArrow: Story = {
  args: { arrow: false },
  render: Playground.render,
};
