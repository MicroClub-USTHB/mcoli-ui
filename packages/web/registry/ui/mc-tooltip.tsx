'use client';

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
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  children,
  title,
  desc,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
    desc?: string;
    ttitle?: string;
  }) {
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
            'z-50 inline-flex h-fit max-w-58  origin-(--transform-origin) items-center  rounded-sm bg-card-background  gap-2 shadow-[0px_1px_4px_0px_#E6E9FF] data-[side=bottom]:mt-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:mr-1.5 data-[side=left]:slide-in-from-right-2 data-[side=right]:ml-1.5 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:mb-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className
          )}
          {...props}
        >
          <div className=" flex flex-col gap-2 p-4 text-wrap">
            {title && <p className=" text-foreground text-xs/semi-bold] text-wrap">{title}</p>}
            {desc && (
              <p className="text-muted-foreground  font-dm-sans font-normal text-[12px] leading-4.5 tracking-[0] align-middle wrap-anywhere">
                {desc}
              </p>
            )}
          </div>
          {children}
          <TooltipPrimitive.Arrow className="z-50 size-4  translate-y-[calc(-50%-2px)]   rounded-xs bg-card-background   data-[side=bottom]:top-0.5  data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:rotate-90 data-[side=left]:top-1.5 data-[side=left]:-right-1.5 data-[side=left]:-translate-y-1/2 data-[side=right]:-rotate-90 data-[side=right]:top-1/2 data-[side=right]:-left-[6.80px] data-[side=right]:-translate-y-1/2 data-[side=top]:rotate-180 data-[side=top]:-bottom-4">
            <svg width="21" height="18" viewBox="0 0 12 6" className="  fill-background">
              <path d="M0 6L6 0L12 6H0Z" />
            </svg>
          </TooltipPrimitive.Arrow>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { McTooltip, McTooltipTrigger, McTooltipContent, McTooltipProvider };
