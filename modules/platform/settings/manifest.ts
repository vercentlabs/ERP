export const manifest = {
  domain: "platform",
  module: "settings",
  displayName: "Settings",
  routeBase: "/api/platform/settings",
  table: "platform_settings",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
