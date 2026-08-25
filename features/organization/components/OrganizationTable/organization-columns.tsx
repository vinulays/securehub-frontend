import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/common/Table/DataTableColumnHeader';
import { Badge } from '@/components/ui/badge';

import type { Organization } from '../../types';
import { OrganizationRowActions } from './organization-row-actions';

export const organizationColumns: ColumnDef<Organization>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Organization" />,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created Date" />,
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <OrganizationRowActions organization={row.original} />,
    enableSorting: false,
    size: 72,
    minSize: 72,
    maxSize: 72,
  },
];
