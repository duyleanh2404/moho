'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userQueryKeys } from '@/lib/query-keys/user-query-keys';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Xóa người dùng thất bại!');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all
      });
    }
  });
}
