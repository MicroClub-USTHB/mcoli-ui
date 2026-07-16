import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { MoreHorizontalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
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

function McPaginationWithManyItems({ isRounded, showText }: McPaginationStoryArgs) {
  const [activePage, setActivePage] = React.useState(2);
  const totalPages = 10;

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
    setActivePage((currentPage) => Math.min(totalPages, currentPage + 1));
  };

  const Ellipsis = () => (
    <span
      aria-hidden
      className={cn('flex size-8 items-center justify-center [&_svg:not([class*="size-"])]:size-4')}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= activePage - 1 && i <= activePage + 1)) {
        pages.push(
          <McPaginationItem key={i}>
            <McPaginationLink
              href="#"
              isActive={activePage === i}
              isRounded={isRounded}
              onClick={selectPage(i)}
            >
              {i}
            </McPaginationLink>
          </McPaginationItem>
        );
      } else if (i === activePage - 2 || i === activePage + 2) {
        pages.push(
          <McPaginationItem key={i}>
            <Ellipsis />
          </McPaginationItem>
        );
      }
    }
    return pages;
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
        {renderPages()}
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

export const WithManyItems: Story = {
  render: ({ isRounded, showText }) => (
    <McPaginationWithManyItems isRounded={isRounded} showText={showText} />
  ),
};
