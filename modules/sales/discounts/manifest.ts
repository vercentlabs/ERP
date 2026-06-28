export const manifest = {
  domain: "sales",
  module: "discounts",
  displayName: "Discounts",
  routeBase: "/api/sales/discounts",
  table: "sales_discounts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
