import { toast as sonnerToast } from 'sonner';

import { CustomToast } from './custom-toast';

export const toast = {
  success: (message: string) => {
    sonnerToast.custom((t) => <CustomToast t={t} message={message} type="success" />);
  },
  error: (message: string) => {
    sonnerToast.custom((t) => <CustomToast t={t} message={message} type="error" />);
  },
  default: sonnerToast
};
