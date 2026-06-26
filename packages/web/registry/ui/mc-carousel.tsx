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

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
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
        className={cn('relative', className)}
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
    <div ref={carouselRef} className="overflow-hidden py-2" data-slot="carousel-content">
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '' : 'flex-col',
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
                  'w-[117px] h-[157px] border rounded-xl py-6 shadow-[0_0.81px_2.44px_rgba(0,0,0,0.1)]'
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
        'min-w-0 shrink-0 grow-0',
        layout === 'multi' ? 'basis-[calc(33.333%-6.667px)] px-1' : 'basis-full',
        layout === 'single' && orientation === 'horizontal' ? 'px-7' : '',
        orientation === 'vertical' && 'pt-4',
        className
      )}
    >
      <div className="p-1">{children}</div>
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
        'absolute touch-manipulation w-[34px] h-[34px] p-[10px] rounded-full border border-[#E6E9FF] bg-card-background shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]',
        orientation === 'horizontal'
          ? layout === 'multi'
            ? 'inset-y-0 -left-10 my-auto'
            : 'inset-y-0 -left-[19px] my-auto'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon className="cn-rtl-flip" />
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
        'absolute touch-manipulation w-[34px] h-[34px] p-[10px] rounded-full border border-[#E6E9FF] bg-card-background shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]',
        orientation === 'horizontal'
          ? layout === 'multi'
            ? 'inset-y-0 -right-10 my-auto'
            : 'inset-y-0 -right-[19px] my-auto'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon className="cn-rtl-flip" />
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
