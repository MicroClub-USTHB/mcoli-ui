import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McPagination,
  McPaginationContent,
  McPaginationItem,
  McPaginationLink,
  McPaginationPrevious,
  McPaginationNext,
} from '@/registry/ui/mc-pagination';

type McPaginationStoryArgs = {
  isRounded: boolean;
  showText: boolean;
};

const meta: Meta<McPaginationStoryArgs> = {
  title: 'Components/McPagination',
  argTypes: {
    isRounded: {
      control: 'boolean',
    },
    showText: {
      control: 'boolean',
    },
  },
  args: {
    isRounded: false,
    showText: true,
  },
};

export default meta;
type Story = StoryObj<McPaginationStoryArgs>;

function McPaginationPlayground({ isRounded, showText }: McPaginationStoryArgs) {
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
              onClick={selectPage(page)}
            >
              {page}
            </McPaginationLink>
          </McPaginationItem>
        ))}
        <McPaginationItem>
          <McPaginationNext
            href="#"
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
  render: ({ isRounded, showText }) => (
    <McPaginationPlayground isRounded={isRounded} showText={showText} />
  ),
};
