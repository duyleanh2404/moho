import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import { Hint } from '@/components/hint';
import { RegisterForm } from './components/register-form';

export const metadata: Metadata = {
  title: 'Đăng Ký | Nội Thất MOHO',
  description:
    'Đăng ký tài khoản để tiếp tục mua sắm nội thất hiện đại tại MOHO. Miễn phí giao hàng và lắp đặt tận nơi.'
};

const RegisterPage = () => {
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
      <h1 className="text-2xl font-semibold">Đăng ký tài khoản</h1>
      <RegisterForm />
      <div className="flex items-center gap-1 text-sm">
        <p className="text-muted-foreground">Đã có tải khoản?</p>
        <Link href={'/login'} className="text-secondary font-medium hover:underline">
          Đăng nhập ngay!
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
