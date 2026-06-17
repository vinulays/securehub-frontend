"use client";

import { useEffect } from "react";

import { authService } from "../features/auth/services/auth-service";
import { useAuthStore } from "../features/auth/store/auth-store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser();

        setUser(user);
      } catch {
        setUser(null);
      }
    };

    initAuth();
  }, [setUser]);

  return <>{children}</>;
}
