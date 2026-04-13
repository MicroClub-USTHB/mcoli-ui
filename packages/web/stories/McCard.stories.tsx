import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { McCard, McCardContent, McCardFooter, McCardHeader } from '@/registry/ui/mc-card';
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
      <div className="max-w-xs [&:has(.flex-row:is([data-slot='card']))]:max-w-100">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    primaryAction: { control: 'text' },
    secondaryAction: { control: 'text' },
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    footerDirection: { control: 'inline-radio', options: ['row', 'column'] },
    footerAlign: { control: 'select', options: ['start', 'end', 'center', 'stretch'] },
  },
  args: {
    title: 'Card title',
    description: 'Supporting copy that explains the card purpose in one or two lines.',
    primaryAction: 'Action',
    secondaryAction: 'Action',
    direction: 'column',
    footerDirection: 'row',
    footerAlign: 'end',
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
    direction,
    footerDirection,
    footerAlign,
    ...cardProps
  }) => (
    <McCard direction={direction} {...cardProps}>
      <McCardHeader title={title} description={description} />
      <McCardContent>
        <p className="border border-dashed border-primary/35 p-4 text-sm pb-12">
          Replace this block with charts, media, forms, or any layout you need.
        </p>
      </McCardContent>
      <McCardFooter direction={footerDirection} align={footerAlign}>
        {secondaryAction && (
          <McButton variant="secondary" size="sm">
            {secondaryAction}
          </McButton>
        )}
        {primaryAction && (
          <McButton variant="primary" size="sm">
            {primaryAction}
          </McButton>
        )}
      </McCardFooter>
    </McCard>
  ),
};

export const WithCustomContent: StoryObj<McCardStoryProps & { content: string }> = {
  args: {
    title: 'File Preview',
    description: 'You are now previewing file: example-10mb.png',
    primaryAction: 'Download',
    secondaryAction: '',
    content: 'Content area should be replaced with charts, media, forms, or any layout you need.',
    footerDirection: 'column',
    footerAlign: 'stretch',
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
      <McCardContent>
        <img
          src="https://picsum.photos/600/400"
          alt="Placeholder"
          className="object-cover overflow-hidden"
        />
      </McCardContent>
      <McCardFooter direction={footerDirection} align={footerAlign}>
        {secondaryAction && (
          <McButton variant="secondary" size="sm">
            {secondaryAction}
          </McButton>
        )}
        {primaryAction && (
          <McButton variant="primary" size="sm">
            {primaryAction}
          </McButton>
        )}
      </McCardFooter>
    </McCard>
  ),
};

export const RowDirection: StoryObj<McCardStoryProps & { content: string }> = {
  args: {
    title: 'User Created',
    description: 'Create a new user with the details.',
    primaryAction: 'Done',
    secondaryAction: '',
    content: 'Content area should be replaced with charts, media, forms, or any layout you need.',
    direction: 'row',
    footerDirection: 'row',
    footerAlign: 'start',
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
      <McCardContent>
        <img
          src="https://picsum.photos/400/400"
          alt="Placeholder"
          className="object-cover overflow-hidden aspect-square h-14"
        />
      </McCardContent>
      <McCardHeader title={title} description={description} />
      <McCardFooter direction={footerDirection} align={footerAlign}>
        {secondaryAction && (
          <McButton variant="secondary" size="sm">
            {secondaryAction}
          </McButton>
        )}
        {primaryAction && (
          <McButton variant="primary" size="sm">
            {primaryAction}
          </McButton>
        )}
      </McCardFooter>
    </McCard>
  ),
};
