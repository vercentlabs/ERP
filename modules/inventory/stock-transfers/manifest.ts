export const manifest = {
  domain: "inventory",
  module: "stock-transfers",
  displayName: "Stock Transfers",
  routeBase: "/api/inventory/stock-transfers",
  table: "inventory_stock_transfers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
