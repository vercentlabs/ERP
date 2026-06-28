export const manifest = {
  domain: "inventory",
  module: "stock-ledger",
  displayName: "Stock Ledger",
  routeBase: "/api/inventory/stock-ledger",
  table: "inventory_stock_ledger",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
