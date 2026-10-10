'use client';

import * as React from 'react';
import { Toaster as SonnerComponent, toast as rawToast, type ExternalToast } from 'sonner';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

import { cn } from '@/lib/utils';

type ToasterProps = React.ComponentProps<typeof SonnerComponent>;

const toastIcons = {
  success: <CheckCircle2 className="text-muted-foreground shrink-0 h-3.5 w-3.5" />,
  warning: <AlertCircle className="text-muted-foreground shrink-0 h-3.5 w-3.5" />,
  error: <AlertCircle className="text-muted-foreground shrink-0 h-3.5 w-3.5" />,
  info: <Info className="text-muted-foreground shrink-0 h-3.5 w-3.5" />,
};

type ToastVariant = keyof typeof toastIcons;

type ToastOptions = Omit<ExternalToast, 'description'> & {
  description?: React.ReactNode;
};

const mcToastCustom = (message: string, variant?: ToastVariant, options: ToastOptions = {}) => {
  const { description, icon, ...rest } = options;
  const Icon = icon ?? (variant ? toastIcons[variant] : null);

  return rawToast(
    <div className="w-full h-full flex flex-col items-start justify-center gap-0.5">
      <div className="flex items-center gap-1.5 w-full max-w-66.5">
        {Icon}
        <span className="text-sm font-medium tracking-normal leading-5 text-card-foreground">
          {message}
        </span>
      </div>

      {description && (
        <p className="text-sm font-normal tracking-normal leading-5 text-muted-foreground max-w-66.5">
          {description}
        </p>
      )}
    </div>,
    rest
  );
};

export const toast = Object.assign(
  (message: string, options?: ToastOptions) => mcToastCustom(message, undefined, options),
  {
    success: (message: string, options?: ToastOptions) =>
      mcToastCustom(message, 'success', options),
    warning: (message: string, options?: ToastOptions) =>
      mcToastCustom(message, 'warning', options),
    error: (message: string, options?: ToastOptions) => mcToastCustom(message, 'error', options),
    info: (message: string, options?: ToastOptions) => mcToastCustom(message, 'info', options),
    message: (message: string, options?: ToastOptions) =>
      mcToastCustom(message, undefined, options),
    loading: rawToast.loading,
    promise: rawToast.promise,
    custom: rawToast.custom,
    dismiss: rawToast.dismiss,
    getHistory: rawToast.getHistory,
    getToasts: rawToast.getToasts,
  }
);

const McSonner = ({ toastOptions, ...props }: ToasterProps) => {
  const { classNames, ...restToastOptions } = toastOptions ?? {};

  return (
    <SonnerComponent
      position="top-center"
      toastOptions={{
        unstyled: true,
        ...restToastOptions,
        classNames: {
          ...classNames,
          toast: cn(
            'w-97.5 min-h-18.5 bg-background flex items-center justify-between gap-1.5 p-4 border-[1px] rounded-lg shadow-xs border-border',
            classNames?.toast
          ),
          actionButton: cn(
            'flex items-center justify-center bg-primary text-background text-sm py-2 px-3.5 min-w-15.5 max-w-21.5 min-h-9 rounded-[8px] shadow-xs shrink-0 cursor-pointer',
            classNames?.actionButton
          ),
        },
      }}
      {...props}
    />
  );
};

export default McSonner;
