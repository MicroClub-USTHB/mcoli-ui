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
        'peer group/switch relative inline-flex shrink-0 items-center border-border bg-input border border-borde',
        'transition-[background-color,border-color,box-shadow] duration-300 ease-out outline-none',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
        'dark:aria-invalid:ring-destructive/40',
        'data-disabled:border-border data-disabled:bg-input/70',
        'data-checked:bg-primary data-checked:border-border',
        'data-unchecked:bg-input data-unchecked:border-border',
        'data-[size=default]:h-18 data-[size=default]:w-33 data-[size=default]:rounded-[42px] data-[size=default]:py-1 data-[size=default]:pl-1 data-[size=default]:pr-4 data-[size=default]:gap-4',

        'data-[size=sm]:h-[18.4px] data-[size=sm]:w-8 data-[size=sm]:rounded-full data-[size=sm]:p-0.5',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-background ring-0 transition-transform duration-300 ease-out',
          'dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground',
          'group-data-[size=default]/switch:size-16',
          'group-data-[size=default]/switch:data-unchecked:translate-x-0 ',
          'group-data-[size=default]/switch:data-checked:translate-x-[calc(132px-64px-8px)] border',
          'group-data-[size=sm]/switch:size-3',
          'group-data-[size=sm]/switch:data-unchecked:translate-x-0',
          'group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { McSwitch };
