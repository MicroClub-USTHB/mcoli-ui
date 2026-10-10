'use client';

import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';

import { cn } from '@/lib/utils';

function McHoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function McHoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

function McHoverCardContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 4,
  textAlign = 'start',
  imageSrc = null,
  imageAlt = '',
  imagePosition,
  imageposition,
  title,
  subtitle,
  description,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
    textAlign?: 'start' | 'center';
    imageSrc?: string | null;
    imageAlt?: string;
    imagePosition?: 'top' | 'bottom';
    /** @deprecated Use `imagePosition` instead. */
    imageposition?: 'top' | 'bottom';
    title?: string;
    subtitle?: string;
    description?: string;
  }) {
  const resolvedImagePosition = imagePosition ?? imageposition ?? 'top';
  const hasBuiltInContent = Boolean(imageSrc || title || subtitle || description);

  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            'flex w-76 origin-(--transform-origin) flex-col gap-4 rounded-lg bg-card p-4 text-sm text-popover-foreground shadow-md ring-1 ring-border ring-inset outline-hidden duration-100',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2',
            'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className
          )}
          {...props}
        >
          {hasBuiltInContent && (
            <div
              className={cn(
                'flex gap-4',
                resolvedImagePosition === 'top' ? 'flex-col' : 'flex-col-reverse'
              )}
            >
              {imageSrc && <img src={imageSrc} alt={imageAlt} className="w-full" />}
              <div
                className={cn(
                  'flex flex-col gap-2',
                  textAlign === 'start' ? 'items-start' : 'items-center'
                )}
              >
                {title && <h4 className="font-semibold text-card-foreground">{title}</h4>}
                <div
                  className={cn(
                    'flex flex-col',
                    textAlign === 'start' ? 'items-start' : 'text-center'
                  )}
                >
                  {subtitle && <p className="font-regular text-card-foreground">{subtitle}</p>}
                  {description && (
                    <p className="font-regular text-card-foreground">{description}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { McHoverCard, McHoverCardTrigger, McHoverCardContent };
