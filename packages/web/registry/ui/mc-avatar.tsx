'use client';

import * as React from 'react';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';

import { cn } from '@/lib/utils';

function Avatar({
  className,
  size = 'default',
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        'group/avatar relative flex size-8 shrink-0 rounded-full  select-none ',
        ' data-[size=xs]:size-6  data-[size=sm]:size-8 data-[size=md]:size-10 data-[size=lg]:size-12  data-[size=xl]:size-14 data-[size=2xl]:size-16 dark:after:mix-blend-lighten',
        ' ring-1 ring-border ring-inset ',
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full rounded-full object-cover ', className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ',
        ' group-data-[size=xs]/avatar:text-xs group-data-[size=sm]/avatar:text-sm group-data-[size=md]/avatar:text-base group-data-[size=lg]/avatar:text-lg group-data-[size=xl]/avatar:text-xl group-data-[size=2xl]/avatar:text-2xl',
        className
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none empty:bg-success not-empty:bg-transparent overflow-hidden',
        'group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=md]/avatar:size-2.5 group-data-[size=md]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        'group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5',
        'group-data-[size=2xl]/avatar:size-4 group-data-[size=2xl]/avatar:[&>svg]:size-3',
        'not-empty:group-data-[size=xs]/avatar:size-2.5 group-data-[size=xs]/avatar:[&>svg]:hidden',
        'not-empty:group-data-[size=sm]/avatar:size-3 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'not-empty:group-data-[size=md]/avatar:size-3.5 group-data-[size=md]/avatar:[&>svg]:size-2.5',
        'not-empty:group-data-[size=lg]/avatar:size-4 group-data-[size=lg]/avatar:[&>svg]:size-2.5',
        'not-empty:group-data-[size=xl]/avatar:size-4.5 group-data-[size=xl]/avatar:[&>svg]:size-3',
        'not-empty:group-data-[size=2xl]/avatar:size-5 group-data-[size=2xl]/avatar:[&>svg]:size-3.5',
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
        className
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
