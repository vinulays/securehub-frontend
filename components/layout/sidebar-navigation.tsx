'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavigationItem } from '@/types/navigation';

interface SidebarNavigationProps {
  label: string;
  items: NavigationItem[];
}

export function SidebarNavigation({ label, items }: SidebarNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (url: string) => {
    router.push(url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item: NavigationItem) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton onClick={() => handleNavigate(item.url)} isActive={pathname === item.url}>
              {item.icon && <item.icon />}

              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
