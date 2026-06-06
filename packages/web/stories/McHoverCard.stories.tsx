import type { Meta, StoryObj } from '@storybook/nextjs';

import { McHoverCard, McHoverCardContent, McHoverCardTrigger } from '@/registry/ui/mc-hover-card';

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
      <McHoverCard>
        <McHoverCardTrigger>
          <button type="button" className="cursor-pointer rounded-full">
            hover me
          </button>
        </McHoverCardTrigger>

        <McHoverCardContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          textAlign="start"
          imageSrc="https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg?auto=compress%2Cformat&w=1222.3999999999999&h=687.6&q=90&ar=16%3A9&crop=faces&fit=crop"
          title="John Doe"
          subtitle="Software Engineer"
          description="John is a software engineer with 5 years of experience in web development. He loves working with React and TypeScript."
        ></McHoverCardContent>
      </McHoverCard>
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
