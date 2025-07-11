'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import { Search, Loader2, UserRound, ShoppingCart, Loader } from 'lucide-react';

import { UserSettings } from './user-settings';
import { useCurrentUser } from '@/hooks/use-current-user';

import { Hint } from '@/components/hint';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { data: user, isPending } = useCurrentUser();

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
    <header className="wrapper sticky top-0 h-fit flex flex-col gap-6 py-3 bg-white z-50">
      <div className="flex items-center justify-between">
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
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={140}
                  height={140}
                  className="w-[140px] h-auto"
                  priority
                />
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

            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                className="inline-flex xl:hidden hover:text-secondary hover:!bg-secondary/5"
                onClick={() => setIsSearchActive(true)}
              >
                <Search />
                <span>Tìm kiếm</span>
              </Button>
              <Button variant="ghost" className="hover:text-secondary hover:!bg-secondary/5">
                <ShoppingCart />
                <span>Giỏ hàng</span>
              </Button>

              {isPending ? (
                <Loader2 className="size-5 animate-spin text-secondary" />
              ) : user ? (
                <UserSettings user={user} />
              ) : (
                <Button
                  variant="secondary"
                  className="rounded-[3px]"
                  onClick={() => router.push('/login')}
                >
                  <UserRound />
                  <span>Đăng nhập / Đăng ký</span>
                </Button>
              )}
            </div>

            <div className="flex md:hidden items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-[3px] shadow-none hover:text-secondary hover:!bg-secondary/5"
                onClick={() => setIsSearchActive(true)}
              >
                <Search className="!size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-[3px] shadow-none hover:text-secondary hover:!bg-secondary/5"
              >
                <ShoppingCart className="!size-5" />
              </Button>
              {isPending ? (
                <Loader className="text-secondary size-4 animate-spin" />
              ) : (
                user && <UserSettings user={user} />
              )}
            </div>
          </>
        )}
      </div>

      <ul className="hidden xl:flex items-center gap-8">
        <li>
          <Link href={'/'} className="text-[15px] hover:text-secondary">
            Sản phẩm
          </Link>
        </li>
        <li>
          <Link href={'/'} className="text-[15px] hover:text-secondary">
            Khuyến mãi
          </Link>
        </li>
        <li>
          <Link href={'/'} className="text-[15px] hover:text-secondary">
            Tin tức
          </Link>
        </li>
        <li>
          <Link href={'/'} className="text-[15px] hover:text-secondary">
            Liên hệ hợp tác
          </Link>
        </li>
        <li>
          <Link href={'/'} className="text-[15px] hover:text-secondary">
            Về MOHO
          </Link>
        </li>
        <li>
          <Link href={'/'} className="text-[15px] hover:text-secondary">
            Cửa hàng
          </Link>
        </li>
      </ul>
    </header>
  );
};
