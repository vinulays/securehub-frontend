export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: OrganizationStatusEnum;
  createdAt: Date;
}

export enum OrganizationStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface CreateOrganizationRequest {
  name: string;
  slug: string;
  description: string;
}

export interface UpdateOrganizationRequest {
  name: string;
  description: string;
}

export interface OrganizationSearchRequest {
  keyword: string;
  page: number;
  size: number;
  sortBy: string;
  sortDirection: string;
  isActive?: boolean;
}

export interface OrganizationSearchResponse {
  content: Organization[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type MyOrganizationResponse = Omit<Organization, 'isActive' | 'description'>;
