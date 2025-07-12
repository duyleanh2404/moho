'use client';

import { useRouter } from 'next/navigation';

import z from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl
} from '@/components/ui/form';
import { toast } from '@/components/toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().nonempty('Vui lòng nhập email!').email('Email không hợp lệ!')
});

type FormType = z.infer<typeof formSchema>;

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: FormType) => {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorMessages: Record<number, string> = {
        404: 'Email này chưa được đăng ký tài khoản!',
        422: 'Bạn đang sử dụng tài khoản Google, nên không thể đặt lại mật khẩu. Hãy đăng nhập bằng Google để tiếp tục!'
      };

      toast.error(errorMessages[res.status] ?? 'Gửi mã OTP thất bại!');
      return;
    }

    toast.success('OTP đã được gửi đến email của bạn!');
    router.replace(`/reset-password?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
                  placeholder="Nhập email của bạn"
                  disabled={form.formState.isSubmitting}
                  className="h-10 !bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={'lg'} disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Tiếp tục
        </Button>
      </form>
    </Form>
  );
};
