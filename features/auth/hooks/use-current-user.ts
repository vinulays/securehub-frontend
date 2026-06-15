import { useQuery } from "@tanstack/react-query";

import { authService } from "../services/auth-service";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: authService.getCurrentUser,
    retry: false,
  });
}
