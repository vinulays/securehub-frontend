import type { ColumnDef, OnChangeFn, PaginationState, SortingState } from '@tanstack/react-table';
import React from 'react';

import { cn } from '@/lib/utils';

import { SearchInput } from '../SearchInput/SearchInput';
import { DataTable } from '../Table/DataTable';
import { EmptyDataCard } from '../Table/EmptyDataCard';

interface TableShellProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  isLoading?: boolean;

  searchValue?: string;
  onSearchChange?: (query: string) => void;

  manualPagination?: boolean;
  manualSorting?: boolean;

  topActions?: React.ReactNode;
  bottomActions?: React.ReactNode;
  filterActions?: React.ReactNode;

  className?: string;
  searchPlaceholder?: string;
}

export default function TableShell<TData, TValue>({
  columns,
  data,

  pageCount,
  pagination,
  onPaginationChange,

  sorting,
  onSortingChange,

  isLoading,

  searchValue,
  onSearchChange,

  manualPagination = true,
  manualSorting = true,

  topActions,
  bottomActions,
  filterActions,

  className,
  searchPlaceholder = 'Search...',
}: TableShellProps<TData, TValue>) {
  return (
    <div className={cn(`flex h-full flex-col ${data.length === 0 && !isLoading ? '' : 'gap-4'}`, className)}>
      {(onSearchChange || topActions) && (
        <div className="mb-2 flex shrink-0 flex-col gap-6">
          <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3">
              <div className="w-full">
                {onSearchChange && (
                  <SearchInput
                    placeholder={searchPlaceholder}
                    value={searchValue ?? ''}
                    onSearchChange={onSearchChange}
                  />
                )}
              </div>

              {filterActions && <div className="flex items-center">{filterActions}</div>}
            </div>

            {topActions && <div className="shrink-0">{topActions}</div>}
          </div>

          {bottomActions && <div>{bottomActions}</div>}
        </div>
      )}

      {data.length === 0 && !isLoading ? (
        <div className="flex-1">
          <EmptyDataCard />
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <DataTable
            columns={columns}
            data={data}
            pageCount={pageCount}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            isLoading={isLoading}
            sorting={sorting}
            onSortingChange={onSortingChange}
            manualPagination={manualPagination}
            manualSorting={manualSorting}
          />
        </div>
      )}
    </div>
  );
}
