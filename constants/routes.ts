export const ROUTES = {
  ROOT: "/",

  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
  },

  DASHBOARD: "/dashboard",

  ORGANIZATIONS: {
    ROOT: "/organizations",
    CREATE: "/organizations/create",
    DETAILS: (id: string) => `/organizations/${id}`,
  },

  USERS: {
    ROOT: "/users",
    INVITE: "/users/invite",
  },

  SETTINGS: {
    ROOT: "/settings",
    PROFILE: "/settings/profile",
  },
} as const;
