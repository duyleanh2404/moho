'use client';

import { useEffect, useState } from 'react';

import {
  SortingState,
  useReactTable,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';

import { User } from '@/types/user';
import { columns } from './columns';
import { useUsers } from '@/query/user';

import { Toolbar } from './toolbar';
import { DataTable } from './data-table';
import { Pagination } from './pagination';

export const ManageUsers = () => {
  const { data, isPending } = useUsers();
  const [tableData, setTableData] = useState<User[]>([]);

  const [rowSelection, setRowSelection] = useState({});
  const [createdAtFilter, setCreatedAtFilter] = useState<Date | undefined>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    if (data?.users) {
      setTableData(data.users);
    }
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className="w-full space-y-3 p-3">
      <Toolbar
        table={table}
        createdAtFilter={createdAtFilter}
        onCreatedAtChange={setCreatedAtFilter}
      />
      <DataTable table={table} isPending={isPending} />
      <Pagination table={table} />
    </div>
  );
};
