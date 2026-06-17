import { api } from "@/lib/axios";

import type { AuthUser, LoginRequest } from "../types/auth.types";

class AuthService {
  async login(data: LoginRequest) {
    const response = await api.post("/auth/login", data);

    return response.data;
  }

  async logout() {
    const response = await api.post("/auth/logout");

    return response.data;
  }

  async getCurrentUser(): Promise<AuthUser> {
    const response = await api.get("/users/me");

    return response.data;
  }

  async refreshToken() {
    const response = await api.post("/auth/refresh");

    return response.data;
  }
}

export const authService = new AuthService();
