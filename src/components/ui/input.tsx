import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Hint } from '../hint';
import { cn } from '@/lib/utils';

type InputProps = React.ComponentProps<'input'>;

function Input({ className, type, ...props }: InputProps) {
  const [show, setShow] = React.useState(false);
  const isPassword = type === 'password';

  return (
    <div className="relative w-full">
      <input
        type={isPassword && show ? 'text' : type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-1',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
          isPassword && 'pr-10'
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary focus:outline-none cursor-pointer"
          tabIndex={-1}
        >
          {show ? (
            <Hint label="Ẩn mật khẩu">
              <EyeOff size={18} />
            </Hint>
          ) : (
            <Hint label="Hiển thị mật khẩu">
              <Eye size={18} />
            </Hint>
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
