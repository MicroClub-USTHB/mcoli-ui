// alert-dialog.stories.tsx

import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McAlertDialog,
  McAlertDialogTrigger,
  McAlertDialogContent,
  McAlertDialogHeader,
  McAlertDialogFooter,
  McAlertDialogTitle,
  McAlertDialogDescription,
  McAlertDialogAction,
  McAlertDialogCancel,
} from '@/registry/ui/mc-alert-dialog';
import { McButton } from '@/components/ui/mc-button';
import { TrashIcon } from 'lucide-react';

const meta: Meta<typeof McAlertDialog> = {
  title: 'Components/McAlertDialog',
  component: McAlertDialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof McAlertDialog>;

export const Default: Story = {
  render: () => (
    <McAlertDialog>
      <McAlertDialogTrigger>
        <McButton>Open Dialog</McButton>
      </McAlertDialogTrigger>

      <McAlertDialogContent>
        <McAlertDialogHeader>
          <McAlertDialogTitle>Delete item</McAlertDialogTitle>
          <McAlertDialogDescription>
            This action cannot be undone. This will permanently delete your item.
          </McAlertDialogDescription>
        </McAlertDialogHeader>

        <McAlertDialogFooter>
          <McAlertDialogCancel>Cancel</McAlertDialogCancel>
          <McAlertDialogAction>Delete</McAlertDialogAction>
        </McAlertDialogFooter>
      </McAlertDialogContent>
    </McAlertDialog>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <McAlertDialog>
      <McAlertDialogTrigger>
        <McButton destructive>Delete</McButton>
      </McAlertDialogTrigger>

      <McAlertDialogContent>
        <McAlertDialogHeader>
          <McAlertDialogTitle media icon={<TrashIcon />}>
            Delete account
          </McAlertDialogTitle>
          <McAlertDialogDescription>
            Deleting your account is permanent. All your data will be removed and cannot be
            recovered.
          </McAlertDialogDescription>
        </McAlertDialogHeader>

        <McAlertDialogFooter>
          <McAlertDialogCancel>Cancel</McAlertDialogCancel>
          <McAlertDialogAction>Confirm</McAlertDialogAction>
        </McAlertDialogFooter>
      </McAlertDialogContent>
    </McAlertDialog>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <McAlertDialog>
      <McAlertDialogTrigger>
        <McButton variant="secondary">Open Small Dialog</McButton>
      </McAlertDialogTrigger>

      <McAlertDialogContent size="sm">
        <McAlertDialogHeader>
          <McAlertDialogTitle>Are you sure?</McAlertDialogTitle>
          <McAlertDialogDescription>This is a compact alert dialog.</McAlertDialogDescription>
        </McAlertDialogHeader>

        <McAlertDialogFooter>
          <McAlertDialogCancel>Cancel</McAlertDialogCancel>
          <McAlertDialogAction>Continue</McAlertDialogAction>
        </McAlertDialogFooter>
      </McAlertDialogContent>
    </McAlertDialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <McAlertDialog>
      <McAlertDialogTrigger>
        <McButton>Open Long Content</McButton>
      </McAlertDialogTrigger>
      <McAlertDialogContent>
        <McAlertDialogHeader>
          <McAlertDialogTitle>Terms and Conditions</McAlertDialogTitle>
          <McAlertDialogDescription>
            By continuing, you agree to our terms and conditions. Please read them carefully before
            proceeding. This dialog demonstrates how longer text behaves within the layout.
          </McAlertDialogDescription>
        </McAlertDialogHeader>

        <McAlertDialogFooter>
          <McAlertDialogCancel>Decline</McAlertDialogCancel>
          <McAlertDialogAction>Accept</McAlertDialogAction>
        </McAlertDialogFooter>
      </McAlertDialogContent>
    </McAlertDialog>
  ),
};
