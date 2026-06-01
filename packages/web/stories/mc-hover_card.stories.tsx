import type { Meta, StoryObj } from '@storybook/nextjs';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/registry/ui/mc_hover-hard';

type DemoProps = {
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
};

function ProfileHoverCard({
  side = 'bottom',
  align = 'center',
  sideOffset = 4,
  alignOffset = 0,
}: DemoProps) {
  return (
    <div className="flex h-100 items-center justify-center">
      <HoverCard>
        <HoverCardTrigger>
          <button type="button" className="cursor-pointer rounded-full">
            hover me
          </button>
        </HoverCardTrigger>

        <HoverCardContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          imageSrc="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww"
          title="John Doe"
          subtitle="Software Engineer"
          description="John is a software engineer with 5 years of experience in web development. He loves working with React and TypeScript."
        ></HoverCardContent>
      </HoverCard>
    </div>
  );
}

const meta: Meta<typeof ProfileHoverCard> = {
  title: 'Components/HoverCard',
  component: ProfileHoverCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    sideOffset: {
      control: {
        type: 'number',
      },
    },
    alignOffset: {
      control: {
        type: 'number',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileHoverCard>;

export const Playground: Story = {
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 4,
    alignOffset: 0,
  },
};

export const Top: Story = {
  args: {
    side: 'top',
    align: 'center',
    sideOffset: 8,
    alignOffset: 0,
  },
};

export const Bottom: Story = {
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 8,
    alignOffset: 0,
  },
};

export const Left: Story = {
  args: {
    side: 'left',
    align: 'center',
    sideOffset: 8,
    alignOffset: 0,
  },
};

export const Right: Story = {
  args: {
    side: 'right',
    align: 'center',
    sideOffset: 8,
    alignOffset: 0,
  },
};

export const AlignStart: Story = {
  args: {
    side: 'bottom',
    align: 'start',
    sideOffset: 8,
    alignOffset: 0,
  },
};

export const AlignCenter: Story = {
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 8,
    alignOffset: 0,
  },
};

export const AlignEnd: Story = {
  args: {
    side: 'bottom',
    align: 'end',
    sideOffset: 8,
    alignOffset: 0,
  },
};

export const LargeSideOffset: Story = {
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 32,
    alignOffset: 0,
  },
};

export const LargeAlignOffset: Story = {
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 8,
    alignOffset: 40,
  },
};
