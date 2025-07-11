'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    if (accessToken) {
      fetch('/api/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accessToken })
      }).then(() => {
        router.replace('/');
      });
    }
  }, [searchParams, router]);
};

export default CallbackPage;
