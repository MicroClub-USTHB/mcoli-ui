'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { cn } from '@/lib/utils';

function McSwitch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: 'sm' | 'default';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center bg-input ring-1 ring-inset ring-border',
        'transition-[background-color,ring-color,box-shadow] duration-300 ease-out outline-none',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'aria-invalid:ring-destructive aria-invalid:ring-offset-2',
        'dark:aria-invalid:ring-destructive/40',
        'data-disabled:bg-input/70 data-disabled:opacity-50',
        'data-checked:bg-primary data-checked:ring-transparent',
        'data-unchecked:bg-input data-unchecked:ring-border',
        'data-[size=default]:h-7 data-[size=default]:w-12 data-[size=default]:rounded-full data-[size=default]:p-1',
        'data-[size=sm]:h-4 data-[size=sm]:w-7 data-[size=sm]:rounded-full data-[size=sm]:p-[2px]',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-background ring-1 ring-inset ring-border transition-transform duration-300 ease-out',
          'dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground',
          'group-data-[size=default]/switch:size-5',
          'group-data-[size=default]/switch:data-unchecked:translate-x-0',
          'group-data-[size=default]/switch:data-checked:translate-x-5',
          'group-data-[size=sm]/switch:size-3',
          'group-data-[size=sm]/switch:data-unchecked:translate-x-0',
          'group-data-[size=sm]/switch:data-checked:translate-x-3'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { McSwitch };
