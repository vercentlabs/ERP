export const manifest = {
  domain: "maintenance",
  module: "asset-performance",
  displayName: "Asset Performance",
  routeBase: "/api/maintenance/asset-performance",
  table: "maintenance_asset_performance",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
