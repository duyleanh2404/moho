'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, UserRole } from '@/types/user';
import { userQueryKeys } from '@/lib/query-keys/user-query-keys';

interface UpdateUserInput {
  id: string;
  data: {
    fullname: string;
    email: string;
    role: UserRole;
  };
}

async function updateUser(payload: UpdateUserInput): Promise<User> {
  const res = await fetch(`/api/users/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload.data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Cập nhật người dùng thất bại!');
  }

  return res.json();
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all
      });
    }
  });
}
