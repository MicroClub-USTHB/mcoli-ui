import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
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
        outline:
          'border-border bg-background text-foreground hover:bg-muted hover:text-foreground active:ring-4 active:ring-secondary',
        ghost:
          'bg-transparent text-foreground hover:bg-muted hover:text-foreground active:ring-4 active:ring-secondary',
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

export interface McButtonProps
  extends Omit<ButtonPrimitive.Props, 'icon'>, Omit<VariantProps<typeof buttonVariants>, 'icon'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  isLoading?: boolean;
}

function McButton({
  className,
  variant = 'primary',
  size = 'md',
  icon = 'none',
  destructive = false,
  ...props
}: McButtonProps) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, icon, destructive, className }))}
      {...props}
    />
  );
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
  return <li data-slot="pagination-item" {...props} />;
}

type McPaginationSize = 'sm' | 'md' | 'lg' | 'xl';

const buttonSizeByPaginationSize: Record<McPaginationSize, NonNullable<McButtonProps['size']>> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
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
    <McButton
      variant={isActive ? 'outline' : 'ghost'}
      size={buttonSizeByPaginationSize[paginationSize]}
      className={cn(
        'flex items-center  font-dm-sans  font-normal justify-center gap-2 font-sans',
        linkClassByPaginationSize[paginationSize],
        isActive &&
          'rounded-[6px] bg-primary px-3.5 py-4.5 text-md font-dm-sans h-min-[40px] w-min-[37px] pointer-events-none cursor-default text-primary-foreground hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground active:ring-0',
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
        <span className="hidden items-center leading-none font-dm-sans paragraph-md font-normal sm:inline-flex">
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
