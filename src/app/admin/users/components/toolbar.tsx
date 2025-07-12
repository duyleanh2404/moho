'use client';

import Image from 'next/image';
import { Table as ReactTable } from '@tanstack/react-table';
import { Search, UserRoundPlus, ListCollapse, ChevronDown } from 'lucide-react';

import { User } from '@/types/user';
import { ModalAddUser } from './modals/modal-add-user';
import { exportUsersToExcel } from '@/lib/export-to-excel';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';

interface ToolbarProps {
  table: ReactTable<User>;
  createdAtFilter?: Date;
  onCreatedAtChange?: (date?: Date) => void;
}

export const Toolbar = ({ table, createdAtFilter, onCreatedAtChange }: ToolbarProps) => {
  return (
    <div className="flex flex-col-reverse xl:flex-row items-center gap-4 sm:gap-3">
      <div className="relative w-full xl:w-sm">
        <Input
          placeholder="Tìm kiếm người dùng"
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="pl-10 !bg-white"
        />
        <Search className="size-5 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      <div className="w-full xl:w-auto -my-1.5 py-1.5 overflow-x-auto ml-auto">
        <div className="flex items-center gap-2 flex-nowrap py-1">
          <ModalAddUser>
            <Button>
              <UserRoundPlus className="size-4" /> Thêm người dùng
            </Button>
          </ModalAddUser>
          <DatePicker
            date={createdAtFilter}
            onChange={(date) => {
              onCreatedAtChange?.(date ?? undefined);
              table.getColumn('created_at')?.setFilterValue(date ?? undefined);
            }}
          />
          <Button
            variant="outline"
            onClick={() =>
              exportUsersToExcel(table.getFilteredRowModel().rows.map((r) => r.original))
            }
          >
            <Image src="/excel.svg" alt="Excel" width={18} height={18} />
            Xuất Excel
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ListCollapse className="size-4" />
                Hiển thị <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
