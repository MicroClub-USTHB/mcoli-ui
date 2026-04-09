import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McPagination,
  McPaginationContent,
  McPaginationItem,
  McPaginationLink,
  McPaginationPrevious,
  McPaginationNext,
  type McPaginationSize,
} from '@/registry/ui/mc-pagination';

type McPaginationStoryArgs = {
  size: McPaginationSize;
};

const meta: Meta<McPaginationStoryArgs> = {
  title: 'Components/McPagination',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<McPaginationStoryArgs>;

function McPaginationPlayground({ size }: McPaginationStoryArgs) {
  const [activePage, setActivePage] = React.useState(2);
  const pages = [1, 2, 3];

  const selectPage = (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActivePage(page);
  };

  const goToPreviousPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActivePage((currentPage) => Math.max(1, currentPage - 1));
  };

  const goToNextPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActivePage((currentPage) => Math.min(pages.length, currentPage + 1));
  };

  return (
    <McPagination>
      <McPaginationContent>
        <McPaginationItem>
          <McPaginationPrevious href="#" paginationSize={size} onClick={goToPreviousPage} />
        </McPaginationItem>
        {pages.map((page) => (
          <McPaginationItem key={page}>
            <McPaginationLink
              href="#"
              isActive={activePage === page}
              paginationSize={size}
              onClick={selectPage(page)}
            >
              {page}
            </McPaginationLink>
          </McPaginationItem>
        ))}
        <McPaginationItem>
          <McPaginationNext href="#" paginationSize={size} onClick={goToNextPage} />
        </McPaginationItem>
      </McPaginationContent>
    </McPagination>
  );
}

export const Playground: Story = {
  render: ({ size }) => <McPaginationPlayground size={size} />,
};
