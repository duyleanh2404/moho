'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, UserRound, ShoppingCart, Loader } from 'lucide-react';

import { cn } from '@/lib/utils';
import { UserSettings } from './user-settings';
import { useCurrentUser } from '@/mutation/user/use-current-user';

import { Hint } from '@/components/hint';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const router = useRouter();

  const prevScrollY = useRef(0);
  const searchRef = useRef<HTMLDivElement>(null);

  const [showNav, setShowNav] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { data: user, isPending } = useCurrentUser();

  // Hide nav when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide search on outside click
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
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="wrapper h-fit flex flex-col gap-6 py-4">
        <div className="flex items-center justify-between">
          {isSearchActive ? (
            <div ref={searchRef} className="relative w-full">
              <Input placeholder="Tìm kiếm sản phẩm" className="!bg-white" autoFocus />
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
                <Input placeholder="Tìm kiếm sản phẩm" className="h-10 !bg-white " />
                <div className="absolute top-0 right-0">
                  <Hint label="Tìm kiếm">
                    <Button size="icon" className="rounded-l-none rounded-r-sm">
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
                    size={'lg'}
                    variant="secondary"
                    onClick={() => router.push('/login')}
                    className="text-sm"
                  >
                    <UserRound />
                    <span>Đăng nhập / Đăng ký</span>
                  </Button>
                )}
              </div>

              <div className="flex md:hidden items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:text-secondary hover:!bg-secondary/5"
                  onClick={() => setIsSearchActive(true)}
                >
                  <Search className="!size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:text-secondary hover:!bg-secondary/5"
                >
                  <ShoppingCart className="!size-5" />
                </Button>
                {isPending ? (
                  <Loader className="text-secondary size-4 animate-spin" />
                ) : user ? (
                  <UserSettings user={user} />
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => router.push('/login')}
                    className="hover:text-secondary hover:!bg-secondary/5"
                  >
                    <UserRound className="!size-5" />
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        <ul
          className={cn(
            'items-center gap-8 transition-all duration-300',
            showNav ? 'hidden xl:flex' : 'hidden'
          )}
        >
          <li>
            <Link href="/" className="text-[15px] hover:text-secondary">
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link href="/" className="text-[15px] hover:text-secondary">
              Khuyến mãi
            </Link>
          </li>
          <li>
            <Link href="/" className="text-[15px] hover:text-secondary">
              Tin tức
            </Link>
          </li>
          <li>
            <Link href="/" className="text-[15px] hover:text-secondary">
              Liên hệ hợp tác
            </Link>
          </li>
          <li>
            <Link href="/" className="text-[15px] hover:text-secondary">
              Về MOHO
            </Link>
          </li>
          <li>
            <Link href="/" className="text-[15px] hover:text-secondary">
              Cửa hàng
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
