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

import { toast } from '@/components/toast';
import { loginErrorMessages } from '@/lib/error-messages';
import { ButtonLoginGoogle } from '../../components/button-login-google';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().nonempty('Vui lòng nhập email!').email('Email không hợp lệ!'),
  password: z.string().nonempty('Vui lòng nhập mật khẩu')
});

type FormType = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: FormType) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      const error = result.statusCode === 401 && loginErrorMessages[result.message];

      if (error) {
        return typeof error === 'string'
          ? toast.error(error)
          : router.replace(error.redirectTo(data.email));
      }

      toast.error('Đăng nhập thất bại!');
      return;
    }

    toast.success('Đăng nhập thành công!');

    if (result.user?.role === 'admin') {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/');
    }
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
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
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
          <Link
            href={'/forgot-password'}
            className="text-sm text-muted-foreground hover:text-secondary hover:underline ml-auto"
          >
            Quên mật khẩu?
          </Link>
        </div>
        <Button type="submit" size={'lg'} disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Đăng nhập
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
