'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Loader2 } from 'lucide-react';

import { toast } from '@/components/toast';
import { useCountdown } from '@/hooks/use-countdown';

export const ButtonResendOtp = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [isLoading, setIsLoading] = useState(false);
  const { count, start, isCounting } = useCountdown(60);

  const handleResend = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!res.ok) {
        const message =
          res.status === 429
            ? 'Bạn vừa yêu cầu gửi lại OTP, vui lòng đợi 1 phút trước khi thử lại!'
            : 'Gửi lại OTP thất bại!';
        toast.error(message);
        return;
      }

      toast.success('OTP đã được gửi lại email!');
      start();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isCounting || isLoading}
      onClick={handleResend}
      className="text-secondary font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {isLoading && <Loader2 className="inline-block mx-1.5 size-4 animate-spin" />}
      {isLoading ? 'Đang xử lý' : isCounting ? `Gửi lại sau ${count}s` : 'Gửi lại ngay!'}
    </button>
  );
};
