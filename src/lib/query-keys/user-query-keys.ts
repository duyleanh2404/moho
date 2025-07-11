export const userQueryKeys = {
  all: ['user'],
  current: () => ['user', 'current'],
  detail: (id: string) => ['user', 'detail', id],
  list: (params?: Record<string, any>) => ['user', 'list', params]
};
