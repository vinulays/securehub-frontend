export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
}
