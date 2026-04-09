'use client';

import * as React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationNext,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cva, type VariantProps } from 'class-variance-authority';
import { LinkIcon, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { McButtonProps } from './mc-pagination';
import { Props } from 'next/dist/client/script';

const paginationVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-secondary-foreground hover:text-secondary active:bg-secondary-foreground active:text-secondary active:ring-4 active:ring-secondary disabled:bg-muted disabled:text-muted-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground active:ring-4 active:ring-secondary disabled:bg-muted disabled:text-muted-foreground',
        tertiary:
          'bg-primary-foreground text-primary hover:text-accent-foreground active:text-accent-foreground active:ring-4 active:ring-secondary disabled:bg-muted disabled:text-muted-foreground',
        link: 'bg-transparent p-0 text-foreground underline hover:text-accent-foreground active:text-accent-foreground disabled:text-muted-foreground',
      },
      size: {
        sm: 'px-3.5 py-2 text-sm font-medium',
        md: 'px-4 py-2.5 text-sm font-medium',
        lg: 'px-[1.125rem] py-2.5 text-base font-medium',
        xl: 'px-5 py-3 text-base font-medium',
      },
      icon: {
        none: '',
        leading: 'gap-2',
        trailing: 'gap-2',
        dot: 'gap-2',
        only: '',
      },
      destructive: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        className: 'px-0 py-0',
      },
      {
        icon: 'only',
        size: 'sm',
        className: 'p-2',
      },
      {
        icon: 'only',
        size: 'md',
        className: 'p-2.5',
      },
      {
        icon: 'only',
        size: 'lg',
        className: 'p-3',
      },
      {
        icon: 'only',
        size: 'xl',
        className: 'p-3.5',
      },
      // Destructive overrides
      {
        destructive: true,
        variant: 'primary',
        className:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/90 active:ring-4 active:ring-destructive/20',
      },
      {
        destructive: true,
        variant: 'secondary',
        className:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 active:ring-4 active:ring-destructive/20',
      },
      {
        destructive: true,
        variant: 'tertiary',
        className:
          'text-destructive hover:bg-destructive/10 active:ring-4 active:ring-destructive/20',
      },
      {
        destructive: true,
        variant: 'link',
        className: 'text-destructive hover:text-destructive/80 active:text-destructive/80',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      icon: 'none',
      destructive: false,
    },
  }
);

export interface McPaginationProps
  extends
    Omit<React.ComponentProps<typeof Pagination>, 'icon'>,
    Omit<VariantProps<typeof paginationVariants>, 'icon'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  isLoading?: boolean;
}

function McPagination({
  className,
  variant = 'primary',
  size,
  icon = 'none',
  destructive,
  iconDefinition,
  isLoading,
  children,
  ...props
}: McPaginationProps) {
  const isLink = variant === 'link';
  const effectiveIcon =
    isLink && (icon === 'leading' || icon === 'trailing') && !iconDefinition ? (
      <LinkIcon />
    ) : (
      iconDefinition
    );

  return (
    <Pagination
      role="navigation"
      aria-label="pagination"
      data-slot="button"
      className={cn(
        paginationVariants({
          variant,
          size,
          icon: icon === 'none' ? 'none' : icon,
          destructive,
          className,
        }),
        isLoading && 'gap-2'
      )}
      {...props}
    ></Pagination>
  );
}

export interface McPaginationContentProps
  extends
    Omit<React.ComponentProps<typeof PaginationContent>, 'icon'>,
    Omit<VariantProps<typeof paginationVariants>, 'icon'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  isLoading?: boolean;
}

function McPaginationContent({
  className,
  variant = 'primary',
  size,
  icon = 'none',
  destructive,
  iconDefinition,
  isLoading,
  children,
  ...props
}: McPaginationContentProps) {
  const isLink = variant === 'link';
  const effectiveIcon =
    isLink && (icon === 'leading' || icon === 'trailing') && !iconDefinition ? (
      <LinkIcon />
    ) : (
      iconDefinition
    );

  return (
    <PaginationContent
      role="navigation"
      aria-label="pagination"
      data-slot="button"
      className={cn(
        paginationVariants({
          variant,
          size,
          icon: icon === 'none' ? 'none' : icon,
          destructive,
          className,
        }),
        isLoading && 'gap-2'
      )}
      {...props}
    ></PaginationContent>
  );
}

export interface McPaginationItemProps
  extends
    Omit<React.ComponentProps<typeof PaginationItem>, 'icon'>,
    Omit<VariantProps<typeof paginationVariants>, 'icon'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  isLoading?: boolean;
}

function McPaginationItem({
  className,
  variant = 'primary',
  size,
  icon = 'none',
  destructive,
  iconDefinition,
  isLoading,
  children,
  ...props
}: McPaginationItemProps) {
  const isLink = variant === 'link';
  const effectiveIcon =
    isLink && (icon === 'leading' || icon === 'trailing') && !iconDefinition ? (
      <LinkIcon />
    ) : (
      iconDefinition
    );

  return (
    <PaginationItem
      role="navigation"
      aria-label="pagination"
      data-slot="button"
      className={cn(
        paginationVariants({
          variant,
          size,
          icon: icon === 'none' ? 'none' : icon,
          destructive,
          className,
        }),
        isLoading && 'gap-2'
      )}
      {...props}
    ></PaginationItem>
  );
}

