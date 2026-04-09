import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function McPagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function McPaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex items-center gap-4 p-4', className)}
      {...props}
    />
  );
}

function McPaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>;

function McPaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-2 text-md font-sans',
        isActive && 'rounded-[6px] bg-primary text-md font-sans text-primary-foreground',
        className
      )}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? 'page' : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}

function McPaginationPrevious({
  className,
  text = 'Back',
  ...props
}: React.ComponentProps<typeof McPaginationLink> & { text?: string }) {
  return (
    <McPaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('pl-1.5!', className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" className="cn-rtl-flip h-4 w-4 shrink-0" />
      <span className="hidden items-center leading-none sm:inline-flex">{text}</span>
    </McPaginationLink>
  );
}

function McPaginationNext({
  className,
  text = 'Next',
  ...props
}: React.ComponentProps<typeof McPaginationLink> & { text?: string }) {
  return (
    <McPaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('pr-1.5!', className)}
      {...props}
    >
      <span className="hidden items-center leading-none sm:inline-flex">{text}</span>
      <ChevronRightIcon data-icon="inline-end" className="cn-rtl-flip h-4 w-4 shrink-0" />
    </McPaginationLink>
  );
}

function McPaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  McPagination,
  McPaginationContent,
  McPaginationEllipsis,
  McPaginationItem,
  McPaginationLink,
  McPaginationNext,
  McPaginationPrevious,
};
