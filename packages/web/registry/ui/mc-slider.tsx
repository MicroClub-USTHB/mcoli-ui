import * as React from 'react';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';

import { cn } from '@/lib/utils';

function McSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showValue = true,
  border = false,
  unity,
  onValueChange,
  ...props
}: SliderPrimitive.Root.Props & {
  showValue?: boolean;
  border?: boolean;
  unity?: string;
}) {
  const isControlled = value !== undefined;

  const [internalValues, setInternalValues] = React.useState<number[]>(
    Array.isArray(defaultValue) ? defaultValue : [min]
  );

  const values = isControlled ? (Array.isArray(value) ? value : [value]) : internalValues;

  return (
    <SliderPrimitive.Root
      className={cn('data-horizontal:w-full data-vertical:h-full mt-12', className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge-client-only"
      onValueChange={(newValues, event) => {
        if (!isControlled) {
          setInternalValues(Array.isArray(newValues) ? newValues : [newValues]);
        }
        onValueChange?.(newValues, event);
      }}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-muted ring-1 ring-inset ring-ring select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>

        {values.map((currentValue, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className="group relative block size-3 shrink-0 rounded-full border-2 border-primary bg-muted ring-accent-foreground backdrop-blur-3xl transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:bg-blue-500"
          >
            {showValue && (
              <div
                className={cn(
                  'pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-xl ',
                  'px-3.5 py-2.5 gap-2.5  text-md text-foreground bg-transparent ',
                  border && 'ring-1 ring-inset ring-border bg-muted'
                )}
              >
                {currentValue} {unity}
              </div>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { McSlider };
