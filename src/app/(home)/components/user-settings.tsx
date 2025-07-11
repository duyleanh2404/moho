import { LogOut, ShoppingBag, UserRoundPen } from 'lucide-react';

import { User } from '@/types/user';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const UserSettings = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-9">
          <AvatarImage src={user.avatar_url} alt="Avatar Url" />
          <AvatarFallback className="text-white bg-primary">
            {user.fullname.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[250px] rounded-[3px] shadow-none">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="size-9">
            <AvatarImage src={user.avatar_url} alt="Avatar Url" />
            <AvatarFallback className="text-white bg-primary">
              {user.fullname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium truncate max-w-[150px]">{user.fullname}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group hover:!bg-secondary/5">
          <ShoppingBag strokeWidth={1.5} className="group-hover:text-secondary" />
          <span className="group-hover:text-secondary">Đơn hàng của tôi</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="group hover:!bg-secondary/5">
          <UserRoundPen strokeWidth={1.5} className="group-hover:text-secondary" />
          <span className="group-hover:text-secondary">Hồ sơ của tôi</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
