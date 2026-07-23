'use client';

import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { McButton } from '@/components/ui/mc-button';

type McCarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: McCarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const McCarouselContext = React.createContext<CarouselContextProps | null>(null);

function useMcCarousel() {
  const context = React.useContext(McCarouselContext);

  if (!context) {
    throw new Error('useMcCarousel must be used within a <McCarousel />');
  }

  return context;
}

function McCarousel({
  orientation = 'horizontal',
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
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: McCarouselApi) => {
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
    <McCarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
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
    </McCarouselContext.Provider>
  );
}

function McCarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useMcCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden   " data-slot="carousel-content">
      <div
        className={cn('flex', orientation === 'horizontal' ? '' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  );
}

function McCarouselItem({ className, children, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useMcCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        ' shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? ' ' : '',
        className
      )}
      {...props}
    >
      {/* Card shell matching Figma "Wrapper" spec exactly */}
      <div
        data-slot="carousel-item-card"
        className="flex h-full w-full flex-col items-center justify-center gap-[8.14px] rounded-xl border border-border bg-card  text-card-foreground shadow"
      >
        {children}
      </div>
    </div>
  );
}

function McCarouselPrevious({ className, ...props }: React.ComponentProps<typeof McButton>) {
  const { orientation, scrollPrev, canScrollPrev } = useMcCarousel();

  return (
    <McButton
      data-slot="carousel-previous"
      variant="secondary"
      size="sm"
      icon="only"
      iconDefinition={<ChevronLeftIcon />}
      className={cn(
        'absolute size-8.5 touch-manipulation rounded-full border border-border bg-card p-2.5 shadow-[0px_0.81px_2.44px_0px_rgba(0,0,0,0.1)] [&_svg]:size-4',
        orientation === 'horizontal'
          ? 'inset-y-0 -left-12 my-auto'
          : '-top-12 -right-[-140px] rotate-90',

        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <span className="sr-only">Previous slide</span>
    </McButton>
  );
}

function McCarouselNext({ className, ...props }: React.ComponentProps<typeof McButton>) {
  const { orientation, scrollNext, canScrollNext } = useMcCarousel();

  return (
    <McButton
      data-slot="carousel-next"
      variant="secondary"
      size="sm"
      icon="only"
      iconDefinition={<ChevronRightIcon />}
      className={cn(
        'absolute size-[34px] touch-manipulation rounded-full border-[1px] border-border bg-card p-[10px] [&_svg]:size-4',
        orientation === 'horizontal'
          ? 'inset-y-0 -right-12 my-auto'
          : '-bottom-12 -right-[-140px]   rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <span className="sr-only">Next slide</span>
    </McButton>
  );
}

export {
  type McCarouselApi,
  McCarousel,
  McCarouselContent,
  McCarouselItem,
  McCarouselPrevious,
  McCarouselNext,
  useMcCarousel,
};
