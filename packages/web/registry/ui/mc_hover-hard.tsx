'use client';

import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';

import { cn } from '@/lib/utils';

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

function HoverCardContent({
  className,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 4,
  textAlign = 'center',
  imageSrc = null,
  imageposition = 'top',
  title,
  subtitle,
  description,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
    textAlign?: 'start' | 'center';
    imageSrc?: string | null;
    imageposition?: 'top' | 'bottom';
    title?: string;
    subtitle?: string;
    description?: string;
  }) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50 w-76 origin-(--transform-origin) rounded-lg bg-card p-4 text-sm text-popover-foreground shadow-md ring-inset  ring-1 ring-border flex flex-col "
      >
        <div className="flex flex-col gap-4">
          {imageSrc && <img src={imageSrc} alt="Profile" className={`w-full object-cover `} />}
          <div className="flex flex-col gap-1">
            {title && <h4 className="font-semibold">{title}</h4>}
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>

        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            ' outline-hidden duration-100   ',
            ' data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 ',
            ' data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ',
            ' data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 ',
            'data-closed:zoom-out-95 gap-4',
            className
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
