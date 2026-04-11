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
  isRounded: boolean;
  showText: boolean;
};

const meta: Meta<McPaginationStoryArgs> = {
  title: 'Components/McPagination',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    isRounded: {
      control: 'boolean',
    },
    showText: {
      control: 'boolean',
    },
  },
  args: {
    size: 'md',
    isRounded: false,
    showText: true,
  },
};

export default meta;
type Story = StoryObj<McPaginationStoryArgs>;

function McPaginationPlayground({ size, isRounded, showText }: McPaginationStoryArgs) {
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
          <McPaginationPrevious
            href="#"
            paginationSize={size}
            isRounded={isRounded}
            showText={showText}
            onClick={goToPreviousPage}
          />
        </McPaginationItem>
        {pages.map((page) => (
          <McPaginationItem key={page}>
            <McPaginationLink
              href="#"
              isActive={activePage === page}
              isRounded={isRounded}
              paginationSize={size}
              onClick={selectPage(page)}
            >
              {page}
            </McPaginationLink>
          </McPaginationItem>
        ))}
        <McPaginationItem>
          <McPaginationNext
            href="#"
            paginationSize={size}
            isRounded={isRounded}
            showText={showText}
            onClick={goToNextPage}
          />
        </McPaginationItem>
      </McPaginationContent>
    </McPagination>
  );
}

export const Playground: Story = {
  render: ({ size, isRounded, showText }) => (
    <McPaginationPlayground size={size} isRounded={isRounded} showText={showText} />
  ),
};
