import type { DefaultOptions } from '@tanstack/react-query';

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5, // 5 phút
    refetchOnWindowFocus: true, // tự refetch khi quay lại tab
    retry: 1
  }
};
