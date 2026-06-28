import { useAuth } from "./useAuth";

export function usePermissions() {
  const { user } = useAuth();
  return {
    can(permission: string) {
      return Boolean(user?.permissions.includes("*") || user?.permissions.includes(permission));
    },
  };
}
