import { create } from "zustand";

import type { MyOrganizationResponse } from "../types/organization.types";

interface OrganizationState {
  activeOrganization: MyOrganizationResponse | null;
  setActiveOrganization: (organization: MyOrganizationResponse) => void;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  activeOrganization: null,

  setActiveOrganization: (organization) =>
    set({
      activeOrganization: organization,
    }),
}));
