import { API_ROUTES } from '@/constants/api';
import { api } from '@/lib/axios';

import type { UserSearchRequest, UserSearchResponse } from '../types';

class UserService {
  async searchUsers(request: UserSearchRequest): Promise<UserSearchResponse> {
    const response = await api.post(API_ROUTES.USERS.SEARCH, request);

    return response.data;
  }
}

export const userService = new UserService();
