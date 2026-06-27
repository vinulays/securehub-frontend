export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    CURRENT_USER: '/users/me',
  },

  ORGANIZATIONS: {
    SEARCH: '/organizations/search',
    MY_ORGANIZATIONS: '/organizations/my-organizations',
  },
};
