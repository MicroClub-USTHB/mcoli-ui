'use client';

import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';

import { cn } from '@/lib/utils';

function McScrollArea({
  className,
  children,
  title,
  desc,
  ...props
}: ScrollAreaPrimitive.Root.Props & { title?: string; desc?: string[] }) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative  rounded-md ring-1 ring-inset ring-border bg-background', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport data-slot="scroll-area-viewport" className=" size-full">
        {title && (
          <div className=" mb-4 mt-4 ml-4 gap-2.5 size-fit">
            <p className=" font-dm-sans text-4 text-foreground text-normal">{title}</p>
          </div>
        )}
        {desc && (
          <div className="mx-4  flex flex-col gap-2.5 size-fit">
            {desc.map((line, i) => (
              <div key={i} className="px-1.5 py-3.5 border-b-px border-b h-fit min-w-39.5">
                <p className="">{line}</p>
              </div>
            ))}
          </div>
        )}
        {children}
      </ScrollAreaPrimitive.Viewport>
      <McScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function McScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none ' +
          ' data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-horizontal:my-2 data-horizontal:ml-3' +
          ' data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { McScrollArea, McScrollBar };
