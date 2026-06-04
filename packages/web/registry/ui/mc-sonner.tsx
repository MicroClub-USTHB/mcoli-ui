'use client';

import { Toaster as SonnerComponent, toast as rawToast } from 'sonner';
import { CheckCircle2, AlertCircle } from 'lucide-react';

type ToasterProps = React.ComponentProps<typeof SonnerComponent>;

const toastIcons = {
  success: <CheckCircle2 className="text-muted-foreground shrink-0 h-3.5 w-3.5" />,
  warning: <AlertCircle className="text-muted-foreground shrink-0 h-3.5 w-3.5" />,
  error: <AlertCircle className="text-muted-foreground  shrink-0 h-3.5 w-3.5" />,
};

interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const mcToastCustom = (
  message: string,
  variant?: 'success' | 'warning' | 'error',
  options?: ToastOptions
) => {
  const Icon = variant ? toastIcons[variant] : null;

  return rawToast(
    <div className="w-full h-full flex flex-col items-start justify-center gap-0.5">
      <div className="flex items-center gap-1.5 w-full max-w-66.5">
        {Icon}
        <span className="text-sm font-medium tracking-normal leading-5 text-card-foreground">
          {message}
        </span>
      </div>

      {options?.description && (
        <p className="text-sm font-normal tracking-normal leading-5 text-muted-foreground max-w-66.5">
          {options.description}
        </p>
      )}
    </div>,
    {
      action: options?.action,
    }
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
  }
);

const McSonner = ({ ...props }: ToasterProps) => {
  return (
    <SonnerComponent
      className=""
      position="top-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'w-97.5 min-h-18.5 bg-background flex items-center justify-between gap-1.5 p-4 border-[1px] rounded-lg shadow-xs border-border',
          actionButton:
            'flex items-center justify-center bg-primary text-background text-sm py-2 px-3.5 min-w-15.5 max-w-21.5 min-h-9 rounded-[8px] shadow-xs shrink-0 cursor-pointer',
        },
      }}
      {...props}
    />
  );
};

export default McSonner;
