'use client';

import React from 'react';

type ToastTypes =
  | 'normal'
  | 'action'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'loading'
  | 'default';
type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);
interface PromiseIExtendedResult extends ExternalToast {
  message: React.ReactNode;
}
type PromiseTExtendedResult<Data = any> =
  | PromiseIExtendedResult
  | ((data: Data) => PromiseIExtendedResult | Promise<PromiseIExtendedResult>);
type PromiseTResult<Data = any> =
  | string
  | React.ReactNode
  | ((data: Data) => React.ReactNode | string | Promise<React.ReactNode | string>);
type PromiseExternalToast = Omit<ExternalToast, 'description'>;
type PromiseData<ToastData = any> = PromiseExternalToast & {
  loading?: string | React.ReactNode;
  success?: PromiseTResult<ToastData> | PromiseTExtendedResult<ToastData>;
  error?: PromiseTResult | PromiseTExtendedResult;
  description?: PromiseTResult;
  finally?: () => void | Promise<void>;
};
interface ToastClassnames {
  toast?: string;
  title?: string;
  description?: string;
  loader?: string;
  closeButton?: string;
  cancelButton?: string;
  actionButton?: string;
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
  loading?: string;
  default?: string;
  content?: string;
  icon?: string;
}
interface ToastIcons {
  success?: React.ReactNode;
  info?: React.ReactNode;
  warning?: React.ReactNode;
  error?: React.ReactNode;
  loading?: React.ReactNode;
  close?: React.ReactNode;
}
interface Action {
  label: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  actionButtonStyle?: React.CSSProperties;
}
interface ToastT {
  id: number | string;
  toasterId?: string;
  title?: (() => React.ReactNode) | React.ReactNode;
  type?: ToastTypes;
  icon?: React.ReactNode;
  jsx?: React.ReactNode;
  richColors?: boolean;
  invert?: boolean;
  closeButton?: boolean;
  dismissible?: boolean;
  description?: (() => React.ReactNode) | React.ReactNode;
  duration?: number;
  delete?: boolean;
  action?: Action | React.ReactNode;
  cancel?: Action | React.ReactNode;
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
  promise?: PromiseT;
  cancelButtonStyle?: React.CSSProperties;
  actionButtonStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  unstyled?: boolean;
  className?: string;
  classNames?: ToastClassnames;
  descriptionClassName?: string;
  position?: Position;
  testId?: string;
}
type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';
interface ToastOptions {
  className?: string;
  closeButton?: boolean;
  descriptionClassName?: string;
  style?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties;
  actionButtonStyle?: React.CSSProperties;
  duration?: number;
  unstyled?: boolean;
  classNames?: ToastClassnames;
  closeButtonAriaLabel?: string;
  toasterId?: string;
}
type Offset =
  | {
      top?: string | number;
      right?: string | number;
      bottom?: string | number;
      left?: string | number;
    }
  | string
  | number;
interface ToasterProps {
  id?: string;
  invert?: boolean;
  theme?: 'light' | 'dark' | 'system';
  position?: Position;
  hotkey?: string[];
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  gap?: number;
  visibleToasts?: number;
  closeButton?: boolean;
  toastOptions?: ToastOptions;
  className?: string;
  style?: React.CSSProperties;
  offset?: Offset;
  mobileOffset?: Offset;
  dir?: 'rtl' | 'ltr' | 'auto';
  swipeDirections?: SwipeDirection[];
  icons?: ToastIcons;
  containerAriaLabel?: string;
}
type SwipeDirection = 'top' | 'right' | 'bottom' | 'left';
interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}
type ExternalToast = Omit<ToastT, 'id' | 'type' | 'title' | 'jsx' | 'delete' | 'promise'> & {
  id?: number | string;
  toasterId?: string;
};

