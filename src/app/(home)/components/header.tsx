'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

import { Hint } from '@/components/hint';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, UserRound } from 'lucide-react';

export const Header = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };
    if (isSearchActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchActive]);

  return (
    <header className="h-[65px] flex items-center justify-between">
      {isSearchActive ? (
        <div ref={searchRef} className="relative w-full">
          <Input
            placeholder="Tìm kiếm sản phẩm"
            className="!bg-white rounded-[3px] shadow-none"
            autoFocus
          />
          <div className="absolute top-0 right-0">
            <Hint label="Tìm kiếm">
              <Button size="icon" className="rounded-l-none rounded-r-[3px]">
                <Search />
              </Button>
            </Hint>
          </div>
        </div>
      ) : (
        <>
          <Hint label="Về trang chủ">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={140} height={140} />
            </Link>
          </Hint>

          <div className="relative hidden xl:block w-[500px]">
            <Input
              placeholder="Tìm kiếm sản phẩm"
              className="!bg-white rounded-[3px] shadow-none"
            />
            <div className="absolute top-0 right-0">
              <Hint label="Tìm kiếm">
                <Button size="icon" className="rounded-l-none rounded-r-[3px]">
                  <Search />
                </Button>
              </Hint>
            </div>
          </div>

          <div className="hidden md:block space-x-3">
            <Button
              variant="ghost"
              className="inline-flex xl:hidden"
              onClick={() => setIsSearchActive(true)}
            >
              <Search />
              <span>Tìm kiếm</span>
            </Button>
            <Button variant="ghost">
              <ShoppingCart />
              <span>Giỏ hàng</span>
            </Button>
            <Button variant="secondary" className="rounded-[3px]">
              <UserRound />
              <span>Đăng nhập / Đăng ký</span>
            </Button>
          </div>

          <div className="block md:hidden space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-[3px] shadow-none"
              onClick={() => setIsSearchActive(true)}
            >
              <Search className="!size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-[3px] shadow-none">
              <ShoppingCart className="!size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-[3px] shadow-none">
              <UserRound className="!size-5" />
            </Button>
          </div>
        </>
      )}
    </header>
  );
};
