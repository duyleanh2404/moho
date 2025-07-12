'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Table as ReactTable } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface DataTablePaginationProps<TData> {
  table: ReactTable<TData>;
}

export const Pagination = <TData,>({ table }: DataTablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        Đã chọn {table.getFilteredSelectedRowModel().rows.length} /{' '}
        {table.getFilteredRowModel().rows.length} dòng.
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="size-4" />
          Trước
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sau
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