type titleT = (() => React.ReactNode) | React.ReactNode;
declare const toast: ((message: titleT, data?: ExternalToast) => string | number) & {
  success: (message: titleT | React.ReactNode, data?: ExternalToast) => string | number;
  info: (message: titleT | React.ReactNode, data?: ExternalToast) => string | number;
  warning: (message: titleT | React.ReactNode, data?: ExternalToast) => string | number;
  error: (message: titleT | React.ReactNode, data?: ExternalToast) => string | number;
  custom: (
    jsx: (id: number | string) => React.ReactElement,
    data?: ExternalToast
  ) => string | number;
  message: (message: titleT | React.ReactNode, data?: ExternalToast) => string | number;
  promise: <ToastData>(
    promise: PromiseT<ToastData>,
    data?: PromiseData<ToastData>
  ) =>
    | (string & {
        unwrap: () => Promise<ToastData>;
      })
    | (number & {
        unwrap: () => Promise<ToastData>;
      })
    | {
        unwrap: () => Promise<ToastData>;
      };
  dismiss: (id?: number | string) => string | number;
  loading: (message: titleT | React.ReactNode, data?: ExternalToast) => string | number;
} & {
  getHistory: () => (ToastT | ToastToDismiss)[];
  getToasts: () => (ToastT | ToastToDismiss)[];
};

declare function useSonner(): {
  toasts: ToastT[];
};
declare const Sonner: React.ForwardRefExoticComponent<
  ToasterProps & React.RefAttributes<HTMLElement>
>;

export type { Action, ExternalToast, ToastClassnames, ToastT, ToastToDismiss, ToasterProps };

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { McButton } from '@/registry/ui/mc-button';
import * as SonnerLib from 'sonner';
import { toast as sonnerToast } from 'sonner';

const SonnerRoot = (SonnerLib as unknown as { Toaster: React.ComponentType<ToasterProps> }).Toaster;

const isActionObject = (action: ExternalToast['action']): action is Action => {
  return (
    !!action &&
    !React.isValidElement(action) &&
    typeof action === 'object' &&
    'label' in action &&
    'onClick' in action
  );
};

const withMcActionButton = (data?: ExternalToast): ExternalToast | undefined => {
  if (!data || !isActionObject(data.action)) {
    return data;
  }

  const action = data.action;

  return {
    ...data,
    action: (
      <McButton
        className="ml-6 bg-primary "
        size="sm"
        variant="primary"
        onClick={action.onClick}
        style={action.actionButtonStyle}
      >
        {action.label}
      </McButton>
    ),
  };
};

const mcToast = Object.assign(
  (message: titleT, data?: ExternalToast) => sonnerToast(message, withMcActionButton(data)),
  {
    success: (message: titleT | React.ReactNode, data?: ExternalToast) =>
      sonnerToast.success(message, withMcActionButton(data)),
    info: (message: titleT | React.ReactNode, data?: ExternalToast) =>
      sonnerToast.info(message, withMcActionButton(data)),
    warning: (message: titleT | React.ReactNode, data?: ExternalToast) =>
      sonnerToast.warning(message, withMcActionButton(data)),
    error: (message: titleT | React.ReactNode, data?: ExternalToast) =>
      sonnerToast.error(message, withMcActionButton(data)),
    custom: (jsx: (id: number | string) => React.ReactElement, data?: ExternalToast) =>
      sonnerToast.custom(jsx, withMcActionButton(data)),
    message: (message: titleT | React.ReactNode, data?: ExternalToast) =>
      sonnerToast.message(message, withMcActionButton(data)),
    promise: sonnerToast.promise,
    dismiss: sonnerToast.dismiss,
    loading: (message: titleT | React.ReactNode, data?: ExternalToast) =>
      sonnerToast.loading(message, withMcActionButton(data)),
    getHistory: sonnerToast.getHistory,
    getToasts: sonnerToast.getToasts,
  }
);

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <SonnerRoot
      theme={theme as ToasterProps['theme']}
      className="toaster group  flex justify-between"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius-lg, 0.5rem)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'cn-toast border border-border p-4 bg-card text-card-foreground shadow-xs shadow-blue-primary/200',
          title: 'font-semibold',
          description: 'text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

const McSonner = () => {
  return (
    <div>
      <Toaster />
      <McButton
        variant="secondary"
        onClick={() =>
          mcToast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            className:
              'border border-border p-4 bg-card text-card-foreground shadow-xs shadow-blue-primary/200',
            descriptionClassName: 'text-muted-foreground',
            style: {
              maxWidth: '420px',
              borderRadius: 'var(--radius-lg, 0.5rem)',
              ['--border-radius' as string]: 'var(--radius-lg, 0.5rem)',
            } as React.CSSProperties,
            action: {
              label: 'Und0',
              onClick: () => console.log('Undo'),
              actionButtonStyle: {
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--bg-primary)',
                borderRadius: '10px',
              },
            },
          })
        }
      >
        Show Toast
      </McButton>
    </div>
  );
};

export { Toaster, mcToast as toast, McSonner };
