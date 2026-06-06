import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cloneElement, isValidElement } from 'react';

import { cn } from '@/lib/utils';

const McBadgeVariants = cva(
  'group/badge inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[16px] border border-[#E6E9FF] text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3! [&>svg]:shrink-0 [&>svg]:self-center',
  {
    variants: {
      variant: {
        default: 'bg-primary-foreground text-primary [a]:hover:bg-primary-foreground/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
      },
      size: {
        sm: 'h-[22px] min-w-[47px] px-2 py-0.5 text-sm leading-[18px]',
        md: 'h-[24px] min-w-[56px] px-[10px] py-0.5 text-sm leading-[20px]',
        lg: 'h-[32px] min-w-[65px] px-3 py-1 text-sm leading-[24px]',
        groupMd: 'h-[22px] min-w-[47px] px-2 py-0.5 text-sm leading-[18px]',
        groupLg: 'h-[28px] min-w-[56px] px-[10px] py-1 text-sm leading-[20px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

function McBadge({
  className,
  variant = 'default',
  size = 'sm',
  render,
  icon,
  iconPosition = 'start',
  iconOnly = false,
  image,
  imageAlt = '',
  imagePosition = 'start',
  leadingBadge,
  leadingBadgePosition = 'start',
  leadingBadgeIcon,
  groupSize = 'md',
  children,
  ...props
}: useRender.ComponentProps<'span'> &
  VariantProps<typeof McBadgeVariants> & {
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
    iconOnly?: boolean;
    image?: string;
    imageAlt?: string;
    imagePosition?: 'start' | 'end';
    leadingBadge?: ReactNode;
    leadingBadgePosition?: 'start' | 'end';
    leadingBadgeIcon?: ReactNode;
    groupSize?: 'md' | 'lg';
  }) {
  const groupSizeClasses = {
    md: 'h-[30px] leading-[22px]',
    lg: 'h-[36px] leading-[26px]',
  } as const;
  const groupChildSize = groupSize === 'md' ? 'groupMd' : 'groupLg';

  const imageEl = image ? (
    <img src={image} alt={imageAlt} className="size-4 shrink-0 rounded-full object-cover" />
  ) : null;

  const useParentIcon = !leadingBadge || leadingBadgePosition === 'start';
  const rawIcon = useParentIcon ? icon : undefined;
  const parentIcon = rawIcon ? (
    <span className="contents pointer-events-none">{rawIcon}</span>
  ) : undefined;

  const parentIconPlacement = parentIcon
    ? iconPosition === 'end'
      ? 'inline-end'
      : 'inline-start'
    : undefined;

  const contentWithIcon = parentIcon ? (
    iconPosition === 'end' ? (
      <>
        {children}
        {parentIcon}
      </>
    ) : (
      <>
        {parentIcon}
        {children}
      </>
    )
  ) : (
    children
  );

  const content = imageEl ? (
    imagePosition === 'end' ? (
      <>
        {contentWithIcon}
        {imageEl}
      </>
    ) : (
      <>
        {imageEl}
        {contentWithIcon}
      </>
    )
  ) : (
    contentWithIcon
  );

  const resolvedLeadingBadge = leadingBadge ? (
    isValidElement(leadingBadge) ? (
      cloneElement(leadingBadge as React.ReactElement<Record<string, unknown>>, {
        size: groupChildSize,
        icon: leadingBadgePosition === 'end' ? leadingBadgeIcon : undefined,
        iconPosition: 'end',
      })
    ) : (
      <McBadge
        size={groupChildSize}
        variant="secondary"
        icon={leadingBadgePosition === 'end' ? leadingBadgeIcon : undefined}
        iconPosition="end"
      >
        {leadingBadge}
      </McBadge>
    )
  ) : null;

  const groupedContent = resolvedLeadingBadge ? (
    leadingBadgePosition === 'end' ? (
      <>
        {content}
        {resolvedLeadingBadge}
      </>
    ) : (
      <>
        {resolvedLeadingBadge}
        {content}
      </>
    )
  ) : (
    content
  );

  const dataIconProps = parentIconPlacement
    ? ({ 'data-icon': parentIconPlacement } as Record<string, string>)
    : undefined;

  const iconOnlyClasses = iconOnly ? 'min-w-0 px-1.5' : undefined;

  const imagePaddingClasses = image
    ? imagePosition === 'start'
      ? 'pl-[3px]'
      : 'pr-[3px]'
    : undefined;

  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(
          McBadgeVariants({ variant, size }),
          leadingBadge ? groupSizeClasses[groupSize] : undefined,
          iconOnlyClasses,
          imagePaddingClasses,
          className
        ),
        ...(dataIconProps ?? {}),
        children: groupedContent,
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      size,
    },
  });
}

export { McBadge, McBadgeVariants };
