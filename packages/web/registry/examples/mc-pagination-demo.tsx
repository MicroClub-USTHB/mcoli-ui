import * as React from 'react';
import {
  McPagination,
  McPaginationContent,
  McPaginationEllipsis,
  McPaginationItem,
  McPaginationLink,
  McPaginationNext,
  McPaginationPrevious,
} from '@/registry/ui/mc-pagination';

export default function McPaginationComponentDemo() {
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
          <McPaginationPrevious href="#" onClick={goToPreviousPage} />
        </McPaginationItem>
        {pages.map((page) => (
          <McPaginationItem key={page}>
            <McPaginationLink href="#" isActive={activePage === page} onClick={selectPage(page)}>
              {page}
            </McPaginationLink>
          </McPaginationItem>
        ))}
        <McPaginationItem>
          <McPaginationEllipsis />
        </McPaginationItem>
        <McPaginationItem>
          <McPaginationNext href="#" onClick={goToNextPage} />
        </McPaginationItem>
      </McPaginationContent>
    </McPagination>
  );
}
