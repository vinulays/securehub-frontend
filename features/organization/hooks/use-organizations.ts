import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { organizationService } from '../services/organization-service';
import type { OrganizationSearchRequest, OrganizationSearchResponse } from '../types/organization.types';

export function useOrganizations(request: OrganizationSearchRequest) {
  return useQuery<OrganizationSearchResponse>({
    queryKey: ['organizations', request],

    queryFn: () => organizationService.searchOrganization(request),

    placeholderData: keepPreviousData,
  });
}
