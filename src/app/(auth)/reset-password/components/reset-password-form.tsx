'use client';

import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from '@/components/toast';
import { otpErrorMessages } from '@/lib/error-messages';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const formSchema = z
  .object({
    otp: z.string().length(6, { message: 'Mã OTP phải gồm chính xác 6 ký tự!' }),
    newPassword: z
      .string()
      .nonempty('Vui lòng nhập mật khẩu!')
      .min(8, 'Vui lòng nhập mật khẩu ít nhất 8 ký tự!')
      .refine((val) => /[a-z]/.test(val), 'Vui lòng đảm bảo mật khẩu chứa ít nhất 1 chữ thường!')
      .refine((val) => /[A-Z]/.test(val), 'Vui lòng đảm bảo mật khẩu chứa ít nhất 1 chữ hoa!')
      .refine((val) => /[0-9]/.test(val), 'Vui lòng đảm bảo mật khẩu chứa ít nhất 1 chữ số!')
      .refine(
        (val) => /[^A-Za-z0-9]/.test(val),
        'Vui lòng đảm bảo mật khẩu chứa ít nhất 1 ký tự đặc biệt!'
      ),
    confirmNewPassword: z.string().nonempty('Vui lòng xác nhận lại mật khẩu!')
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Mật khẩu không trùng khớp!',
    path: ['confirmNewPassword']
  });

type FormType = z.infer<typeof formSchema>;

export function ResetPasswordForm({ email }: { email: string }) {
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const onSubmit = async (data: FormType) => {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        otp: data.otp,
        newPassword: data.newPassword
      })
    });

    const result = await res.json();

    if (!res.ok) {
      const message = otpErrorMessages[result.message] ?? 'Đặt lại mật khẩu thất bại!';
      toast.error(message);
      return;
    }

    toast.success('Mật khẩu của bạn đã được đặt lại thành công!');
    router.replace('/login');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã OTP</FormLabel>
              <FormControl>
                <InputOTP autoFocus disabled={form.formState.isSubmitting} maxLength={6} {...field}>
                  <InputOTPGroup className="grid grid-cols-6 w-full">
                    <InputOTPSlot
                      index={0}
                      className="!bg-white w-full h-16 rounded-l-[3px] shadow-none text-center text-xl"
                    />
                    <InputOTPSlot
                      index={1}
                      className="!bg-white w-full h-16 rounded-none shadow-none text-center text-xl"
                    />
                    <InputOTPSlot
                      index={2}
                      className="!bg-white w-full h-16 rounded-none shadow-none text-center text-xl"
                    />
                    <InputOTPSlot
                      index={3}
                      className="!bg-white w-full h-16 rounded-none shadow-none text-center text-xl"
                    />
                    <InputOTPSlot
                      index={4}
                      className="!bg-white w-full h-16 rounded-none shadow-none text-center text-xl"
                    />
                    <InputOTPSlot
                      index={5}
                      className="!bg-white w-full h-16 rounded-none shadow-none text-center text-xl"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Nhập mật khẩu mới của bạn"
                  disabled={form.formState.isSubmitting}
                  className="h-10 !bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Nhập lại mật khẩu mới của bạn"
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
}
