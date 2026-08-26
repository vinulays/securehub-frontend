export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    CURRENT_USER: '/users/me',
  },

  ORGANIZATIONS: {
    CREATE: '/organizations',
    SEARCH: '/organizations/search',
    MY_ORGANIZATIONS: '/organizations/my-organizations',
    UPDATE: (id: string) => `/organizations/${id}`,
    ACTIVATE: (id: string) => `/organizations/${id}/activate`,
    DEACTIVATE: (id: string) => `/organizations/${id}/deactivate`,
  },

  USERS: {
    SEARCH: '/users/search',
  },
};
