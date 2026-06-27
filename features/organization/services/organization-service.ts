import { API_ROUTES } from '@/constants/api';
import { api } from '@/lib/axios';

import type {
  MyOrganizationResponse,
  OrganizationSearchRequest,
  OrganizationSearchResponse,
} from '../types/organization.types';

class OrganizationService {
  async searchOrganization(request: OrganizationSearchRequest): Promise<OrganizationSearchResponse> {
    const response = await api.post(API_ROUTES.ORGANIZATIONS.SEARCH, request);

    return response.data;
  }

  async getMyOrganizations(): Promise<MyOrganizationResponse[]> {
    const response = await api.get(API_ROUTES.ORGANIZATIONS.MY_ORGANIZATIONS);

    return response.data;
  }
}

export const organizationService = new OrganizationService();
