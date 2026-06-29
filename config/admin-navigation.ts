import { Building2, LayoutDashboard, Users } from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import type { NavigationItem } from '@/types/navigation';

export const adminNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    url: ROUTES.ADMIN.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: 'Organizations',
    url: ROUTES.ADMIN.ORGANIZATIONS.ROOT,
    icon: Building2,
  },
  {
    title: 'Users',
    url: ROUTES.ADMIN.USERS.ROOT,
    icon: Users,
  },
];
