'use client';

import Link from 'next/link';
import Image from 'next/image';

import { ChevronRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

import { Hint } from '@/components/hint';
import { Carousel, CarouselItem, CarouselContent } from '@/components/ui/carousel';

export const NewProducts = () => {
  return (
    <div className="wrapper space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">Sản phẩm mới nhất</h1>
        <Link
          href={'/'}
          className="flex items-center gap-1 text-sm sm:text-base text-secondary hover:underline"
        >
          <span>Xem thêm</span>
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <Carousel plugins={[Autoplay({ delay: 3000 })]}>
        <CarouselContent>
          <CarouselItem className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <Hint label="Xem chi tiết">
              <Link href={'/products/test'} className="space-y-3">
                <div className="relative w-full pt-[100%]">
                  <Image
                    src={'/products/product-example-1.png'}
                    alt="Product"
                    fill
                    className="object-cover rounded-[3px]"
                  />
                  <p className="absolute top-2 left-2 text-[13px] text-white font-medium bg-secondary py-1 px-2 ml-auto">
                    -23%
                  </p>
                </div>
                <h2 className="font-semibold">Ghế Sofa Vải MOHO GIORGIO - MOHO Signature</h2>
                <div className="flex items-center gap-3">
                  <p className="text-lg text-secondary font-semibold">32,990,000₫</p>
                  <p className="text-[15px] line-through text-muted-foreground">42,887,000₫</p>
                </div>
              </Link>
            </Hint>
          </CarouselItem>
          <CarouselItem className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <Hint label="Xem chi tiết">
              <Link href={'/products/test'} className="space-y-3">
                <div className="relative w-full pt-[100%]">
                  <Image
                    src={'/products/product-example-1.png'}
                    alt="Product"
                    fill
                    className="object-cover rounded-[3px]"
                  />
                  <p className="absolute top-2 left-2 text-[13px] text-white font-medium bg-secondary py-1 px-2 ml-auto">
                    -23%
                  </p>
                </div>
                <h2 className="font-semibold">Ghế Sofa Vải MOHO GIORGIO - MOHO Signature</h2>
                <div className="flex items-center gap-3">
                  <p className="text-lg text-secondary font-semibold">32,990,000₫</p>
                  <p className="text-[15px] line-through text-muted-foreground">42,887,000₫</p>
                </div>
              </Link>
            </Hint>
          </CarouselItem>
          <CarouselItem className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <Hint label="Xem chi tiết">
              <Link href={'/products/test'} className="space-y-3">
                <div className="relative w-full pt-[100%]">
                  <Image
                    src={'/products/product-example-1.png'}
                    alt="Product"
                    fill
                    className="object-cover rounded-[3px]"
                  />
                  <p className="absolute top-2 left-2 text-[13px] text-white font-medium bg-secondary py-1 px-2 ml-auto">
                    -23%
                  </p>
                </div>
                <h2 className="font-semibold">Ghế Sofa Vải MOHO GIORGIO - MOHO Signature</h2>
                <div className="flex items-center gap-3">
                  <p className="text-lg text-secondary font-semibold">32,990,000₫</p>
                  <p className="text-[15px] line-through text-muted-foreground">42,887,000₫</p>
                </div>
              </Link>
            </Hint>
          </CarouselItem>
          <CarouselItem className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <Hint label="Xem chi tiết">
              <Link href={'/products/test'} className="space-y-3">
                <div className="relative w-full pt-[100%]">
                  <Image
                    src={'/products/product-example-1.png'}
                    alt="Product"
                    fill
                    className="object-cover rounded-[3px]"
                  />
                  <p className="absolute top-2 left-2 text-[13px] text-white font-medium bg-secondary py-1 px-2 ml-auto">
                    -23%
                  </p>
                </div>
                <h2 className="font-semibold">Ghế Sofa Vải MOHO GIORGIO - MOHO Signature</h2>
                <div className="flex items-center gap-3">
                  <p className="text-lg text-secondary font-semibold">32,990,000₫</p>
                  <p className="text-[15px] line-through text-muted-foreground">42,887,000₫</p>
                </div>
              </Link>
            </Hint>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
