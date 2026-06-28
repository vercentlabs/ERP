export const manifest = {
  domain: "platform",
  module: "users",
  displayName: "Users",
  routeBase: "/api/platform/users",
  table: "platform_users",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
