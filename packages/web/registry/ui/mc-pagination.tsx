import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0'
);

export interface McButtonProps
  extends Omit<ButtonPrimitive.Props, 'icon'>, Omit<VariantProps<typeof buttonVariants>, 'icon'> {
  iconDefinition?: React.ReactNode;

  isLoading?: boolean;
}

function McButton({
  className,

  ...props
}: McButtonProps) {
  return <ButtonPrimitive className={cn(buttonVariants({ className }))} {...props} />;
}

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
  return <li className="" data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  isRounded?: boolean;
} & React.ComponentProps<'a'>;

function McPaginationLink({
  className,
  isActive,
  isRounded,

  ...props
}: PaginationLinkProps) {
  return (
    <McButton
      className={cn(
        'flex items-center  rounded-[6px] px-4 py-2   hover:bg-secondary paragraph-md font-normal justify-center gap-2 font-sans',

        isActive &&
          'rounded-[6px] bg-primary px-4 py-2 text-md font-dm-sans h-min-[40px] w-min-[37px] pointer-events-none cursor-default text-primary-foreground hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground active:ring-0',
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

  ...props
}: React.ComponentProps<typeof McPaginationLink> & { text?: string; showText?: boolean }) {
  return (
    <McPaginationLink
      aria-label="Go to previous page"
      className={cn('pl-1.5!', className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" className={cn('cn-rtl-flip shrink-0')} />
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

  ...props
}: React.ComponentProps<typeof McPaginationLink> & { text?: string; showText?: boolean }) {
  return (
    <McPaginationLink aria-label="Go to next page" className={cn('pr-1.5!', className)} {...props}>
      {showText && text && (
        <span className="hidden items-center leading-none font-dm-sans paragraph-md font-normal sm:inline-flex">
          {text}
        </span>
      )}
      <ChevronRightIcon data-icon="inline-end" className={cn('cn-rtl-flip shrink-0')} />
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
