'use client';

import * as React from 'react';
import { CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  DayPicker,
  defaultLocale,
  getDefaultClassNames,
  type DayButton,
  type Locale,
  type OptionProps,
  type SelectProps,
} from 'react-day-picker';

import { cn } from '@/lib/utils';
import { McButton, buttonVariants } from '@/registry/ui/mc-button';
import { McPopover, McPopoverContent, McPopoverTrigger } from '@/registry/ui/mc-popover';

function McCalendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  buttonVariant,
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  /** Variant for the previous/next buttons. Leave unset for plain icon buttons. */
  buttonVariant?: React.ComponentProps<typeof McButton>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  // Without a variant the nav buttons are bare chevrons, as in the design.
  const navButtonClassName = cn(
    buttonVariant
      ? buttonVariants({ variant: buttonVariant })
      : 'inline-flex items-center justify-center text-foreground transition-colors outline-none hover:bg-secondary focus-visible:ring-4 focus-visible:ring-ring',
    'size-(--cell-size) rounded-(--cell-radius) p-0 select-none aria-disabled:pointer-events-none aria-disabled:opacity-50'
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background p-3 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(8.5)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
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
        month: cn('flex w-full flex-col gap-5', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav
        ),
        button_previous: cn(navButtonClassName, defaultClassNames.button_previous),
        button_next: cn(navButtonClassName, defaultClassNames.button_next),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-2 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative flex h-(--cell-size) items-center rounded-(--cell-radius) border border-border transition-shadow has-focus-visible:ring-4 has-focus-visible:ring-ring',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute inset-0 cursor-pointer opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'font-medium text-foreground select-none',
          captionLayout === 'label'
            ? 'text-sm'
            : 'flex h-full items-center gap-1.5 pr-1.5 pl-2.5 text-sm [&>svg]:size-3.5',
          defaultClassNames.caption_label
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'w-(--cell-size) text-sm font-normal text-primary select-none',
          defaultClassNames.weekday
        ),
        week: cn('mt-2.5 flex w-full', defaultClassNames.week),
        week_number_header: cn('w-(--cell-size) select-none', defaultClassNames.week_number_header),
        week_number: cn('text-sm text-muted-foreground select-none', defaultClassNames.week_number),
        day: cn(
          'group/day relative size-(--cell-size) p-0 text-center select-none',
          defaultClassNames.day
        ),
        // Round the range highlight where it wraps onto a new week.
        range_start: cn(
          'rounded-l-full bg-secondary last:rounded-r-full',
          defaultClassNames.range_start
        ),
        range_middle: cn(
          'bg-secondary first:rounded-l-full last:rounded-r-full',
          defaultClassNames.range_middle
        ),
        range_end: cn(
          'rounded-r-full bg-secondary first:rounded-l-full',
          defaultClassNames.range_end
        ),
        today: defaultClassNames.today,
        outside: cn('text-accent-foreground', defaultClassNames.outside),
        disabled: cn('text-muted-foreground', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', className)} {...props} />;
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-4', className)} {...props} />;
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
              className={cn('bg-popover text-popover-foreground outline-none', className)}
              {...props}
            />
          );
        },
        Option: ({ className, ...props }: OptionProps) => {
          return (
            <option className={cn('bg-popover text-popover-foreground', className)} {...props} />
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

  const isRange = modifiers.range_start || modifiers.range_end || modifiers.range_middle;

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={modifiers.selected && !isRange}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      // Today is only highlighted while it isn't part of the selection, so it never fights the
      // selected styles.
      data-today={modifiers.today && !modifiers.selected}
      className={cn(
        'relative isolate z-10 flex size-(--cell-size) items-center justify-center rounded-full border-0 p-0 text-sm leading-none font-normal transition-colors outline-none focus-visible:z-20 focus-visible:ring-4 focus-visible:ring-ring',
        !modifiers.selected && 'enabled:hover:bg-secondary',
        'data-[today=true]:bg-secondary data-[today=true]:text-secondary-foreground',
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground',
        'data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground',
        'data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground',
        'data-[range-middle=true]:text-secondary-foreground',
        defaultClassNames.day_button,
        className
      )}
      {...props}
    />
  );
}

function McDatePicker({
  id,
  label,
  placeholder = 'Pick a date',
  dateFormat = 'MMMM dd, yyyy',
  selected,
  onSelect,
  locale,
  className,
  triggerClassName,
  ...calendarProps
}: Omit<React.ComponentProps<typeof McCalendar>, 'mode' | 'selected' | 'onSelect'> & {
  /** Id of the trigger button. */
  id?: string;
  /** Label rendered above the trigger. */
  label?: React.ReactNode;
  /** Text shown in the trigger while no date is selected. */
  placeholder?: React.ReactNode;
  /** date-fns format string for the selected date. */
  dateFormat?: string;
  selected?: Date;
  onSelect?: (date?: Date) => void;
  triggerClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const labelId = `${triggerId}-label`;
  const valueId = `${triggerId}-value`;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          id={labelId}
          htmlFor={triggerId}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </label>
      )}

      <McPopover open={open} onOpenChange={setOpen}>
        <McPopoverTrigger
          render={
            <button
              id={triggerId}
              type="button"
              aria-labelledby={label ? `${labelId} ${valueId}` : undefined}
              className={cn(
                'flex h-9 w-[240px] items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-left text-foreground transition-[border-color,box-shadow] outline-none hover:border-ring focus-visible:ring-4 focus-visible:ring-ring',
                triggerClassName
              )}
            >
              <span id={valueId} className="text-sm leading-none font-medium">
                {selected
                  ? format(selected, dateFormat, { locale: { ...defaultLocale, ...locale } })
                  : placeholder}
              </span>

              <CalendarIcon aria-hidden className="size-4 shrink-0" />
            </button>
          }
        />

        <McPopoverContent align="start" sideOffset={6} className="!h-auto !w-auto !gap-0 !p-2">
          <McCalendar
            defaultMonth={selected}
            {...calendarProps}
            locale={locale}
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
