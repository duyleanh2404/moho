'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { LayoutDashboard, ShoppingCart, UserRound } from 'lucide-react';

import { NavUser } from './nav-user';

import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { Hint } from '@/components/hint';

const items = [
  {
    title: 'Trang chủ',
    url: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Người dùng',
    url: '/admin/users',
    icon: UserRound
  },
  {
    title: 'Sản phẩm',
    url: '/admin/products',
    icon: ShoppingCart
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="flex items-center justify-center p-6">
        <Hint label="Về trang chủ">
          <Link href={'/admin/dashboard'}>
            <Image
              src={'/logo.png'}
              alt="Logo"
              width={140}
              height={140}
              className="w-[140px] h-auto"
              priority
            />
          </Link>
        </Hint>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + '/');
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? 'text-primary bg-primary/10 hover:text-primary hover:bg-primary/10'
                          : ''
                      }
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="mt-auto">
          <NavUser />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
