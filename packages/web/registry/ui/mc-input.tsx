'use client';

import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';

export interface McInputProps extends React.ComponentProps<'input'> {
  /** Label rendered above the input. */
  label?: React.ReactNode;
  /** Help text below the input. Replaced by error when present. */
  description?: React.ReactNode;
  /** Truthy = error state. ReactNode = renders the message. `true` = red border only. */
  error?: React.ReactNode;
  /** Inline-start addon (icons, text, dropdowns). */
  addonStart?: React.ReactNode;
  /** Inline-end addon (buttons, badges, spinners). */
  addonEnd?: React.ReactNode;
  /** Block-start addon (toolbar, controls above the input row). */
  addonTop?: React.ReactNode;
  /** Block-end addon (character count, status bar below the input row). */
  addonBottom?: React.ReactNode;
}

function McInput({
  className,
  label,
  description,
  error,
  addonStart,
  addonEnd,
  addonTop,
  addonBottom,
  type,
  id,
  disabled,
  required,
  ...props
}: McInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const hasError = !!error;
  const errorMessage = typeof error === 'boolean' ? null : error;
  const showError = hasError && !!errorMessage;
  const showDescription = !hasError && !!description;
  const messageId = showError
    ? `${inputId}-error`
    : showDescription
      ? `${inputId}-description`
      : undefined;

  const handleGroupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button, a, input, select, textarea, [tabindex]')) {
      e.currentTarget.querySelector<HTMLInputElement>('[data-slot="input"]')?.focus();
    }
  };

  return (
    <div data-slot="input-root" className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          data-slot="input-label"
          htmlFor={inputId}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </label>
      )}

      <div
        data-slot="input-group"
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
        role="group"
        onClick={handleGroupClick}
        className={cn(
          // Structure
          'group/input flex min-w-0 cursor-text flex-col rounded-lg border border-border bg-input shadow-xs transition-all',
          // Focus ring
          'focus-within:ring-4 focus-within:ring-ring',
          // Error
          'data-error:border-destructive',
          'data-error:focus-within:border-destructive data-error:focus-within:ring-destructive/20',
          'dark:data-error:border-destructive/60 dark:data-error:focus-within:ring-destructive/30',
          // Disabled
          'data-disabled:pointer-events-none data-disabled:opacity-50'
        )}
      >
        {addonTop && (
          <div
            data-slot="input-addon"
            data-align="top"
            className={cn(
              'flex w-full items-center gap-2 border-b border-border px-3.5 py-1.5 text-sm text-muted-foreground select-none',
              "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
            )}
          >
            {addonTop}
          </div>
        )}

        {/*
          has-data-attached:items-stretch — When an attached McInputButton is
          anywhere inside this row, switch from center to stretch so the addon
          container fills the full row height and the button can match it.
        */}
        <div data-slot="input-row" className="flex items-center has-data-attached:items-stretch">
          {addonStart && (
            <div
              data-slot="input-addon"
              data-align="start"
              className={cn(
                // group/addon — lets attached buttons detect start/end via group-data-[align]/addon
                // :has(>…:not([data-attached]):first-child):pl-2 — tighten for inline buttons at edge;
                //   :not([data-attached]) avoids outspecifying the flush rule due to :first-child specificity
                // has-data-attached:pl-0, items-stretch — flush + full-height for attached buttons
                'group/addon flex shrink-0 items-center gap-2 pl-3.5 text-sm text-muted-foreground select-none [&:has(>[data-slot=input-button]:not([data-attached]):first-child)]:pl-2 has-data-attached:items-stretch has-data-attached:pl-0',
                "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
              )}
            >
              {addonStart}
            </div>
          )}

          <InputPrimitive
            data-slot="input"
            type={type}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={messageId}
            className={cn(
              'h-10 flex-1 min-w-0 bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed',
              // Hide number input spinners across all browsers
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              addonStart && 'pl-2',
              addonEnd && 'pr-2'
            )}
            {...props}
          />

          {addonEnd && (
            <div
              data-slot="input-addon"
              data-align="end"
              className={cn(
                // Same as addonStart above, mirrored (pl → pr, first-child → last-child)
                'group/addon flex shrink-0 items-center gap-2 pr-3.5 text-sm text-muted-foreground select-none [&:has(>[data-slot=input-button]:not([data-attached]):last-child)]:pr-2 has-data-attached:items-stretch has-data-attached:pr-0',
                "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
              )}
            >
              {addonEnd}
            </div>
          )}
        </div>

        {addonBottom && (
          <div
            data-slot="input-addon"
            data-align="bottom"
            className={cn(
              'flex w-full items-center gap-2 border-t border-border px-3.5 py-1.5 text-sm text-muted-foreground select-none',
              "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
            )}
          >
            {addonBottom}
          </div>
        )}
      </div>

      {showError && (
        <p
          data-slot="input-error"
          id={`${inputId}-error`}
          role="alert"
          className="text-sm text-destructive"
        >
          {errorMessage}
        </p>
      )}

      {showDescription && (
        <p
          data-slot="input-description"
          id={`${inputId}-description`}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
    </div>
  );
}

export interface McInputButtonProps extends React.ComponentProps<'button'> {
  /** Visual style of the button. `attached` extends to the input edge and shares its border. */
  variant?: 'ghost' | 'outline' | 'filled' | 'attached';
}

function McInputButton({
  className,
  variant = 'ghost',
  type = 'button',
  ...props
}: McInputButtonProps) {
  const isAttached = variant === 'attached';

  return (
    <button
      type={type}
      data-slot="input-button"
      data-attached={isAttached || undefined}
      className={cn(
        // Base
        'inline-flex cursor-pointer items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-50',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",

        // Ghost
        variant === 'ghost' &&
          'h-7 rounded-md px-2 bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground',

        // Outline
        variant === 'outline' &&
          'h-7 rounded-md px-3 border border-border bg-transparent text-foreground hover:bg-accent',

        // Filled
        variant === 'filled' &&
          'h-7 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90',

        // Attached — flush with input border, auto-detects position via group/addon.
        // Radius is rounded-lg minus 1px to sit inside the group's border.
        isAttached && [
          'h-full px-4 bg-primary text-primary-foreground hover:bg-primary/90 border-border',
          'group-data-[align=end]/addon:rounded-l-none group-data-[align=end]/addon:rounded-r-[calc(0.5rem-1px)] group-data-[align=end]/addon:border-l',
          'group-data-[align=start]/addon:rounded-r-none group-data-[align=start]/addon:rounded-l-[calc(0.5rem-1px)] group-data-[align=start]/addon:border-r',
        ],

        className
      )}
      {...props}
    />
  );
}

export { McInput, McInputButton };
