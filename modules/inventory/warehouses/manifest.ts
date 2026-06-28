export const manifest = {
  domain: "inventory",
  module: "warehouses",
  displayName: "Warehouses",
  routeBase: "/api/inventory/warehouses",
  table: "inventory_warehouses",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
