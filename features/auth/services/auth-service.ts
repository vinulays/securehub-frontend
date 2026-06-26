import { API_ROUTES } from "@/constants/api";
import { api } from "@/lib/axios";

import type { AuthUser, LoginRequest } from "../types/auth.types";

class AuthService {
  async login(data: LoginRequest) {
    const response = await api.post(API_ROUTES.AUTH.LOGIN, data);

    return response.data;
  }

  async logout() {
    const response = await api.post(API_ROUTES.AUTH.LOGOUT);

    return response.data;
  }

  async getCurrentUser(): Promise<AuthUser> {
    const response = await api.get(API_ROUTES.AUTH.CURRENT_USER);

    return response.data;
  }

  async refreshToken() {
    const response = await api.post(API_ROUTES.AUTH.REFRESH_TOKEN);

    return response.data;
  }
}

export const authService = new AuthService();
