export function hasAnyPermission(grants: string[], required: string[]) {
  return grants.includes("*") || required.some((permission) => grants.includes(permission));
}

export function modulePermission(module: string, action: string) {
  return `${module}:${action}`;
}
