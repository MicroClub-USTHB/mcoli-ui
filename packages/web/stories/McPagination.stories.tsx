import type { Meta, StoryObj } from '@storybook/nextjs';
import { McPagination } from '@/registry/ui/mc-pagination';
import { useState } from 'react';

const meta: Meta<typeof McPagination> = {
  title: 'Components/McPagination',
  component: McPagination,
  argTypes: {
    onPageChange: { action: 'onPageChange' },
  },
  args: {
    nextButtonLabel: 'Next',
    previousButtonLabel: 'Previous',
    totalPages: 10,
  },
};

export default meta;
type Story = StoryObj<typeof McPagination>;

export const Showcase: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.page || 1);

    return (
      <McPagination
        {...args}
        page={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          args.onPageChange?.(page);
        }}
      />
    );
  },
  args: {
    page: 1,
    totalPages: 9,
  },
};

export const ManyPages: Story = {
  ...Showcase,
  args: {
    page: 5,
    totalPages: 50,
  },
};

export const Start: Story = {
  args: {
    page: 1,
    totalPages: 5,
  },
};
