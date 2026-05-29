'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export type McSelectVariant =
  | 'default'
  | 'icon-leading'
  | 'avatar-leading'
  | 'dot-leading'
  | 'search';

const McSelect = SelectPrimitive.Root;

function McSelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1', className)}
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

function McSelectLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <label
      className={cn(
        'mb-1.5 block text-sm font-medium leading-5',
        'text-muted-foreground',
        className
      )}
    >
      {children}
    </label>
  );
}

interface McSelectTriggerProps extends SelectPrimitive.Trigger.Props {
  size?: 'sm' | 'default';
  variant?: McSelectVariant;

  leadingIcon?: React.ReactNode;

  leadingAvatar?: React.ReactNode;

  dotColor?: string;
}

function McSelectTrigger({
  className,
  size = 'default',
  variant = 'default',
  leadingIcon,
  leadingAvatar,
  dotColor,
  children,
  ...props
}: McSelectTriggerProps) {
  const isSearch = variant === 'search';

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      data-variant={variant}
      className={cn(
        'flex w-80 items-center gap-2 rounded-lg outline-none select-none',
        'px-3.5 py-2.5 text-sm whitespace-nowrap',
        'transition-all duration-150',

        isSearch
          ? ['bg-input', 'border border-border', 'shadow-sm']
          : ['bg-input', 'border border-border', 'shadow-sm'],

        'data-placeholder:text-muted-foreground',

        'data-popup-open:border-ring',
        'data-popup-open:ring-4 data-popup-open:ring-ring',
        'focus-visible:border-ring',
        'focus-visible:ring-4 focus-visible:ring-ring',

        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive',

        'data-[size=default]:h-11',
        'data-[size=sm]:h-9 data-[size=sm]:rounded-md data-[size=sm]:px-3 data-[size=sm]:py-1.5',

        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        '*:data-[slot=select-value]:flex *:data-[slot=select-value]:flex-1 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',

        className
      )}
      {...props}
    >
      {variant === 'search' && <SearchIcon className="size-4 shrink-0 text-muted-foreground" />}

      {variant === 'icon-leading' && leadingIcon && <McSelectIcons>{leadingIcon}</McSelectIcons>}

      {variant === 'avatar-leading' && leadingAvatar && (
        <span className="pointer-events-none flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
          {leadingAvatar}
        </span>
      )}

      {variant === 'dot-leading' && (
        <span className="dot size-2 shrink-0 rounded-full bg-green-500" />
      )}

      {children}

      {!isSearch && (
        <SelectPrimitive.Icon
          render={
            <ChevronDownIcon
              className={cn(
                'ml-auto size-4 shrink-0 text-muted-foreground',
                'transition-transform duration-200',
                'data-popup-open:rotate-180'
              )}
            />
          }
        />
      )}
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
  sideOffset = 8,
  scrollbar = false,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  > & {
    scrollbar?: boolean;
  }) {
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
            'relative z-50 w-80 h-80',
            'rounded-lg',
            'bg-card',
            'border border-border',
            'shadow-lg',
            'overflow-hidden',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        >
          <SelectPrimitive.List
            className={cn(
              'p-0 h-full overflow-y-auto',
              scrollbar && 'overflow-x-auto',
              scrollbar
                ? 'pr-2 [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar]:h-[312px] [&::-webkit-scrollbar]:opacity-100 [&::-webkit-scrollbar-thumb]:w-[16px] [&::-webkit-scrollbar-thumb]:h-[320px] [&::-webkit-scrollbar-thumb]:p-[4px] [&::-webkit-scrollbar-thumb]:gap-[10px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border mr-1 [&::-webkit-scrollbar-thumb]:opacity-100'
                : '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
            )}
          >
            {children}
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function McSelectGroupLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
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

function McSelectItem({
  className,
  children,
  supportingText,
  leadingIcon,
  leadingAvatar,
  dotColor,
  ...props
}: SelectPrimitive.Item.Props & {
  supportingText?: string;
  leadingIcon?: React.ReactNode;
  leadingAvatar?: React.ReactNode;
  dotColor?: string;
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'group relative flex w-full cursor-default items-center gap-2',
        'rounded-none px-2 py-2.5 text-sm outline-none select-none',
        'transition-colors duration-100',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-highlighted=true:bg-accent data-highlighted=true:text-accent-foreground',
        'data-selected:bg-accent data-selected:text-accent-foreground',
        'data-selected=true:bg-accent data-selected=true:text-accent-foreground',
        'data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground',
        'data-[state=checked=true]:bg-accent data-[state=checked=true]:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:text-muted-foreground",
        '[&_.dot]:size-2 [&_.dot]:rounded-full [&_.dot]:shrink-0',
        className
      )}
      {...props}
    >
      {leadingIcon && (
        <span className="pointer-events-none flex size-4 shrink-0 items-center justify-center text-muted-foreground">
          {leadingIcon}
        </span>
      )}

      {leadingAvatar && (
        <span className="pointer-events-none flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
          {leadingAvatar}
        </span>
      )}

      {dotColor && <span className="dot size-2 shrink-0 rounded-full bg-green-500" />}

      <SelectPrimitive.ItemText
        className={cn(
          'flex flex-1 min-w-0 whitespace-nowrap',
          supportingText ? 'flex-row items-center gap-1' : 'flex-row items-center gap-2'
        )}
      >
        <span className="text-sm font-medium leading-5 truncate group-data-highlighted:text-accent-foreground group-data-highlighted=true:text-accent-foreground group-data-selected:text-accent-foreground group-data-selected=true:text-accent-foreground group-data-[state=checked]:text-accent-foreground group-data-[state=checked=true]:text-accent-foreground">
          {children}
        </span>
        {supportingText && (
          <span className="text-xs text-muted-foreground leading-4 truncate group-data-highlighted:text-accent-foreground group-data-highlighted=true:text-accent-foreground group-data-selected:text-accent-foreground group-data-selected=true:text-accent-foreground group-data-[state=checked]:text-accent-foreground group-data-[state=checked=true]:text-accent-foreground">
            {supportingText}
          </span>
        )}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none flex size-4 shrink-0 items-center justify-center text-accent-foreground">
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
      className={cn('pointer-events-none mx-0 my-1 h-px bg-border', className)}
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
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4 bg-accent-red-50 ",
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
  McSelectGroupLabel,
  McSelectIcons,
  McSelectItem,
  McSelectLabel,
  McSelectScrollDownButton,
  McSelectScrollUpButton,
  McSelectSeparator,
  McSelectTrigger,
  McSelectValue,
};
