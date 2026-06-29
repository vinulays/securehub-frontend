export const ROUTES = {
  ROOT: '/',

  AUTH: {
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
  },

  DASHBOARD: '/dashboard',

  ADMIN: {
    DASHBOARD: '/admin/dashboard',

    ORGANIZATIONS: {
      ROOT: '/admin/organizations',
      CREATE: '/admin/organizations/create',
      DETAILS: (id: string) => `/admin/organizations/${id}`,
    },

    USERS: {
      ROOT: '/admin/users',
      CREATE: '/admin/users/create',
      DETAILS: (id: string) => `/admin/users/${id}`,
    },

    SETTINGS: {
      ROOT: '/admin/settings',
      PROFILE: '/admin/settings/profile',
    },
  },

  WORKSPACE: {
    DASHBOARD: '/workspace/dashboard',

    PROJECTS: {
      ROOT: '/workspace/projects',
      CREATE: '/workspace/projects/create',
      DETAILS: (id: string) => `/workspace/projects/${id}`,
    },

    MEMBERS: {
      ROOT: '/workspace/members',
      INVITE: '/workspace/members/invite',
    },

    SETTINGS: {
      ROOT: '/workspace/settings',
      PROFILE: '/workspace/settings/profile',
    },
  },
} as const;
