'use client';

import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from '@/components/toast';
import { otpErrorMessages } from '@/lib/error-messages';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormItem, FormField, FormMessage, FormControl } from '@/components/ui/form';

const formSchema = z.object({
  otp: z.string().length(6, { message: 'Mã OTP phải gồm chính xác 6 ký tự!' })
});

type FormType = z.infer<typeof formSchema>;

export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: ''
    }
  });

  const onSubmit = async (data: FormType) => {
    const res = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, email })
    });

    const result = await res.json();
    if (!res.ok) {
      toast.error(otpErrorMessages[result.message] ?? 'Xác thực thất bại!');
      return;
    }

    toast.success(result.access_token ? 'Chào mừng bạn quay trở lại!' : 'Xác thực thành công!');

    router.replace(
      result.access_token ? `/callback?access_token=${result.access_token}` : '/login'
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
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
        <Button
          type="submit"
          size={'lg'}
          disabled={form.formState.isSubmitting}
          className="w-full rounded-[3px]"
        >
          {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Tiếp tục
        </Button>
      </form>
    </Form>
  );
}
