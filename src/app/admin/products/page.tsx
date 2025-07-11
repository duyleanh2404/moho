import { Metadata } from 'next';

import { ManageProducts } from './components/manage-products';

export const metadata: Metadata = {
  title: 'Quản lý sản phẩm | MOHO Nội Thất',
  description:
    'Trang quản trị sản phẩm của hệ thống nội thất MOHO. Quản lý thông tin, tồn kho và trạng thái sản phẩm.'
};

const ManageProductsPage = () => {
  return <ManageProducts />;
};

export default ManageProductsPage;
