import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { McCard, McCardFooter, McCardHeader } from '@/registry/ui/mc-card';
import { McButton } from '@/registry/ui/mc-button';

type McCardStoryProps = React.ComponentProps<typeof McCard> & {
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  footerDirection: 'row' | 'column';
  footerAlign: 'start' | 'end' | 'center' | 'stretch';
};

const meta: Meta<McCardStoryProps> = {
  title: 'Components/McCard',
  component: McCard,
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    primaryAction: { control: 'text' },
    secondaryAction: { control: 'text' },
    footerDirection: { control: 'inline-radio', options: ['row', 'column'] },
    footerAlign: { control: 'select', options: ['start', 'end', 'center', 'stretch'] },
  },
  args: {
    title: 'Card title',
    description: 'Supporting copy that explains the card purpose in one or two lines.',
    primaryAction: 'Action',
    secondaryAction: 'Action',
    footerDirection: 'row',
    footerAlign: 'stretch',
  },
};

export default meta;
type Story = StoryObj<McCardStoryProps>;

export const Playground: Story = {
  render: ({
    title,
    description,
    primaryAction,
    secondaryAction,
    footerDirection,
    footerAlign,
    ...cardProps
  }) => (
    <McCard {...cardProps}>
      <McCardHeader title={title} description={description} />
      <div className="border border-dashed border-primary/35 p-4 text-sm pb-12">
        <p>Replace this block with charts, media, forms, or any layout you need.</p>
      </div>
      <McCardFooter direction={footerDirection} align={footerAlign}>
        <McButton variant="secondary" size="sm">
          {secondaryAction}
        </McButton>
        <McButton variant="primary" size="sm">
          {primaryAction}
        </McButton>
      </McCardFooter>
    </McCard>
  ),
};

export const WithCustomContent: StoryObj<McCardStoryProps & { content: string }> = {
  args: {
    title: 'Project overview',
    description: 'Key metrics for this sprint.',
    primaryAction: 'Save',
    secondaryAction: 'Cancel',
    content: 'Content area should be replaced with charts, media, forms, or any layout you need.',
  },
  render: ({
    title,
    description,
    primaryAction,
    secondaryAction,
    footerDirection,
    footerAlign,
    content,
    ...cardProps
  }) => (
    <McCard {...cardProps}>
      <McCardHeader title={title} description={description} />
      <div className="border border-dashed border-primary/35 p-4 text-sm pb-12">
        <p>{content}</p>
      </div>
      <McCardFooter direction={footerDirection} align={footerAlign}>
        <McButton variant="tertiary" size="md">
          {secondaryAction}
        </McButton>
        <McButton variant="primary" size="md">
          {primaryAction}
        </McButton>
      </McCardFooter>
    </McCard>
  ),
};
