'use client';

import * as React from 'react';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const radioGroupVariants = cva(
  'peer relative flex shrink-0 items-center justify-center rounded-full border transition-colors outline-none disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'size-4 [&_[data-slot=radio-group-indicator]>span]:size-2',
        md: 'size-5 [&_[data-slot=radio-group-indicator]>span]:size-2.5',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

const radioGroupItemVariants = cva('inline-flex', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

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

function McRadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid w-full gap-2', className)}
      {...props}
    />
  );
}

export interface McRadioGroupItemProps
  extends RadioPrimitive.Root.Props, VariantProps<typeof radioGroupVariants> {
  text?: string;
  supportText?: string;
}

function McRadioGroupItem({
  className,
  size = 'sm',
  text,
  supportText,
  id,
  disabled,
  value,
  ...props
}: McRadioGroupItemProps) {
  const radioId = React.useId();
  const finalId = id ?? radioId;
  const labelId = text ? `${finalId}-label` : undefined;
  const descriptionId = supportText ? `${finalId}-description` : undefined;

  return (
    <label
      htmlFor={finalId}
      className={cn(
        radioGroupItemVariants({ size }),
        supportText ? 'items-start' : 'items-center',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <RadioPrimitive.Root
        id={finalId}
        data-slot="radio-group-item"
        className={cn(
          radioGroupVariants({ size }),
          'self-start mt-0.5',
          'bg-primary-foreground border-muted-foreground',
          'hover:border-primary',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring',
          'focus-within:outline-none focus-within:ring-4 focus-within:ring-ring',
          'data-disabled:border-muted-foreground data-disabled:hover:border-muted-foreground',
          'data-checked:border-primary'
        )}
        disabled={disabled}
        value={value}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        {...props}
      >
        <RadioPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex size-4 items-center justify-center"
        >
          <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>

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

export { McRadioGroup, McRadioGroupItem };
