export type UserProvider = 'local' | 'google';

export type User = {
  _id: string;
  email: string;
  fullname: string;
  role: string;
  provider: UserProvider;
  avatar_url: string;
  is_verified: boolean;
};
