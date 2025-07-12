import { Metadata } from 'next';

import { ManageUsers } from './components/manage-users';

export const metadata: Metadata = {
  title: 'Quản lý người dùng | MOHO Nội Thất',
  description:
    'Trang quản trị người dùng của hệ thống nội thất MOHO. Quản lý thông tin, trạng thái và vai trò tài khoản người dùng.'
};

const ManageUsersPage = () => {
  return <ManageUsers />;
};

export default ManageUsersPage;
