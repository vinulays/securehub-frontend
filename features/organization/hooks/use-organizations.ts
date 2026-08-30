import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { organizationService } from '../services/organization-service';
import type { OrganizationSearchRequest, OrganizationSearchResponse } from '../types/organization.types';

interface UseOrganizationsOptions {
  enabled?: boolean;
}

export function useOrganizations(request: OrganizationSearchRequest, options: UseOrganizationsOptions = {}) {
  return useQuery<OrganizationSearchResponse>({
    queryKey: ['organizations', request],

    queryFn: () => organizationService.searchOrganization(request),

    placeholderData: keepPreviousData,
    enabled: options.enabled,
  });
}
