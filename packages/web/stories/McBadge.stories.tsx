import type { Meta, StoryObj } from '@storybook/nextjs';
import { ArrowRight, ArrowUp, Plus, X } from 'lucide-react';
import { Fragment, type ComponentProps } from 'react';
import { McBadge, McBadgeDot, McBadgeGroup, McBadgeGroupText } from '@/registry/ui/mc-badge';

type Content = 'none' | 'dot' | 'icon-left' | 'icon-right' | 'x-close' | 'icon-only' | 'image';

type BadgeStoryArgs = ComponentProps<typeof McBadge> & {
  content?: Content;
};

const FLAG = 'https://flagcdn.com/w40/au.png';

function renderBadge({ content = 'none', children, ...args }: BadgeStoryArgs) {
  switch (content) {
    case 'dot':
      return (
        <McBadge {...args} icon={<McBadgeDot />}>
          {children}
        </McBadge>
      );
    case 'icon-left':
      return (
        <McBadge {...args} icon={<ArrowUp />}>
          {children}
        </McBadge>
      );
    case 'icon-right':
      return (
        <McBadge {...args} icon={<ArrowRight />} iconPosition="end">
          {children}
        </McBadge>
      );
    case 'x-close':
      return (
        <McBadge {...args} icon={<X />} iconPosition="end">
          {children}
        </McBadge>
      );
    case 'icon-only':
      return <McBadge {...args} icon={<Plus />} iconOnly aria-label="Add" />;
    case 'image':
      return (
        <McBadge {...args} image={FLAG} imageAlt="Australia">
          {children}
        </McBadge>
      );
    default:
      return <McBadge {...args}>{children}</McBadge>;
  }
}

const meta: Meta<BadgeStoryArgs> = {
  title: 'Components/McBadge',
  component: McBadge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'outline', 'ghost'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    content: {
      control: 'select',
      options: ['none', 'dot', 'icon-left', 'icon-right', 'x-close', 'icon-only', 'image'],
      description:
        'Maps to the Figma Icon property (Dot, Icon left, Icon right, X close, Only, Country/Avatar).',
    },
    children: { control: 'text' },
    icon: { control: false },
    iconPosition: { control: false },
    iconOnly: { control: false },
    image: { control: false },
    imageAlt: { control: false },
    imagePosition: { control: 'inline-radio', options: ['start', 'end'] },
    render: { control: false },
    className: { control: false },
  },
  args: {
    children: 'Label',
    variant: 'default',
    size: 'sm',
    content: 'none',
    imagePosition: 'start',
  },
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Playground: Story = {
  render: (args) => renderBadge(args),
};

export const Variants: Story = {
  parameters: { controls: { exclude: ['variant'] } },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(['default', 'primary', 'secondary', 'destructive', 'outline', 'ghost'] as const).map(
        (variant) => (
          <McBadge key={variant} {...args} variant={variant}>
            {variant}
          </McBadge>
        )
      )}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { exclude: ['size'] } },
  render: ({ content, ...args }) => (
    <div className="flex flex-wrap items-center gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Fragment key={size}>{renderBadge({ ...args, content, size })}</Fragment>
      ))}
    </div>
  ),
};

export const Icons: Story = {
  parameters: { controls: { exclude: ['content'] } },
  render: ({ variant }) => (
    <div className="flex flex-col items-start gap-3">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} className="flex flex-wrap items-center gap-3">
          {(['dot', 'icon-left', 'icon-right', 'x-close', 'icon-only', 'image'] as const).map(
            (content) => (
              <Fragment key={`${s}-${content}`}>
                {renderBadge({
                  children: content === 'icon-only' ? undefined : 'Label',
                  content,
                  size: s,
                  variant,
                })}
              </Fragment>
            )
          )}
        </div>
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  args: { content: 'image' },
  render: (args) => renderBadge(args),
};

type GroupStoryArgs = ComponentProps<typeof McBadgeGroup> & {
  badge?: string;
  text?: string;
  withIcon?: boolean;
};

export const Group: StoryObj<GroupStoryArgs> = {
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'lg'] },
    badgePosition: { control: 'inline-radio', options: ['leading', 'trailing'] },
    badge: { control: 'text' },
    text: { control: 'text' },
    withIcon: { control: 'boolean' },
    render: { control: false },
    className: { control: false },
  },
  args: {
    size: 'md',
    badgePosition: 'leading',
    badge: 'New feature',
    text: 'We’ve just released a new feature',
    withIcon: false,
  },
  render: ({ badge, text, withIcon, ...args }) =>
    args.badgePosition === 'trailing' ? (
      <McBadgeGroup {...args}>
        <McBadgeGroupText>{text}</McBadgeGroupText>
        <McBadge icon={withIcon ? <ArrowRight /> : undefined} iconPosition="end">
          {badge}
        </McBadge>
      </McBadgeGroup>
    ) : (
      <McBadgeGroup {...args}>
        <McBadge>{badge}</McBadge>
        <McBadgeGroupText icon={withIcon ? <ArrowRight /> : undefined}>{text}</McBadgeGroupText>
      </McBadgeGroup>
    ),
};

export const GroupMatrix: StoryObj = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {(['md', 'lg'] as const).map((size) =>
        (['leading', 'trailing'] as const).map((position) =>
          [false, true].map((withIcon) => (
            <McBadgeGroup
              key={`${size}-${position}-${withIcon}`}
              size={size}
              badgePosition={position}
            >
              {position === 'leading' ? (
                <>
                  <McBadge>New feature</McBadge>
                  <McBadgeGroupText icon={withIcon ? <ArrowRight /> : undefined}>
                    We’ve just released a new feature
                  </McBadgeGroupText>
                </>
              ) : (
                <>
                  <McBadgeGroupText>We’ve just released a new feature</McBadgeGroupText>
                  <McBadge icon={withIcon ? <ArrowRight /> : undefined} iconPosition="end">
                    New feature
                  </McBadge>
                </>
              )}
            </McBadgeGroup>
          ))
        )
      )}
    </div>
  ),
};
