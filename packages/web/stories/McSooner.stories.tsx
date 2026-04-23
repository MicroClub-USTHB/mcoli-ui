'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { McButton } from '@/registry/ui/mc-button';
import { McSonner, Toaster, toast } from '@/registry/ui/mc-sonner';

const meta: Meta = {
  title: 'Components/McSonner',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <>
      <McSonner></McSonner>
    </>
  ),
};
