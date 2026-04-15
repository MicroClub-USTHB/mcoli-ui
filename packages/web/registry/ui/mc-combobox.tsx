'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { CheckIcon, ChevronsUpDown, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  placeholder,
  ...props
}: ComboboxPrimitive.Trigger.Props & { placeholder?: string }) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        'min-w-50 min-h-9 px-3 py-2 rounded-md ring-1 ring-inset ring-border shadow-[0_1px_2px_0_#0000001A] flex justify-between font-dm-sans items-center text-foreground',
        className
      )}
      {...props}
    >
      <ComboboxValue placeholder={placeholder} />
      <ChevronsUpDown className="size-4 text-foreground" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxSearch({
  className,
  placeholder,
  ...props
}: ComboboxPrimitive.Input.Props & { placeholder?: string }) {
  return (
    <div className="flex items-center border-b px-3 h-fit w-full gap-2" data-slot="combobox-search">
      <SearchIcon className="text-muted-foreground size-4" />
      <ComboboxPrimitive.Input
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground',
          className
        )}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 8,
  align = 'start',
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset'>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            'w-[var(--anchor-width)] flex flex-col rounded-md ring-1 ring-inset ring-border bg-card-background shadow-[0_4px_6px_-1px_#0000001A]',
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn('p-1 h-fit w-full', className)}
      {...props}
    />
  );
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        'relative flex w-full rounded py-1.5 px-2 gap-2 justify-between font-dm-sans items-center',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator>
        <CheckIcon className="size-4 text-accent-foreground" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

export {
  Combobox,
  ComboboxTrigger,
  ComboboxSearch,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxValue,
};
