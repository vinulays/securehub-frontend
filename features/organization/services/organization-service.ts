import { API_ROUTES } from '@/constants/api';
import { api } from '@/lib/axios';

import type {
  CreateOrganizationRequest,
  MyOrganizationResponse,
  OrganizationSearchRequest,
  OrganizationSearchResponse,
  UpdateOrganizationRequest,
} from '../types/organization.types';

class OrganizationService {
  async createOrganization(request: CreateOrganizationRequest): Promise<void> {
    await api.post(API_ROUTES.ORGANIZATIONS.CREATE, request);
  }

  async searchOrganization(request: OrganizationSearchRequest): Promise<OrganizationSearchResponse> {
    const response = await api.post(API_ROUTES.ORGANIZATIONS.SEARCH, request);

    return response.data;
  }

  async getMyOrganizations(): Promise<MyOrganizationResponse[]> {
    const response = await api.get(API_ROUTES.ORGANIZATIONS.MY_ORGANIZATIONS);

    return response.data;
  }

  async updateOrganization(id: string, request: UpdateOrganizationRequest): Promise<void> {
    await api.patch(API_ROUTES.ORGANIZATIONS.UPDATE(id), request);
  }

  async activateOrganization(id: string): Promise<void> {
    await api.patch(API_ROUTES.ORGANIZATIONS.ACTIVATE(id));
  }

  async deactivateOrganization(id: string): Promise<void> {
    await api.patch(API_ROUTES.ORGANIZATIONS.DEACTIVATE(id));
  }
}

export const organizationService = new OrganizationService();
