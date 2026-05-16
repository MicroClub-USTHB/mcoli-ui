'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface McTextareaProps extends React.ComponentProps<'textarea'> {
  /** Label rendered above the textarea. */
  label?: React.ReactNode;
  /** Help text below the textarea. Replaced by error when present. */
  description?: React.ReactNode;
  /** Truthy = error state. ReactNode = renders the message. `true` = red border only. */
  error?: React.ReactNode;
  /** Block-start addon (toolbar, controls above the textarea). */
  addonTop?: React.ReactNode;
  /** Block-end addon (character count, action buttons below the textarea). */
  addonBottom?: React.ReactNode;
}

function McTextarea({
  className,
  label,
  description,
  error,
  addonTop,
  addonBottom,
  id,
  disabled,
  required,
  rows = 3,
  ...props
}: McTextareaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;

  const hasError = !!error;
  const errorMessage = typeof error === 'boolean' ? null : error;
  const showError = hasError && !!errorMessage;
  const showDescription = !hasError && !!description;
  const messageId = showError
    ? `${textareaId}-error`
    : showDescription
      ? `${textareaId}-description`
      : undefined;

  const handleGroupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button, a, input, select, textarea, [tabindex]')) {
      e.currentTarget.querySelector<HTMLTextAreaElement>('[data-slot="textarea"]')?.focus();
    }
  };

  return (
    <div data-slot="textarea-root" className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          data-slot="textarea-label"
          htmlFor={textareaId}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </label>
      )}

      <div
        data-slot="textarea-group"
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
        role="group"
        onClick={handleGroupClick}
        className={cn(
          // Structure
          'group/textarea flex min-w-0 cursor-text flex-col rounded-lg border border-border bg-input shadow-xs transition-all',
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
            data-slot="textarea-addon"
            data-align="top"
            className={cn(
              'flex w-full items-center gap-2 border-b border-border px-3.5 py-1.5 text-sm text-muted-foreground select-none',
              "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
            )}
          >
            {addonTop}
          </div>
        )}

        <textarea
          data-slot="textarea"
          id={textareaId}
          disabled={disabled}
          required={required}
          rows={rows}
          aria-invalid={hasError || undefined}
          aria-describedby={messageId}
          className="min-h-0 w-full resize-none bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          {...props}
        />

        {addonBottom && (
          <div
            data-slot="textarea-addon"
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
          data-slot="textarea-error"
          id={`${textareaId}-error`}
          role="alert"
          className="text-sm text-destructive"
        >
          {errorMessage}
        </p>
      )}

      {showDescription && (
        <p
          data-slot="textarea-description"
          id={`${textareaId}-description`}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { McTextarea };
