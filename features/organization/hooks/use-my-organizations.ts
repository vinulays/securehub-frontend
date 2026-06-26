import { useQuery } from "@tanstack/react-query";

import { organizationService } from "../services/organization-service";

export function useMyOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: organizationService.getMyOrganizations,
    staleTime: 5 * 60 * 1000,
  });
}
