'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

import { useDeleteUser } from '@/mutation/user/use-delete-user';

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { toast } from '@/components/toast';
import { Button } from '@/components/ui/button';

export const ModalDeleteUser = ({
  userId,
  children
}: {
  userId: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { mutateAsync } = useDeleteUser();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await mutateAsync(userId);
      toast.success('Xóa người dùng thành công!');
      router.refresh();
      setOpen(false);
    } catch (error: any) {
      const message = error?.message || 'Xóa người dùng thất bại!';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="ghost"
              disabled={loading}
              className="text-black bg-[#F5F5F5] hover:text-black hover:bg-[#F5F5F5]"
            >
              Hủy
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="ml-auto"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Xóa người dùng
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
