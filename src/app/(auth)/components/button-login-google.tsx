import Image from 'next/image';

import { Button } from '@/components/ui/button';

export const ButtonLoginGoogle = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      size={'lg'}
      type="button"
      disabled={disabled}
      variant={'outline'}
      onClick={() => (window.location.href = '/api/auth/google/login')}
      className="w-full gap-3 !bg-white rounded-[3px] shadow-none"
    >
      <Image src={'/auth/logo-google.svg'} alt="Google" width={18} height={18} />
      Tiếp tục với Google
    </Button>
  );
};
