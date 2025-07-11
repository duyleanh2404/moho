'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Hint } from '@/components/hint';
import { ResetPasswordForm } from './components/reset-password-form';
import { ButtonResendOtp } from '../verify-email/components/button-resend-otp';

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="wrapper w-full sm:w-[450px] min-h-screen flex flex-col items-center justify-center gap-8 py-12">
      <Hint label="Về trang chủ">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={140} height={140} />
        </Link>
      </Hint>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Đặt lại mật khẩu</h1>
        <p className="text-muted-foreground text-sm">
          Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến{' '}
          <span className="text-primary font-medium">{email}</span>.
        </p>
      </div>
      <ResetPasswordForm email={email!} />
      <div className="flex items-center gap-1 text-sm">
        <p className="text-muted-foreground">Chưa nhận được mã?</p>
        <ButtonResendOtp />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
