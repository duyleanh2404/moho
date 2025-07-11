'use client';

import { useQuery } from '@tanstack/react-query';

import { User } from '@/types/user';
import { userQueryKeys } from '@/lib/query-keys/user-query-keys';

async function fetchCurrentUser(): Promise<User | null> {
  const res = await fetch('/api/users/me', {
    cache: 'no-store'
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: userQueryKeys.current(),
    queryFn: fetchCurrentUser
  });
}
