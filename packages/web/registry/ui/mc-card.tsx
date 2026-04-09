'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const McCardDirectionContext = React.createContext<{ direction: 'row' | 'column' } | null>(null);

const cardVariants = cva(
  'flex gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm w-full',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
      },
    },
    defaultVariants: {
      direction: 'column',
    },
  }
);

function McCard({
  className,
  direction = 'column',
  children,
  ...props
}: React.ComponentProps<'div'> & { direction?: 'row' | 'column' }) {
  return (
    <McCardDirectionContext.Provider value={{ direction }}>
      <div data-slot="card" className={cn(cardVariants({ direction }), className)} {...props}>
        {children}
      </div>
    </McCardDirectionContext.Provider>
  );
}

export interface McCardHeaderProps extends React.ComponentProps<'div'> {
  title: string;
  description?: string;
}

function McCardHeader({ className, title, description, ...props }: McCardHeaderProps) {
  return (
    <div data-slot="card-header" className={cn('flex flex-col gap-1', className)} {...props}>
      <h3 className="text-xl font-bold leading-normal tracking-normal">{title}</h3>
      {description && <p className="text-xs font-normal">{description}</p>}
    </div>
  );
}

const footerVariants = cva('flex gap-2', {
  variants: {
    cardDirection: {
      row: 'self-stretch ms-auto',
      column: '',
    },
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    align: {
      start: '',
      end: '',
      center: '',
      stretch: '',
    },
  },
  compoundVariants: [
    // cardDirection: column — matches previous footer-only (direction × align) behavior
    {
      cardDirection: 'column',
      direction: 'row',
      align: 'start',
      className: 'items-center justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'column',
      direction: 'row',
      align: 'end',
      className: 'items-center justify-end [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'column',
      direction: 'row',
      align: 'center',
      className: 'items-center justify-center [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'column',
      direction: 'row',
      align: 'stretch',
      className: 'items-center justify-stretch *:min-w-0 *:flex-1',
    },
    {
      cardDirection: 'column',
      direction: 'column',
      align: 'start',
      className: 'items-start justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'column',
      direction: 'column',
      align: 'end',
      className: 'items-end justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'column',
      direction: 'column',
      align: 'center',
      className: 'items-center justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'column',
      direction: 'column',
      align: 'stretch',
      className: 'items-stretch justify-start *:min-h-0 *:flex-1',
    },
    // cardDirection: row — horizontal card; footer sits beside header/body, align controls vertical position
    // footer direction: row → children horizontal, align maps to cross-axis (items-*)
    {
      cardDirection: 'row',
      direction: 'row',
      align: 'start',
      className: 'items-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'row',
      direction: 'row',
      align: 'end',
      className: 'items-end [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'row',
      direction: 'row',
      align: 'center',
      className: 'items-center [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'row',
      direction: 'row',
      align: 'stretch',
      className: 'items-stretch *:min-w-0 *:flex-1',
    },
    // footer direction: column → children vertical, align maps to main-axis (justify-*)
    {
      cardDirection: 'row',
      direction: 'column',
      align: 'start',
      className: 'justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'row',
      direction: 'column',
      align: 'end',
      className: 'justify-end [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'row',
      direction: 'column',
      align: 'center',
      className: 'justify-center [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      cardDirection: 'row',
      direction: 'column',
      align: 'stretch',
      className: 'items-stretch justify-start *:min-h-0 *:flex-1',
    },
  ],
  defaultVariants: {
    cardDirection: 'column',
    direction: 'row',
    align: 'stretch',
  },
});

export interface McCardFooterProps
  extends React.ComponentProps<'div'>, VariantProps<typeof footerVariants> {}

function McCardFooter({
  className,
  direction,
  align,
  cardDirection: cardDirectionProp,
  ...props
}: McCardFooterProps) {
  const ctx = React.useContext(McCardDirectionContext);
  const cardDirection = cardDirectionProp ?? ctx?.direction ?? 'column';

  return (
    <div
      data-slot="card-footer"
      className={cn(footerVariants({ cardDirection, direction, align }), className)}
      {...props}
    />
  );
}

export { McCard, McCardHeader, McCardFooter, cardVariants, footerVariants };
