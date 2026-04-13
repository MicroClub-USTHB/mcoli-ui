'use client';

import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'peer relative flex shrink-0 items-center justify-center rounded-[4px] border transition-colors outline-none disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'size-4 [&_[data-slot=checkbox-indicator]>svg]:size-3',
        md: 'size-5 [&_[data-slot=checkbox-indicator]>svg]:size-3.5',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

const textVariants = cva('font-medium transition-colors', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
    disabled: {
      true: 'text-muted-foreground',
      false: 'text-foreground',
    },
  },
  defaultVariants: {
    size: 'sm',
    disabled: false,
  },
});

const supportTextVariants = cva('font-regular', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export interface McCheckboxProps
  extends CheckboxPrimitive.Root.Props, VariantProps<typeof checkboxVariants> {
  text?: string;
  supportText?: string;
}

function McCheckbox({
  className,
  size = 'sm',
  text,
  supportText,
  id,
  disabled,
  checked,
  onCheckedChange,
  ...props
}: McCheckboxProps) {
  const checkboxId = React.useId();
  const finalId = id ?? checkboxId;
  const labelId = text ? `${finalId}-label` : undefined;
  const descriptionId = supportText ? `${finalId}-description` : undefined;

  return (
    <label
      htmlFor={finalId}
      className={cn(
        'inline-flex',
        size === 'sm' ? 'gap-2' : 'gap-3',
        supportText ? 'items-start' : 'items-center',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <CheckboxPrimitive.Root
        id={finalId}
        data-slot="checkbox"
        className={cn(
          checkboxVariants({ size }),
          'self-start mt-0.5',
          'bg-primary-foreground border-muted-foreground',
          'hover:border-primary',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring',
          'focus-within:outline-none focus-within:ring-4 focus-within:ring-ring',
          'data-disabled:border-muted-foreground data-disabled:hover:border-muted-foreground',
          'data-checked:border-primary'
        )}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current data-disabled:text-muted-foreground"
        >
          <CheckIcon className="stroke-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {(text || supportText) && (
        <span className={cn('flex flex-col', size === 'sm' ? 'gap-0' : 'gap-0.5')}>
          {text && (
            <span id={labelId} className={textVariants({ size, disabled: !!disabled })}>
              {text}
            </span>
          )}
          {supportText && (
            <span id={descriptionId} className={supportTextVariants({ size })}>
              {supportText}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

export { McCheckbox };