type PaginationVariantProps = VariantProps<typeof paginationVariants>;

export interface McPaginationLinkProps
  extends
    Omit<React.ComponentProps<typeof PaginationLink>, 'icon' | 'size'>,
    Omit<PaginationVariantProps, 'icon' | 'size'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  size?: PaginationVariantProps['size'];
  isLoading?: boolean;
}

function McPaginationLink({
  className,
  variant = 'primary',
  size,
  icon = 'none',
  destructive,
  iconDefinition,
  isLoading,
  children,
  ...props
}: McPaginationLinkProps) {
  const isLink = variant === 'link';
  const effectiveIcon =
    isLink && (icon === 'leading' || icon === 'trailing') && !iconDefinition ? (
      <LinkIcon />
    ) : (
      iconDefinition
    );

  return (
    <PaginationLink
      role="navigation"
      aria-label="pagination"
      data-slot="button"
      className={cn(
        paginationVariants({
          variant,
          size,
          icon: icon === 'none' ? 'none' : icon,
          destructive,
          className,
        }),
        isLoading && 'gap-2'
      )}
      {...props}
    ></PaginationLink>
  );
}

export interface McPaginationPreviousProps
  extends
    Omit<React.ComponentProps<typeof PaginationPrevious>, 'icon' | 'size'>,
    Omit<PaginationVariantProps, 'icon' | 'size'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  size?: PaginationVariantProps['size'];
  isLoading?: boolean;
}

function McPaginationPrevious({
  className,
  variant = 'primary',
  size,
  icon = 'none',
  destructive,
  iconDefinition,
  isLoading,
  children,
  ...props
}: McPaginationPreviousProps) {
  const isLink = variant === 'link';
  const effectiveIcon =
    isLink && (icon === 'leading' || icon === 'trailing') && !iconDefinition ? (
      <LinkIcon />
    ) : (
      iconDefinition
    );

  return (
    <PaginationPrevious
      role="navigation"
      aria-label="pagination"
      data-slot="button"
      className={cn(
        paginationVariants({
          variant,
          size,
          icon: icon === 'none' ? 'none' : icon,
          destructive,
          className,
        }),
        isLoading && 'gap-2'
      )}
      {...props}
    ></PaginationPrevious>
  );
}

export interface McPaginationNextProps
  extends
    Omit<React.ComponentProps<typeof PaginationNext>, 'icon' | 'size'>,
    Omit<PaginationVariantProps, 'icon' | 'size'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  size?: PaginationVariantProps['size'];
  isLoading?: boolean;
}

function McPaginationNext({
  className,
  variant = 'primary',
  size,
  icon = 'none',
  destructive,
  iconDefinition,
  isLoading,
  children,
  ...props
}: McPaginationNextProps) {
  const isLink = variant === 'link';
  const effectiveIcon =
    isLink && (icon === 'leading' || icon === 'trailing') && !iconDefinition ? (
      <LinkIcon />
    ) : (
      iconDefinition
    );

  return (
    <PaginationNext
      role="navigation"
      aria-label="pagination"
      data-slot="button"
      className={cn(
        paginationVariants({
          variant,
          size,
          icon: icon === 'none' ? 'none' : icon,
          destructive,
          className,
        }),
        isLoading && 'gap-2'
      )}
      {...props}
    ></PaginationNext>
  );
}

export interface McPaginationEllipsisProps
  extends
    Omit<React.ComponentProps<typeof PaginationEllipsis>, 'icon' | 'size'>,
    Omit<PaginationVariantProps, 'icon' | 'size'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  size?: PaginationVariantProps['size'];
  isLoading?: boolean;
}

function McPaginationEllipsis({
  className,
  variant = 'primary',
  size,
  icon = 'none',
  destructive,
  iconDefinition,
  isLoading,
  children,
  ...props
}: McPaginationEllipsisProps) {
  const isLink = variant === 'link';
  const effectiveIcon =
    isLink && (icon === 'leading' || icon === 'trailing') && !iconDefinition ? (
      <LinkIcon />
    ) : (
      iconDefinition
    );

  return (
    <PaginationEllipsis
      role="navigation"
      aria-label="pagination"
      data-slot="button"
      className={cn(
        paginationVariants({
          variant,
          size,
          icon: icon === 'none' ? 'none' : icon,
          destructive,
          className,
        }),
        isLoading && 'gap-2'
      )}
      {...props}
    ></PaginationEllipsis>
  );
}

export {
  McPagination,
  McPaginationContent,
  McPaginationItem,
  McPaginationLink,
  McPaginationPrevious,
  McPaginationNext,
  McPaginationEllipsis,
  paginationVariants,
};
