import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface ProgressContextValue {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

function useProgressContext() {
  const context = React.useContext(ProgressContext);
  if (!context) {
    throw new Error('Les sous-composants McProgress doivent être utilisés dans <McProgress />');
  }
  return context;
}

//root component

interface McProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const ProgressRoot = React.forwardRef<HTMLDivElement, McProgressProps>(
  ({ value, max = 100, size = 'md', className, children, ...props }, ref) => {
    const clampedValue = Math.min(max, Math.max(0, value));
    const percentage = Math.round((clampedValue / max) * 100);

    return (
      <ProgressContext.Provider value={{ value: percentage, max, size }}>
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn('w-full relative flex flex-col gap-1', className)}
          {...props}
        >
          {children}
        </div>
      </ProgressContext.Provider>
    );
  }
);
ProgressRoot.displayName = 'McProgress';

//bar component

const progressBarVariants = cva('relative w-full bg-muted overflow-hidden border transition-all', {
  variants: {
    size: {
      sm: 'h-1.5 rounded-xs',
      md: 'h-2.5 rounded-sm',
      lg: 'h-5.5 rounded-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

interface ProgressTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  barClassName?: string;
}

const ProgressTrack = React.forwardRef<HTMLDivElement, ProgressTrackProps>(
  ({ className, barClassName, ...props }, ref) => {
    const { value, size } = useProgressContext();

    return (
      <div ref={ref} className={cn(progressBarVariants({ size }), className)} {...props}>
        <div
          className={cn('h-full bg-primary transition-all duration-300 ease-out', barClassName)}
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
);
ProgressTrack.displayName = 'McProgress.Track';

//segmented bar component

interface ProgressSegmentsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

const ProgressSegments = React.forwardRef<HTMLDivElement, ProgressSegmentsProps>(
  ({ count = 4, className, ...props }, ref) => {
    const { value, size } = useProgressContext();

    return (
      <div ref={ref} className={cn('flex gap-1 w-full', className)} {...props}>
        {Array.from({ length: count }).map((_, i) => {
          const stepValue = (100 / count) * (i + 1);
          const isFilled = value >= stepValue;

          return (
            <div
              key={i}
              className={cn(
                progressBarVariants({ size }),
                'flex-1',
                isFilled ? 'bg-primary' : 'bg-muted'
              )}
            />
          );
        })}
      </div>
    );
  }
);
ProgressSegments.displayName = 'McProgress.Segments';

//dynamic floating label component
interface ProgressFloatingLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  formatter?: (value: number) => React.ReactNode;
}

const ProgressFloatingLabel = React.forwardRef<HTMLSpanElement, ProgressFloatingLabelProps>(
  ({ formatter, className, ...props }, ref) => {
    const { value } = useProgressContext();

    return (
      <span
        ref={ref}
        className="absolute bottom-full text-xs font-semibold text-primary transition-all  -translate-x-1/2 whitespace-nowrap"
        style={{ left: `${value}%` }}
        {...props}
      >
        {formatter ? formatter(value) : `${value}%`}
      </span>
    );
  }
);
ProgressFloatingLabel.displayName = 'McProgress.FloatingLabel';

//static label component

interface ProgressLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  formatter?: (value: number) => React.ReactNode;
}

const ProgressLabel = React.forwardRef<HTMLSpanElement, ProgressLabelProps>(
  ({ formatter, className, ...props }, ref) => {
    const { value } = useProgressContext();

    return (
      <span
        ref={ref}
        className={cn('text-xs font-medium text-muted-foreground', className)}
        {...props}
      >
        {formatter ? formatter(value) : `${value}%`}
      </span>
    );
  }
);
ProgressLabel.displayName = 'McProgress.Label';

//curculaire
interface ProgressCircleProps extends React.SVGAttributes<SVGSVGElement> {
  showValue?: boolean;
  strokeWidth?: number;
}

const circleSizes = {
  sm: { size: 60, stroke: 6, fontSize: 'text-sm' },
  md: { size: 84, stroke: 8, fontSize: 'text-md' },
  lg: { size: 106, stroke: 12, fontSize: 'text-lg' },
};

const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>(
  ({ className, showValue = false, strokeWidth, ...props }, ref) => {
    const { value, size = 'md' } = useProgressContext();
    const config = circleSizes[size];
    const sw = strokeWidth ?? config.stroke;
    const radius = (config.size - sw) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          width={config.size}
          height={config.size}
          className={cn('transform -rotate-90', className)}
          {...props}
        >
          {/* Cercle de fond */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            className="stroke-muted fill-none"
            strokeWidth={sw}
          />
          {/* Cercle actif */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            className="stroke-primary fill-none transition-all duration-300 ease-out"
            strokeWidth={sw}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {showValue && (
          <span className={`absolute ${config.fontSize} font-semibold text-foreground`}>
            {value}%
          </span>
        )}
      </div>
    );
  }
);
ProgressCircle.displayName = 'McProgress.Circle';

// export compose

export const McProgress = Object.assign(ProgressRoot, {
  Track: ProgressTrack,
  Segments: ProgressSegments,
  FloatingLabel: ProgressFloatingLabel,
  Label: ProgressLabel,
  Circle: ProgressCircle,
});
