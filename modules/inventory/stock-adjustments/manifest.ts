export const manifest = {
  domain: "inventory",
  module: "stock-adjustments",
  displayName: "Stock Adjustments",
  routeBase: "/api/inventory/stock-adjustments",
  table: "inventory_stock_adjustments",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
