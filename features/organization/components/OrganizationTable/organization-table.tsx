'use client';

import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { TableShell } from '@/components/common/TableShell';

import { useOrganizations } from '../../hooks/use-organizations';
import { AddOrganizationButton } from './add-organization-button';
import { organizationColumns } from './organization-columns';

export function OrganizationTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchChange = useCallback((query: string) => {
    setSearchKeyword(query);
    setPagination(({ pageSize }) => ({ pageIndex: 0, pageSize }));
  }, []);

  const request = useMemo(
    () => ({
      keyword: searchKeyword,

      page: pagination.pageIndex,
      size: pagination.pageSize,

      sortBy: sorting[0]?.id ?? 'createdAt',

      sortDirection: sorting[0]?.desc ? 'DESC' : 'ASC',
    }),
    [pagination, searchKeyword, sorting],
  );

  const { data, isLoading } = useOrganizations(request);

  return (
    <TableShell
      columns={organizationColumns}
      data={data?.content ?? []}
      isLoading={isLoading}
      pageCount={data?.totalPages ?? 0}
      pagination={pagination}
      onPaginationChange={setPagination}
      sorting={sorting}
      onSortingChange={setSorting}
      searchValue={searchKeyword}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search organizations..."
      topActions={<AddOrganizationButton />}
    />
  );
}
