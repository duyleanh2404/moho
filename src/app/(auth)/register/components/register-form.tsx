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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HintFieldRequired } from '@/components/hint-field-required';

import { toast } from '@/components/toast';
import { ButtonLoginGoogle } from '../../components/button-login-google';

export const formSchema = z
  .object({
    fullname: z
      .string()
      .nonempty('Vui lòng nhập họ tên!')
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Vui lòng chỉ nhập chữ cái và khoảng trắng cho họ tên!'),
    email: z.string().nonempty('Vui lòng nhập email!').email('Email không hợp lệ!'),
    password: z
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
    confirmPassword: z.string().nonempty('Vui lòng xác nhận lại mật khẩu!')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không trùng khớp!',
    path: ['confirmPassword']
  });

type FormType = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: FormType) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: data.fullname,
        email: data.email,
        password: data.password
      })
    });

    if (!res.ok) {
      const message = res.status === 409 ? 'Email này đã được đăng ký!' : 'Đăng ký thất bại!';
      toast.error(message);
      return;
    }

    toast.success('Đăng ký thành công. Vui lòng kiểm tra email để xác thực!');
    router.replace(`/verify-email?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <HintFieldRequired>
                  <span>Họ tên</span>
                </HintFieldRequired>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  spellCheck={false}
                  placeholder="Nhập họ tên của bạn"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <HintFieldRequired>
                  <span>Email</span>
                </HintFieldRequired>
              </FormLabel>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <HintFieldRequired>
                  <span>Mật khẩu</span>
                </HintFieldRequired>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <HintFieldRequired>
                  <span>Nhập lại mật khẩu</span>
                </HintFieldRequired>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={form.formState.isSubmitting}
                  placeholder="Nhập lại mật khẩu của bạn"
                  className="h-10 !bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={'lg'} disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Đăng ký
        </Button>
        <div className="relative py-4">
          <Separator />
          <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-2 bg-white text-sm text-muted-foreground">
            hoặc
          </p>
        </div>
        <ButtonLoginGoogle disabled={form.formState.isSubmitting} />
      </form>
    </Form>
  );
};
