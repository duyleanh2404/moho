import { ChevronDown, Loader2, LogOut } from 'lucide-react';

import { useCurrentUser } from '@/hooks/use-current-user';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const NavUser = () => {
  const { isMobile } = useSidebar();
  const { data: user, isPending } = useCurrentUser();

  return isPending ? (
    <Loader2 className="text-secondary size-4 animate-spin" />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-9">
              <AvatarImage src={user?.avatar_url} alt="Avatar Url" />
              <AvatarFallback className="text-white bg-primary">
                {user?.fullname.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-start">
              <p className="text-sm font-medium truncate max-w-[150px]">{user?.fullname}</p>
              <p className="text-[13px] text-muted-foreground truncate max-w-[150px]">
                {user?.email}
              </p>
            </div>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={isMobile ? 'bottom' : 'right'}
        className="w-[280px] rounded-[3px] shadow-none"
      >
        <DropdownMenuItem
          onClick={() => (window.location.href = '/api/auth/logout')}
          className="group hover:!bg-secondary/5"
        >
          <LogOut strokeWidth={1.5} className="group-hover:text-secondary" />
          <span className="group-hover:text-secondary">Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
