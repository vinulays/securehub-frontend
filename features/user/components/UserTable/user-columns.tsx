import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/common/Table/DataTableColumnHeader';
import { Badge } from '@/components/ui/badge';

import type { User } from '../../types';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => <Badge>{row.original.isActive ? 'Active' : 'Inactive'}</Badge>,
    enableSorting: false,
  },
];
