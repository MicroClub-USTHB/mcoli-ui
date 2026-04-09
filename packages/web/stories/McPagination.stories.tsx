import type { Meta, StoryObj } from '@storybook/nextjs';
import { McButton } from '@/registry/ui/mc-button';
import { ArrowRight, Plus, Mail } from 'lucide-react';

const meta: Meta<typeof McButton> = {
  title: 'Components/McButton',
  component: McButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    icon: {
      control: 'select',
      options: ['none', 'leading', 'trailing', 'dot', 'only'],
    },
    destructive: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconDefinition: {
      control: { type: 'select' },
      options: ['None', 'Mail', 'ArrowRight', 'Plus'],
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    icon: 'none',
    destructive: false,
    isLoading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof McButton>;

const iconMap = {
  None: undefined,
  Mail: <Mail />,
  ArrowRight: <ArrowRight />,
  Plus: <Plus />,
};

export const Playground: Story = {
  args: {
    children: 'Button CTA',
  },
  render: ({ iconDefinition, ...args }) => (
    <McButton {...args} iconDefinition={iconMap[iconDefinition as keyof typeof iconMap]} />
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <McButton {...args} variant="primary">
        Primary
      </McButton>
      <McButton {...args} variant="secondary">
        Secondary
      </McButton>
      <McButton {...args} variant="tertiary">
        Tertiary
      </McButton>
      <McButton {...args} variant="link">
        Link
      </McButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <McButton {...args} size="sm">
        Small
      </McButton>
      <McButton {...args} size="md">
        Medium
      </McButton>
      <McButton {...args} size="lg">
        Large
      </McButton>
      <McButton {...args} size="xl">
        Extra Large
      </McButton>
    </div>
  ),
};

export const Icons: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <McButton {...args} icon="leading" iconDefinition={<Mail />}>
        Leading Icon
      </McButton>
      <McButton {...args} icon="trailing" iconDefinition={<ArrowRight />}>
        Trailing Icon
      </McButton>
      <McButton {...args} icon="dot">
        Dot Icon
      </McButton>
      <McButton {...args} icon="only" iconDefinition={<Plus />} />
    </div>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <McButton {...args} destructive variant="primary">
        Primary
      </McButton>
      <McButton {...args} destructive variant="secondary">
        Secondary
      </McButton>
      <McButton {...args} destructive variant="tertiary">
        Tertiary
      </McButton>
      <McButton {...args} destructive variant="link">
        Link
      </McButton>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <McButton {...args} isLoading>
        Loading
      </McButton>
      <McButton {...args} disabled>
        Disabled
      </McButton>
      <McButton {...args} variant="link" icon="leading">
        Auto Link Icon
      </McButton>
    </div>
  ),
};

export const IconOnlySizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <McButton {...args} icon="only" iconDefinition={<Plus />} size="sm" />
      <McButton {...args} icon="only" iconDefinition={<Plus />} size="md" />
      <McButton {...args} icon="only" iconDefinition={<Plus />} size="lg" />
      <McButton {...args} icon="only" iconDefinition={<Plus />} size="xl" />
    </div>
  ),
};
