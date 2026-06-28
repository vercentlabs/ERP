export const manifest = {
  domain: "platform",
  module: "naming-series",
  displayName: "Naming Series",
  routeBase: "/api/platform/naming-series",
  table: "platform_naming_series",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
