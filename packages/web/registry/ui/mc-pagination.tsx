import * as React from 'react';
import { LuChevronLeft, LuChevronRight, LuEllipsis } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { DOTS, usePagination } from '../hooks/use-pagination';
import { McButton } from './mc-button';

function McPaginationRoot({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(className)}
      {...props}
    />
  );
}

function McPaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function McPaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type McPaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof McButton>;

function McPaginationLink({ className, isActive, ...props }: McPaginationLinkProps) {
  return (
    <McButton
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      variant={isActive ? 'primary' : 'tertiary'}
      className={cn('w-7 h-7 text-xs rounded-[4px] border border-border', className)}
      {...props}
    />
  );
}

function McPaginationPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<typeof McPaginationLink>) {
  return (
    <McButton
      data-slot="pagination-previous"
      aria-label="Go to previous page"
      className={cn('h-7 text-xs rounded-[4px] border border-border', className)}
      {...props}
    >
      <LuChevronLeft className="rtl:rotate-180" />
      <span className="hidden md:inline-block">{children}</span>
    </McButton>
  );
}

function McPaginationNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof McPaginationLink>) {
  return (
    <McButton
      data-slot="pagination-next"
      aria-label="Go to next page"
      className={cn('h-7 text-xs rounded-[4px] border border-border', className)}
      {...props}
    >
      <span className="hidden md:inline-block">{children}</span>
      <LuChevronRight className="rtl:rotate-180" />
    </McButton>
  );
}

function McPaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        'flex size-7 items-center rounded-[4px] justify-center border border-border',
        className
      )}
      {...props}
    >
      <LuEllipsis className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export interface McPaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;

  previousButtonLabel?: string;
  nextButtonLabel?: string;
}

function McPagination({
  page,
  totalPages,
  onPageChange,
  previousButtonLabel,
  nextButtonLabel,
}: McPaginationProps) {
  const pagination = usePagination({ page, totalPages });

  if (!totalPages || totalPages <= 1 || !pagination) return null;

  const nextDisabled = page >= totalPages;
  const prevDisabled = page <= 1;

  const onNextClick = (p: number) => {
    if (nextDisabled) return;

    onPageChange(p);
  };
  const onPrevClick = (p: number) => {
    if (prevDisabled) return;
    onPageChange(p);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <McPaginationRoot>
        <McPaginationContent>
          <McPaginationItem>
            <McPaginationPrevious disabled={prevDisabled} onClick={() => onPrevClick(page - 1)}>
              {previousButtonLabel}
            </McPaginationPrevious>
          </McPaginationItem>
          {pagination.map((item, index) => {
            const key = `${item}-${index}`;
            if (item === DOTS) {
              return (
                <McPaginationItem key={key}>
                  <McPaginationEllipsis />
                </McPaginationItem>
              );
            }

            return (
              <McPaginationItem key={key}>
                <McPaginationLink
                  onClick={() => onPageChange(item as number)}
                  isActive={item === page}
                >
                  {item}
                </McPaginationLink>
              </McPaginationItem>
            );
          })}
          <McPaginationItem>
            <McPaginationNext disabled={nextDisabled} onClick={() => onNextClick(page + 1)}>
              {nextButtonLabel}
            </McPaginationNext>
          </McPaginationItem>
        </McPaginationContent>
      </McPaginationRoot>
    </div>
  );
}

export { McPagination };
