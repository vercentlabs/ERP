export type Role = {
  id: string;
  name: string;
  permissions: string[];
};

export function hasPermission(grants: string[], permission: string) {
  return grants.includes("*") || grants.includes(permission);
}

export function resolveRolePermissions(roles: Role[]) {
  return [...new Set(roles.flatMap((role) => role.permissions))];
}
