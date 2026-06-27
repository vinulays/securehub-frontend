import { useMutation } from '@tanstack/react-query';

import { authService } from '../services/auth-service';
import type { LoginRequest, LoginResponse } from '../types/auth.types';

interface UseLoginResult {
  login: (data: LoginRequest) => Promise<LoginResponse>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

export function useLogin(): UseLoginResult {
  const loginMutation = useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: async (payload) => authService.login(payload),
  });

  return {
    login: loginMutation.mutateAsync,

    isLoading: loginMutation.isPending,

    isError: loginMutation.isError,
    error: loginMutation.error,
  };
}
