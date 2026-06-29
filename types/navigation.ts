import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}
