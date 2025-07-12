'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

export const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(1);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <div className="bg-[#F5F5F5] py-3">
          <Breadcrumb className="wrapper">
            <BreadcrumbList className="flex flex-wrap gap-x-1">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="block max-w-[80px] truncate whitespace-nowrap sm:max-w-none"
                >
                  Trang chủ
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/products"
                  className="block max-w-[100px] truncate whitespace-nowrap sm:max-w-none"
                >
                  Sản phẩm
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="block max-w-[170px] sm:max-w-none truncate whitespace-nowrap">
                  Ghế Sofa Vải MOHO GIORGIO - MOHO Signature
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="wrapper flex flex-col lg:flex-row gap-8 py-6">
          <div className="w-full lg:w-[55%] flex flex-col-reverse sm:flex-row gap-3 sm:gap-6 lg:sticky lg:top-24 xl:top-20 2xl:top-24 max-h-[500px] md:max-h-[650px] lg:max-h-[450px] xl:max-h-[550px]">
            <div className="w-full sm:w-[15%] flex sm:block gap-2 sm:space-y-3 overflow-x-auto sm:overflow-y-auto -my-4 py-4 sm:-mx-2 sm:px-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'relative flex-shrink-0 w-24 sm:w-full aspect-square border-2 hover:border-secondary rounded-sm transition cursor-pointer overflow-hidden',
                    selectedImage === i ? 'border-secondary' : 'border-transparent'
                  )}
                >
                  <Image
                    src={`/products/product-example-${i}.png`}
                    alt={`Product ${i}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsZoomOpen(true)}
              className="flex-1 relative w-full border border-muted rounded-sm overflow-hidden cursor-zoom-in aspect-[3/3]"
            >
              <Image
                src={`/products/product-example-${selectedImage}.png`}
                alt="Product"
                fill
                className="object-cover"
              />
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Ghế Sofa Vải MOHO GIORGIO - MOHO Signature</h1>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  <strong>SKU:</strong> MFSNCF501.B25
                </p>
                <p className="text-muted-foreground">Đã bán: 0</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-white font-medium bg-secondary py-1 px-2">-23%</p>
              <div className="flex items-center gap-3">
                <p className="text-xl text-secondary font-semibold">32,990,000₫</p>
                <p className="text-muted-foreground line-through">42,887,000₫</p>
              </div>
            </div>

            <p className="text-[15px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi perspiciatis culpa,
              eligendi atque, provident quia consectetur id molestias incidunt architecto qui nulla
              ducimus. Culpa sint, expedita fuga provident aspernatur totam.
            </p>

            <p className="text-[15px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi perspiciatis culpa,
              eligendi atque, provident quia consectetur id molestias incidunt architecto qui nulla
              ducimus. Culpa sint, expedita fuga provident aspernatur totam.
            </p>

            <p className="text-[15px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi perspiciatis culpa,
              eligendi atque, provident quia consectetur id molestias incidunt architecto qui nulla
              ducimus. Culpa sint, expedita fuga provident aspernatur totam.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Số lượng:</span>
                <div className="flex items-center border border-input rounded-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="px-3 py-1 text-lg hover:bg-muted transition cursor-pointer"
                  >
                    –
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center outline-none bg-transparent"
                    min={1}
                  />
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="px-3 py-1 text-lg hover:bg-muted transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button size="lg" className="w-full uppercase">
                Thêm vào giỏ
              </Button>
              <Button variant="secondary" size="lg" className="w-full uppercase">
                Mua ngay
              </Button>
            </div>

            <p className="text-[15px] text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptates fugiat,
              error, veritatis recusandae atque quibusdam numquam eos quo nobis repellat ratione
              nihil totam, asperiores minima cum minus ullam? Facere.
            </p>
          </div>
        </div>

        {isZoomOpen && (
          <div
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
          >
            <div className="relative w-[90%] max-w-4xl aspect-video">
              <Image
                src={`/products/product-example-${selectedImage}.png`}
                alt="Product zoom"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="wrapper py-12">
        <h1 className="text-2xl font-semibold text-center">
          Ghế Sofa Vải MOHO GIORGIO - MOHO Signature
        </h1>
      </div>
    </>
  );
};
