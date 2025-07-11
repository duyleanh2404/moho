'use client';

import { toast } from 'sonner';
import { XIcon, CircleCheckIcon, CircleAlertIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CustomToastProps {
  t: string | number;
  message: string;
  type?: 'success' | 'error';
}

export const CustomToast = ({ t, message, type = 'success' }: CustomToastProps) => {
  return (
    <div
      className={cn(
        'w-full sm:w-[380px] rounded-md border py-3 px-4 shadow-sm flex items-center gap-3',
        type === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {type === 'success' ? (
          <CircleCheckIcon size={20} className="text-emerald-600" aria-hidden="true" />
        ) : (
          <CircleAlertIcon size={20} className="text-red-600" aria-hidden="true" />
        )}
      </div>
      <div className="flex-1 text-sm text-foreground">{message}</div>
      <button
        aria-label="Close toast"
        onClick={() => toast.dismiss(t)}
        className="hover:bg-transparent cursor-pointer"
      >
        <XIcon size={19} className="opacity-60 hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};
