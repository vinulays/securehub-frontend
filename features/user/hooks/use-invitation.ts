import { useMutation, useQuery } from '@tanstack/react-query';

import { userService } from '../services/user-service';
import type { AcceptInvitationRequest, InvitationValidationResponse } from '../types';

export function useInvitationValidation(token: string) {
  return useQuery<InvitationValidationResponse>({
    queryKey: ['invitation', token],
    queryFn: () => userService.validateInvitation(token),
    enabled: Boolean(token),
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useAcceptInvitation() {
  return useMutation<void, unknown, AcceptInvitationRequest>({
    mutationFn: (request) => userService.acceptInvitation(request),
  });
}
