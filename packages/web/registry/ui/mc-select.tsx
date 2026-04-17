'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const McSelect = SelectPrimitive.Root;

function McSelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1 p-1', className)}
      {...props}
    />
  );
}

function McSelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('flex flex-1 text-left', className)}
      {...props}
    />
  );
}

function McSelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // Base layout
        'flex w-[320px] items-center gap-1.5 rounded-lg border border-input bg-background',
        'px-3 py-2.5 text-sm whitespace-nowrap outline-none select-none',
        'transition-colors duration-150',
        // Placeholder
        'data-placeholder:text-muted-foreground',
        // Focus / Open
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        'data-popup-open:border-ring data-popup-open:ring-3 data-popup-open:ring-ring/50',
        // Disabled
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Invalid
        'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
        // Sizes
        'data-[size=default]:h-11',
        'data-[size=sm]:h-9 data-[size=sm]:rounded-md',
        // Icon slot
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Value slot
        '*:data-[slot=select-value]:flex *:data-[slot=select-value]:flex-1 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon
            className={cn(
              'ml-auto size-4 shrink-0 text-muted-foreground',
              'transition-transform duration-200',
              'group-data-popup-open:rotate-180'
            )}
          />
        }
      />
    </SelectPrimitive.Trigger>
  );
}
function McSelectIcons({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="select-icons"
      className={cn(
        'pointer-events-none flex shrink-0 items-center justify-center',
        'text-muted-foreground',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        // dot support
        '[&_.dot]:size-2 [&_.dot]:rounded-full',
        className
      )}
      {...props}
    />
  );
}
function McSelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          className={cn(
            // Base
            'relative z-50 min-w-[320px] overflow-hidden rounded-xl',
            'bg-popover text-popover-foreground',
            // Shadow + border comme Figma
            'shadow-lg ring-1 ring-border',
            // Animation
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        >
          <McSelectScrollUpButton />
          <SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
          <McSelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function McSelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'px-2 py-1.5 text-xs font-medium text-muted-foreground tracking-wide',
        className
      )}
      {...props}
    />
  );
}

function McSelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Base
        'relative flex w-full cursor-default items-center gap-2',
        'rounded-md px-2 py-2.5 text-sm outline-none select-none',
        'transition-colors duration-100',
        // Hover / Focus
        'focus:bg-accent focus:text-accent-foreground',
        // Selected — texte violet comme Figma
        'data-selected:text-primary',
        // Disabled
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        // Icons inside item
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:text-muted-foreground",
        // dot
        '[&_.dot]:size-2 [&_.dot]:rounded-full [&_.dot]:shrink-0',
        className
      )}
      {...props}
    >
      {/* Left icon/avatar/dot slot */}
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      {/* Checkmark */}
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none flex size-4 shrink-0 items-center justify-center text-primary">
            <CheckIcon className="size-4" />
          </span>
        }
      />
    </SelectPrimitive.Item>
  );
}

function McSelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function McSelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function McSelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  McSelect,
  McSelectContent,
  McSelectGroup,
  McSelectItem,
  McSelectLabel,
  McSelectScrollDownButton,
  McSelectScrollUpButton,
  McSelectSeparator,
  McSelectTrigger,
  McSelectValue,
  McSelectIcons,
};
