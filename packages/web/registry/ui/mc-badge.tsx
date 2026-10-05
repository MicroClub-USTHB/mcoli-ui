'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

const McBadgeVariants = cva(
  'group/badge inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-border font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:size-3 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary-foreground text-primary [a]:hover:bg-primary-foreground/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        primary: 'bg-accent-foreground text-accent',
      },
      size: {
        sm: 'paragraph-xs px-[7px] py-px',
        md: 'paragraph-sm px-[9px] py-px',
        lg: 'paragraph-md px-[11px] py-[3px]',
        groupLeadingLg: 'paragraph-md px-[9px] py-px',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeKind =
  | 'dot-start'
  | 'dot-end'
  | 'image-start'
  | 'image-end'
  | 'icon-start'
  | 'icon-end'
  | 'only';

// Figma paddings minus the 1px border, because Figma strokes sit inside the box.
const McBadgePadding: Record<BadgeSize, Record<BadgeKind, string>> = {
  sm: {
    'dot-start': 'gap-1.5 pl-[5px] pr-[7px]',
    'dot-end': 'gap-1.5 pl-[7px] pr-[5px]',
    'image-start': 'gap-1.5 pl-[2px] pr-[7px]',
    'image-end': 'gap-1.5 pl-[7px] pr-[2px]',
    'icon-start': 'gap-1 pl-[5px] pr-[7px]',
    'icon-end': 'gap-1 pl-[7px] pr-[5px]',
    only: 'p-[3px]',
  },
  md: {
    'dot-start': 'gap-1.5 pl-[7px] pr-[9px]',
    'dot-end': 'gap-1.5 pl-[9px] pr-[7px]',
    'image-start': 'gap-1.5 pl-[3px] pr-[9px]',
    'image-end': 'gap-1.5 pl-[9px] pr-[3px]',
    'icon-start': 'gap-1 pl-[9px] pr-[7px]',
    'icon-end': 'gap-1 pl-[9px] pr-[7px]',
    only: 'p-[5px]',
  },
  lg: {
    'dot-start': 'gap-1.5 pl-[9px] pr-[11px]',
    'dot-end': 'gap-1.5 pl-[11px] pr-[9px]',
    'image-start': 'gap-1.5 pl-[5px] pr-[11px]',
    'image-end': 'gap-1.5 pl-[11px] pr-[5px]',
    'icon-start': 'gap-1 pl-[11px] pr-[9px]',
    'icon-end': 'gap-1 pl-[11px] pr-[9px]',
    only: 'p-[7px]',
  },
};

type McBadgeGroupContextValue = {
  size: 'md' | 'lg';
  badgePosition: 'leading' | 'trailing';
};

const McBadgeGroupContext = createContext<McBadgeGroupContextValue | null>(null);

function McBadgeDot({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge-dot"
      aria-hidden="true"
      className={cn('inline-block size-2 shrink-0 rounded-full bg-current', className)}
      {...props}
    />
  );
}

function McBadge({
  className,
  variant,
  size = 'sm',
  render,
  icon,
  iconPosition = 'start',
  iconOnly = false,
  image,
  imageAlt = '',
  imagePosition = 'start',
  children,
  ...props
}: useRender.ComponentProps<'span'> &
  Omit<VariantProps<typeof McBadgeVariants>, 'size'> & {
    size?: BadgeSize;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
    iconOnly?: boolean;
    image?: string;
    imageAlt?: string;
    imagePosition?: 'start' | 'end';
  }) {
  const group = useContext(McBadgeGroupContext);

  const resolvedVariant = variant ?? (group ? 'primary' : 'default');
  const resolvedSize: BadgeSize = group ? (group.size === 'md' ? 'sm' : 'md') : size;
  const variantSize =
    group?.size === 'lg' && group.badgePosition === 'leading' ? 'groupLeadingLg' : resolvedSize;

  const isDot = isDotIcon(icon);
  const placement = iconPosition === 'end' ? 'end' : 'start';

  const kind: BadgeKind | undefined = image
    ? `image-${imagePosition}`
    : icon
      ? iconOnly
        ? 'only'
        : `${isDot ? 'dot' : 'icon'}-${placement}`
      : undefined;

  const iconEl = icon ? (
    isDot ? (
      icon
    ) : (
      <span
        data-slot="badge-icon"
        className="inline-flex size-3 shrink-0 items-center justify-center [&>svg]:size-full"
      >
        {icon}
      </span>
    )
  ) : null;

  const imageEl = image ? (
    <img
      data-slot="badge-image"
      src={image}
      alt={imageAlt}
      className="size-4 shrink-0 rounded-full object-cover"
    />
  ) : null;

  const leading = !image && placement === 'start' ? iconEl : null;
  const trailing = !image && placement === 'end' ? iconEl : null;

  const dataProps: Record<string, string> = { 'data-slot': 'badge' };
  if (icon && !image) dataProps['data-icon'] = `inline-${placement}`;

  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(
          McBadgeVariants({ variant: resolvedVariant, size: variantSize }),
          kind && McBadgePadding[resolvedSize][kind],
          className
        ),
        ...dataProps,
        children: (
          <>
            {imagePosition === 'start' ? imageEl : null}
            {leading}
            {iconOnly && icon ? null : children}
            {trailing}
            {imagePosition === 'end' ? imageEl : null}
          </>
        ),
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant: resolvedVariant,
      size: resolvedSize,
    },
  });
}

