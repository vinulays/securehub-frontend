import { API_ROUTES } from '@/constants/api';
import { api } from '@/lib/axios';

import type {
  AcceptInvitationRequest,
  CreateUserRequest,
  InvitationValidationResponse,
  User,
  UserSearchRequest,
  UserSearchResponse,
} from '../types';

class UserService {
  async createUser(request: CreateUserRequest): Promise<User> {
    const response = await api.post(API_ROUTES.USERS.CREATE, request);

    return response.data;
  }

  async searchUsers(request: UserSearchRequest): Promise<UserSearchResponse> {
    const response = await api.post(API_ROUTES.USERS.SEARCH, request);

    return response.data;
  }

  async validateInvitation(token: string): Promise<InvitationValidationResponse> {
    const response = await api.get(API_ROUTES.USERS.VALIDATE_INVITATION(token));

    return response.data;
  }

  async acceptInvitation(request: AcceptInvitationRequest): Promise<void> {
    await api.post(API_ROUTES.USERS.ACCEPT_INVITATION, request);
  }
}

export const userService = new UserService();
