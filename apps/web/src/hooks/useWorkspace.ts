import { useAuth } from "./useAuth";

export function useWorkspace() {
  const { user } = useAuth();
  return {
    tenantId: user?.tenantId ?? "demo-tenant",
    user,
  };
}
