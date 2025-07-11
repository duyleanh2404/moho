import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import { Hint } from '@/components/hint';
import { ForgotPasswordForm } from './components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Quên Mật Khẩu | Nội Thất MOHO',
  description:
    'Đặt lại mật khẩu tài khoản của bạn để tiếp tục mua sắm nội thất hiện đại tại MOHO. Miễn phí giao hàng và lắp đặt tận nơi.'
};

const ForgotPasswordPage = () => {
  return (
    <div className="wrapper w-full sm:w-[450px] min-h-screen flex flex-col items-center justify-center gap-8 py-12">
      <Hint label="Về trang chủ">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={140} height={140} />
        </Link>
      </Hint>
      <h1 className="text-2xl font-semibold">Quên mật khẩu</h1>
      <ForgotPasswordForm />
      <div className="flex items-center gap-1 text-sm">
        <p className="text-muted-foreground">Đã nhớ mật khẩu?</p>
        <Link href="/login" className="text-secondary font-medium hover:underline">
          Đăng nhập ngay!
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
