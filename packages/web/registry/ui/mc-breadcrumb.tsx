import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function McBreadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" className={cn(className)} {...props} />
  );
}

function McBreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'm-0 list-none border-0 p-0 flex flex-wrap items-center gap-1.5 paragraph-md font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function McBreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  );
}

function McBreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn(
          'no-underline transition-colors text-muted-foreground hover:text-foreground hover:no-underline',
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: 'breadcrumb-link',
    },
  });
}

function McBreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-normal paragraph-md font-medium text-foreground', className)}
      {...props}
    />
  );
}

function McBreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('text-muted-foreground [&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className="cn-rtl-flip translate-y-px" />}
    </li>
  );
}

function McBreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        'flex size-5 items-center justify-center text-muted-foreground [&>svg]:size-4',
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  McBreadcrumb,
  McBreadcrumbList,
  McBreadcrumbItem,
  McBreadcrumbLink,
  McBreadcrumbPage,
  McBreadcrumbSeparator,
  McBreadcrumbEllipsis,
};
