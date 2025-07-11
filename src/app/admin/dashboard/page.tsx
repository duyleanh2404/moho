import { Metadata } from 'next';

import { Dashboard } from './components/dashboard';

export const metadata: Metadata = {
  title: 'Trang quản trị hệ thống | MOHO Nội Thất',
  description:
    'Trang quản trị tổng quan hệ thống MOHO. Hỗ trợ quản lý sản phẩm, đơn hàng, người dùng và các thiết lập quan trọng.'
};

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
