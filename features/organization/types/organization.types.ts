export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: OrganizationStatusEnum;
  createdAt: Date;
}

enum OrganizationStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface OrganizationSearchRequest {
  keyword: string;
  page: number;
  size: number;
  sortBy: string;
  sortDirection: string;
  isActive?: number;
}

export interface OrganizationSearchResponse {
  content: Organization[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type MyOrganizationResponse = Omit<Organization, 'isActive' | 'description'>;
