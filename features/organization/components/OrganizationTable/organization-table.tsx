'use client';

import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import DataTable from '@/components/ui/data-table';

import { useOrganizations } from '../../hooks/use-organizations';
import { organizationColumns } from './organization-columns';

export function OrganizationTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const request = useMemo(
    () => ({
      keyword: '',

      page: pagination.pageIndex,
      size: pagination.pageSize,

      sortBy: sorting[0]?.id ?? 'createdAt',

      sortDirection: sorting[0]?.desc ? 'DESC' : 'ASC',
    }),
    [pagination, sorting],
  );

  const { data } = useOrganizations(request);

  return (
    <DataTable
      columns={organizationColumns}
      data={data?.content ?? []}
      pageCount={data?.totalPages ?? 0}
      pagination={pagination}
      onPaginationChange={setPagination}
      sorting={sorting}
      onSortingChange={setSorting}
    />
  );
}
