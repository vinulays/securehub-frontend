'use client';

import React from 'react';

import { workspaceNavigation } from '@/config/workspace-navigation';
import { useAuthUser } from '@/features/auth/hooks/use-auth-user';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '../../ui/sidebar';
import { WorkspaceNavMain } from './workplace-nav-main';
import { WorkspaceNavUser } from './workplace-nav-user';
import { OrganizationSwitcher } from './workplace-switcher';

export default function WorkspaceSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <WorkspaceNavMain items={workspaceNavigation} />
        {/* <OrganizationNavProjects /> */}
      </SidebarContent>

      <SidebarFooter>{user && <WorkspaceNavUser user={user} />}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
