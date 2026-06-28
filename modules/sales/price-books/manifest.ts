export const manifest = {
  domain: "sales",
  module: "price-books",
  displayName: "Price Books",
  routeBase: "/api/sales/price-books",
  table: "sales_price_books",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
