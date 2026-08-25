import { useMutation, useQueryClient } from '@tanstack/react-query';

import { organizationService } from '../services/organization-service';
import type { CreateOrganizationRequest, UpdateOrganizationRequest } from '../types/organization.types';

export function useOrganizationMutations() {
  const queryClient = useQueryClient();

  const invalidateOrganizations = () => queryClient.invalidateQueries({ queryKey: ['organizations'] });

  const createMutation = useMutation<void, unknown, CreateOrganizationRequest>({
    mutationFn: (request) => organizationService.createOrganization(request),
    onSuccess: invalidateOrganizations,
  });

  const updateMutation = useMutation<void, unknown, { id: string; request: UpdateOrganizationRequest }>({
    mutationFn: ({ id, request }) => organizationService.updateOrganization(id, request),
    onSuccess: invalidateOrganizations,
  });

  const updateStatusMutation = useMutation<void, unknown, { id: string; isActive: boolean }>({
    mutationFn: ({ id, isActive }) =>
      isActive ? organizationService.activateOrganization(id) : organizationService.deactivateOrganization(id),
    onSuccess: invalidateOrganizations,
  });

  return { createMutation, updateMutation, updateStatusMutation };
}
