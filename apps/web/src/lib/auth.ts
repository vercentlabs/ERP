export type SessionUser = {
  id: string;
  name: string;
  tenantId: string;
  roles: string[];
  permissions: string[];
};

export function canAccess(user: SessionUser | undefined, permission: string) {
  return Boolean(user?.permissions.includes("*") || user?.permissions.includes(permission));
}
