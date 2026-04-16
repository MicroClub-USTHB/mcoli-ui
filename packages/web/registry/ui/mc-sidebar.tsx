'use client';

import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDownIcon, PanelLeftIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { McButton } from '@/registry/ui/mc-button';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '255px';
const SIDEBAR_WIDTH_ICON = '51px';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [_open, _setOpen] = React.useState(() => {
    if (typeof document === 'undefined') {
      return defaultOpen;
    }

    const cookie = document.cookie
      .split('; ')
      .find((entry) => entry.startsWith(`${SIDEBAR_COOKIE_NAME}=`));

    if (!cookie) {
      return defaultOpen;
    }

    return cookie.split('=')[1] === 'true';
  });
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open]
  );

  React.useEffect(() => {
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [open]);

  const toggleSidebar = React.useCallback(() => {
    return setOpen((open) => !open);
  }, [setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      toggleSidebar,
    }),
    [state, open, setOpen, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function McSidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'icon',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { state } = useSidebar();

  return (
    <div
      className={cn(
        'group peer hidden text-sidebar-foreground md:flex',
        'data-[side=right]:flex-row-reverse'
      )}
      data-state={collapsible === 'none' ? 'expanded' : state}
      data-collapsible={collapsible === 'none' ? '' : state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-0 bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[side=left]:w-[calc(var(--sidebar-width)+1.25rem)]',
          'group-data-[side=right]:w-[calc(var(--sidebar-width)+1.25rem)]',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[collapsible=icon]:w-0',
          'group-data-[side=left]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1.25rem)]',
          'group-data-[side=right]:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1.25rem)]'
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          'fixed top-5 z-10 hidden h-[calc(100svh-40px)] w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-5 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex',
          'group-data-[side=left]:border-r group-data-[side=right]:border-l',
          'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            'flex size-full flex-col rounded-lg border border-sidebar-border bg-sidebar',
            'group-data-[variant=floating]:shadow-lg group-data-[variant=floating]:shadow-sidebar/10',
            'group-data-[variant=inset]:bg-sidebar/95 group-data-[variant=inset]:backdrop-blur-sm'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function McSidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof McButton>) {
  const { toggleSidebar } = useSidebar();
  const handleClick: React.ComponentProps<typeof McButton>['onClick'] = (event) => {
    onClick?.(event);
    toggleSidebar();
  };

  return (
    <McButton
      type="button"
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="tertiary"
      size="sm"
      className={cn('h-8 w-8 p-0', className)}
      onClick={handleClick}
      {...props}
    >
      <PanelLeftIcon className="cn-rtl-flip" />
      <span className="sr-only">Toggle Sidebar</span>
    </McButton>
  );
}

function McSidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...props}
    />
  );
}

function McSidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'relative flex min-h-0 w-full flex-1 flex-col overflow-y-auto bg-background md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function McSidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2 group-data-[collapsible=icon]:p-1', className)}
      {...props}
    />
  );
}

function McSidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2 group-data-[collapsible=icon]:p-1', className)}
      {...props}
    />
  );
}

function McSidebarSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn(
        'mx-2 h-px w-auto shrink-0 bg-sidebar-border group-data-[collapsible=icon]:mx-1',
        className
      )}
      {...props}
    />
  );
}

function McSidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      {...props}
    />
  );
}

function McSidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(
        'relative flex w-full min-w-0 flex-col p-2 group-data-[collapsible=icon]:p-1',
        className
      )}
      {...props}
    />
  );
}

function McSidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'> & React.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(
          'flex h-8 w-full shrink-0 items-center gap-2 rounded-md px-2 text-xs leading-4 font-normal tracking-normal text-sidebar-foreground opacity-70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:hidden focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: 'sidebar-group-label',
      sidebar: 'group-label',
    },
  });
}

function McSidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<'button'> & React.ComponentProps<'button'>) {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        className: cn(
          'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:w-4 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: 'sidebar-group-action',
      sidebar: 'group-action',
    },
  });
}

function McSidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
}

function McSidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('m-0 flex w-full min-w-0 list-none flex-col gap-0 p-0', className)}
      {...props}
    />
  );
}

function McSidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('list-none group/menu-item relative', className)}
      {...props}
    />
  );
}

type McSidebarCollapsibleProps = Omit<React.ComponentProps<'li'>, 'children'> & {
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  tooltip?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
  contentClassName?: string;
  chevronClassName?: string;
  children?: React.ReactNode;
};

