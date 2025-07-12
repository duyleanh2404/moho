import { useQuery } from '@tanstack/react-query';

import { userQueryKeys } from '@/lib/query-keys/user-query-keys';

export const useUsers = (query?: Record<string, any>) =>
  useQuery({
    queryKey: userQueryKeys.list(query),
    queryFn: async () => {
      const url = '/api/users' + (query ? `?${new URLSearchParams(query).toString()}` : '');
      const res = await fetch(url);
      if (!res.ok) throw new Error((await res.json()).message || 'Fetch failed');
      return res.json();
    }
  });
