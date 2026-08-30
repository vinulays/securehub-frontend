import type { OrganizationRole, UserRole } from '@/constants/roles';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  organizationRole: OrganizationRole;
  role: UserRole.USER;
}

export interface InvitationValidationResponse {
  valid: boolean;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AcceptInvitationRequest {
  token: string;
  password: string;
}

export interface UserSearchRequest {
  keyword: string;
  page: number;
  size: number;
  sortBy: string;
  sortDirection: 'ASC' | 'DESC';
  isActive?: boolean;
  organizationIds?: string[];
}

export interface UserSearchResponse {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
