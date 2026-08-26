export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
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
