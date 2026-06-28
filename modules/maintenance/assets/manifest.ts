export const manifest = {
  domain: "maintenance",
  module: "assets",
  displayName: "Assets",
  routeBase: "/api/maintenance/assets",
  table: "maintenance_assets",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
