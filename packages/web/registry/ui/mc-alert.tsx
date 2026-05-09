'use client';

import * as React from 'react';
import { CircleAlert, CircleCheck, Popcorn } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'success' | 'default' | 'destructive';

interface McAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: AlertVariant;
  title: string;
  description?: string;
  items?: string[];
}

const variantStyles: Record<AlertVariant, string> = {
  success:
    'border border-success rounded-lg w-fit max-w-[719px] pt-[12px] pb-[14px] pl-[12px] pr-[12px]',
  default: 'border border-border rounded-lg w-fit max-w-[719px] pl-[16px] pr-3 py-3',
  destructive: 'border border-destructive rounded-lg w-fit max-w-[719px] pl-[16px] pr-4 py-3',
};

const titleStyles: Record<AlertVariant, string> = {
  success: 'text-success font-medium text-base leading-6',
  default: 'text-card-foreground font-medium text-base leading-6',
  destructive: 'text-destructive font-medium text-base leading-6',
};

const descStyles: Record<AlertVariant, string> = {
  success: 'text-success font-normal text-sm leading-5',
  default: 'text-muted-foreground font-normal text-sm leading-5',
  destructive: 'text-destructive font-normal text-sm leading-5',
};

const iconMap: Record<AlertVariant, React.ReactNode> = {
  success: <CircleCheck className="size-4 shrink-0 stroke-2 text-success" />,
  default: <Popcorn className="size-4 shrink-0 stroke-2 text-card-foreground" />,
  destructive: <CircleAlert className="size-4 shrink-0 stroke-2 text-destructive" />,
};

const iconGap: Record<AlertVariant, string> = {
  success: 'gap-1',
  default: 'gap-3',
  destructive: 'gap-3',
};

function McAlert({ variant, title, description, items, className, ...props }: McAlertProps) {
  const hasSupportingContent = !!description || !!items?.length;

  return (
    <div
      data-slot="mc-alert"
      data-variant={variant}
      className={cn(variantStyles[variant], className)}
      role="alert"
      {...props}
    >
      <div
        className={cn(
          'flex',
          hasSupportingContent ? 'items-start' : 'items-center',
          iconGap[variant]
        )}
      >
        <div className={cn('shrink-0', hasSupportingContent && 'pt-1')}>{iconMap[variant]}</div>
        <div className="min-w-0">
          <span className={cn('block', titleStyles[variant])}>{title}</span>

          {description && <p className={cn('mt-0.5', descStyles[variant])}>{description}</p>}

          {items && items.length > 0 && (
            <ul className={cn('mt-0.5 list-disc pl-6', descStyles[variant])}>
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export { McAlert };
export type { McAlertProps, AlertVariant };
