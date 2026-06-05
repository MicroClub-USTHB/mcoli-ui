import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../registry/ui/mc-tooltip';

type TooltipStoryArgs = {
  side: 'top' | 'bottom' | 'left' | 'right';
  align: 'start' | 'center' | 'end';
};

const meta: Meta<TooltipStoryArgs> = {
  title: 'Components/Tooltip',
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
type Story = StoryObj<TooltipStoryArgs>;

function Box({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center w-32 h-16 border rounded-md bg-muted text-sm">
      {label}
    </div>
  );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider delay={0}>{children}</TooltipProvider>
);

export const Playground: Story = {
  args: {
    side: 'top',
    align: 'center',
  },
  render: ({ side, align }) => (
    <div className="relative h-64 flex items-center justify-center">
      <Wrapper>
        <Tooltip>
          <TooltipTrigger>
            <Box label="Hover me" />
          </TooltipTrigger>
          <TooltipContent
            side={side}
            align={align}
            title="Lovely tooltip title"
            desc="There are a lot of things you can do in space."
          />
        </Tooltip>
      </Wrapper>
    </div>
  ),
};
