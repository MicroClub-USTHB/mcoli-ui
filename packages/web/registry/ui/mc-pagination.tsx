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

type McPaginationSize = 'sm' | 'md' | 'lg' | 'xl';

const buttonSizeByPaginationSize: Record<McPaginationSize, 'sm' | 'default' | 'lg'> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
  xl: 'lg',
};

const linkClassByPaginationSize: Record<McPaginationSize, string> = {
  sm: 'px-3 text-sm',
  md: 'px-4 text-md',
  lg: 'px-5 text-base',
  xl: 'h-10 px-6 text-base',
};

const iconClassByPaginationSize: Record<McPaginationSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-4 w-4',
  xl: 'h-5 w-5',
};

type PaginationLinkProps = {
  isActive?: boolean;
  isRounded?: boolean;
  paginationSize?: McPaginationSize;
} & React.ComponentProps<'a'>;

function McPaginationLink({
  className,
  isActive,
  isRounded,
  paginationSize = 'md',
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={buttonSizeByPaginationSize[paginationSize]}
      className={cn(
        'flex items-center  font-dm-sans  font-normal justify-center gap-2 font-sans',
        linkClassByPaginationSize[paginationSize],
        isActive &&
          'rounded-[6px] bg-primary px-3.5 py-4.5 text-md font-dm-sans h-min-[40px] w-min-[37px] text-primary-foreground',
        isRounded && 'rounded-full',
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
  showText = true,
  paginationSize = 'md',
  ...props
}: React.ComponentProps<typeof McPaginationLink> & { text?: string; showText?: boolean }) {
  return (
    <McPaginationLink
      aria-label="Go to previous page"
      paginationSize={paginationSize}
      className={cn('pl-1.5!', className)}
      {...props}
    >
      <ChevronLeftIcon
        data-icon="inline-start"
        className={cn('cn-rtl-flip shrink-0', iconClassByPaginationSize[paginationSize])}
      />
      {showText && text && (
        <span className="hidden items-center leading-none font-dm-sans font-normal sm:inline-flex">
          {text}
        </span>
      )}
    </McPaginationLink>
  );
}

function McPaginationNext({
  className,
  text = 'Next',
  showText = true,
  paginationSize = 'md',
  ...props
}: React.ComponentProps<typeof McPaginationLink> & { text?: string; showText?: boolean }) {
  return (
    <McPaginationLink
      aria-label="Go to next page"
      paginationSize={paginationSize}
      className={cn('pr-1.5!', className)}
      {...props}
    >
      {showText && text && (
        <span className="hidden items-center leading-none font-dm-sans font-normal sm:inline-flex">
          {text}
        </span>
      )}
      <ChevronRightIcon
        data-icon="inline-end"
        className={cn('cn-rtl-flip shrink-0', iconClassByPaginationSize[paginationSize])}
      />
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
  type McPaginationSize,
};
