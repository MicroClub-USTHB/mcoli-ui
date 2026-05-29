import type { Meta, StoryObj } from '@storybook/nextjs';
import { McAlert } from '@/registry/ui/mc-alert';

const meta: Meta<typeof McAlert> = {
  title: 'Components/McAlert',
  component: McAlert,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof McAlert>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success! Your changes have been saved',
    description: 'This is an alert with icon, title and description.',
  },
};

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'This Alert has a title and an icon. No description.',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Unable to process your payment.',
    description: 'Please verify your billing information and try again.',
    items: ['Check your card details', 'Ensure sufficient funds', 'Verify billing address'],
  },
};
