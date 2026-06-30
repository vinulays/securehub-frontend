'use client';

import React from 'react';

import { workspaceNavigation } from '@/config/workspace-navigation';
import { useAuthUser } from '@/features/auth/hooks/use-auth-user';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '../../ui/sidebar';
import { SidebarNavigation } from '../sidebar-navigation';
import { SidebarUser } from '../sidebar-user';
import { WorkspaceSwitcher } from './workspace-switcher';

export default function WorkspaceSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavigation label="Platform" items={workspaceNavigation} />
        {/* <OrganizationNavProjects /> */}
      </SidebarContent>

      <SidebarFooter>{user && <SidebarUser user={user} />}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
