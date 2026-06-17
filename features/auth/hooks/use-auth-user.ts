import { useAuthStore } from "../store/auth-store";

export const useAuthUser = () => useAuthStore((state) => state.user);
