import { useMutation } from "@tanstack/react-query";

import { organizationService } from "../services/organization-service";
import type {
  OrganizationSearchRequest,
  OrganizationSearchResponse,
} from "../types/organization.types";

interface UseOrganizationsResult {
  search: (
    data: OrganizationSearchRequest,
  ) => Promise<OrganizationSearchResponse>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

export function useOrganizations(): UseOrganizationsResult {
  const searchOrganizationsMutation = useMutation({
    mutationFn: async (request: OrganizationSearchRequest) =>
      organizationService.searchOrganization(request),
  });

  return {
    search: searchOrganizationsMutation.mutateAsync,

    isLoading: searchOrganizationsMutation.isPending,

    isError: searchOrganizationsMutation.isError,
    error: searchOrganizationsMutation.error,
  };
}
