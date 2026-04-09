'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'flex flex-col gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm'
);

function McCard({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={cn(cardVariants(), className)} {...props} />;
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

const footerVariants = cva('mt-auto flex flex-wrap gap-2', {
  variants: {
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
    {
      direction: 'row',
      align: 'start',
      className: 'items-center justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      direction: 'row',
      align: 'end',
      className: 'items-center justify-end [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      direction: 'row',
      align: 'center',
      className: 'items-center justify-center [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      direction: 'row',
      align: 'stretch',
      className: 'items-center justify-stretch *:min-w-0 *:flex-1',
    },
    {
      direction: 'column',
      align: 'start',
      className: 'items-start justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      direction: 'column',
      align: 'end',
      className: 'items-end justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      direction: 'column',
      align: 'center',
      className: 'items-center justify-start [&>*]:shrink-0 [&>*]:grow-0',
    },
    {
      direction: 'column',
      align: 'stretch',
      className: 'items-stretch justify-start *:min-h-0 *:flex-1',
    },
  ],
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
  },
});

export interface McCardFooterProps
  extends React.ComponentProps<'div'>, VariantProps<typeof footerVariants> {}

function McCardFooter({ className, direction, align, ...props }: McCardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(footerVariants({ direction, align }), className)}
      {...props}
    />
  );
}

export { McCard, McCardHeader, McCardFooter, cardVariants, footerVariants };
