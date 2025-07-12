'use client';

import * as React from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { vi } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePicker({ date, onChange }: { date?: Date; onChange?: (date?: Date) => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="w-fit justify-between font-normal">
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="size-4" />
            <span className="truncate">
              {date ? date.toLocaleDateString('vi-VN') : 'Chọn ngày'}
            </span>
          </div>
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(d) => {
            onChange?.(d);
            setOpen(false);
          }}
          locale={vi}
        />
      </PopoverContent>
    </Popover>
  );
}
