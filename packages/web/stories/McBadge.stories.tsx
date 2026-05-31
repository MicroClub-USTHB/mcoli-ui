import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ArrowRight, ArrowUp, Dot, X } from 'lucide-react';
import { McBadge } from '@/registry/ui/mc-badge';

type IconChoice = 'none' | 'dot' | 'arrowUp' | 'x' | 'arrowRight';
type IconPlacement = 'none' | 'start' | 'end';
type BadgeStoryArgs = ComponentProps<typeof McBadge> & {
  iconChoice?: IconChoice;
  iconPlacement?: IconPlacement;
  leadingBadgePosition?: 'start' | 'end';
  groupSize?: 'md' | 'lg';
};

const meta: Meta<BadgeStoryArgs> = {
  title: 'Components/McBadge',
  component: McBadge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconPlacement: {
      control: 'select',
      options: ['none', 'start', 'end'],
    },
    iconChoice: {
      control: 'select',
      options: ['none', 'dot', 'arrowUp', 'x', 'arrowRight'],
    },
    leadingBadgePosition: {
      control: 'select',
      options: ['start', 'end'],
    },
    groupSize: {
      control: 'select',
      options: ['md', 'lg'],
    },
    icon: { control: false },
    iconPosition: { control: false },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'sm',
    iconPlacement: 'none',
    iconChoice: 'none',
    leadingBadgePosition: 'start',
    groupSize: 'md',
  },
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Playground: Story = {
  parameters: {
    controls: {
      exclude: ['leadingBadgePosition', 'groupSize'],
    },
  },
  render: ({ iconChoice, iconPlacement, ...args }) => {
    const iconMap = {
      none: undefined,
      dot: <Dot />,
      arrowUp: <ArrowUp />,
      x: <X />,
      arrowRight: <ArrowRight />,
    } as const;

    const icon = iconMap[iconChoice as keyof typeof iconMap];
    const resolvedIconPosition = iconPlacement === 'none' ? undefined : iconPlacement;

    return <McBadge {...args} icon={icon} iconPosition={resolvedIconPosition} />;
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <McBadge {...args} variant="default">
        Default
      </McBadge>
      <McBadge {...args} variant="secondary">
        Secondary
      </McBadge>
      <McBadge {...args} variant="destructive">
        Destructive
      </McBadge>
      <McBadge {...args} variant="outline">
        Outline
      </McBadge>
      <McBadge {...args} variant="ghost">
        Ghost
      </McBadge>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <McBadge {...args} size="sm">
        Small
      </McBadge>
      <McBadge {...args} size="md">
        Medium
      </McBadge>
      <McBadge {...args} size="lg">
        Large
      </McBadge>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: 'Badge',
    iconPlacement: 'start',
    iconChoice: 'dot',
  },
  render: ({ iconChoice, iconPlacement, ...args }) => {
    const iconMap = {
      none: undefined,
      dot: <Dot />,
      arrowUp: <ArrowUp />,
      x: <X />,
      arrowRight: <ArrowRight />,
    } as const;

    const icon = iconMap[iconChoice as keyof typeof iconMap];
    const resolvedIconPosition = iconPlacement === 'none' ? undefined : iconPlacement;

    return <McBadge {...args} icon={icon} iconPosition={resolvedIconPosition} />;
  },
};

export const WithLeadingBadge: Story = {
  parameters: {
    controls: {
      exclude: ['iconPlacement', 'size'],
    },
  },
  render: ({ iconChoice, ...args }) => {
    const iconMap = {
      none: undefined,
      dot: <Dot />,
      arrowUp: <ArrowUp />,
      x: <X />,
      arrowRight: <ArrowRight />,
    } as const;

    const chosenIcon = iconMap[iconChoice as keyof typeof iconMap];
    const parentIcon = args.leadingBadgePosition === 'start' ? chosenIcon : undefined;
    const leadingBadgeIcon = args.leadingBadgePosition === 'end' ? chosenIcon : undefined;

    return (
      <McBadge
        {...args}
        icon={parentIcon}
        iconPosition="end"
        leadingBadge="New"
        leadingBadgePosition={args.leadingBadgePosition}
        leadingBadgeIcon={leadingBadgeIcon}
      >
        Badge Group
      </McBadge>
    );
  },
};
