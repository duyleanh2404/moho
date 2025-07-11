'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { defaultQueryOptions } from '@/lib/react-query-config';

export function ReactQueryClientProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: defaultQueryOptions }));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
