'use client';

import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { TableShell } from '@/components/common/TableShell';

import { useUsers } from '../../hooks';
import type { UserSearchRequest } from '../../types';
import { userColumns } from './user-columns';

export function UserTable() {
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

  const request = useMemo<UserSearchRequest>(
    () => ({
      keyword: searchKeyword,
      page: pagination.pageIndex,
      size: pagination.pageSize,
      sortBy: sorting[0]?.id ?? 'createdAt',
      sortDirection: sorting[0]?.desc ? 'DESC' : 'ASC',
    }),
    [pagination, searchKeyword, sorting],
  );

  const { data, isLoading } = useUsers(request);

  return (
    <TableShell
      columns={userColumns}
      data={data?.content ?? []}
      isLoading={isLoading}
      pageCount={data?.totalPages ?? 0}
      pagination={pagination}
      onPaginationChange={setPagination}
      sorting={sorting}
      onSortingChange={setSorting}
      searchValue={searchKeyword}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search users..."
    />
  );
}
