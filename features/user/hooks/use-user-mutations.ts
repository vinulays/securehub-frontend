import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '../services/user-service';
import type { CreateUserRequest, User } from '../types';

export function useUserMutations() {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation<User, unknown, CreateUserRequest>({
    mutationFn: (request) => userService.createUser(request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  return { createUserMutation };
}
