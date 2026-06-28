export const manifest = {
  domain: "data-platform",
  module: "data-warehouse",
  displayName: "Data Warehouse",
  routeBase: "/api/data-platform/data-warehouse",
  table: "data-platform_data_warehouse",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
