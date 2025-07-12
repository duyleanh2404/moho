'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, UserRole } from '@/types/user';
import { userQueryKeys } from '@/lib/query-keys/user-query-keys';

interface CreateUserInput {
  fullname: string;
  email: string;
  password: string;
  role: UserRole;
}

export async function createUser(data: CreateUserInput): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    if (res.status === 409) {
      throw new Error('Email này đã tồn tại!');
    }
    throw new Error(result.message || 'Thêm người dùng thất bại!');
  }

  return result;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all
      });
    }
  });
}
