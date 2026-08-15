import type { ColumnDef, OnChangeFn, PaginationState, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTablePagination } from './data-table-pagination';
import { ScrollArea } from './scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  isLoading?: boolean;

  pageCount: number;

  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState> | undefined;

  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState> | undefined;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  pageCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,

    autoResetPageIndex: true,

    state: {
      pagination,
      sorting,
    },

    pageCount,

    manualSorting: true,
    manualPagination: true,

    onSortingChange,
    onPaginationChange,

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="overflow-hidden rounded-lg border border-border">
          <ScrollArea className="h-full">
            <Table className="h-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="h-full">
                {isLoading &&
                  Array.from({ length: pagination?.pageSize || 5 }).map((_, idx) => (
                    <TableRow key={idx} className="animate-pulse odd:bg-white even:bg-muted/50">
                      {table.getHeaderGroups()[0]?.headers.map((header) => (
                        <TableCell key={header.id} style={{ width: header.getSize() }}>
                          <div className="h-5 w-full rounded bg-input/70" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}

                {table.getRowModel().rows?.length > 0 &&
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>

      <div className="shrink-0 px-4 pt-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
