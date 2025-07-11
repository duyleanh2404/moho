import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import { Hint } from '@/components/hint';
import { LoginForm } from './components/login-form';

export const metadata: Metadata = {
  title: 'Đăng Nhập | Nội Thất MOHO',
  description:
    'Đăng nhập tài khoản để tiếp tục mua sắm nội thất hiện đại tại MOHO. Miễn phí giao hàng và lắp đặt tận nơi.'
};

const LoginPage = () => {
  return (
    <div className="wrapper w-full sm:w-[450px] min-h-screen flex flex-col items-center justify-center gap-8 py-12">
      <Hint label="Về trang chủ">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={140}
            className="w-[140px] h-auto"
            priority
          />
        </Link>
      </Hint>
      <h1 className="text-2xl font-semibold">Đăng nhập tài khoản</h1>
      <LoginForm />
      <div className="flex items-center gap-1 text-sm">
        <p className="text-muted-foreground">Chưa có tải khoản?</p>
        <Link href={'/register'} className="text-secondary font-medium hover:underline">
          Đăng ký ngay!
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
