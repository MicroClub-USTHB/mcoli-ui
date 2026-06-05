import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McTooltip,
  McTooltipTrigger,
  McTooltipContent,
  McTooltipProvider,
} from '../registry/ui/mc-tooltip';

type McTooltipStoryArgs = {
  side: 'top' | 'bottom' | 'left' | 'right';
  align: 'start' | 'center' | 'end';
};

const meta: Meta<McTooltipStoryArgs> = {
  title: 'Components/McTooltip',
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<McTooltipStoryArgs>;

function Box({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center w-32 h-16 border rounded-md bg-muted text-sm">
      {label}
    </div>
  );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <McTooltipProvider delay={0}>{children}</McTooltipProvider>
);

export const Playground: Story = {
  args: {
    side: 'top',
    align: 'center',
  },
  render: ({ side, align }) => (
    <div className="relative h-64 flex items-center justify-center">
      <Wrapper>
        <McTooltip>
          <McTooltipTrigger>
            <Box label="Hover me" />
          </McTooltipTrigger>
          <McTooltipContent
            side={side}
            align={align}
            title="Lovely tooltip title"
            desc="There are a lot of things you can do in space."
          />
        </McTooltip>
      </Wrapper>
    </div>
  ),
};
