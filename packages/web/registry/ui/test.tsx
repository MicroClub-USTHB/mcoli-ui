'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type McSelectVariant =
  | 'default'
  | 'icon-leading'
  | 'avatar-leading'
  | 'dot-leading'
  | 'search';

// ─── Root ────────────────────────────────────────────────────────────────────

const McSelect = SelectPrimitive.Root;

// ─── Group ───────────────────────────────────────────────────────────────────

function McSelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1 p-1', className)}
      {...props}
    />
  );
}

// ─── Value ───────────────────────────────────────────────────────────────────

function McSelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('flex flex-1 text-left', className)}
      {...props}
    />
  );
}

// ─── Trigger label (above the trigger) ───────────────────────────────────────

function McSelectLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <label
      className={cn(
        'mb-[6px] block text-sm font-medium leading-5',
        'text-[var(--Muted-Foreground,#54588B)]',
        className
      )}
    >
      {children}
    </label>
  );
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

interface McSelectTriggerProps extends SelectPrimitive.Trigger.Props {
  size?: 'sm' | 'default';
  variant?: McSelectVariant;
  /** Used with variant="icon-leading": a lucide / custom icon element */
  leadingIcon?: React.ReactNode;
  /** Used with variant="avatar-leading": <img> or <span> element */
  leadingAvatar?: React.ReactNode;
  /** Used with variant="dot-leading": any tailwind color class, e.g. "bg-green-500" */
  dotColor?: string;
}

function McSelectTrigger({
  className,
  size = 'default',
  variant = 'default',
  leadingIcon,
  leadingAvatar,
  dotColor = 'bg-green-500',
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
        // ── Base layout ──────────────────────────────────────────────────────
        'flex w-[320px] items-center gap-2 rounded-lg outline-none select-none',
        'px-[14px] py-[10px] text-sm whitespace-nowrap',
        'transition-all duration-150',

        // ── Colours ──────────────────────────────────────────────────────────
        isSearch
          ? [
              'bg-transparent border-none shadow-none',
              'border border-[var(--border,#E6E9FF)]',
              'shadow-[0px_1px_2px_0px_#0A0D120D]',
              'bg-[var(--input,#F9FAFF)]',
            ]
          : [
              'bg-[var(--input,#F9FAFF)]',
              'border border-[var(--border,#E6E9FF)]',
              'shadow-[0px_1px_2px_0px_#0A0D120D]',
            ],

        // ── Placeholder ───────────────────────────────────────────────────────
        'data-placeholder:text-[var(--Muted-Foreground,#54588B)]',

        // ── Open / Focused ────────────────────────────────────────────────────
        'data-popup-open:border-[var(--ring,#D9DDFF)]',
        'data-popup-open:shadow-[0px_0px_0px_4px_var(--ring,#D9DDFF)]',
        'focus-visible:border-[var(--ring,#D9DDFF)]',
        'focus-visible:shadow-[0px_0px_0px_4px_var(--ring,#D9DDFF)]',

        // ── Disabled / Invalid ────────────────────────────────────────────────
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:shadow-[0px_0px_0px_4px_var(--destructive)]',

        // ── Sizes ─────────────────────────────────────────────────────────────
        'data-[size=default]:h-11',
        'data-[size=sm]:h-9 data-[size=sm]:rounded-md data-[size=sm]:px-3 data-[size=sm]:py-[6px]',

        // ── SVG defaults ──────────────────────────────────────────────────────
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // ── Value slot ────────────────────────────────────────────────────────
        '*:data-[slot=select-value]:flex *:data-[slot=select-value]:flex-1 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',

        className
      )}
      {...props}
    >
      {/* ── Leading slot by variant ─────────────────────────────────────────── */}
      {variant === 'search' && (
        <SearchIcon className="size-4 shrink-0 text-[var(--Muted-Foreground,#54588B)]" />
      )}

      {variant === 'icon-leading' && leadingIcon && <McSelectIcons>{leadingIcon}</McSelectIcons>}

      {variant === 'avatar-leading' && leadingAvatar && (
        <span className="pointer-events-none flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
          {leadingAvatar}
        </span>
      )}

      {variant === 'dot-leading' && (
        <span className={cn('dot size-2 shrink-0 rounded-full', dotColor)} />
      )}

      {/* ── Value ─────────────────────────────────────────────────────────── */}
      {children}

      {/* ── Trailing chevron (hidden for search) ──────────────────────────── */}
      {!isSearch && (
        <SelectPrimitive.Icon
          render={
            <ChevronDownIcon
              className={cn(
                'ml-auto size-4 shrink-0 text-[var(--Muted-Foreground,#54588B)]',
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

// ─── Icons wrapper ────────────────────────────────────────────────────────────

function McSelectIcons({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="select-icons"
      className={cn(
        'pointer-events-none flex shrink-0 items-center justify-center',
        'text-[var(--Muted-Foreground,#54588B)]',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        '[&_.dot]:size-2 [&_.dot]:rounded-full',
        className
      )}
      {...props}
    />
  );
}

// ─── Content / Popup ─────────────────────────────────────────────────────────

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
            'relative z-50 w-[320px] h-[320px]',
            'rounded-[8px]',
            'bg-[var(--card-background,#FFFFFF)]',
            'border border-[var(--border,#E6E9FF)]',
            'shadow-[0px_10px_15px_-3px_#0000001A]',
            'overflow-hidden',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        >
          <McSelectScrollUpButton />
          <SelectPrimitive.List
            className={cn(
              'p-[6px] h-full overflow-y-auto',
              scrollbar
                ? '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border'
                : '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
            )}
          >
            {children}
          </SelectPrimitive.List>
          <McSelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

// ─── Group Label ─────────────────────────────────────────────────────────────

function McSelectGroupLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'px-2 py-1.5 text-xs font-medium text-[var(--Muted-Foreground,#54588B)] tracking-wide',
        className
      )}
      {...props}
    />
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

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
        'relative flex w-full cursor-default items-center gap-2',
        'rounded-md px-2 py-2.5 text-sm outline-none select-none',
        'transition-colors duration-100',
        'focus:bg-accent focus:text-accent-foreground',
        'data-selected:text-primary',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:text-[var(--Muted-Foreground,#54588B)]",
        '[&_.dot]:size-2 [&_.dot]:rounded-full [&_.dot]:shrink-0',
        className
      )}
      {...props}
    >
      {/* Leading icon */}
      {leadingIcon && (
        <span className="pointer-events-none flex size-4 shrink-0 items-center justify-center text-[var(--Muted-Foreground,#54588B)]">
          {leadingIcon}
        </span>
      )}

      {/* Leading avatar */}
      {leadingAvatar && (
        <span className="pointer-events-none flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
          {leadingAvatar}
        </span>
      )}

      {/* Leading dot */}
      {dotColor && <span className={cn('dot size-2 shrink-0 rounded-full', dotColor)} />}

      <SelectPrimitive.ItemText
        className={cn(
          'flex flex-1 whitespace-nowrap',
          supportingText ? 'flex-col items-start gap-0' : 'flex-row items-center gap-2'
        )}
      >
        <span className="text-sm font-medium leading-5">{children}</span>
        {supportingText && (
          <span className="text-xs text-[var(--Muted-Foreground,#54588B)] leading-4">
            {supportingText}
          </span>
        )}
      </SelectPrimitive.ItemText>

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

// ─── Separator ────────────────────────────────────────────────────────────────

function McSelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

// ─── Scroll buttons ───────────────────────────────────────────────────────────

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

// ─── Exports ─────────────────────────────────────────────────────────────────

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
