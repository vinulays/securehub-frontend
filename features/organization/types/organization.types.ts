export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export interface OrganizationSearchRequest {
  keyword: string;
  page: number;
  size: number;
  sortBy: string;
  sortDirection: "asc" | "desc";
  isActive?: number;
}

export interface OrganizationSearchResponse {
  content: Organization[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type MyOrganizationResponse = Omit<
  Organization,
  "isActive" | "description"
>;
