'use client';

import { Loader2 } from 'lucide-react';
import { flexRender, Table as ReactTable } from '@tanstack/react-table';

import { columns } from './columns';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader
} from '@/components/ui/table';

interface DataTableProps<TData> {
  table: ReactTable<TData>;
  isPending?: boolean;
}

export const DataTable = <TData,>({ table, isPending }: DataTableProps<TData>) => {
  return (
    <Table className="rounded-md border">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isPending ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              <Loader2 className="size-4 animate-spin text-secondary inline mr-2" />
              Đang tải dữ liệu...
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              Không có dữ liệu.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
