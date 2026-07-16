'use client';

import * as React from 'react';
import { CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
  type OptionProps,
  type SelectProps,
} from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { McPopover, McPopoverContent, McPopoverTrigger } from '@/registry/ui/mc-popover';

function McCalendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'cn-calendar-dropdown-root relative flex items-center h-[34.304px] gap-[6px] px-[8.58px] pr-[4.29px] rounded-(--cell-radius) border border-(--Border,#E6E9FF) [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          'absolute inset-0 bg-popover opacity-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          'font-medium select-none',
          captionLayout === 'label'
            ? 'cn-calendar-caption text-sm'
            : 'cn-calendar-caption-label flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
          defaultClassNames.caption_label
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-primary select-none',
          defaultClassNames.weekday
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn('w-(--cell-size) select-none', defaultClassNames.week_number_header),
        week_number: cn(
          'text-[0.8rem] text-muted-foreground select-none',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)'
            : '[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)',
          defaultClassNames.day
        ),
        range_start: cn(
          'relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted',
          defaultClassNames.range_start
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn(
          'relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted',
          defaultClassNames.range_end
        ),
        today: cn('rounded-full bg-secondary text-secondary-foreground ', defaultClassNames.today),
        outside: cn(
          'text-accent-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('cn-rtl-flip size-4', className)} {...props} />;
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('cn-rtl-flip size-4', className)} {...props} />;
          }

          return <ChevronDownIcon className={cn('size-4', className)} {...props} />;
        },
        DayButton: ({ ...props }) => <McCalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        Select: ({ className, ...props }: SelectProps) => {
          return (
            <select
              className={cn(
                'rounded-(--cell-radius) bg-popover text-popover-foreground outline-none',
                className
              )}
              {...props}
            />
          );
        },
        Option: ({ className, ...props }: OptionProps) => {
          return (
            <option
              className={cn(
                'bg-popover text-popover-foreground hover:bg-secondary focus:bg-secondary',
                className
              )}
              {...props}
            />
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function McCalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[today=true]:text-secondary group-data-[today=true]:rounded-full group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-full data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:border data-[range-end=true]:border-border data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-full data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:border data-[range-start=true]:border-border data-[selected-single=true]:rounded-full data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:border data-[selected-single=true]:border-border dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

function McDatePicker({
  label = 'Submission date',
  placeholder = 'Pick a date',
  selected,
  onSelect,
  className,
  triggerClassName,
  ...calendarProps
}: Omit<React.ComponentProps<typeof McCalendar>, 'mode' | 'selected' | 'onSelect'> & {
  label?: React.ReactNode;
  placeholder?: React.ReactNode;
  selected?: Date;
  onSelect?: (date?: Date) => void;
  triggerClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="text-sm font-medium text-muted-foreground">{label}</span>}

      <McPopover open={open} onOpenChange={setOpen}>
        <McPopoverTrigger
          render={
            <button
              type="button"
              className={cn(
                'flex h-9 w-[240px] items-center justify-between rounded-md border text-foreground border-border bg-input px-3 py-2 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20',
                triggerClassName
              )}
            >
              <span
                className={cn(
                  'text-sm font-medium leading-none',
                  selected ? 'text-foreground' : 'text-foreground'
                )}
              >
                {selected ? format(selected, 'PPP') : placeholder}
              </span>

              <CalendarIcon className="size-4 shrink-0 text-foreground" />
            </button>
          }
        />

        <McPopoverContent align="start" sideOffset={12} className="!h-auto !w-auto !gap-0 !p-2">
          <McCalendar
            {...calendarProps}
            mode="single"
            selected={selected}
            onSelect={(next) => {
              onSelect?.(next);
              if (next) setOpen(false);
            }}
          />
        </McPopoverContent>
      </McPopover>
    </div>
  );
}

export { McCalendar, McCalendarDayButton, McDatePicker };
