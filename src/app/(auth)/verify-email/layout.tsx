import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xác Thực Email | Nội Thất MOHO',
  description:
    'Xác thực email của bạn để kích hoạt tài khoản và tiếp tục mua sắm nội thất hiện đại tại MOHO.'
};

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
