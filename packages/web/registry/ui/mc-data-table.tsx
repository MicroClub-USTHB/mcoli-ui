'use client';

import * as React from 'react';
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  flexRender,
  globalFilteringFeature,
  metaHelper,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type ColumnDef,
  type Header,
  type OnChangeFn,
  type RowData,
  type RowSelectionState,
  type Table,
} from '@tanstack/react-table';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  HelpCircleIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { McButton } from '@/registry/ui/mc-button';
import { McCheckbox } from '@/registry/ui/mc-checkbox';
import { McTooltip, McTooltipContent, McTooltipTrigger } from '@/registry/ui/mc-tooltip';

// table primitives

function McTable({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom border-collapse text-sm', className)}
        {...props}
      />
    </div>
  );
}

function McTableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('bg-muted/50 [&_tr]:border-b [&_tr]:hover:bg-transparent', className)}
      {...props}
    />
  );
}

function McTableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

function McTableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  );
}

function McTableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-11 px-6 py-3 text-left align-middle text-xs font-medium whitespace-nowrap text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function McTableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'h-18 px-6 py-4 align-middle whitespace-nowrap text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function McTableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

// card chrome

function McDataTableCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-card"
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xs',
        className
      )}
      {...props}
    />
  );
}

function McDataTableHeader({
  className,
  title,
  badge,
  description,
  actions,
  ...props
}: Omit<React.ComponentProps<'div'>, 'title'> & {
  title: React.ReactNode;
  badge?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div
      data-slot="data-table-header"
      className={cn(
        'flex flex-col gap-4 border-b border-border px-4 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6',
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {badge && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}

function McDataTableToolbar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn(
        'flex flex-col gap-3 border-b border-border px-4 py-3 md:flex-row md:items-center md:justify-between',
        className
      )}
      {...props}
    />
  );
}

function McDataTableEmpty({
  className,
  icon,
  title,
  description,
  actions,
  ...props
}: Omit<React.ComponentProps<'div'>, 'title'> & {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div
      data-slot="data-table-empty"
      className={cn(
        'mx-auto flex max-w-sm flex-col items-center gap-4 px-4 py-10 text-center whitespace-normal',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-primary [&_svg]:size-6">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

function McDataTableCellUser({
  className,
  avatar,
  title,
  subtitle,
  ...props
}: Omit<React.ComponentProps<'div'>, 'title'> & {
  avatar?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <div
      data-slot="data-table-cell-user"
      className={cn('flex items-center gap-3', className)}
      {...props}
    >
      {avatar}
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-foreground">{title}</span>
        {subtitle && <span className="truncate text-sm text-muted-foreground">{subtitle}</span>}
      </div>
    </div>
  );
}

// table logic

export interface McDataTableColumnMeta {
  headerTooltip?: string;
  headerClassName?: string;
  cellClassName?: string;
}

const mcDataTableFeatures = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
  rowSelectionFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  columnMeta: metaHelper<McDataTableColumnMeta>(),
});

type McDataTableFeatures = typeof mcDataTableFeatures;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type McDataTableColumnDef<TData extends RowData> = ColumnDef<McDataTableFeatures, TData, any>;

function createMcDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<McDataTableFeatures, TData>();
}

type McDataTablePaginationVariant = 'numbered' | 'compact' | 'minimal';

function McDataTableColumnHeader<TData extends RowData>({
  header,
}: {
  header: Header<McDataTableFeatures, TData, unknown>;
}) {
  const { column } = header;
  const label = flexRender(column.columnDef.header, header.getContext());
  const tooltip = column.columnDef.meta?.headerTooltip;
  const sorted = column.getIsSorted();

  const help = tooltip && (
    <McTooltip>
      <McTooltipTrigger
        aria-label="More information"
        className="inline-flex text-muted-foreground hover:text-foreground"
      >
        <HelpCircleIcon className="size-4" />
      </McTooltipTrigger>
      <McTooltipContent desc={tooltip} />
    </McTooltip>
  );

  if (!column.getCanSort()) {
    return (
      <span className="inline-flex items-center gap-1">
        {label}
        {help}
      </span>
    );
  }

  const SortIcon = sorted === 'asc' ? ArrowUpIcon : ArrowDownIcon;

  return (
    <span className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={column.getToggleSortingHandler()}
        className={cn(
          'group/sort inline-flex items-center gap-1 rounded-sm outline-none hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring',
          sorted && 'text-foreground'
        )}
      >
        {label}
        <SortIcon
          className={cn(
            'size-3.5 transition-opacity',
            sorted ? 'opacity-100' : 'opacity-0 group-hover/sort:opacity-50'
          )}
        />
      </button>
      {help}
    </span>
  );
}

function getPageItems(page: number, pageCount: number): (number | 'ellipsis')[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  if (page <= 3 || page >= pageCount - 2) {
    return [1, 2, 3, 'ellipsis', pageCount - 2, pageCount - 1, pageCount];
  }
  return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', pageCount];
}

function McDataTablePagination<TData extends RowData>({
  table,
  variant = 'numbered',
  className,
}: {
  table: Table<McDataTableFeatures, TData>;
  variant?: McDataTablePaginationVariant;
  className?: string;
}) {
  const page = table.atoms.pagination.get().pageIndex + 1;
  const pageCount = Math.max(table.getPageCount(), 1);
  const canPrevious = table.getCanPreviousPage();
  const canNext = table.getCanNextPage();

  const pageLabel = (
    <span className="text-sm font-medium text-foreground">
      Page {page} of {pageCount}
    </span>
  );

  if (variant === 'minimal') {
    return (
      <div
        data-slot="data-table-pagination"
        className={cn('flex items-center justify-between gap-3 px-4 py-3', className)}
      >
        <McButton
          variant="secondary"
          size="sm"
          icon="only"
          iconDefinition={<ArrowLeftIcon />}
          aria-label="Go to previous page"
          disabled={!canPrevious}
          onClick={() => table.previousPage()}
        />
        {pageLabel}
        <McButton
          variant="secondary"
          size="sm"
          icon="only"
          iconDefinition={<ArrowRightIcon />}
          aria-label="Go to next page"
          disabled={!canNext}
          onClick={() => table.nextPage()}
        />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        data-slot="data-table-pagination"
        className={cn('flex items-center justify-between gap-3 px-6 py-3', className)}
      >
        {pageLabel}
        <div className="flex items-center gap-3">
          <McButton
            variant="secondary"
            size="sm"
            disabled={!canPrevious}
            onClick={() => table.previousPage()}
          >
            Previous
          </McButton>
          <McButton
            variant="secondary"
            size="sm"
            disabled={!canNext}
            onClick={() => table.nextPage()}
          >
            Next
          </McButton>
        </div>
      </div>
    );
  }

  return (
    <nav
      aria-label="pagination"
      data-slot="data-table-pagination"
      className={cn('flex items-center justify-between gap-3 px-6 py-3', className)}
    >
      <McButton
        variant="secondary"
        size="sm"
        icon="leading"
        iconDefinition={<ArrowLeftIcon />}
        disabled={!canPrevious}
        onClick={() => table.previousPage()}
      >
        Previous
      </McButton>
      <span className="text-sm font-medium text-foreground md:hidden">
        Page {page} of {pageCount}
      </span>
      <ul className="hidden items-center gap-0.5 md:flex">
        {getPageItems(page, pageCount).map((item, i) => (
          <li key={item === 'ellipsis' ? `ellipsis-${i}` : item}>
            {item === 'ellipsis' ? (
              <span
                aria-hidden
                className="flex size-10 items-center justify-center text-sm text-muted-foreground"
              >
                …
              </span>
            ) : (
              <button
                type="button"
                aria-current={item === page ? 'page' : undefined}
                onClick={() => table.setPageIndex(item - 1)}
                className={cn(
                  'flex size-10 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring',
                  item === page && 'bg-muted text-foreground'
                )}
              >
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>
      <McButton
        variant="secondary"
        size="sm"
        icon="trailing"
        iconDefinition={<ArrowRightIcon />}
        disabled={!canNext}
        onClick={() => table.nextPage()}
      >
        Next
      </McButton>
    </nav>
  );
}

export interface McDataTableProps<TData extends RowData> {
  columns: McDataTableColumnDef<TData>[];
  data: TData[];
  getRowId?: (row: TData, index: number) => string;
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  globalFilter?: string;
  pageSize?: number;
  pagination?: McDataTablePaginationVariant | false;
  empty?: React.ReactNode;
  className?: string;
}

function McDataTable<TData extends RowData>({
  columns,
  data,
  getRowId,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  globalFilter,
  pageSize = 10,
  pagination = 'numbered',
  empty,
  className,
}: McDataTableProps<TData>) {
  const table = useTable({
    features: mcDataTableFeatures,
    columns,
    data,
    getRowId,
    enableRowSelection,
    enableRowRangeSelection: false,
    globalFilterFn: 'includesString',
    manualPagination: pagination === false,
    initialState: { pagination: { pageIndex: 0, pageSize } },
    state: {
      ...(globalFilter !== undefined && { globalFilter }),
      ...(rowSelection !== undefined && { rowSelection }),
    },
    ...(onRowSelectionChange && { onRowSelectionChange }),
  });

  const rows = table.getRowModel().rows;
  const columnCount = table.getAllLeafColumns().length;

  return (
    <div data-slot="data-table" className={cn('flex w-full flex-col', className)}>
      <McTable>
        <McTableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <McTableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const sorted = header.column.getIsSorted();
                return (
                  <McTableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    aria-sort={
                      sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined
                    }
                    className={header.column.columnDef.meta?.headerClassName}
                  >
                    <div className="flex items-center gap-3">
                      {enableRowSelection && index === 0 && (
                        <McCheckbox
                          aria-label="Select all rows on this page"
                          checked={table.getIsAllPageRowsSelected()}
                          indeterminate={
                            !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()
                          }
                          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
                        />
                      )}
                      {!header.isPlaceholder && <McDataTableColumnHeader header={header} />}
                    </div>
                  </McTableHead>
                );
              })}
            </McTableRow>
          ))}
        </McTableHeader>
        <McTableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <McTableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                {row.getAllCells().map((cell, index) => (
                  <McTableCell key={cell.id} className={cell.column.columnDef.meta?.cellClassName}>
                    {enableRowSelection && index === 0 ? (
                      <div className="flex items-center gap-3">
                        <McCheckbox
                          aria-label="Select row"
                          checked={row.getIsSelected()}
                          disabled={!row.getCanSelect()}
                          onCheckedChange={(checked) => row.toggleSelected(checked)}
                        />
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </McTableCell>
                ))}
              </McTableRow>
            ))
          ) : (
            <McTableRow className="hover:bg-transparent">
              <McTableCell colSpan={columnCount} className="h-auto p-0">
                {empty ?? <McDataTableEmpty title="No results" />}
              </McTableCell>
            </McTableRow>
          )}
        </McTableBody>
      </McTable>
      {pagination && (
        <McDataTablePagination
          table={table}
          variant={pagination}
          className="border-t border-border"
        />
      )}
    </div>
  );
}

export {
  McTable,
  McTableHeader,
  McTableBody,
  McTableRow,
  McTableHead,
  McTableCell,
  McTableCaption,
  McDataTable,
  McDataTableCard,
  McDataTableHeader,
  McDataTableToolbar,
  McDataTableEmpty,
  McDataTableCellUser,
  McDataTableColumnHeader,
  McDataTablePagination,
  mcDataTableFeatures,
  createMcDataTableColumnHelper,
  type McDataTableFeatures,
  type McDataTableColumnDef,
  type McDataTablePaginationVariant,
};
