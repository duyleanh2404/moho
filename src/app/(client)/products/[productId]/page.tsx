import { Metadata } from 'next';

import { ProductDetails } from './components/product-details';

export const metadata: Metadata = {
  title: 'Ghế Sofa Vải MOHO GIORGIO - MOHO Signature',
  description:
    'Sofa Vải SOLUNA Lựa Chọn Táo Bạo Của Những Không Gian Có Gu.SOLUNA là tuyên ngôn đầy cá tính cho những không gian không ngại thể hiện chất riêng. Với thiết kế tựa lưng “tai thỏ” bo tròn dày dặn – vừa mềm mại, vừa vững chãi – SOLUNA mang đến cảm giác được ôm trọn trong sự thư giãn, nâng niu mà đầy khí chất.'
};

const ProductDetailsPage = () => {
  return <ProductDetails />;
};

export default ProductDetailsPage;
