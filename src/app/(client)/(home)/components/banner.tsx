'use client';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { Carousel, CarouselItem, CarouselContent } from '@/components/ui/carousel';

export const Banner = () => {
  return (
    <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full">
      <CarouselContent>
        <CarouselItem className="relative w-full pt-[30%]">
          <Image src={'/banner/banner-1.jpg'} alt="Banner" fill className="object-cover" />
        </CarouselItem>
        <CarouselItem className="relative w-full pt-[30%]">
          <Image src={'/banner/banner-2.jpg'} alt="Banner" fill className="object-cover" />
        </CarouselItem>
        <CarouselItem className="relative w-full pt-[30%]">
          <Image src={'/banner/banner-3.jpg'} alt="Banner" fill className="object-cover" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
