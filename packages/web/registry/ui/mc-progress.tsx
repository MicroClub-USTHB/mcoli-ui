import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressContextValue {
  value: number;
  max: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
      xs: 'h-1 rounded-xs',
      sm: 'h-1.5 rounded-xs',
      md: 'h-2.5 rounded-sm',
      lg: 'h-5.5 rounded-lg',
      xl: 'h-7 rounded-xl',
    },
  },
  defaultVariants: { size: 'md' },
});

const progressLabelVariants = cva('font-medium whitespace-nowrap', {
  variants: {
    size: {
      xs: 'text-[10px]',
      sm: 'text-xs',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
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
    const { value, size } = useProgressContext();

    return (
      <span
        ref={ref}
        className={cn(
          'absolute bottom-full font-semibold text-primary transition-all -translate-x-1/2',
          progressLabelVariants({ size }),
          className
        )}
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
    const { value, size } = useProgressContext();

    return (
      <span
        ref={ref}
        className={cn(progressLabelVariants({ size }), 'text-muted-foreground', className)}
        {...props}
      >
        {formatter ? formatter(value) : `${value}%`}
      </span>
    );
  }
);
ProgressLabel.displayName = 'McProgress.Label';

//circle component

interface ProgressCircleProps extends React.SVGAttributes<SVGSVGElement> {
  showValue?: boolean;
  strokeWidth?: number;
}

const circleSizes = {
  xs: { size: 44, stroke: 4, maxStroke: 8, fontSize: 'text-[10px]' },
  sm: { size: 60, stroke: 6, maxStroke: 12, fontSize: 'text-sm' },
  md: { size: 84, stroke: 8, maxStroke: 20, fontSize: 'text-base' },
  lg: { size: 106, stroke: 12, maxStroke: 24, fontSize: 'text-lg' },
  xl: { size: 132, stroke: 14, maxStroke: 28, fontSize: 'text-xl' },
};

const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>(
  ({ className, showValue = false, strokeWidth, ...props }, ref) => {
    const { value, size = 'md' } = useProgressContext();
    const config = circleSizes[size];
    const sw = Math.min(strokeWidth ?? config.stroke, config.maxStroke);
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
          {/* inactif circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            className="stroke-muted fill-none"
            strokeWidth={sw}
          />
          {/* actif circle */}
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

//stepper horizontal/vertical component

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

const ProgressStepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ orientation = 'horizontal', size = 'md', className, children, ...props }, ref) => {
    const spacingClass = size === 'lg' ? 'gap-4' : size === 'md' ? 'gap-2' : 'gap-1';

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full items-center',
          orientation === 'vertical'
            ? cn('flex-col items-center', spacingClass)
            : cn('flex-row items-center', spacingClass),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ProgressStepper.displayName = 'McProgress.Stepper';

const stepVariants = cva(
  'relative flex items-center justify-center rounded-full font-medium transition-colors border-2 shrink-0',
  {
    variants: {
      status: {
        completedBackground: 'bg-primary text-primary-foreground',
        completedBorder: 'bg-white border-primary ',
        active: 'border-primary text-primary font-bold bg-background',
        inactive: 'border-muted text-muted-foreground bg-muted/30',
        outlinedCompleted: 'border-primary text-primary bg-background font-semibold',
      },
      size: {
        sm: 'w-8 h-8 text-sm ',
        md: 'w-12 h-12 text-base',
        lg: 'w-14 h-14 text-xl ',
      },
    },
    compoundVariants: [
      {
        status: 'completedBorder',
        size: 'sm',
        className: 'border-6',
      },
      {
        status: 'completedBorder',
        size: 'md',
        className: 'border-8',
      },
      {
        status: 'completedBorder',
        size: 'lg',
        className: 'border-12',
      },
    ],
    defaultVariants: {
      status: 'inactive',
      size: 'md',
    },
  }
);

interface StepProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stepVariants> {
  step?: number;
  completed?: 'number' | 'icon';
  icon?: React.ReactNode;
}

//step component

const ProgressStep = React.forwardRef<HTMLDivElement, StepProps>(
  ({ status, size, step, completed = 'icon', icon, children, className, ...props }, ref) => {
    const isCompleted = status === 'completedBackground' || status === 'completedBorder';
    const checkSizeClass = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';

    const renderContent = () => {
      if (isCompleted && completed === 'icon') {
        if (icon) {
          return icon;
        }

        return status === 'completedBackground' ? (
          <Check className={cn(checkSizeClass, 'text-primary-foreground font-bold')} />
        ) : (
          <Check className={cn(checkSizeClass, 'text-primary font-bold')} />
        );
      }
      if (isCompleted && completed === 'number') {
        return status === 'completedBackground' ? (
          <span className="text-primary-foreground font-bold">{step}</span>
        ) : (
          <span className="text-primary font-bold">{step}</span>
        );
      }

      return children || step;
    };

    return (
      <div ref={ref} className={cn(stepVariants({ status, size }), className)} {...props}>
        {renderContent()}
      </div>
    );
  }
);
ProgressStep.displayName = 'McProgress.Step';

interface StepLineProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

//step line component

const stepLineVariants = cva('transition-colors duration-300', {
  variants: {
    size: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const ProgressStepLine = React.forwardRef<HTMLDivElement, StepLineProps>(
  ({ active = false, orientation = 'horizontal', size = 'md', className, ...props }, ref) => {
    const horizontalSizeClass =
      size === 'lg'
        ? 'h-1 min-w-16 flex-1'
        : size === 'md'
          ? 'h-0.5 min-w-12 flex-1'
          : 'h-px min-w-8 flex-1';
    const verticalSizeClass =
      size === 'lg'
        ? 'w-1 h-16 self-center'
        : size === 'md'
          ? 'w-0.5 h-12 self-center'
          : 'w-px h-8 self-center';

    return (
      <div
        ref={ref}
        className={cn(
          stepLineVariants({ size }),
          orientation === 'horizontal' ? horizontalSizeClass : verticalSizeClass,
          active ? 'bg-primary' : 'bg-muted',
          className
        )}
        {...props}
      />
    );
  }
);
ProgressStepLine.displayName = 'McProgress.StepLine';

// export compose

export const McProgress = Object.assign(ProgressRoot, {
  Track: ProgressTrack,
  Segments: ProgressSegments,
  FloatingLabel: ProgressFloatingLabel,
  Label: ProgressLabel,
  Circle: ProgressCircle,
  Stepper: ProgressStepper,
  Step: ProgressStep,
  StepLine: ProgressStepLine,
});
