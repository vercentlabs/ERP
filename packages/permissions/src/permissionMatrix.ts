export type PermissionMatrix = Record<string, string[]>;

export const platformPermissionMatrix: PermissionMatrix = {
  owner: ["*"],
  admin: ["platform:*", "crm:*", "sales:*", "finance:*", "inventory:*"],
  manager: ["crm:read", "sales:read", "inventory:read", "finance:report"],
  operator: ["crm:read", "sales:create", "inventory:update"],
};

export function expandModulePermission(module: string, action: string) {
  return `${module}:${action}`;
}