function McSidebarCollapsible({
  label,
  icon: Icon,
  tooltip,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
  triggerClassName,
  contentClassName,
  chevronClassName,
  children,
  ...props
}: McSidebarCollapsibleProps) {
  const hasChildren = React.Children.count(children) > 0;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = openProp ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (openProp === undefined) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [openProp, onOpenChange]
  );

  const handleToggle = React.useCallback(() => {
    if (!hasChildren) {
      return;
    }
    setOpen(!isOpen);
  }, [hasChildren, isOpen, setOpen]);

  return (
    <McSidebarMenuItem className={cn('h-auto', className)} {...props}>
      <McSidebarMenuButton
        tooltip={tooltip}
        onClick={handleToggle}
        aria-expanded={hasChildren ? isOpen : undefined}
        className={cn('justify-between', triggerClassName)}
      >
        <span className="flex items-center gap-2 group-data-[collapsible=icon]:gap-0">
          {Icon ? <Icon /> : null}
          <span className="group-data-[collapsible=icon]:hidden">{label}</span>
        </span>
        {hasChildren ? (
          <ChevronDownIcon
            className={cn(
              'h-4 w-4 shrink-0 transition-transform group-data-[collapsible=icon]:hidden',
              isOpen && 'rotate-180',
              chevronClassName
            )}
          />
        ) : null}
      </McSidebarMenuButton>

      {hasChildren && isOpen ? (
        <McSidebarMenuSub className={contentClassName}>{children}</McSidebarMenuSub>
      ) : null}
    </McSidebarMenuItem>
  );
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 group-data-[collapsible=icon]:[&_svg]:size-4 [&>span:last-child]:truncate group-data-[collapsible=icon]:[&>span>span]:hidden group-data-[collapsible=icon]:[&>svg+span]:hidden group-data-[collapsible=icon]:[&>span]:w-full group-data-[collapsible=icon]:[&>span]:justify-center group-data-[collapsible=icon]:[&>span]:gap-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function McSidebarMenuButton({
  render,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<'button'> &
  React.ComponentProps<'button'> & {
    isActive?: boolean;
    tooltip?: string | React.HTMLAttributes<HTMLButtonElement>;
  } & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { state } = useSidebar();
  const tooltipLabel =
    typeof tooltip === 'string'
      ? tooltip
      : typeof tooltip?.['aria-label'] === 'string'
        ? tooltip['aria-label']
        : undefined;
  const comp = useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        type: 'button',
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        title: state === 'collapsed' ? tooltipLabel : undefined,
      },
      props
    ),
    render,
    state: {
      slot: 'sidebar-menu-button',
      sidebar: 'menu-button',
      size,
      active: isActive,
    },
  });

  if (!tooltip) {
    return comp;
  }

  return comp;
}

function McSidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<'button'> &
  React.ComponentProps<'button'> & {
    showOnHover?: boolean;
  }) {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        className: cn(
          'absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:w-4 peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
          showOnHover &&
            'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0',
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: 'sidebar-menu-action',
      sidebar: 'menu-action',
    },
  });
}

function McSidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="mc-sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4 group-data-[collapsible=icon]:min-w-4 peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground',
        className
      )}
      {...props}
    />
  );
}

function McSidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });

  return (
    <div
      data-slot="mc-sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <div
          className="size-4 rounded-md bg-muted animate-pulse"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <div
        className="h-4 max-w-(--skeleton-width) flex-1 rounded-md bg-muted animate-pulse"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function McSidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'mx-3.5 m-0 flex min-w-0 list-none translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:mx-1 group-data-[collapsible=icon]:px-1',
        className
      )}
      {...props}
    />
  );
}

function McSidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('list-none group/menu-sub-item relative', className)}
      {...props}
    />
  );
}

function McSidebarMenuSubButton({
  render,
  size = 'md',
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<'a'> &
  React.ComponentProps<'a'> & {
    size?: 'sm' | 'md';
    isActive?: boolean;
  }) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn(
          'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:px-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: 'sidebar-menu-sub-button',
      sidebar: 'menu-sub-button',
      size,
      active: isActive,
    },
  });
}

export {
  McSidebar,
  McSidebarContent,
  McSidebarFooter,
  McSidebarGroup,
  McSidebarGroupAction,
  McSidebarGroupContent,
  McSidebarGroupLabel,
  McSidebarHeader,
  McSidebarInset,
  McSidebarMenu,
  McSidebarMenuAction,
  McSidebarMenuBadge,
  McSidebarMenuButton,
  McSidebarCollapsible,
  McSidebarMenuItem,
  McSidebarMenuSkeleton,
  McSidebarMenuSub,
  McSidebarMenuSubButton,
  McSidebarMenuSubItem,
  SidebarProvider,
  McSidebarRail,
  McSidebarSeparator,
  McSidebarTrigger,
  useSidebar,
};
