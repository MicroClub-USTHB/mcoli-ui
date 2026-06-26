'use client';

import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  layout?: 'single' | 'multi';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  layout: 'single' | 'multi';
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function Carousel({
  orientation = 'horizontal',
  layout = 'single',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      containScroll: layout === 'multi' ? 'trimSnaps' : undefined,
      ...opts,
      align: layout === 'multi' ? 'start' : 'center',
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  // Guard against calling into Embla before/while it's reInit-ing —
  // this is what throws "cannot render when not prepared" if you
  // click right as a reInit is in flight (e.g. right after mount,
  // when slide heights were just resolved for the vertical axis).
  const scrollPrev = React.useCallback(() => {
    if (!api) return;
    if (api.canScrollPrev()) api.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (!api) return;
    if (api.canScrollNext()) api.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
      api?.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        layout,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn(
          'relative',
          // Height must flow all the way down to the embla viewport for
          // vertical mode, otherwise Embla measures a 0px-tall axis and
          // its internal engine ends up in a broken "unprepared" state.
          orientation === 'vertical' && 'flex flex-col h-full',
          className
        )}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

interface CarouselContentProps extends React.ComponentProps<'div'> {
  count?: number;
  renderItem?: (index: number) => React.ReactNode;
}

function CarouselContent({ className, count = 5, renderItem, ...props }: CarouselContentProps) {
  const { carouselRef, orientation, layout } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn('overflow-hidden w-full h-full', orientation === 'vertical' && 'min-h-0')}
      data-slot="carousel-content"
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '' : 'flex-col h-full',
          layout === 'multi' ? 'gap-[10px]' : '',
          className
        )}
        {...props}
      >
        {Array.from({ length: count }).map((_, index) => (
          <CarouselItem key={index}>
            <div
              className={cn(
                'flex items-center justify-center text-card-foreground bg-card-background border-border text-white',
                layout === 'single' &&
                  'w-[252.48px] h-[286.69px] border-[0.81px] rounded-[9.77px] pt-[19.55px] pb-[19.55px] shadow-[0_0.81px_2.44px_rgba(0,0,0,0.1)]',
                layout === 'multi' &&
                  orientation === 'horizontal' &&
                  'w-[117px] h-[157px] border rounded-xl py-6 shadow-[0_0.81px_2.44px_rgba(0,0,0,0.1)]',
                layout === 'multi' &&
                  orientation === 'vertical' &&
                  'w-[320px] h-[142px] border rounded-xl py-6 shadow-[0_0.81px_2.44px_rgba(0,0,0,0.1)]'
              )}
            >
              {renderItem ? (
                renderItem(index)
              ) : (
                <span
                  className={cn(
                    'font-semibold text-primary',
                    layout === 'multi' ? 'text-2xl' : 'text-4xl'
                  )}
                >
                  {index + 1}
                </span>
              )}
            </div>
          </CarouselItem>
        ))}
      </div>
    </div>
  );
}

function CarouselItem({ className, children, ...props }: React.ComponentProps<'div'>) {
  const { orientation, layout } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'shrink-0 grow-0',
        orientation === 'horizontal' ? 'min-w-0' : 'min-h-0',
        layout === 'multi' ? 'basis-auto' : 'basis-full',
        layout === 'single' && orientation === 'horizontal' ? 'px-7' : '',
        className
      )}
    >
      <div
        className={cn(
          // only single-layout horizontal slides get the p-1 wrapper padding;
          // multi-layout relies on the gap-[10px] on the flex container instead
          layout === 'single' && orientation === 'horizontal' ? 'p-1' : '',
          orientation === 'vertical' ? 'py-[5px]' : ''
        )}
      >
        {children}
      </div>
    </div>
  );
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon-sm',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev, layout } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute touch-manipulation w-[34px] h-[34px] p-[10px] rounded-full border border-[#E6E9FF] bg-card-background shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] z-10',
        orientation === 'horizontal'
          ? layout === 'multi'
            ? 'inset-y-0 -left-10 my-auto'
            : 'inset-y-0 -left-[19px] my-auto'
          : layout === 'multi'
            ? '-top-10 left-1/2 -translate-x-1/2 rotate-0'
            : '-top-[19px] left-1/2 -translate-x-1/2 rotate-0',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon
        className={cn(
          'cn-rtl-flip transition-transform',
          orientation === 'vertical' && 'rotate-90'
        )}
      />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon-sm',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext, layout } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute touch-manipulation w-[34px] h-[34px] p-[10px] rounded-full border border-[#E6E9FF] bg-card-background shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] z-10',
        orientation === 'horizontal'
          ? layout === 'multi'
            ? 'inset-y-0 -right-10 my-auto'
            : 'inset-y-0 -right-[19px] my-auto'
          : layout === 'multi'
            ? '-bottom-10 left-1/2 -translate-x-1/2 rotate-0'
            : '-bottom-[19px] left-1/2 -translate-x-1/2 rotate-0',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon
        className={cn(
          'cn-rtl-flip transition-transform',
          orientation === 'vertical' && 'rotate-90'
        )}
      />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel as McCarousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
};
