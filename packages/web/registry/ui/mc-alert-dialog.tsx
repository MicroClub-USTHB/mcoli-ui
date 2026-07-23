'use client';

import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';

import { cn } from '@/lib/utils';
import { McButton } from '@/components/ui/mc-button';

function McAlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function McAlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function McAlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function McAlertDialogOverlay({ className, ...props }: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className
      )}
      {...props}
    />
  );
}

function McAlertDialogContent({
  className,
  size = 'default',
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  size?: 'default' | 'sm';
}) {
  return (
    <McAlertDialogPortal>
      <McAlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          'group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4',
          'rounded-xl bg-background p-4 ring-1 ring-inset ring-border duration-100 outline-none shadow-[0px_4px_12px_-4px_#00000014] ',
          'data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in',
          'data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className
        )}
        {...props}
      />
    </McAlertDialogPortal>
  );
}

function McAlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        ' mx-6 mb-6 mt-4 flex flex-col-reverse gap-2   ',
        'group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 ',
        'sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  );
}

function McAlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        'flex flex-col items-center gap-1.5 text-center',
        // responsive alignment adjustments
        'sm:group-data-[size=default]/alert-dialog-content:items-start',
        'sm:group-data-[size=default]/alert-dialog-content:text-left',

        className
      )}
      {...props}
    />
  );
}

function McAlertDialogMedia({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        ' inline-flex size-6 items-center justify-center ',
        "sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  );
}

function McAlertDialogTitle({
  className,
  media,
  icon,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title> & {
  media?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        ' sm:flex items-center gap-2.5',
        'group-data-[size=sm]/alert-dialog-content:flex-col'
      )}
    >
      {media && icon && <McAlertDialogMedia className="">{icon}</McAlertDialogMedia>}
      <AlertDialogPrimitive.Title
        data-slot="alert-dialog-title"
        className={cn(
          'cn-font-heading font-bold font-dm-sans text-[18px] leading-7  text-foreground ',
          'sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
          className
        )}
        {...props}
      />
    </div>
  );
}

function McAlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        'text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 ',
        '*:[a]:hover:text-foreground',
        className
      )}
      {...props}
    />
  );
}

function McAlertDialogAction({ className, ...props }: React.ComponentProps<typeof McButton>) {
  return <McButton data-slot="alert-dialog-action" className={cn(className)} {...props} />;
}

function McAlertDialogCancel({
  className,
  variant = 'secondary',
  size = 'md',
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof McButton>, 'variant' | 'size'>) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn('', className)}
      render={<McButton variant={variant} size={size} />}
      {...props}
    />
  );
}

export {
  McAlertDialog,
  McAlertDialogAction,
  McAlertDialogCancel,
  McAlertDialogContent,
  McAlertDialogDescription,
  McAlertDialogFooter,
  McAlertDialogHeader,
  McAlertDialogMedia,
  McAlertDialogOverlay,
  McAlertDialogPortal,
  McAlertDialogTitle,
  McAlertDialogTrigger,
};