function isDotIcon(icon: ReactNode) {
  return (
    typeof icon === 'object' &&
    icon !== null &&
    'type' in icon &&
    (icon as { type: unknown }).type === McBadgeDot
  );
}

const McBadgeGroupVariants = cva(
  'inline-flex shrink-0 items-center rounded-[16px] border border-border bg-primary-foreground py-[3px] font-medium whitespace-nowrap text-primary',
  {
    variants: {
      size: {
        md: 'paragraph-xs gap-2',
        lg: 'paragraph-md gap-3',
      },
      badgePosition: {
        leading: 'pl-[3px] pr-[11px] has-[[data-slot=badge-group-icon]]:pr-[9px]',
        trailing: '',
      },
    },
    compoundVariants: [
      { size: 'md', badgePosition: 'trailing', className: 'pl-[11px] pr-[3px]' },
      {
        size: 'lg',
        badgePosition: 'trailing',
        className: 'pl-[13px] pr-[5px] has-[[data-icon=inline-end]]:pr-[3px]',
      },
    ],
    defaultVariants: {
      size: 'md',
      badgePosition: 'leading',
    },
  }
);

function McBadgeGroup({
  className,
  size = 'md',
  badgePosition = 'leading',
  render,
  ...props
}: useRender.ComponentProps<'span'> & {
  size?: 'md' | 'lg';
  badgePosition?: 'leading' | 'trailing';
}) {
  const element = useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(McBadgeGroupVariants({ size, badgePosition }), className),
        ...({ 'data-slot': 'badge-group' } as Record<string, string>),
      },
      props
    ),
    render,
    state: {
      slot: 'badge-group',
      size,
      badgePosition,
    },
  });

  return (
    <McBadgeGroupContext.Provider value={{ size, badgePosition }}>
      {element}
    </McBadgeGroupContext.Provider>
  );
}

function McBadgeGroupText({
  className,
  icon,
  children,
  ...props
}: ComponentProps<'span'> & { icon?: ReactNode }) {
  return (
    <span
      data-slot="badge-group-text"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    >
      {children}
      {icon ? (
        <span
          data-slot="badge-group-icon"
          className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-full"
        >
          {icon}
        </span>
      ) : null}
    </span>
  );
}

export {
  McBadge,
  McBadgeDot,
  McBadgeGroup,
  McBadgeGroupText,
  McBadgeVariants,
  McBadgeGroupVariants,
};
