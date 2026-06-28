import { useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/constants/routes';

import { authService } from '../services/auth-service';

interface UseLogoutResult {
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

export function useLogout(): UseLogoutResult {
  const logoutMutation = useMutation({
    mutationFn: authService.logout,

    onSettled: async () => {
      window.location.replace(ROUTES.AUTH.LOGIN);
    },
  });

  return {
    logout: logoutMutation.mutateAsync,

    isLoggingOut: logoutMutation.isPending,
  };
}
