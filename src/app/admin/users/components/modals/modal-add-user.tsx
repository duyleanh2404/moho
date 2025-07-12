'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import z from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateUser } from '@/mutation/user/use-create-user';

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
import { HintFieldRequired } from '@/components/hint-field-required';

export const formSchema = z.object({
  fullname: z
    .string()
    .nonempty('Vui lòng nhập họ tên!')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Chỉ nhập chữ cái và khoảng trắng!'),
  email: z.string().nonempty('Vui lòng nhập email!').email('Email không hợp lệ!'),
  password: z
    .string()
    .nonempty('Vui lòng nhập mật khẩu!')
    .min(8, 'Ít nhất 8 ký tự!')
    .refine((val) => /[a-z]/.test(val), 'Ít nhất 1 chữ thường!')
    .refine((val) => /[A-Z]/.test(val), 'Ít nhất 1 chữ hoa!')
    .refine((val) => /[0-9]/.test(val), 'Ít nhất 1 chữ số!')
    .refine((val) => /[^A-Za-z0-9]/.test(val), 'Ít nhất 1 ký tự đặc biệt!'),
  role: z.enum(['admin', 'user'])
});

type FormType = z.infer<typeof formSchema>;

export const ModalAddUser = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { mutateAsync } = useCreateUser();

  const [open, setOpen] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      role: 'user'
    }
  });

  const onSubmit = async (data: FormType) => {
    try {
      await mutateAsync(data);
      toast.success('Tạo người dùng thành công!');
      router.refresh();
      form.reset();
      setOpen(false);
    } catch (error: any) {
      const message = error?.message || 'Thêm người dùng thất bại!';
      toast.error(message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Thêm người dùng mới</DialogTitle>
          <DialogDescription>
            Điền thông tin chi tiết để tạo người dùng mới trong hệ thống.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <HintFieldRequired>Họ tên</HintFieldRequired>
                    </FormLabel>
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
                    <FormLabel>
                      <HintFieldRequired>Email</HintFieldRequired>
                    </FormLabel>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <HintFieldRequired>Mật khẩu</HintFieldRequired>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Nhập mật khẩu"
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
                    <FormLabel>
                      <HintFieldRequired>Vai trò</HintFieldRequired>
                    </FormLabel>
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
                Thêm người dùng
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
