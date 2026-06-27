import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { useOrganizationStore } from "../store/organization-store";
import type { MyOrganizationResponse } from "../types/organization.types";

interface UseOrganizationSwitcherResult {
  activeOrganization: MyOrganizationResponse | null;
  switchOrganization: (organization: MyOrganizationResponse) => Promise<void>;
}

export function useOrganizationSwitcher(): UseOrganizationSwitcherResult {
  const queryClient = useQueryClient();

  const { activeOrganization, setActiveOrganization } = useOrganizationStore();

  const switchOrganization = useCallback(
    async (organization: MyOrganizationResponse) => {
      if (activeOrganization && activeOrganization.id === organization.id) {
        return;
      }

      setActiveOrganization(organization);

      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    [activeOrganization, queryClient, setActiveOrganization],
  );

  return {
    activeOrganization,
    switchOrganization,
  };
}
