export type UserProvider = 'local' | 'google';

export type UserRole = 'user' | 'admin';

export type User = {
  _id: string;
  email: string;
  fullname: string;
  role: UserRole;
  provider: UserProvider;
  avatar_url?: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
};
