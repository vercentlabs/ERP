export const manifest = {
  domain: "inventory",
  module: "stock-balances",
  displayName: "Stock Balances",
  routeBase: "/api/inventory/stock-balances",
  table: "inventory_stock_balances",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
