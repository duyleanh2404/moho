import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Copy, MoreHorizontal, Pencil, Trash } from 'lucide-react';

import { User } from '@/types/user';
import { ModalEditUser } from './modals/modal-edit-user';
import { ModalDeleteUser } from './modals/modal-delete-user';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'fullname',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Họ tên
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('fullname')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Email
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>
  },
  {
    accessorKey: 'provider',
    header: 'Nhà cung cấp',
    cell: ({ row }) => {
      const provider = row.getValue<string>('provider');
      return (
        <Badge variant={provider === 'google' ? 'secondary' : 'default'} className="capitalize">
          {provider ?? '-'}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'created_at',
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      const cellDate = new Date(row.getValue(columnId));
      const filterDate = new Date(filterValue);

      // Chuyển về chuỗi dd/mm/yyyy LOCAL để so sánh
      const cellDateString = cellDate.toLocaleDateString('vi-VN');
      const filterDateString = filterDate.toLocaleDateString('vi-VN');

      return cellDateString === filterDateString;
    },
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Ngày tạo
        <ArrowUpDown className="size-3 ml-1" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.getValue('created_at');
      const date = value ? new Date(value as string) : null;
      return (
        <div className="text-muted-foreground text-sm">
          {date ? date.toLocaleString('vi-VN') : '-'}
        </div>
      );
    }
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Ngày cập nhật
        <ArrowUpDown className="size-3 ml-1" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.getValue('updated_at');
      const date = value ? new Date(value as string) : null;
      return (
        <div className="text-muted-foreground text-sm">
          {date ? date.toLocaleString('vi-VN') : '-'}
        </div>
      );
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user._id);
                toast.success('Sao chép ID người dùng thành công!');
              }}
              className="group"
            >
              <Copy className="size-4 group-hover:text-primary" />
              <span className="group-hover:text-primary">Sao chép ID người dùng</span>
            </DropdownMenuItem>
            <ModalEditUser user={row.original}>
              <DropdownMenuItem className="group" onSelect={(e) => e.preventDefault()}>
                <Pencil className="size-4 group-hover:text-primary" />
                <span className="group-hover:text-primary">Chỉnh sửa</span>
              </DropdownMenuItem>
            </ModalEditUser>
            <DropdownMenuSeparator />
            <ModalDeleteUser userId={row.original._id}>
              <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                <Trash className="size-4" />
                Xoá
              </DropdownMenuItem>
            </ModalDeleteUser>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
