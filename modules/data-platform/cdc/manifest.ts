export const manifest = {
  domain: "data-platform",
  module: "cdc",
  displayName: "Cdc",
  routeBase: "/api/data-platform/cdc",
  table: "data-platform_cdc",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
