import { FolderKanban, LayoutDashboard, Settings, Users } from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import type { NavigationItem } from '@/types/navigation';

export const workspaceNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    url: ROUTES.WORKSPACE.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: 'Projects',
    url: ROUTES.WORKSPACE.PROJECTS.ROOT,
    icon: FolderKanban,
  },
  {
    title: 'Members',
    url: ROUTES.WORKSPACE.MEMBERS.ROOT,
    icon: Users,
  },
  {
    title: 'Settings',
    url: ROUTES.WORKSPACE.SETTINGS.ROOT,
    icon: Settings,
  },
] as const;
