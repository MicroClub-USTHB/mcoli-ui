'use client';

import * as React from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { LinkIcon, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-secondary-foreground hover:text-secondary active:bg-secondary-foreground active:text-secondary active:ring-4 active:ring-secondary disabled:bg-muted disabled:text-muted-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground active:ring-4 active:ring-secondary disabled:bg-muted disabled:text-muted-foreground',
        tertiary:
          'bg-primary-foreground text-primary hover:text-accent-foreground active:text-accent-foreground active:ring-4 active:ring-secondary disabled:bg-muted disabled:text-muted-foreground',
        link: 'bg-transparent p-0 text-foreground underline hover:text-accent-foreground active:text-accent-foreground disabled:text-muted-foreground',
      },
      size: {
        sm: 'px-3.5 py-2 text-sm font-medium',
        md: 'px-4 py-2.5 text-sm font-medium',
        lg: 'px-[1.125rem] py-2.5 text-base font-medium',
        xl: 'px-5 py-3 text-base font-medium',
      },
      icon: {
        none: '',
        leading: 'gap-2',
        trailing: 'gap-2',
        dot: 'gap-2',
        only: '',
      },
      destructive: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        className: 'px-0 py-0',
      },
      {
        icon: 'only',
        size: 'sm',
        className: 'p-2',
      },
      {
        icon: 'only',
        size: 'md',
        className: 'p-2.5',
      },
      {
        icon: 'only',
        size: 'lg',
        className: 'p-3',
      },
      {
        icon: 'only',
        size: 'xl',
        className: 'p-3.5',
      },
      // Destructive overrides
      {
        destructive: true,
        variant: 'primary',
        className:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/90 active:ring-4 active:ring-destructive/20',
      },
      {
        destructive: true,
        variant: 'secondary',
        className:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 active:ring-4 active:ring-destructive/20',
      },
      {
        destructive: true,
        variant: 'tertiary',
        className:
          'text-destructive hover:bg-destructive/10 active:ring-4 active:ring-destructive/20',
      },
      {
        destructive: true,
        variant: 'link',
        className: 'text-destructive hover:text-destructive/80 active:text-destructive/80',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      icon: 'none',
      destructive: false,
    },
  }
);

export interface McButtonProps
  extends Omit<ButtonPrimitive.Props, 'icon'>, Omit<VariantProps<typeof buttonVariants>, 'icon'> {
  iconDefinition?: React.ReactNode;
  icon?: 'none' | 'leading' | 'trailing' | 'dot' | 'only';
  isLoading?: boolean;
}

function McButton({
  className,
  variant = 'primary',
  size,
  icon = 'none',
  destructive,
  iconDefinition,
  isLoading,
  children,
  disabled,
  ...props
}: McButtonProps) {
  const isLink = variant === 'link';
  const effectiveIcon =
    isLink && (icon === 'leading' || icon === 'trailing') && !iconDefinition ? (
      <LinkIcon />
    ) : (
      iconDefinition
    );

  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || isLoading}
      className={cn(
        buttonVariants({
          variant,
          size,
          icon: icon === 'none' ? 'none' : icon,
          destructive,
          className,
        }),
        isLoading && 'gap-2'
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin shrink-0" />
      ) : (
        <>
          {icon === 'dot' && (
            <span data-slot="dot" className="size-2.5 shrink-0 rounded-full bg-current" />
          )}
          {icon === 'leading' && effectiveIcon && (
            <span data-slot="leading-icon" className="size-4 shrink-0 [&_svg]:size-full">
              {effectiveIcon}
            </span>
          )}
        </>
      )}

      {icon !== 'only' && children}
      {icon === 'only' && !isLoading && effectiveIcon}

      {icon === 'trailing' && !isLoading && effectiveIcon && (
        <span data-slot="trailing-icon" className="size-4 shrink-0 [&_svg]:size-full">
          {effectiveIcon}
        </span>
      )}
    </ButtonPrimitive>
  );
}

export { McButton, buttonVariants };
