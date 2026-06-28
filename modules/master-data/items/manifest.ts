export const manifest = {
  domain: "master-data",
  module: "items",
  displayName: "Items",
  routeBase: "/api/master-data/items",
  table: "master-data_items",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
