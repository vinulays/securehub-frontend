import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { userService } from '../services/user-service';
import type { UserSearchRequest, UserSearchResponse } from '../types';

export function useUsers(request: UserSearchRequest) {
  return useQuery<UserSearchResponse>({
    queryKey: ['users', request],

    queryFn: () => userService.searchUsers(request),

    placeholderData: keepPreviousData,
  });
}
