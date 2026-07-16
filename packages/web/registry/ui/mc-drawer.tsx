'use client';
import * as React from 'react';
import { Drawer as McDrawerPrimitive } from 'vaul';
import { cn } from '@/lib/utils';

function McDrawer({ ...props }: React.ComponentProps<typeof McDrawerPrimitive.Root>) {
  return <McDrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function McDrawerTrigger({ ...props }: React.ComponentProps<typeof McDrawerPrimitive.Trigger>) {
  return <McDrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function McDrawerPortal({ ...props }: React.ComponentProps<typeof McDrawerPrimitive.Portal>) {
  return <McDrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function McDrawerClose({ ...props }: React.ComponentProps<typeof McDrawerPrimitive.Close>) {
  return <McDrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function McDrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof McDrawerPrimitive.Overlay>) {
  return (
    <McDrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-foreground/20',
        'supports-backdrop-filter:backdrop-blur-xs',
        'data-open:animate-in data-open:fade-in-0',
        'data-closed:animate-out data-closed:fade-out-0',
        className
      )}
      {...props}
    />
  );
}

function McDrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof McDrawerPrimitive.Content>) {
  return (
    <McDrawerPortal>
      <McDrawerOverlay />
      <McDrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content fixed z-50 flex flex-col',
          'bg-popover text-popover-foreground',
          'shadow-2xl',
          'data-[vaul-drawer-direction=bottom]:inset-x-0',
          'data-[vaul-drawer-direction=bottom]:bottom-0',
          'data-[vaul-drawer-direction=bottom]:max-h-dvh',
          'data-[vaul-drawer-direction=bottom]:rounded-t-2xl',
          'data-[vaul-drawer-direction=bottom]:border',
          'data-[vaul-drawer-direction=bottom]:border-border',
          'data-[vaul-drawer-direction=top]:inset-x-0',
          'data-[vaul-drawer-direction=top]:top-0',
          'data-[vaul-drawer-direction=top]:max-h-dvh',
          'data-[vaul-drawer-direction=top]:rounded-b-2xl',
          'data-[vaul-drawer-direction=top]:border',
          'data-[vaul-drawer-direction=top]:border-border',
          'data-[vaul-drawer-direction=left]:inset-y-0',
          'data-[vaul-drawer-direction=left]:left-0',
          'data-[vaul-drawer-direction=left]:w-drawer',
          'data-[vaul-drawer-direction=left]:max-w-full',
          'data-[vaul-drawer-direction=left]:rounded-r-2xl',
          'data-[vaul-drawer-direction=left]:border',
          'data-[vaul-drawer-direction=left]:border-border',
          'data-[vaul-drawer-direction=right]:inset-y-0',
          'data-[vaul-drawer-direction=right]:right-0',
          'data-[vaul-drawer-direction=right]:w-drawer',
          'data-[vaul-drawer-direction=right]:max-w-full',
          'data-[vaul-drawer-direction=right]:rounded-l-2xl',
          'data-[vaul-drawer-direction=right]:border',
          'data-[vaul-drawer-direction=right]:border-border',

          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-1 w-10 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block group-data-[vaul-drawer-direction=top]/drawer-content:block" />
        {children}
      </McDrawerPrimitive.Content>
    </McDrawerPortal>
  );
}

function McDrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-2 px-4 pt-0 pb-0', className)}
      {...props}
    />
  );
}

function McDrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4 pt-0', className)}
      {...props}
    />
  );
}

function McDrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof McDrawerPrimitive.Title>) {
  return (
    <McDrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-base font-semibold text-foreground leading-snug', className)}
      {...props}
    />
  );
}

function McDrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof McDrawerPrimitive.Description>) {
  return (
    <McDrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground leading-relaxed', className)}
      {...props}
    />
  );
}

function McDrawerNav({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-nav"
      className={cn('flex h-drawer-nav items-center gap-2 px-6 py-2.5', className)}
      {...props}
    >
      <McDrawerClose
        className="flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </McDrawerClose>
    </div>
  );
}

interface McDrawerNavItemProps extends React.ComponentProps<'button'> {
  icon?: React.ReactNode;
  hasArrow?: boolean;
  rightElement?: React.ReactNode;
}

function McDrawerNavItem({
  icon,
  hasArrow = false,
  rightElement,
  children,
  className,
  ...props
}: McDrawerNavItemProps) {
  return (
    <button
      data-slot="drawer-nav-item"
      className={cn(
        'flex h-drawer-item w-full items-center justify-between rounded-xl',
        'px-6 py-5',
        'text-sm text-foreground',
        'transition-colors hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-3">
        {icon && (
          <span className="shrink-0 text-foreground" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </span>

      {rightElement ??
        (hasArrow && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
    </button>
  );
}
export {
  McDrawer,
  McDrawerPortal,
  McDrawerOverlay,
  McDrawerTrigger,
  McDrawerClose,
  McDrawerContent,
  McDrawerHeader,
  McDrawerFooter,
  McDrawerTitle,
  McDrawerDescription,
  McDrawerNav,
  McDrawerNavItem,
};
