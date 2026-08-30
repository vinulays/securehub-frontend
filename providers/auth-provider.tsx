'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '@/constants/routes';

import { authService } from '../features/auth/services/auth-service';
import { useAuthStore } from '../features/auth/store/auth-store';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === ROUTES.AUTH.INVITE) {
      setUser(null);

      return;
    }

    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser();

        setUser(user);
      } catch {
        setUser(null);
      }
    };

    initAuth();
  }, [pathname, setUser]);

  return <>{children}</>;
}
