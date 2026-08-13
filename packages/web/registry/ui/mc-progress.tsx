import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// HORIZONTAL PROGRESS BAR

const progressBarVariants = cva(
  'w-full bg-muted overflow-hidden border-1 rounded-full transition-all',
  {
    variants: {
      size: {
        sm: 'h-1.25',
        md: 'h-2.5',
        lg: 'h-5.5',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressBarVariants> {
  value: number;
  showLabel?: boolean;
  segmented?: boolean;
  segmentsCount?: number;
}

export const McProgress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, size, showLabel, segmented, segmentsCount = 4, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {showLabel && (
          <div className="text-right text-sm font-medium mb-1 text-primary">{value}%</div>
        )}

        {segmented ? (
          <div className="flex gap-1">
            {Array.from({ length: segmentsCount }).map((_, i) => {
              const stepValue = (100 / segmentsCount) * (i + 1);
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
        ) : (
          <div ref={ref} className={cn(progressBarVariants({ size }), className)} {...props}>
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${value}%` }}
            />
          </div>
        )}
      </div>
    );
  }
);
