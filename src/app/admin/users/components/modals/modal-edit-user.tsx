'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import z from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUpdateUser } from '@/mutation/user/use-update-user';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl
} from '@/components/ui/form';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger
} from '@/components/ui/select';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  fullname: z
    .string()
    .nonempty('Vui lòng nhập họ tên!')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Chỉ nhập chữ cái và khoảng trắng!'),
  email: z.string().nonempty('Vui lòng nhập email!').email('Email không hợp lệ!'),
  role: z.enum(['admin', 'user'])
});

type FormType = z.infer<typeof formSchema>;

interface ModalEditUserProps {
  children: React.ReactNode;
  user: {
    _id: string;
    fullname: string;
    email: string;
    role: 'admin' | 'user';
  };
}

export const ModalEditUser = ({ children, user }: ModalEditUserProps) => {
  const router = useRouter();
  const { mutateAsync } = useUpdateUser();
  const [open, setOpen] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
      role: user.role
    }
  });

  const onSubmit = async (data: FormType) => {
    try {
      await mutateAsync({
        id: user._id,
        data
      });
      toast.success('Cập nhật người dùng thành công!');
      router.refresh();
      form.reset(data);
      setOpen(false);
    } catch (error: any) {
      const message = error?.message || 'Cập nhật người dùng thất bại!';
      toast.error(message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
          <DialogDescription>Cập nhật thông tin chi tiết của người dùng.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        spellCheck={false}
                        placeholder="Nhập họ tên"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        spellCheck={false}
                        placeholder="Nhập email"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={form.formState.isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Quản trị viên</SelectItem>
                        <SelectItem value="user">Người dùng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={form.formState.isSubmitting}
                  className="text-black bg-[#F5F5F5] hover:text-black hover:bg-[#F5F5F5]"
                >
                  Đóng
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting} className="ml-auto">
                {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
