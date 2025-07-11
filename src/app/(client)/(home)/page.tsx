import { Metadata } from 'next';

import { Banner } from './components/banner';
import { NewProducts } from './components/new-products';

export const metadata: Metadata = {
  title: 'Nội Thất MOHO | Miễn Phí Giao Hàng & Lắp Đặt Tận Phòng',
  description:
    'Nội Thất MOHO cung cấp đa dạng mẫu mã đồ gỗ nội thất hiện đại cho phòng khách, phòng ăn, phòng làm việc và phòng ngủ. Đầy đủ trọn gói nội thất căn hộ chung cư, thiết kế và thi công tủ bếp.'
};

export default function HomePage() {
  return (
    <>
      <Banner />
      <NewProducts />
    </>
  );
}
