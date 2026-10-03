'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import { cn } from '@/lib/utils';

function McTooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}

function McTooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function McTooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function McTooltipContent({
  className,
  side = 'top',
  sideOffset = 10,
  align = 'center',
  alignOffset = 0,
  arrow = true,
  title,
  description,
  desc,
  children,
  ...props
}: Omit<TooltipPrimitive.Popup.Props, 'title'> &
  Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
    /** Show the arrow pointing at the trigger. */
    arrow?: boolean;
    /** Bold first line of the tooltip. */
    title?: React.ReactNode;
    /** Body text below the title. */
    description?: React.ReactNode;
    /** @deprecated Use `description`. */
    desc?: React.ReactNode;
  }) {
  const body = description ?? desc;

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            'relative z-50 flex w-fit max-w-58 origin-(--transform-origin) flex-col gap-2 rounded-sm bg-card p-4 text-xs text-card-foreground shadow-[0_1px_4px_0_var(--border)]',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2',
            className
          )}
          {...props}
        >
          {title && <p className="font-semibold text-foreground">{title}</p>}
          {body && <p className="leading-4.5 text-muted-foreground">{body}</p>}
          {children}
          {arrow && (
            // The arrow box is 16×8 and points up; it is rotated per side and pushed past the
            // popup edge by its visual depth (8px, or 12px when rotated since the box is wider
            // than it is tall).
            <TooltipPrimitive.Arrow
              className={cn(
                'flex h-2 w-4',
                'data-[side=bottom]:-top-2',
                'data-[side=top]:-bottom-2 data-[side=top]:rotate-180',
                'data-[side=left]:-right-3 data-[side=left]:rotate-90 data-[side=inline-start]:-right-3 data-[side=inline-start]:rotate-90',
                'data-[side=right]:-left-3 data-[side=right]:-rotate-90 data-[side=inline-end]:-left-3 data-[side=inline-end]:-rotate-90'
              )}
            >
              <svg width="16" height="8" viewBox="0 0 16 8" aria-hidden className="fill-card">
                <path d="M0 8L8 0L16 8Z" />
              </svg>
            </TooltipPrimitive.Arrow>
          )}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { McTooltip, McTooltipTrigger, McTooltipContent, McTooltipProvider };
