export const manifest = {
  domain: "platform",
  module: "roles-permissions",
  displayName: "Roles Permissions",
  routeBase: "/api/platform/roles-permissions",
  table: "platform_roles_permissions",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
