'use client';

import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { adminNavigation } from '@/config/admin-navigation';
import { ROUTES } from '@/constants/routes';
import { useAuthUser } from '@/features/auth';

import { SidebarNavigation } from '../sidebar-navigation';
import { SidebarUser } from '../sidebar-user';

export default function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthUser();
  const router = useRouter();

  const handleNavigate = () => {
    router.push(ROUTES.ADMIN.DASHBOARD);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => handleNavigate()}>
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                  SH
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">SecureHub</span>

                <span className="truncate text-xs text-muted-foreground">Admin Portal</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavigation label="Admin Controls" items={adminNavigation} />
      </SidebarContent>

      <SidebarFooter>{user && <SidebarUser user={user} />}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
